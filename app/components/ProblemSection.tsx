import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   CUSTOM HOOK: useCounterAnimation
   Animates an integer value from 0 → target
   when the observed element enters the viewport.
───────────────────────────────────────────── */
function useCounterAnimation(
  target: number,
  duration = 1800,
  decimalPlaces = 0,
) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered || target === 0) {
      setCount(0);
      return;
    }

    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = easeOut(currentStep / steps);
      const raw = progress * target;
      setCount(parseFloat(raw.toFixed(decimalPlaces)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [triggered, target, duration, decimalPlaces]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
   Adds `visible` class to elements with `reveal`
───────────────────────────────────────────── */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* ─────────────────────────────────────────────
   STAT CARD: 73%
───────────────────────────────────────────── */
function StatCard73() {
  const { count, ref } = useCounterAnimation(73, 1800, 0);
  return (
    <div className="ax-stat-card reveal" ref={ref}>
      <div className="ax-stat-number coral">{Math.round(count)}%</div>
      <p className="ax-stat-label">
        of professional services firms have no formal AI review process
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD: $4.2M
───────────────────────────────────────────── */
function StatCard42M() {
  const { count, ref } = useCounterAnimation(4.2, 1800, 1);
  const display = count.toFixed(1);
  return (
    <div className="ax-stat-card reveal reveal-delay-1" ref={ref}>
      <div className="ax-stat-number amber">${display}M</div>
      <p className="ax-stat-label">
        average cost of a digital-tool malpractice claim in 2024
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD: 0
───────────────────────────────────────────── */
function StatCard0() {
  const { ref } = useCounterAnimation(0, 0, 0);
  return (
    <div className="ax-stat-card reveal reveal-delay-2" ref={ref}>
      <div className="ax-stat-number teal">0</div>
      <p className="ax-stat-label">
        AI platforms with cryptographically signed human approval audit trails
      </p>
      <p className="ax-stat-sub">Until now.</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROBLEM CARDS DATA
───────────────────────────────────────────── */
const problemCards = [
  {
    colorClass: 'coral-card',
    iconClass: 'coral',
    pillClass: 'coral',
    icon: '🛡️',
    pill: 'Compliance Risk',
    headline: 'AI does not know your firm\'s privilege doctrine.',
    body: 'It will get it wrong. You will not know until it is too late. Every unsupervised AI session is a liability waiting to surface.',
    delay: '',
  },
  {
    colorClass: 'amber-card',
    iconClass: 'amber',
    pillClass: 'amber',
    icon: '📋',
    pill: 'Oversight Gap',
    headline: 'Your approval process is a Slack message.',
    body: 'When a regulator asks who approved the AI output in a matter, you have nothing to show them. No signature. No record. No audit trail.',
    delay: 'reveal-delay-1',
  },
  {
    colorClass: 'violet-card',
    iconClass: 'violet',
    pillClass: 'violet',
    icon: '💰',
    pill: 'Billing Crisis',
    headline: 'You bill partner rates for AI output.',
    body: 'As AI automates the work, firms that cannot measure and price the AI-versus-human split will face client challenges they cannot answer.',
    delay: 'reveal-delay-2',
  },
] as const;

/* ─────────────────────────────────────────────
   PROBLEM SECTION
───────────────────────────────────────────── */
export function ProblemSection() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ax-problem" id="problem">
      <div ref={sectionRef}>
        <div className="ax-container">

          {/* Header */}
          <div className="ax-problem-header reveal">
            <div className="ax-eyebrow centered coral">
              The Problem No One Is Talking About
            </div>
            <h2 className="ax-h2" style={{ textAlign: 'center', marginBottom: '16px' }}>
              Your team is using AI every day.
              <br />
              <span style={{ color: 'var(--coral)' }}>You have no idea what it said.</span>
            </h2>
          </div>

          {/* Stat cards */}
          <div className="ax-stats-grid">
            <StatCard73 />
            <StatCard42M />
            <StatCard0 />
          </div>

          {/* Problem cards */}
          <div className="ax-problem-cards">
            {problemCards.map((card) => (
              <div
                key={card.pill}
                className={`ax-problem-card ${card.colorClass} reveal ${card.delay}`}
              >
                <div className={`ax-card-icon-wrap ${card.iconClass}`}>
                  {card.icon}
                </div>
                <span className={`ax-card-pill ${card.pillClass}`}>
                  {card.pill}
                </span>
                <h3 className="ax-card-headline">{card.headline}</h3>
                <p className="ax-card-body">{card.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
