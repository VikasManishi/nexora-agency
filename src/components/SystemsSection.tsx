import { useState } from 'react';
import { ArrowUpRight, Layers, Lock, Server, Workflow } from 'lucide-react';
import neuralMeshImg from '../assets/images/system_neural_mesh_1794763040348.jpg';
import quantumPipelineImg from '../assets/images/system_quantum_pipeline_1794763041215.jpg';
import type { SystemTrackOption } from '../lib/leadSchema';

interface SystemsSectionProps {
  onSelectSystemToBuild: (track: SystemTrackOption) => void;
}

type SystemCategory = 'all' | 'orchestration' | 'pipelines' | 'security';

interface SystemSpec {
  id: string;
  number: string;
  title: string;
  category: Exclude<SystemCategory, 'all'>;
  track: SystemTrackOption;
  metricsLine: string;
  summary: string;
  capabilities: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

const SYSTEMS: readonly SystemSpec[] = [
  {
    id: 'neural-orchestration',
    number: '01.',
    title: 'Autonomous Neural Mesh Orchestration',
    category: 'orchestration',
    track: 'Autonomous Orchestration',
    metricsLine: '+340% Throughput · Multi-Agent DAGs · Deterministic Replay',
    summary:
      'Coordinates specialized reasoning, retrieval, and execution agents with stateful checkpoints and strict SLA budgets across distributed enterprise workloads.',
    capabilities: [
      'Sub-15ms state synchronization across regional worker pools',
      'Automated fallback routing when upstream model providers degrade',
      'Full execution lineage for compliance and audit verification',
    ],
    image: neuralMeshImg,
    imageAlt: 'NEXORA modular compute server mesh connected by electric cyan optical conduits',
    featured: true,
  },
  {
    id: 'zero-latency-pipelines',
    number: '02.',
    title: 'Zero-Latency Inference & Data Pipelines',
    category: 'pipelines',
    track: 'Zero-Latency Data Mesh',
    metricsLine: '0ms Cold Start · Pre-Warmed Edge · Streaming Vector Sync',
    summary:
      'Replaces batch ETL bottlenecks with event-driven streaming ingestion, quantized model serving, and memory-resident edge routing.',
    capabilities: [
      'Event-bus ingestion supporting 100k+ concurrent telemetry streams',
      'Adaptive semantic caching reducing token spend by up to 61%',
      'Schema-enforced JSON outputs with strict runtime type guarantees',
    ],
    image: quantumPipelineImg,
    imageAlt: 'Precision carbon-fiber and smoked crystal optical pipeline refracting cyan and violet beams',
    featured: true,
  },
  {
    id: 'enterprise-security',
    number: '03.',
    title: 'Deterministic Guardrails & Zero-Trust AI',
    category: 'security',
    track: 'Enterprise AI Security',
    metricsLine: 'SOC2 Ready · PII Redaction · Policy-as-Code Enforcement',
    summary:
      'Enforces cryptographic boundary controls, real-time prompt-injection filtering, and tenant-isolated execution sandboxes across every API hop.',
    capabilities: [
      'Inline PII scrubbing and secret detection before model invocation',
      'Role-scoped tool execution with human-in-the-loop approval gates',
      'Immutable audit logs exported directly to your SIEM stack',
    ],
  },
  {
    id: 'fullstack-transformation',
    number: '04.',
    title: 'End-to-End Operational Transformation',
    category: 'orchestration',
    track: 'Full-Stack Transformation',
    metricsLine: '$1.42M Median Savings · 11-Week Payback · Custom Integrations',
    summary:
      'Connects legacy ERPs, CRMs, and internal data warehouses to unified autonomous control planes without disrupting live revenue workflows.',
    capabilities: [
      'Bi-directional adapters for Salesforce, Snowflake, Postgres, and SAP',
      'Custom operator consoles built for executive oversight and override',
      'Dedicated forward-deployed systems architects through handover',
    ],
  },
] as const;

const FILTER_TABS: { id: SystemCategory; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'orchestration', label: 'Orchestration' },
  { id: 'pipelines', label: 'Data Pipelines' },
  { id: 'security', label: 'Security' },
];

const ARCHITECTURE_PHASES = [
  {
    step: '01.',
    title: 'Topology & Bottleneck Audit',
    detail: 'Map latency budgets, unit economics, and manual handoffs in 5 business days.',
  },
  {
    step: '02.',
    title: 'Parallel Shadow Deployment',
    detail: 'Run NEXORA orchestration alongside legacy systems with zero production downtime.',
  },
  {
    step: '03.',
    title: 'Autonomous Cutover & Handover',
    detail: 'Promote verified pipelines to primary traffic with full observability and runbooks.',
  },
] as const;

export function SystemsSection({ onSelectSystemToBuild }: SystemsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<SystemCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleSystems =
    activeFilter === 'all'
      ? SYSTEMS
      : SYSTEMS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="relative bg-[#07070B] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#00F0FF]">
              02 · Core Infrastructure Systems
            </p>
            <h2
              id="systems-heading"
              style={{ textWrap: 'balance' }}
              className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] text-[#F2F5F8] md:text-4xl"
            >
              Modular Architectures Built for Production
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#8A93A6] md:text-base">
              Every NEXORA system is engineered to integrate cleanly with your existing cloud VPC,
              delivering measurable throughput and deterministic security guarantees.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter systems by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-[8px] border border-[#00F0FF]/15 bg-[#0D0E15]/80 p-1 self-start lg:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  aria-pressed={isActive}
                  className={`min-h-[36px] rounded-[4px] px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF] ${
                    isActive
                      ? 'bg-[#00F0FF] text-[#07070B] font-semibold'
                      : 'text-[#8A93A6] hover:text-[#F2F5F8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Systems Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {visibleSystems.map((system) => {
            const hasImage = Boolean(system.image);
            const spanClass = hasImage && activeFilter === 'all' ? 'lg:col-span-6' : 'lg:col-span-6';
            const imgBroken = failedImages[system.id];

            return (
              <article
                key={system.id}
                className={`cyber-glass cyber-glass-hover flex flex-col justify-between overflow-hidden rounded-[8px] ${spanClass}`}
              >
                {hasImage && system.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#00F0FF]/12 bg-gradient-to-br from-[#0E0E12] via-[#131317] to-[#1A1229]">
                    {!imgBroken ? (
                      <img
                        src={system.image}
                        alt={system.imageAlt ?? system.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [system.id]: true }))
                        }
                        className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Server className="h-10 w-10 text-[#00F0FF]" aria-hidden="true" />
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070B]/80 via-transparent to-transparent"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#00F0FF]">
                        {system.metricsLine}
                      </span>
                      {!hasImage && system.category === 'security' && (
                        <Lock className="h-4 w-4 shrink-0 text-[#B026FF]" aria-hidden="true" />
                      )}
                      {!hasImage && system.category === 'orchestration' && (
                        <Workflow className="h-4 w-4 shrink-0 text-[#00F0FF]" aria-hidden="true" />
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.01em] text-[#F2F5F8] md:text-2xl">
                      <span className="mr-2 font-mono text-[#00F0FF]">{system.number}</span>
                      {system.title}
                    </h3>

                    <p className="mt-3 text-sm leading-[1.65] text-[#8A93A6] md:text-[15px]">
                      {system.summary}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-[#00F0FF]/10 pt-4">
                      {system.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 text-sm text-[#B9CACB]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00F0FF]"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#00F0FF]/10 pt-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A93A6]">
                      VPC & Cloud Agnostic
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectSystemToBuild(system.track)}
                      className="cta-secondary inline-flex min-h-[40px] items-center gap-2 rounded-[4px] px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
                    >
                      <span>Configure Build</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Execution Architecture & Bottom Conversion Band */}
        <div
          id="architecture"
          className="mt-16 border-t border-[#00F0FF]/12 pt-14"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#E5B5FF]">
                03 · Deployment Protocol
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#F2F5F8] md:text-3xl">
                From Architecture Audit to Live Production
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[#8A93A6]">
              <Layers className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              <span>Zero-Downtime Delivery</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARCHITECTURE_PHASES.map((phase) => (
              <div
                key={phase.step}
                className="cyber-glass rounded-[8px] p-6"
              >
                <div className="font-mono text-sm font-bold text-[#00F0FF]">{phase.step}</div>
                <h4 className="mt-2 font-display text-lg font-semibold text-[#F2F5F8]">
                  {phase.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#8A93A6]">{phase.detail}</p>
              </div>
            ))}
          </div>

          {/* High-Intent CTA Strip */}
          <div className="cyber-glass relative mt-10 overflow-hidden rounded-[12px] p-7 md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#B026FF]/15 blur-[90px]"
            />
            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#F2F5F8] md:text-3xl">
                  Ready to Deploy Autonomous Infrastructure?
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm text-[#8A93A6] md:text-base">
                  Schedule a technical scoping session with NEXORA systems engineers to model your
                  latency targets and ROI timeline.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectSystemToBuild('Full-Stack Transformation')}
                className="cta-primary inline-flex min-h-[46px] items-center justify-center rounded-[4px] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
              >
                BUILD WITH NEXORA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
