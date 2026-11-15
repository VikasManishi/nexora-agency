import { useCallback, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LeadModal } from './components/LeadModal';
import { Navbar } from './components/Navbar';
import { SystemsSection } from './components/SystemsSection';
import { TelemetrySection } from './components/TelemetrySection';
import type { SystemTrackOption } from './lib/leadSchema';

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<SystemTrackOption>('Autonomous Orchestration');

  const handleOpenLeadModal = useCallback((track?: SystemTrackOption) => {
    if (track) {
      setSelectedTrack(track);
    }
    setIsLeadModalOpen(true);
  }, []);

  const handleCloseLeadModal = useCallback(() => {
    setIsLeadModalOpen(false);
  }, []);

  const handleExploreSystems = useCallback(() => {
    const systemsEl = document.getElementById('systems');
    if (systemsEl) {
      systemsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07070B] text-[#F2F5F8]">
      <Navbar onOpenLeadModal={() => handleOpenLeadModal()} />

      <main>
        <Hero
          onOpenLeadModal={() => handleOpenLeadModal()}
          onExploreSystems={handleExploreSystems}
        />

        <TelemetrySection />

        <SystemsSection
          onSelectSystemToBuild={(track) => handleOpenLeadModal(track)}
        />
      </main>

      <Footer onOpenLeadModal={() => handleOpenLeadModal()} />

      <LeadModal
        isOpen={isLeadModalOpen}
        initialTrack={selectedTrack}
        onClose={handleCloseLeadModal}
      />
    </div>
  );
}
