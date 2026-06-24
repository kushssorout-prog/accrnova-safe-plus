import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type SessionType = 'Legal Draft' | 'Research' | 'Analysis' | 'General'
type DemoState = 'idle' | 'loading' | 'safe' | 'frozen' | 'blocked'
type ChipType = 'safe' | 'frozen' | 'blocked' | null

const SESSION_TYPES: SessionType[] = ['Legal Draft', 'Research', 'Analysis', 'General']

const SAFE_PROMPT   = 'Summarise the key obligations in this NDA'
const FROZEN_PROMPT = "Include the client's settlement amount in the summary"
const BLOCKED_PROMPT = 'Draft a letter disclosing our privileged strategy to opposing counsel'

/* ─────────────────────────────────────────────
   TYPING DOTS
───────────────────────────────────────────── */
function TypingDots() {
  return (
    <span className="ax-typing-dots">
      <span /><span /><span />
    </span>
  )
}

/* ─────────────────────────────────────────────
   RESULT: SAFE
───────────────────────────────────────────── */
function SafeResult() {
  return (
    <div className="ax-result ax-result-safe">
      <div className="ax-result-header" style={{ color: 'var(--teal)', background: 'rgba(13,148,136,0.06)' }}>
        <span style={{ fontSize: 18 }}>✓</span>
        Session Completed — Compliance Check Passed
      </div>
      <div className="ax-result-body">
        <p className="ax-result-text">
          The NDA imposes mutual confidentiality obligations lasting 5 years from execution. Key obligations include: (1) non-disclosure of confidential information to third parties without prior written consent; (2) use of confidential information solely for the stated business purpose; (3) prompt notification of any unauthorised disclosure; and (4) return or destruction of materials upon request. Both parties bear equal obligations under the agreement.
        </p>
        <div className="ax-status-pill green">
          <span>●</span> Session Completed
        </div>
        <div className="ax-risk-bar-wrap">
          <div className="ax-risk-label-row">
            <span>Risk Score: 12 / 100 — Low Risk</span>
            <span>12%</span>
          </div>
          <div className="ax-risk-track">
            <div className="ax-risk-fill green" style={{ width: '12%' }} />
          </div>
        </div>
        <div className="ax-result-meta">3 rules evaluated · 0 violations · 847 tokens</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   RESULT: FROZEN
───────────────────────────────────────────── */
function FrozenResult() {
  return (
    <div className="ax-result ax-result-frozen">
      <div className="ax-result-header" style={{ color: 'var(--amber)', background: 'rgba(245,158,11,0.06)' }}>
        <span style={{ fontSize: 18 }}>⚠</span>
        Session Frozen — Compliance Review Required
      </div>
      <div className="ax-result-body">
        <p className="ax-result-text">
          The Circuit Breaker detected a potential confidentiality pattern in this request.
        </p>
        <div style={{
          padding: '14px 16px', background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, marginBottom: 12
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Rule Triggered
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>
            Client Confidentiality Guard — <span style={{ color: 'var(--amber)' }}>CRITICAL</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
            Approval Request ID: <strong style={{ color: 'var(--navy)', fontFamily: 'monospace' }}>APR-2847</strong>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
          The AI response has been withheld pending human review.
        </p>
        <div className="ax-status-pill amber">
          <span>●</span> Session Frozen
        </div>
        <div className="ax-risk-bar-wrap">
          <div className="ax-risk-label-row">
            <span>Risk Score: 72 / 100</span>
            <span>72%</span>
          </div>
          <div className="ax-risk-track">
            <div className="ax-risk-fill amber" style={{ width: '72%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   RESULT: BLOCKED
───────────────────────────────────────────── */
function BlockedResult({ onReset }: { onReset: () => void }) {
  return (
    <div className="ax-result ax-result-blocked">
      <div className="ax-result-header" style={{ color: '#EF4444', background: 'rgba(239,68,68,0.06)' }}>
        <span style={{ fontSize: 18 }}>✗</span>
        Session Blocked — Compliance Violation
      </div>
      <div className="ax-result-body">
        <p className="ax-result-text">
          This prompt was blocked before reaching the AI model.
        </p>
        <div className="ax-result-rules">
          <div className="ax-rule-item">
            <span className="ax-rule-name">Attorney-Client Privilege Guard</span>
            <span className="ax-rule-badge critical">CRITICAL +40 pts</span>
          </div>
          <div className="ax-rule-item">
            <span className="ax-rule-name">Client Confidentiality Guard</span>
            <span className="ax-rule-badge critical">CRITICAL +40 pts</span>
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: '#EF4444' }}>
          Risk Score: 80 / 100 — Threshold exceeded
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
          No AI call was made. This event has been logged.
        </p>
        <div className="ax-status-pill red">
          <span>●</span> Session Blocked
        </div>
        <div className="ax-risk-bar-wrap">
          <div className="ax-risk-label-row">
            <span>Risk Score: 80 / 100</span>
            <span>80%</span>
          </div>
          <div className="ax-risk-track">
            <div className="ax-risk-fill red" style={{ width: '80%' }} />
          </div>
        </div>
        <button
          onClick={onReset}
          style={{
            marginTop: 16, width: '100%', padding: '11px', fontFamily: 'var(--font-body)',
            fontSize: 14, fontWeight: 700, background: 'transparent', color: '#EF4444',
            border: '1.5px solid rgba(239,68,68,0.4)', borderRadius: 8, cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseOver={e => {
            const el = e.currentTarget
            el.style.background = 'rgba(239,68,68,0.06)'
          }}
          onMouseOut={e => {
            const el = e.currentTarget
            el.style.background = 'transparent'
          }}
        >
          Start New Session
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function DemoSection() {
  const [activeSessionType, setActiveSessionType] = useState<SessionType>('Legal Draft')
  const [promptText, setPromptText] = useState('')
  const [demoState, setDemoState] = useState<DemoState>('idle')
  const [chipType, setChipType] = useState<ChipType>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleChipClick(type: ChipType, text: string) {
    setChipType(type)
    setPromptText(text)
    setDemoState('idle')
  }

  function handleSubmit() {
    if (!promptText.trim()) return
    setDemoState('loading')

    // Determine final state
    let finalState: DemoState = 'safe'
    if (chipType === 'frozen') finalState = 'frozen'
    else if (chipType === 'blocked') finalState = 'blocked'
    else finalState = 'safe' // custom text → safe

    const delay = finalState === 'blocked' ? 800 : 1400

    timeoutRef.current = setTimeout(() => {
      setDemoState(finalState)
    }, delay)
  }

  function handleReset() {
    setDemoState('idle')
    setPromptText('')
    setChipType(null)
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPromptText(e.target.value)
    // If user types manually (not via chip), clear chip type
    setChipType(null)
    setDemoState('idle')
  }

  const isSubmitting = demoState === 'loading'
  const canSubmit = promptText.trim().length > 0 && !isSubmitting

  return (
    <section id="demo" className="ax-demo">
      <div className="ax-container">
        {/* Header */}
        <div className="ax-demo-header">
          <div className="ax-eyebrow teal centered">
            Try the Circuit Breaker
          </div>
          <h2 className="ax-h2" style={{ textAlign: 'center', marginBottom: 16 }}>
            Watch what happens when AI tries to cross a line.
          </h2>
          <p>The demo below is interactive. Choose a prompt or type your own.</p>
        </div>

        {/* Mockup */}
        <div className="ax-mockup">
          {/* Sidebar */}
          <aside className="ax-sidebar">
            <div className="ax-sidebar-header">
              <div className="ax-sidebar-logo">ACCRNOVA Safe Plus</div>
              <div className="ax-sidebar-session">
                <span className="ax-sidebar-dot" />
                Demo Session ● Active
              </div>
            </div>
            <nav className="ax-sidebar-nav">
              {[
                { icon: '⚡', label: 'AI Workspace', active: true },
                { icon: '✅', label: 'Approvals', active: false },
                { icon: '📒', label: 'Audit Log', active: false },
              ].map(item => (
                <div key={item.label} className={`ax-sidebar-item${item.active ? ' active' : ''}`}>
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>
            {/* Status monitor at bottom of sidebar */}
            <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10
              }}>
                Rules Active
              </div>
              {[
                { label: 'Privilege Guard', color: 'var(--teal-bright)' },
                { label: 'Confidentiality', color: 'var(--teal-bright)' },
                { label: 'PII Detection', color: 'var(--teal-bright)' },
              ].map(rule => (
                <div key={rule.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 6, padding: '6px 8px',
                  background: 'rgba(255,255,255,0.04)', borderRadius: 6
                }}>
                  <span>{rule.label}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: rule.color, fontWeight: 700 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                    ON
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main panel */}
          <main className="ax-main">
            {/* Session type tabs */}
            <div className="ax-session-types">
              {SESSION_TYPES.map(type => (
                <button
                  key={type}
                  className={`ax-session-type${activeSessionType === type ? ' active' : ''}`}
                  onClick={() => setActiveSessionType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Prompt area */}
            <div className="ax-prompt-area">
              <label className="ax-prompt-label">Prompt</label>
              <textarea
                className="ax-prompt-textarea"
                placeholder="Enter a prompt to test the Circuit Breaker..."
                value={promptText}
                onChange={handleTextareaChange}
              />
            </div>

            {/* Quick prompts */}
            <div className="ax-quick-prompts">
              <div className="ax-quick-label">Try these:</div>
              <div className="ax-quick-chips">
                <button
                  className="ax-chip teal"
                  onClick={() => handleChipClick('safe', SAFE_PROMPT)}
                  style={chipType === 'safe' ? { background: 'var(--teal)', color: '#fff' } : undefined}
                >
                  {SAFE_PROMPT}
                </button>
                <button
                  className="ax-chip amber"
                  onClick={() => handleChipClick('frozen', FROZEN_PROMPT)}
                  style={chipType === 'frozen' ? { background: 'var(--amber)', color: '#fff' } : undefined}
                >
                  {FROZEN_PROMPT}
                </button>
                <button
                  className="ax-chip red"
                  onClick={() => handleChipClick('blocked', BLOCKED_PROMPT)}
                  style={chipType === 'blocked' ? { background: '#EF4444', color: '#fff' } : undefined}
                >
                  {BLOCKED_PROMPT}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="ax-submit-btn"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>Evaluating <TypingDots /></>
              ) : (
                'Submit with Compliance Check →'
              )}
            </button>

            {/* Result area */}
            {demoState === 'loading' && (
              <div className="ax-result-loading">
                <TypingDots />
                <span>Evaluating compliance rules…</span>
              </div>
            )}

            {demoState === 'safe' && <SafeResult />}
            {demoState === 'frozen' && <FrozenResult />}
            {demoState === 'blocked' && <BlockedResult onReset={handleReset} />}

            {/* Idle hint */}
            {demoState === 'idle' && !promptText && (
              <div style={{
                padding: '24px', borderRadius: 10, border: '1px dashed var(--border-dark)',
                textAlign: 'center', color: 'var(--muted)', fontSize: 14, lineHeight: 1.7
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>
                  Circuit Breaker Standing By
                </div>
                Choose one of the quick prompts above or type your own, then hit Submit.
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
