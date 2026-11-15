import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: () => void;
}

const NAV_LINKS = [
  { label: 'ECOSYSTEM', href: '#telemetry' },
  { label: 'BLUEPRINTS', href: '#systems' },
  { label: 'ROI', href: '#architecture' },
] as const;

export function Navbar({ onOpenLeadModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#00F0FF]/12 bg-[#07070B]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-5 md:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#overview');
          }}
          className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-[0.04em] text-[#F2F5F8] whitespace-nowrap shrink-0 transition-colors hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00F0FF]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M4 18V6L12 14L20 6V18"
              stroke="url(#nexora-logo-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="nexora-logo-grad" x1="4" y1="6" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F0FF" />
                <stop offset="1" stopColor="#B026FF" />
              </linearGradient>
            </defs>
          </svg>
          <span>NEXORA</span>
        </a>

        {/* Zone 2: Clean Uppercase Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-mono text-xs font-medium tracking-[0.08em] text-[#8A93A6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F2F5F8] hover:underline hover:decoration-[#00F0FF] hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00F0FF]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="cta-primary hidden sm:inline-flex items-center justify-center rounded-[4px] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            BUILD WITH NEXORA
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#00F0FF]/20 bg-[#0D0E15]/80 text-[#F2F5F8] md:hidden cursor-pointer hover:border-[#00F0FF]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#00F0FF]/12 bg-[#07070B]/95 backdrop-blur-xl md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-[1280px] flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex min-h-[44px] items-center rounded-[4px] px-3 font-mono text-xs font-medium tracking-[0.08em] text-[#8A93A6] transition-colors hover:bg-[#131317] hover:text-[#F2F5F8]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="cta-primary mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-[4px] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] cursor-pointer"
            >
              BUILD WITH NEXORA
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
