import { useEffect, useState } from 'react';
import { Activity, CreditCard, GitBranch } from 'lucide-react';

type CardId = 'ingest' | 'orchestration' | 'revenue';

const DISPATCH_EVENTS = [
  'Autonomous voice agent qualified prospect #8841 (Valuation: $4.2M) · Storefront deployed to edge in 4.2s [Tokyo-NRT]',
  'Self-healing pipeline rebalanced 14 regional inference clusters with 0 ms cold-start overhead [Frankfurt-FRA]',
  'Automated billing reconciliation verified $1.42M annualized ARR run-rate across 38 enterprise accounts [Virginia-IAD]',
] as const;

export function TelemetrySection() {
  const [selectedCard, setSelectedCard] = useState<CardId>('ingest');
  const [eventTick, setEventTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEventTick((prev) => (prev + 1) % DISPATCH_EVENTS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const liveRate = (8.4 + eventTick * 0.2).toFixed(1);

  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className="relative border-b border-[#00F0FF]/10 bg-[#07070B] pt-4 pb-16 md:pb-24"
    >
      <h2 id="telemetry-heading" className="sr-only">
        Live System Telemetry
      </h2>

      <div className="mx-auto max-w-[1160px] px-4 md:px-8">
        {/* Framed HUD Console Window */}
        <div className="cyber-glass overflow-hidden rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.75),0_0_40px_rgba(0,240,255,0.08)]">
          {/* Console Top Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00F0FF]/15 bg-[#0D0E15]/90 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#353439]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#353439]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#353439]" />
              </div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                NEXORA CORE · LIVE TELEMETRY
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em]">
              <span className="text-[#00F0FF]">AUTONOMOUS PIPELINE</span>
              <span aria-hidden="true" className="text-[#4A5263]">
                ·
              </span>
              <span className="text-[#8A93A6] tabular-nums">SYNCED 12ms</span>
            </div>
          </div>

          {/* 3-Column Live Telemetry Cards (+340%, 0 ms, $1.42M) */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-3">
            {/* Card 1: +340% INGEST RATE */}
            <button
              type="button"
              onClick={() => setSelectedCard('ingest')}
              aria-pressed={selectedCard === 'ingest'}
              className={`group flex flex-col justify-between rounded-[8px] border bg-[#0E0E12]/90 p-5 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF] ${
                selectedCard === 'ingest'
                  ? 'border-[#00F0FF]/55 shadow-[0_0_24px_rgba(0,240,255,0.14)]'
                  : 'border-[#00F0FF]/14 hover:border-[#00F0FF]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    INGEST RATE
                  </span>
                  <Activity className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold tracking-[-0.03em] tabular-nums text-[#00F0FF]">
                    +340%
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    VELOCITY
                  </span>
                </div>
              </div>

              {/* Rising Cyan Area Chart */}
              <div className="mt-5">
                <svg
                  viewBox="0 0 260 88"
                  className="h-20 w-full overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="ingest-area-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,74 C36,72 64,66 96,52 C126,39 152,44 184,28 C212,15 234,12 260,8 L260,88 L0,88 Z"
                    fill="url(#ingest-area-fill)"
                  />
                  <path
                    d="M0,74 C36,72 64,66 96,52 C126,39 152,44 184,28 C212,15 234,12 260,8"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="8" r="3.5" fill="#00F0FF" />
                </svg>

                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8A93A6] tabular-nums">
                  <span>08:00 UTC</span>
                  <span className="text-[#F2F5F8]">{liveRate}k evt/sec</span>
                  <span className="text-[#00F0FF]">LIVE</span>
                </div>
              </div>
            </button>

            {/* Card 2: 0 ms TASK ORCHESTRATION */}
            <button
              type="button"
              onClick={() => setSelectedCard('orchestration')}
              aria-pressed={selectedCard === 'orchestration'}
              className={`group flex flex-col justify-between rounded-[8px] border bg-[#0E0E12]/90 p-5 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF] ${
                selectedCard === 'orchestration'
                  ? 'border-[#B026FF]/65 shadow-[0_0_24px_rgba(176,38,255,0.18)]'
                  : 'border-[#00F0FF]/14 hover:border-[#B026FF]/45'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    TASK ORCHESTRATION
                  </span>
                  <GitBranch className="h-4 w-4 text-[#B026FF]" aria-hidden="true" />
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold tracking-[-0.03em] tabular-nums text-[#F2F5F8]">
                    0 ms
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    BOTTLENECKS
                  </span>
                </div>
              </div>

              {/* 99.8% Ring + Autonomous Pipeline Summary */}
              <div className="mt-6 flex items-center gap-4 border-t border-white/8 pt-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90" aria-hidden="true">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="3.5"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#B026FF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="125.6"
                      strokeDashoffset="4"
                    />
                  </svg>
                  <span className="absolute font-mono text-[11px] font-bold tabular-nums text-[#F2F5F8]">
                    99.8%
                  </span>
                </div>

                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F2F5F8]">
                    Autonomous Pipeline Active
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#8A93A6]">
                    Self-healing load balancer dynamically routing tasks across 14 clusters.
                  </p>
                </div>
              </div>
            </button>

            {/* Card 3: $1.42M REVENUE RUN-RATE */}
            <button
              type="button"
              onClick={() => setSelectedCard('revenue')}
              aria-pressed={selectedCard === 'revenue'}
              className={`group flex flex-col justify-between rounded-[8px] border bg-[#0E0E12]/90 p-5 text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF] ${
                selectedCard === 'revenue'
                  ? 'border-[#00F0FF]/55 shadow-[0_0_24px_rgba(0,240,255,0.14)]'
                  : 'border-[#00F0FF]/14 hover:border-[#00F0FF]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    REVENUE RUN-RATE
                  </span>
                  <CreditCard className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold tracking-[-0.03em] tabular-nums text-[#F2F5F8]">
                    $1.42M
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A93A6]">
                    ARR ROUTED
                  </span>
                </div>
              </div>

              {/* 5-Column Stepped Growth Bars */}
              <div className="mt-5">
                <div className="flex h-20 items-end gap-2" aria-hidden="true">
                  <div className="h-[22%] flex-1 rounded-t-[2px] bg-[#1F1F24]" />
                  <div className="h-[34%] flex-1 rounded-t-[2px] bg-[#2A292E]" />
                  <div className="h-[50%] flex-1 rounded-t-[2px] bg-[#00F0FF]/35" />
                  <div className="h-[72%] flex-1 rounded-t-[2px] bg-[#00F0FF]/65" />
                  <div className="h-[96%] flex-1 rounded-t-[2px] bg-[#00F0FF] shadow-[0_0_14px_rgba(0,240,255,0.45)]" />
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8A93A6] tabular-nums">
                  <span>WEEK 01</span>
                  <span className="text-[#00F0FF]">+28.4% MoM</span>
                  <span className="text-[#F2F5F8]">CURRENT</span>
                </div>
              </div>
            </button>
          </div>

          {/* Bottom Console Dispatch Feed */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#00F0FF]/12 bg-[#090A10] px-4 py-3 sm:px-6">
            <p className="font-mono text-[11px] leading-relaxed text-[#8A93A6]">
              <span className="font-semibold text-[#00F0FF]">AGENT DISPATCH:</span>{' '}
              {DISPATCH_EVENTS[eventTick]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
