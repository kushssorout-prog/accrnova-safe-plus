import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   AXIOM PRICING SECTION
───────────────────────────────────────────── */

type CheckColor = 'check-blue' | 'check-teal' | 'check-violet' | 'check-coral';

interface PricingCardProps {
  featured?: boolean;
  barColor: string;
  popular?: boolean;
  name: string;
  desc: string;
  price: string;
  scale?: string;
  features: string[];
  checkColor: CheckColor;
  ctaVariant: 'btn-primary' | 'btn-outline';
  onWaitlist: () => void;
}

function PricingCard({
  featured,
  barColor,
  popular,
  name,
  desc,
  price,
  scale,
  features,
  checkColor,
  ctaVariant,
  onWaitlist,
}: PricingCardProps) {
  return (
    <div className={`ax-pricing-card${featured ? ' featured' : ''}`} style={{ position: 'relative' }}>
      {/* Coloured top bar */}
      <div
        className="ax-pricing-card-bar"
        style={{ background: barColor }}
      />

      {/* Popular badge */}
      {popular && (
        <div className="ax-pricing-popular">MOST POPULAR</div>
      )}

      <div className="ax-pricing-name" style={{ marginTop: popular ? '24px' : '12px' }}>
        {name}
      </div>
      <div className="ax-pricing-desc">{desc}</div>

      <div className="ax-pricing-price">
        {price}
        <span className="unit">/mo</span>
      </div>
      {scale && <div className="ax-pricing-scale">{scale}</div>}

      <div className="ax-pricing-features">
        {features.map((f, i) => (
          <div key={i} className="ax-pricing-feature">
            <div className={`ax-pricing-check ${checkColor}`}>✓</div>
            <span>{f}</span>
          </div>
        ))}
      </div>

      <button
        className={`btn ${ctaVariant}`}
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={onWaitlist}
      >
        Join Waitlist →
      </button>
    </div>
  );
}

export function PricingSection() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      featured: true,
      barColor: 'var(--blue)',
      popular: true,
      name: 'ACCRNOVA Core',
      desc: 'AI compliance monitoring, human approval workflows, and audit ledger.',
      price: '$3,000',
      scale: 'Starting price. Scales with sessions.',
      features: [
        'Streaming Circuit Breaker',
        'Human Approval Gateway',
        'Cryptographic Audit Ledger',
        'Access Governance',
        'Terminology Engine',
      ],
      checkColor: 'check-blue' as CheckColor,
      ctaVariant: 'btn-primary' as const,
    },
    {
      featured: false,
      barColor: 'var(--teal)',
      name: 'ACCRNOVA Legal',
      desc: 'AI-assisted legal drafting, statutory compliance, and multi-jurisdictional risk.',
      price: '$2,000',
      features: [
        'Statutory compliance',
        'Precedent analysis',
        'Multi-jurisdictional risk',
        'Privilege Guard',
      ],
      checkColor: 'check-teal' as CheckColor,
      ctaVariant: 'btn-outline' as const,
    },
    {
      featured: false,
      barColor: 'var(--violet)',
      name: 'ACCRNOVA Intelligence',
      desc: 'Zero-hallucination research, market monitoring, and supply chain signals.',
      price: '$1,500',
      features: [
        'Zero-hallucination research',
        'Market monitoring',
        'Supply chain signals',
        'Source attribution',
      ],
      checkColor: 'check-violet' as CheckColor,
      ctaVariant: 'btn-outline' as const,
    },
    {
      featured: false,
      barColor: 'var(--coral)',
      name: 'ACCRNOVA Pricing',
      desc: 'Real-time AI vs. human value attribution and dynamic billing.',
      price: '$1,000',
      features: [
        'Value attribution',
        'Dynamic billing',
        'Human scarcity index',
        'Client transparency reports',
      ],
      checkColor: 'check-coral' as CheckColor,
      ctaVariant: 'btn-outline' as const,
    },
  ];

  return (
    <section id="pricing" className="ax-pricing">
      <div className="ax-container">

        {/* Header */}
        <div className="ax-pricing-header">
          <div className="ax-eyebrow coral centered">TRANSPARENT PRICING</div>
          <h2 className="ax-h2" style={{ marginBottom: '16px', textAlign: 'center' }}>
            Start with Core. Expand as you grow.
          </h2>
          <p style={{ textAlign: 'center', fontSize: '17px', color: 'var(--muted)', maxWidth: '520px', margin: '0 auto 32px' }}>
            Every module is independently purchasable. No bundled seats you don't need.
          </p>

          {/* Note banner */}
          <div style={{ textAlign: 'center' }}>
            <div className="ax-pricing-note">
              🕐 Founding-member pricing is available to the first 50 firms only.
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="ax-pricing-grid">
          {cards.map((card, i) => (
            <PricingCard
              key={i}
              {...card}
              onWaitlist={scrollToWaitlist}
            />
          ))}
        </div>

        {/* Enterprise Row */}
        <div className="ax-enterprise-row">
          <p>Need a custom contract, on-premise deployment, or white-labelling?</p>
          <button className="btn btn-outline">Talk to us →</button>
        </div>

      </div>
    </section>
  );
}
