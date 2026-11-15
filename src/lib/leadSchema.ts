import { z } from 'zod';

/**
 * Strips HTML/script injection vectors, dangerous URI schemes, and control chars
 * from untrusted user input before validation and persistence.
 */
export function sanitizeInput(raw: string): string {
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/(?:javascript|vbscript|data):/gi, '')
    .replace(/\bon\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

export const SYSTEM_TRACKS = [
  'Autonomous Orchestration',
  'Zero-Latency Data Mesh',
  'Enterprise AI Security',
  'Full-Stack Transformation',
] as const;

export type SystemTrackOption = (typeof SYSTEM_TRACKS)[number];

const safeSanitizedString = (minLen: number, maxLen: number, label: string) =>
  z
    .string({ message: `${label} is required.` })
    .transform((val) => sanitizeInput(val))
    .refine((val) => val.length >= minLen, {
      message: `${label} must be at least ${minLen} characters.`,
    })
    .refine((val) => val.length <= maxLen, {
      message: `${label} must be ${maxLen} characters or fewer.`,
    });

export const leadFormSchema = z.object({
  name: safeSanitizedString(2, 100, 'Full name'),
  email: z
    .string({ message: 'Work email is required.' })
    .transform((val) => sanitizeInput(val).toLowerCase())
    .refine((val) => val.length <= 160, {
      message: 'Work email must be 160 characters or fewer.',
    })
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val),
      'Enter a valid work email address.'
    ),
  company: safeSanitizedString(2, 120, 'Company name'),
  systemTrack: z.enum(SYSTEM_TRACKS, {
    message: 'Select a target system architecture.',
  }),
  projectDetails: safeSanitizedString(12, 2000, 'Project brief'),
  // Hidden honeypot field: legitimate human users leave this empty.
  website: z.string().max(256).optional().default(''),
});

export type LeadFormValues = z.input<typeof leadFormSchema>;
export type SanitizedLeadPayload = z.output<typeof leadFormSchema>;

export interface LeadSubmissionResponse {
  ok: boolean;
  referenceId: string;
  submittedAt: string;
  summary: {
    name: string;
    email: string;
    company: string;
    systemTrack: SystemTrackOption;
  };
}
