import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   AXIOM WAITLIST SECTION
───────────────────────────────────────────── */

const FREE_PROVIDERS = ['gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol', 'proton', 'protonmail', 'mail'];

function isWorkEmail(email: string): boolean {
  const domain = email.split('@')[1]?.split('.')[0]?.toLowerCase();
  return !!(domain && !FREE_PROVIDERS.includes(domain));
}

interface FormData {
  email: string;
  firmName: string;
  firmSize: string;
  interest: string;
}

interface FormErrors {
  email?: string;
  firmName?: string;
  firmSize?: string;
  interest?: string;
}

export function WaitlistSection() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firmName: '',
    firmSize: '',
    interest: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy link');

  // Progress bar animation
  const [fillWidth, setFillWidth] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFillWidth(94);
        }
      },
      { threshold: 0.4 }
    );
    const el = progressRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Work email is required.';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (!isWorkEmail(formData.email)) {
      newErrors.email = 'Please use your work email address — not a personal provider.';
    }

    if (!formData.firmName.trim()) {
      newErrors.firmName = 'Firm name is required.';
    }
    if (!formData.firmSize) {
      newErrors.firmSize = 'Please select your firm size.';
    }
    if (!formData.interest) {
      newErrors.interest = 'Please select your primary interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://axiom.app');
      setCopyLabel('Copied! ✓');
      setTimeout(() => setCopyLabel('Copy link'), 2500);
    } catch {
      setCopyLabel('Copied! ✓');
      setTimeout(() => setCopyLabel('Copy link'), 2500);
    }
  };

  return (
    <section id="waitlist" className="ax-waitlist">
      <div className="ax-container">

        {/* Header */}
        <div className="ax-waitlist-header">
          <h2 className="ax-h2" style={{ textAlign: 'center', marginBottom: '8px' }}>
            We are launching with 50 firms.
            <br />
            <span style={{ color: 'var(--blue)' }}>One will be yours.</span>
          </h2>
          <p className="sub">
            Each founding firm gets dedicated onboarding, direct access to the team,
            and pricing that is never offered again after launch.
          </p>

          {/* Counter */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <div className="ax-waitlist-counter">
              <span className="ax-counter-dot" />
              47 of 50 spots remaining
            </div>
          </div>

          {/* Progress bar */}
          <div className="ax-progress-wrap" ref={progressRef}>
            <div className="ax-progress-track">
              <div
                className="ax-progress-fill"
                style={{ width: `${fillWidth}%` }}
              />
            </div>
            <div className="ax-progress-label">
              <span>47 / 50 firms</span>
              <span>Launching Q3 2025</span>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="ax-waitlist-form-card">
          {submitted ? (
            /* Post-submit state */
            <div className="ax-submit-state">
              <div className="ax-submit-check">✅</div>
              <div className="ax-submit-title">You're #48 on the list.</div>
              <p className="ax-submit-body">
                We'll review your application and be in touch within 48 hours.
              </p>

              <div className="ax-share-row">
                <a
                  className="ax-share-btn linkedin"
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://axiom.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  in&nbsp; Share
                </a>
                <a
                  className="ax-share-btn twitter"
                  href="https://twitter.com/intent/tweet?text=Just+applied+for+early+access+to+Axiom+%E2%80%94+AI+governance+for+law+firms.+%40axiomapp+https%3A%2F%2Faxiom.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  𝕏&nbsp; Tweet
                </a>
                <button className="ax-share-btn copy" onClick={handleCopyLink}>
                  🔗&nbsp; {copyLabel}
                </button>
              </div>

              <div className="ax-urgency" style={{ marginTop: '28px' }}>
                ⚡ 3 spots claimed in the last 24 hours
              </div>
            </div>
          ) : (
            <>
              <div className="ax-form-title">Apply for Early Access</div>
              <div className="ax-form-sub">Takes 60 seconds. No spam. No card required.</div>

              <form className="ax-form" onSubmit={handleSubmit} noValidate>

                {/* Work email */}
                <div className="ax-field">
                  <label htmlFor="wl-email">Work email</label>
                  <input
                    id="wl-email"
                    type="email"
                    placeholder="your@firm.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    style={errors.email ? { borderColor: '#EF4444' } : {}}
                  />
                  {errors.email && (
                    <div className="ax-field-error">{errors.email}</div>
                  )}
                </div>

                {/* Firm name */}
                <div className="ax-field">
                  <label htmlFor="wl-firm">Firm name</label>
                  <input
                    id="wl-firm"
                    type="text"
                    placeholder="Your firm name"
                    value={formData.firmName}
                    onChange={e => handleChange('firmName', e.target.value)}
                    style={errors.firmName ? { borderColor: '#EF4444' } : {}}
                  />
                  {errors.firmName && (
                    <div className="ax-field-error">{errors.firmName}</div>
                  )}
                </div>

                {/* Firm size */}
                <div className="ax-field">
                  <label htmlFor="wl-size">Firm size</label>
                  <select
                    id="wl-size"
                    value={formData.firmSize}
                    onChange={e => handleChange('firmSize', e.target.value)}
                    style={errors.firmSize ? { borderColor: '#EF4444' } : {}}
                  >
                    <option value="">Select firm size</option>
                    <option value="under20">Under 20 people</option>
                    <option value="20-100">20–100</option>
                    <option value="100-500">100–500</option>
                    <option value="500+">500+</option>
                    <option value="solo">I'm a solo practitioner</option>
                  </select>
                  {errors.firmSize && (
                    <div className="ax-field-error">{errors.firmSize}</div>
                  )}
                </div>

                {/* Primary interest */}
                <div className="ax-field">
                  <label htmlFor="wl-interest">Primary interest</label>
                  <select
                    id="wl-interest"
                    value={formData.interest}
                    onChange={e => handleChange('interest', e.target.value)}
                    style={errors.interest ? { borderColor: '#EF4444' } : {}}
                  >
                    <option value="">Select primary interest</option>
                    <option value="compliance">AI Compliance & Governance</option>
                    <option value="legal">Legal Drafting Safety</option>
                    <option value="approvals">Human Approval Workflows</option>
                    <option value="billing">AI Billing & Pricing</option>
                    <option value="all">All of the above</option>
                  </select>
                  {errors.interest && (
                    <div className="ax-field-error">{errors.interest}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-coral btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  Apply for Early Access →
                </button>

                <p className="ax-form-privacy">
                  🔒 Your data is never sold or shared. Unsubscribe at any time.
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
