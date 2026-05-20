import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   AXIOM NAV
───────────────────────────────────────────── */
export function AxiomNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Product', id: 'product' },
    { label: 'Security', id: 'security' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
  ];

  return (
    <nav className={`ax-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="ax-container">
        <div className="ax-nav-inner">
          {/* Logo */}
          <a
            href="#"
            className="ax-nav-logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="ax-nav-logo-mark">A</span>
            <span className="ax-nav-logo-text">Axiom</span>
          </a>

          {/* Desktop nav links */}
          <div className="ax-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="ax-nav-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#waitlist"
            className="btn btn-coral ax-nav-cta"
            onClick={(e) => { e.preventDefault(); handleNavClick('waitlist'); }}
          >
            Join Waitlist
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              marginLeft: 'auto',
              padding: '8px',
              flexShrink: 0,
            }}
            // Only show on mobile
            className="ax-hamburger"
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                background: 'var(--navy)',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                background: 'var(--navy)',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                background: 'var(--navy)',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: mobileOpen ? '320px' : '0',
          transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
          background: 'rgba(250,252,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: mobileOpen ? '1px solid var(--border)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 24px 20px',
            gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                display: 'block',
                padding: '12px 8px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--navy)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
              }}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="btn btn-coral"
            style={{ marginTop: '12px', justifyContent: 'center' }}
            onClick={(e) => { e.preventDefault(); handleNavClick('waitlist'); }}
          >
            Join Waitlist
          </a>
        </div>
      </div>

      {/* Hide hamburger on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .ax-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .ax-nav-links { display: none !important; }
          .ax-nav-cta { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ax-hero" id="hero">
      {/* Dot-grid background */}
      <div className="ax-hero-grid-bg" />

      <div className="ax-hero-content">
        <div className="ax-container">
          <div className="ax-hero-inner">

            {/* ── LEFT: Copy ── */}
            <div className="ax-hero-left">

              {/* Badge */}
              <div className="ax-hero-badge">
                <span className="ax-hero-badge-dot" />
                AI Governance Infrastructure · Built for Law Firms
              </div>

              {/* Headline */}
              <div className="ax-hero-headline">
                <h1 className="ax-h1">
                  The AI your firm uses
                  <br />
                  needs a governor.
                  <br />
                  <span className="line-coral">You have no idea what it said.</span>
                </h1>
              </div>

              {/* Sub */}
              <p className="ax-hero-sub">
                Axiom is the compliance layer for your existing AI tools. Streaming
                Circuit Breaker, cryptographic audit trails, and dynamic pricing —
                in one platform.
              </p>

              {/* CTAs */}
              <div className="ax-hero-ctas">
                <a
                  href="#waitlist"
                  className="btn btn-coral btn-lg"
                  onClick={(e) => { e.preventDefault(); handleScroll('waitlist'); }}
                >
                  Join the Waitlist →
                </a>
                <a
                  href="#product"
                  className="btn btn-outline btn-lg"
                  onClick={(e) => { e.preventDefault(); handleScroll('product'); }}
                >
                  See How It Works
                </a>
              </div>

              {/* Trust row */}
              <div className="ax-hero-trust">
                {[
                  'SOC 2 In Progress',
                  'Ed25519 Signatures',
                  'No Data Sold',
                ].map((item) => (
                  <span key={item} className="ax-hero-trust-item">
                    <span className="ax-hero-trust-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: App card mockup ── */}
            <div className="ax-hero-visual">
              <div className="ax-hero-card">

                {/* Floating badges */}
                <span className="ax-hero-badge-float teal">🔒 Circuit Breaker Active</span>
                <span className="ax-hero-badge-float amber">⚡ 12ms response</span>
                <span className="ax-hero-badge-float blue">✓ Audit Ledger Recording</span>

                {/* Card header */}
                <div className="ax-hero-card-header">
                  <span className="ax-hero-card-header-title">Axiom Workspace</span>
                  <span className="ax-hero-card-header-status">
                    <span className="ax-hero-card-header-dot" />
                    Active
                  </span>
                </div>

                {/* Card body */}
                <div className="ax-hero-card-body">

                  <div className="ax-hero-session-row">
                    <span className="ax-hero-session-label">Matter</span>
                    <span className="ax-hero-session-val">Meridian Corp — Merger Review</span>
                  </div>

                  <div className="ax-hero-session-row">
                    <span className="ax-hero-session-label">Assigned</span>
                    <span className="ax-hero-session-val">Sarah Chen, Partner</span>
                  </div>

                  <div className="ax-hero-session-row">
                    <span className="ax-hero-session-label">Model</span>
                    <span className="ax-hero-session-val">GPT-4o · 3,841 tokens</span>
                  </div>

                  <div className="ax-hero-session-row">
                    <span className="ax-hero-session-label">Status</span>
                    <span className="ax-hero-session-val" style={{ color: 'var(--teal)', fontWeight: 600 }}>
                      ✓ Session Complete
                    </span>
                  </div>

                  {/* Risk status block */}
                  <div className="ax-hero-status-bar">
                    <div className="ax-hero-status-text">
                      <span>✓</span> Passed all compliance rules
                    </div>
                    <div className="ax-hero-risk-row">
                      <span>Risk Score</span>
                      <span style={{ fontWeight: 700, color: 'var(--teal)' }}>12 / 100</span>
                    </div>
                    <div className="ax-hero-risk-bar">
                      <div className="ax-hero-risk-fill" />
                    </div>
                    <p className="ax-hero-meta">
                      Cryptographic signature: Ed25519 · 2 rules evaluated · 0 violations
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
