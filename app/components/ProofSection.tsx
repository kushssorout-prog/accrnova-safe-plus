import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   AXIOM PROOF SECTION
───────────────────────────────────────────── */

const QUOTES = [
  {
    text: "Every AI tool we evaluated had the same flaw: it could generate something plausible that was completely wrong for our jurisdiction, and no one would catch it until a client raised it.",
    author: "Managing Partner",
    role: "200-attorney firm",
  },
  {
    text: "We had a billing dispute last quarter because the associate couldn't explain how much of the memo was AI-generated. We had no system to answer that question.",
    author: "CFO",
    role: "Regional Law Firm",
  },
  {
    text: "The moment I realised we had no audit trail for AI approvals, I knew we had a serious governance gap. We were signing off on AI outputs over Slack.",
    author: "Chief Compliance Officer",
    role: "Financial Services",
  },
];

const TRUST_ITEMS = [
  { emoji: '🔒', label: 'SOC 2 Compliant (in progress)' },
  { emoji: '🔐', label: 'Ed25519 Cryptographic Signatures' },
  { emoji: '📋', label: 'Append-Only Audit Ledger' },
  { emoji: '🌍', label: 'GDPR & CCPA Ready' },
  { emoji: '🏗️', label: 'Built for Regulated Industries' },
];

export function ProofSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote(prev => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="proof" className="ax-proof">
      <div className="ax-container">

        {/* Header */}
        <div className="ax-proof-header">
          <div className="ax-eyebrow blue centered">BUILT WITH PRACTITIONERS</div>
          <h2 className="ax-h2" style={{ marginBottom: 0, textAlign: 'center' }}>
            We interviewed 80 lawyers and compliance officers.
            <br />
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>They all had the same problem.</span>
          </h2>
        </div>

        {/* Quote Rotator */}
        <div className="ax-quote-rotator">
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className={`ax-quote-card${i === activeQuote ? ' active' : ''}`}
            >
              <div className="ax-quote-mark">"</div>
              <p className="ax-quote-text">"{q.text}"</p>
              <div className="ax-quote-author">— {q.author}</div>
              <div className="ax-quote-role">{q.role}</div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="ax-quote-dots">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              className={`ax-quote-dot${i === activeQuote ? ' active' : ''}`}
              onClick={() => setActiveQuote(i)}
              aria-label={`Quote ${i + 1}`}
              style={{ border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        {/* Trust Strip */}
        <div className="ax-trust-strip">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="ax-trust-item">
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="ax-proof-stats">
          <div>
            <div className="ax-proof-stat-num">80+</div>
            <div className="ax-proof-stat-label">practitioners interviewed during design</div>
          </div>
          <div>
            <div className="ax-proof-stat-num">11</div>
            <div className="ax-proof-stat-label">compliance rules in default rule set</div>
          </div>
          <div>
            <div className="ax-proof-stat-num">0</div>
            <div className="ax-proof-stat-label">data points sold to third parties</div>
          </div>
        </div>

        {/* Cohort Box */}
        <div className="ax-cohort-box">
          <div className="ax-cohort-text">
            <h3>Axiom's founding cohort is capped at 50 firms.</h3>
            <p>
              Each firm receives dedicated onboarding, direct access to the founding team,
              and founding-member pricing locked in for life.
            </p>
          </div>
          <button className="btn btn-coral" onClick={scrollToWaitlist}>
            Apply for Early Access →
          </button>
        </div>

      </div>
    </section>
  );
}
