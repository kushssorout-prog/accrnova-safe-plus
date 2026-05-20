import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   TAB 1 — Circuit Breaker diagram
───────────────────────────────────────────── */
function CircuitBreakerDiagram() {
  const [isBlocked, setIsBlocked] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsBlocked(prev => !prev)
    }, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="ax-diagram">
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Live Request Flow
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
          background: isBlocked ? 'rgba(240,90,40,0.12)' : 'rgba(13,148,136,0.12)',
          color: isBlocked ? 'var(--coral)' : 'var(--teal)',
          transition: 'all 0.4s ease'
        }}>
          {isBlocked ? '● BLOCKED' : '● ACTIVE'}
        </span>
      </div>

      {/* Prompt node */}
      <div className="ax-flow-node" style={{ borderColor: 'var(--blue-light)', boxShadow: '0 0 0 3px rgba(59,130,246,0.1)' }}>
        <span style={{ fontSize: 16 }}>💬</span>
        <span>Prompt</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>Incoming</span>
      </div>

      <div className="ax-flow-arrow">↓</div>

      {/* Circuit Breaker node — pulses / toggles blocked */}
      <div className={`ax-flow-node ${isBlocked ? 'blocked-node' : 'active-node'}`}
        style={{ transition: 'all 0.5s ease' }}>
        <span style={{ fontSize: 16 }}>⚡</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Circuit Breaker</div>
          <div style={{ fontSize: 11, color: isBlocked ? 'var(--coral)' : 'var(--teal)', fontWeight: 600, marginTop: 2 }}>
            {isBlocked ? 'Violation Detected — Stream Halted' : 'Inspecting tokens…'}
          </div>
        </div>
        {!isBlocked && <div className="ax-flow-pulse" style={{ marginLeft: 'auto' }} />}
        {isBlocked && (
          <span style={{
            marginLeft: 'auto', fontSize: 18, animation: 'none',
            color: 'var(--coral)'
          }}>🛑</span>
        )}
      </div>

      {!isBlocked && (
        <>
          <div className="ax-flow-arrow" style={{ color: 'var(--teal)' }}>↓</div>
          <div className="ax-flow-node" style={{ borderColor: 'var(--violet-light)', boxShadow: '0 0 0 3px rgba(124,58,237,0.08)' }}>
            <span style={{ fontSize: 16 }}>🤖</span>
            <span>AI Model</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>Processing</span>
          </div>
          <div className="ax-flow-arrow" style={{ color: 'var(--teal)' }}>↓</div>
          <div className="ax-flow-node" style={{ borderColor: 'var(--teal)', boxShadow: '0 0 0 3px rgba(13,148,136,0.1)' }}>
            <span style={{ fontSize: 16 }}>✅</span>
            <span>Response</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--teal)', fontWeight: 600 }}>Delivered</span>
          </div>
        </>
      )}

      {isBlocked && (
        <div style={{
          padding: '16px', background: 'rgba(240,90,40,0.06)',
          border: '1px dashed rgba(240,90,40,0.35)', borderRadius: 10,
          textAlign: 'center', animation: 'tab-fade 0.4s ease'
        }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🚫</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--coral)', marginBottom: 4 }}>
            Stream Intercepted
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            AI model was never reached. Event logged.
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 2 — Approval Ledger flow
───────────────────────────────────────────── */
const APPROVAL_STEPS = [
  { icon: '🔒', label: 'Frozen Session' },
  { icon: '🔔', label: 'Reviewer Notified' },
  { icon: '📱', label: 'Mobile Review' },
  { icon: '✍️', label: 'Signed ✓' },
  { icon: '📒', label: 'Audit Ledger' },
]

function ApprovalFlow() {
  const [litStep, setLitStep] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLitStep(prev => (prev + 1) % APPROVAL_STEPS.length)
    }, 2000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="ax-diagram" style={{ gap: 10 }}>
      <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Sign-off Pipeline
      </div>
      {APPROVAL_STEPS.map((step, i) => (
        <div key={step.label}>
          <div className={`ax-approval-step${i <= litStep ? ' lit' : ''}`}>
            <div className="ax-approval-step-icon">{step.icon}</div>
            <span>{step.label}</span>
            {i === litStep && (
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: 'var(--violet)' }}>
                ← Active
              </span>
            )}
            {i < litStep && (
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: 'var(--teal)' }}>
                ✓
              </span>
            )}
          </div>
          {i < APPROVAL_STEPS.length - 1 && (
            <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 14, lineHeight: 1, padding: '2px 0' }}>
              ↓
            </div>
          )}
        </div>
      ))}
      <div style={{
        marginTop: 8, padding: '10px 14px',
        background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 8, fontSize: 12, color: 'var(--violet)', fontWeight: 600, textAlign: 'center'
      }}>
        Ed25519 signed · Private key never leaves browser
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 3 — Pricing Engine bar
───────────────────────────────────────────── */
const PRICING_EXAMPLES = [
  { label: 'Contract Draft', ai: 70, human: 30 },
  { label: 'Novel Clause', ai: 30, human: 70 },
  { label: 'Routine Research', ai: 90, human: 10 },
]

function PricingBar() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setExampleIdx(prev => (prev + 1) % PRICING_EXAMPLES.length)
    }, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const current = PRICING_EXAMPLES[exampleIdx]

  return (
    <div className="ax-diagram" style={{ gap: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
        Dynamic Attribution Engine
      </div>

      {PRICING_EXAMPLES.map((ex, i) => (
        <div key={ex.label} style={{
          padding: '14px 16px',
          background: i === exampleIdx ? 'rgba(240,90,40,0.04)' : 'transparent',
          borderRadius: 10,
          border: i === exampleIdx ? '1px solid rgba(240,90,40,0.2)' : '1px solid transparent',
          transition: 'all 0.5s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: i === exampleIdx ? 'var(--navy)' : 'var(--muted)' }}>
              {ex.label}
            </span>
            {i === exampleIdx && (
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--coral)', background: 'rgba(240,90,40,0.1)', padding: '2px 8px', borderRadius: 100 }}>
                Active
              </span>
            )}
          </div>
          <div className="ax-pricing-bar-track">
            <div
              className="ax-pricing-bar-ai"
              style={{ width: `${i === exampleIdx ? ex.ai : ex.ai * 0.6}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
              {i === exampleIdx && ex.ai >= 20 ? `AI ${ex.ai}%` : ''}
            </div>
            <div
              className="ax-pricing-bar-human"
              style={{ width: `${i === exampleIdx ? ex.human : ex.human * 0.6}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            >
              {i === exampleIdx && ex.human >= 20 ? `Human ${ex.human}%` : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--blue-light)', fontWeight: 600 }}>AI {ex.ai}%</span>
            <span style={{ fontSize: 11, color: 'var(--coral)', fontWeight: 600 }}>Human {ex.human}%</span>
          </div>
        </div>
      ))}

      <div style={{
        padding: '10px 14px', background: 'rgba(240,90,40,0.06)',
        border: '1px solid rgba(240,90,40,0.2)', borderRadius: 8,
        fontSize: 12, color: 'var(--coral)', fontWeight: 600, textAlign: 'center'
      }}>
        Scarcity index active · Rare expertise premium applied
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
type TabId = 'cb' | 'ledger' | 'pricing'

interface Tab {
  id: TabId
  name: string
  sub: string
  accent: 'teal' | 'violet' | 'coral'
}

const TABS: Tab[] = [
  { id: 'cb',      name: 'Circuit Breaker',  sub: 'Streaming Compliance',    accent: 'teal' },
  { id: 'ledger',  name: 'Approval Ledger',  sub: 'Cryptographic Sign-off',  accent: 'violet' },
  { id: 'pricing', name: 'Pricing Engine',   sub: 'Dynamic Attribution',     accent: 'coral' },
]

const TAB_CONTENT: Record<TabId, {
  headline: string
  body: string
  accent: 'teal' | 'violet' | 'coral'
  features: string[]
  diagram: React.ReactNode
}> = {
  cb: {
    headline: 'It intercepts.',
    body: 'A persistent middleware service that evaluates your AI sessions token-by-token during generation — not after. Non-compliant output is stopped mid-stream before it reaches the operator.',
    accent: 'teal',
    features: [
      'Streaming inspection — token by token, not output-level',
      'Zero-timeout architecture — persistent connection, not serverless',
      'Pre-flight AND mid-stream protection',
      'Automatic escalation to human reviewer',
    ],
    diagram: <CircuitBreakerDiagram />,
  },
  ledger: {
    headline: 'It verifies.',
    body: 'Every human sign-off is Ed25519 signed using the Web Crypto API. Private keys never leave the approver\'s browser. The audit ledger is append-only — triggers at the database level block all modification.',
    accent: 'violet',
    features: [
      'Ed25519 cryptographic signatures',
      'Private key never leaves the browser',
      'Append-only — triggers block all modification',
      'Exportable for regulatory submissions',
    ],
    diagram: <ApprovalFlow />,
  },
  pricing: {
    headline: 'It prices.',
    body: 'Every deliverable gets tagged with the precise AI vs human contribution split. The Dynamic Value Engine adjusts billing in real time. Rare human expertise commands a premium. AI output is priced accordingly.',
    accent: 'coral',
    features: [
      'Real-time AI vs human attribution',
      'Scarcity index — prices rare expertise correctly',
      'Protects margins as AI scales',
      'Client-facing transparency reports',
    ],
    diagram: <PricingBar />,
  },
}

export function ProductSection() {
  const [activeTab, setActiveTab] = useState<TabId>('cb')
  const content = TAB_CONTENT[activeTab]

  return (
    <section id="product" className="ax-product">
      <div className="ax-container">
        {/* Header */}
        <div className="ax-product-header">
          <div className="ax-eyebrow blue centered">
            One Platform. Three Things It Does.
          </div>
          <h2 className="ax-h2" style={{ textAlign: 'center', marginBottom: 8 }}>
            Axiom does not replace your AI tools.
          </h2>
          <h2 className="ax-h2" style={{ textAlign: 'center', color: 'var(--blue)' }}>
            It makes them safe to use.
          </h2>
        </div>

        {/* Tab Strip */}
        <div className="ax-tabs-strip">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`ax-tab${activeTab === tab.id ? ` active ${tab.accent}` : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="ax-tab-name">{tab.name}</div>
              <div className="ax-tab-sub">{tab.sub}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`ax-tab-content active`} key={activeTab}>
          {/* Left column */}
          <div>
            <h3 className="ax-tab-headline">{content.headline}</h3>
            <p className="ax-tab-body">{content.body}</p>
            <div className="ax-feature-list">
              {content.features.map(feature => (
                <div key={feature} className="ax-feature-item">
                  <div className={`ax-feature-check ${content.accent}`}>✓</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — diagram */}
          <div>
            {content.diagram}
          </div>
        </div>
      </div>
    </section>
  )
}
