interface FooterProps {
  onOpenLeadModal: () => void;
}

export function Footer({ onOpenLeadModal }: FooterProps) {
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-[#00F0FF]/12 bg-[#07070B] py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-6 px-5 md:flex-row md:items-center md:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-display text-lg font-bold tracking-[-0.03em] text-[#F2F5F8]">
            NEXORA
          </span>
          <span aria-hidden="true" className="text-[#4A5263]">
            ·
          </span>
          <span className="text-xs text-[#8A93A6]">
            Autonomous AI Infrastructure & Enterprise Systems
          </span>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs text-[#8A93A6]">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#overview');
            }}
            className="transition-colors hover:text-[#F2F5F8]"
          >
            Overview
          </a>
          <a
            href="#telemetry"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#telemetry');
            }}
            className="transition-colors hover:text-[#F2F5F8]"
          >
            Telemetry
          </a>
          <a
            href="#systems"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#systems');
            }}
            className="transition-colors hover:text-[#F2F5F8]"
          >
            Systems
          </a>
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00F0FF] transition-colors hover:text-[#F2F5F8] cursor-pointer"
          >
            START YOUR BUILD
          </button>
        </nav>

        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4A5263]">
          © {new Date().getFullYear()} NEXORA Systems Inc.
        </p>
      </div>
    </footer>
  );
}
