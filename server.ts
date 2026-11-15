import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leadFormSchema } from './src/lib/leadSchema.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

interface StoredLead {
  referenceId: string;
  submittedAt: string;
  name: string;
  email: string;
  company: string;
  systemTrack: string;
  projectDetails: string;
}

const recentLeads: StoredLead[] = [];

async function startServer(): Promise<void> {
  const app = express();

  app.disable('x-powered-by');

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json({ limit: '32kb' }));

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({
        ok: false,
        message: 'Malformed JSON request payload.',
      });
      return;
    }
    next(err);
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/leads', async (req: Request, res: Response) => {
    try {
      const rawBody = req.body ?? {};

      // Honeypot bot trap: if filled, return a benign synthetic response without processing
      if (typeof rawBody.website === 'string' && rawBody.website.trim().length > 0) {
        const decoyId = `NX-${new Date().getUTCFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        res.status(200).json({
          ok: true,
          referenceId: decoyId,
          submittedAt: new Date().toISOString(),
          summary: {
            name: 'Verified Contact',
            email: 'received@nexora.systems',
            company: 'Enterprise Partner',
            systemTrack: 'Autonomous Orchestration',
          },
        });
        return;
      }

      const parsed = leadFormSchema.safeParse(rawBody);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const fieldName = String(issue.path[0] ?? 'form');
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message;
          }
        }
        res.status(400).json({
          ok: false,
          message: 'Please review the highlighted fields and try again.',
          fieldErrors,
        });
        return;
      }

      const data = parsed.data;
      const referenceId = `NX-${new Date().getUTCFullYear()}-${crypto
        .randomBytes(3)
        .toString('hex')
        .toUpperCase()}`;
      const submittedAt = new Date().toISOString();

      const leadRecord: StoredLead = {
        referenceId,
        submittedAt,
        name: data.name,
        email: data.email,
        company: data.company,
        systemTrack: data.systemTrack,
        projectDetails: data.projectDetails,
      };

      recentLeads.unshift(leadRecord);
      if (recentLeads.length > 100) {
        recentLeads.pop();
      }

      // Optional server-only webhook forwarding configured via environment variable
      const webhookUrl = process.env.LEAD_WEBHOOK_URL;
      if (webhookUrl) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(process.env.LEAD_WEBHOOK_SECRET
                ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
                : {}),
            },
            body: JSON.stringify(leadRecord),
            signal: controller.signal,
          });
        } catch (webhookErr) {
          console.error('Lead webhook forwarding skipped:', webhookErr);
        } finally {
          clearTimeout(timeout);
        }
      }

      res.status(201).json({
        ok: true,
        referenceId,
        submittedAt,
        summary: {
          name: data.name,
          email: data.email,
          company: data.company,
          systemTrack: data.systemTrack,
        },
      });
    } catch (error) {
      console.error('Lead submission error:', error);
      res.status(500).json({
        ok: false,
        message: 'Unable to process your build request right now. Please try again.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    // Serve a zero-WebSocket /@vite/client module when HMR is disabled so the
    // browser never attempts failing WebSocket connections behind the proxy.
    app.get('/@vite/client', (_req: Request, res: Response) => {
      res.type('application/javascript').send(`
const sheetsMap = new Map();
export function updateStyle(id, content) {
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    document.head.appendChild(style);
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  const style = sheetsMap.get(id);
  if (style && style.parentNode) {
    style.parentNode.removeChild(style);
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
  };
}
export function injectQuery(url, queryToInject) {
  if (url[0] !== '.' && url[0] !== '/') return url;
  const pathname = url.replace(/[?#].*$/, '');
  const { search, hash } = new URL(url, 'http://vite.dev');
  return \`\${pathname}?\${queryToInject}\${search ? '&' + search.slice(1) : ''}\${hash || ''}\`;
}
export class ErrorOverlay {}
`);
    });

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NEXORA server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
