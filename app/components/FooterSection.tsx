import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   AXIOM FOOTER SECTION + BACK-TO-TOP
───────────────────────────────────────────── */

const PRODUCT_LINKS = [
  'ACCRNOVA Core',
  'ACCRNOVA Legal',
  'ACCRNOVA Intelligence',
  'ACCRNOVA Pricing',
  'Roadmap',
];

const COMPANY_LINKS = [
  'About',
  'Blog',
  'Technical Architecture',
  'Security',
  'Contact',
];

export function FooterSection() {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail.trim()) {
      setFooterSubmitted(true);
    }
  };

  return (
    <>
      <footer className="ax-footer">
        {/* Gradient top line */}
        <div className="ax-footer-top" />

        <div className="ax-container" style={{ paddingTop: '64px' }}>

          {/* Grid */}
          <div className="ax-footer-grid">

            {/* Col 1: Brand */}
            <div className="ax-footer-brand">
              <div className="ax-footer-logo">ACCRNOVA Safe Plus</div>
              <p className="ax-footer-tagline">
                AI governance infrastructure for professional services.
              </p>
              <div className="ax-footer-social">
                <a href="#" className="ax-social-btn" aria-label="LinkedIn">in</a>
                <a href="#" className="ax-social-btn" aria-label="Twitter / X">𝕏</a>
                <a href="#" className="ax-social-btn" aria-label="GitHub">gh</a>
              </div>
            </div>

            {/* Col 2: Product */}
            <div>
              <div className="ax-footer-col-title">Product</div>
              <div className="ax-footer-links">
                {PRODUCT_LINKS.map(link => (
                  <a key={link} href="#" className="ax-footer-link">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 3: Company */}
            <div>
              <div className="ax-footer-col-title">Company</div>
              <div className="ax-footer-links">
                {COMPANY_LINKS.map(link => (
                  <a key={link} href="#" className="ax-footer-link">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 4: Stay Updated */}
            <div>
              <div className="ax-footer-col-title">Stay Updated</div>

              {footerSubmitted ? (
                <p style={{ color: '#4ADE80', fontSize: '14px', fontWeight: 600 }}>
                  You're subscribed ✓
                </p>
              ) : (
                <form className="ax-footer-newsletter" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    className="ax-footer-email-input"
                    placeholder="your@firm.com"
                    value={footerEmail}
                    onChange={e => setFooterEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <button type="submit" className="ax-footer-email-btn" aria-label="Subscribe">
                    →
                  </button>
                </form>
              )}

              <p style={{
                marginTop: '12px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: '1.55',
              }}>
                We send useful content, not noise. Weekly max.
              </p>
            </div>

          </div>

          {/* Divider */}
          <hr className="ax-footer-divider" />

          {/* Footer bottom */}
          <div className="ax-footer-bottom">
            <span className="ax-footer-copy">
              © 2026 ACCRNOVA Private Limited. All rights reserved. · Part of ACCRNOVA Group · <a href="https://accrnova.uk" className="ax-footer-legal-link" target="_blank" rel="noopener noreferrer">accrnova.uk</a>
            </span>
            <div className="ax-footer-legal">
              <a href="#" className="ax-footer-legal-link">Privacy Policy</a>
              <a href="#" className="ax-footer-legal-link">Terms of Service</a>
              <a href="#" className="ax-footer-legal-link">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Back to top */}
      <button
        className={`ax-back-top${showBackTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
