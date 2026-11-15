import { ArrowRight, Layers } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
  onExploreSystems: () => void;
}

export function Hero({ onOpenLeadModal, onExploreSystems }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-[#07070B] pt-14 pb-10 md:pt-20 md:pb-12"
    >
      {/* Atmospheric Radial Cyber Void Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#7000FF]/14 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 left-1/2 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-[#00F0FF]/10 blur-[130px]"
      />

      <div className="relative mx-auto flex max-w-[960px] flex-col items-center px-5 text-center md:px-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00F0FF]">
          Next-Gen AI Automation · Venture Orchestration
        </p>

        <h1
          style={{ textWrap: 'balance' }}
          className="mt-5 font-display text-[clamp(2.5rem,5.4vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#F2F5F8]"
        >
          Build Your Empire at{' '}
          <span className="text-[#00F0FF]">AI Speed</span>
        </h1>

        <p className="mt-5 max-w-[56ch] text-base leading-[1.65] text-[#8A93A6] md:text-lg">
          Nexora turns ambitious ideas into automated, revenue-ready businesses without the
          traditional agency bloat.
        </p>

        {/* Primary & Secondary Action Cluster */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="cta-primary inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-[4px] px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            <span className="font-bold text-[#090D16]">START YOUR BUILD</span>
            <ArrowRight className="h-4 w-4 text-[#090D16]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onExploreSystems}
            className="cta-secondary inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-[4px] px-7 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
            <span>EXPLORE SYSTEMS</span>
          </button>
        </div>
      </div>
    </section>
  );
}
