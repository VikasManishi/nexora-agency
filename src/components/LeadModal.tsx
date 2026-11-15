import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck, X } from 'lucide-react';
import {
  leadFormSchema,
  SYSTEM_TRACKS,
  type LeadSubmissionResponse,
  type SystemTrackOption,
} from '../lib/leadSchema';

interface LeadModalProps {
  isOpen: boolean;
  initialTrack?: SystemTrackOption;
  onClose: () => void;
}

type FieldErrors = Partial<
  Record<'name' | 'email' | 'company' | 'systemTrack' | 'projectDetails', string>
>;

export function LeadModal({ isOpen, initialTrack, onClose }: LeadModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [systemTrack, setSystemTrack] = useState<SystemTrackOption>(
    initialTrack ?? 'Autonomous Orchestration'
  );
  const [projectDetails, setProjectDetails] = useState('');
  const [honeypotWebsite, setHoneypotWebsite] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<LeadSubmissionResponse | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialTrack) {
      setSystemTrack(initialTrack);
    }
  }, [initialTrack]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) {
    return null;
  }

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setSystemTrack(initialTrack ?? 'Autonomous Orchestration');
    setProjectDetails('');
    setHoneypotWebsite('');
    setFieldErrors({});
    setSubmitError(null);
    setConfirmation(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const validation = leadFormSchema.safeParse({
      name,
      email,
      company,
      systemTrack,
      projectDetails,
      website: honeypotWebsite,
    });

    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
        signal: controller.signal,
      });

      let data: Partial<LeadSubmissionResponse> & {
        message?: string;
        fieldErrors?: FieldErrors;
      } = {};

      try {
        data = await response.json();
      } catch {
        throw new Error('Unexpected response received from server.');
      }

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        throw new Error(
          data.message ?? 'Submission failed. Please verify your details and try again.'
        );
      }

      if (!data.referenceId || !data.summary) {
        throw new Error('Server confirmation was incomplete. Please try again.');
      }

      setConfirmation({
        ok: true,
        referenceId: data.referenceId,
        submittedAt: data.submittedAt ?? new Date().toISOString(),
        summary: data.summary,
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setSubmitError(
          'Request timed out while contacting NEXORA servers. Check your connection and retry.'
        );
      } else if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('Network error while submitting your request. Please try again.');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070B]/80 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="cyber-modal-surface relative max-h-[92vh] w-full max-w-[600px] overflow-y-auto rounded-[12px] p-6 md:p-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#00F0FF]/15 pb-5">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#00F0FF]">
              Technical Architecture Intake
            </p>
            <h2
              id="lead-modal-title"
              className="mt-1.5 font-display text-2xl font-bold tracking-[-0.02em] text-[#F2F5F8]"
            >
              Start Your NEXORA Build
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isSubmitting) onClose();
            }}
            disabled={isSubmitting}
            aria-label="Close booking modal"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-[#00F0FF]/20 bg-[#0D0E15]/80 text-[#8A93A6] transition-colors hover:border-[#00F0FF] hover:text-[#F2F5F8] disabled:opacity-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {confirmation ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-[8px] border border-[#00F0FF]/35 bg-[#0D0E15]/85 p-5">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#00F0FF]" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#F2F5F8]">
                    Build Brief Confirmed
                  </h3>
                  <p className="mt-1 text-sm text-[#8A93A6]">
                    Your project brief has been validated and routed to a NEXORA systems architect.
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-[#00F0FF]/12 pt-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A93A6]">
                    Reference ID
                  </dt>
                  <dd className="mt-0.5 font-mono font-semibold text-[#00F0FF] tabular-nums">
                    {confirmation.referenceId}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A93A6]">
                    System Track
                  </dt>
                  <dd className="mt-0.5 text-[#F2F5F8]">{confirmation.summary.systemTrack}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A93A6]">
                    Contact
                  </dt>
                  <dd className="mt-0.5 text-[#F2F5F8]">{confirmation.summary.name}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A93A6]">
                    Organization
                  </dt>
                  <dd className="mt-0.5 text-[#F2F5F8]">{confirmation.summary.company}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="cta-secondary min-h-[42px] rounded-[4px] px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] cursor-pointer"
              >
                Submit Another Brief
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cta-primary min-h-[42px] rounded-[4px] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-[4px] border border-[#FFB4AB]/45 bg-[#93000A]/30 px-4 py-3 text-sm text-[#FFDAD6]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB4AB]" aria-hidden="true" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Hidden Honeypot Anti-Bot Field */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
            >
              <label htmlFor="lead-website-trap">Website URL</label>
              <input
                id="lead-website-trap"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypotWebsite}
                onChange={(e) => setHoneypotWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lead-name"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9CACB]"
                >
                  Full Name *
                </label>
                <input
                  ref={nameInputRef}
                  id="lead-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError('name');
                  }}
                  placeholder="Elena Vance"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'lead-name-error' : undefined}
                  className={`mt-1.5 h-11 w-full rounded-[4px] border bg-[#0D0E15]/85 px-3.5 text-[15px] text-[#F2F5F8] placeholder-[#4A5263] transition-all focus:outline-none ${
                    fieldErrors.name
                      ? 'border-[#FFB4AB] focus:border-[#FFB4AB]'
                      : 'border-white/12 focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  }`}
                />
                {fieldErrors.name && (
                  <p id="lead-name-error" className="mt-1.5 text-xs text-[#FFB4AB]">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lead-email"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9CACB]"
                >
                  Work Email *
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  required
                  maxLength={160}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                  }}
                  placeholder="elena@enterprise.io"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'lead-email-error' : undefined}
                  className={`mt-1.5 h-11 w-full rounded-[4px] border bg-[#0D0E15]/85 px-3.5 text-[15px] text-[#F2F5F8] placeholder-[#4A5263] transition-all focus:outline-none ${
                    fieldErrors.email
                      ? 'border-[#FFB4AB] focus:border-[#FFB4AB]'
                      : 'border-white/12 focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  }`}
                />
                {fieldErrors.email && (
                  <p id="lead-email-error" className="mt-1.5 text-xs text-[#FFB4AB]">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lead-company"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9CACB]"
                >
                  Company *
                </label>
                <input
                  id="lead-company"
                  name="company"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    clearFieldError('company');
                  }}
                  placeholder="Helios Robotics"
                  aria-invalid={Boolean(fieldErrors.company)}
                  aria-describedby={fieldErrors.company ? 'lead-company-error' : undefined}
                  className={`mt-1.5 h-11 w-full rounded-[4px] border bg-[#0D0E15]/85 px-3.5 text-[15px] text-[#F2F5F8] placeholder-[#4A5263] transition-all focus:outline-none ${
                    fieldErrors.company
                      ? 'border-[#FFB4AB] focus:border-[#FFB4AB]'
                      : 'border-white/12 focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  }`}
                />
                {fieldErrors.company && (
                  <p id="lead-company-error" className="mt-1.5 text-xs text-[#FFB4AB]">
                    {fieldErrors.company}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lead-track"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9CACB]"
                >
                  System Architecture
                </label>
                <select
                  id="lead-track"
                  name="systemTrack"
                  value={systemTrack}
                  onChange={(e) => {
                    setSystemTrack(e.target.value as SystemTrackOption);
                    clearFieldError('systemTrack');
                  }}
                  className="mt-1.5 h-11 w-full rounded-[4px] border border-white/12 bg-[#0D0E15] px-3.5 text-[15px] text-[#F2F5F8] transition-all focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.2)] focus:outline-none"
                >
                  {SYSTEM_TRACKS.map((track) => (
                    <option key={track} value={track} className="bg-[#131317] text-[#F2F5F8]">
                      {track}
                    </option>
                  ))}
                </select>
                {fieldErrors.systemTrack && (
                  <p className="mt-1.5 text-xs text-[#FFB4AB]">{fieldErrors.systemTrack}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="lead-details"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9CACB]"
                >
                  Project Details & Latency Goals *
                </label>
                <span className="font-mono text-[11px] tabular-nums text-[#8A93A6]">
                  {projectDetails.length} / 2000
                </span>
              </div>
              <textarea
                id="lead-details"
                name="projectDetails"
                required
                rows={4}
                maxLength={2000}
                value={projectDetails}
                onChange={(e) => {
                  setProjectDetails(e.target.value);
                  clearFieldError('projectDetails');
                }}
                placeholder="Describe target workflows, monthly throughput volume, and integration stack..."
                aria-invalid={Boolean(fieldErrors.projectDetails)}
                aria-describedby={fieldErrors.projectDetails ? 'lead-details-error' : undefined}
                className={`mt-1.5 w-full resize-y rounded-[4px] border bg-[#0D0E15]/85 px-3.5 py-2.5 text-[15px] leading-relaxed text-[#F2F5F8] placeholder-[#4A5263] transition-all focus:outline-none ${
                  fieldErrors.projectDetails
                    ? 'border-[#FFB4AB] focus:border-[#FFB4AB]'
                    : 'border-white/12 focus:border-[#00F0FF] focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                }`}
              />
              {fieldErrors.projectDetails && (
                <p id="lead-details-error" className="mt-1.5 text-xs text-[#FFB4AB]">
                  {fieldErrors.projectDetails}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse justify-between gap-4 border-t border-[#00F0FF]/12 pt-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs text-[#8A93A6]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#00F0FF]" aria-hidden="true" />
                <span>Schema-validated & encrypted intake</span>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="min-h-[42px] rounded-[4px] px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#8A93A6] transition-colors hover:text-[#F2F5F8] disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-primary inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[4px] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#090D16] whitespace-nowrap shrink-0 disabled:cursor-not-allowed disabled:opacity-65 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Brief...</span>
                    </>
                  ) : (
                    <span>Submit Build Brief</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
