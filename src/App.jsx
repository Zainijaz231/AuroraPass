import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if (numAllowed) {
      str += '0123456789'
    };
    if (CharAllowed){
      str += '!@~#*%$&+-[]{}_`'
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, CharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numAllowed, CharAllowed, setPassword])

  // UI-only strength indicator derived from current options
  const strengthScore = (() => {
    let score = 0
    if (length >= 10) score += 1
    if (length >= 14) score += 1
    if (numAllowed) score += 1
    if (CharAllowed) score += 1
    return Math.min(score, 4)
  })()

  const strengthMeta = [
    { label: 'Very weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Strong', color: 'bg-green-500' },
    { label: 'Very strong', color: 'bg-emerald-500' },
  ][strengthScore]

  return (
   <>
      <div className="app">
        <div className="card">
          <header className="card-header">
            <div className="header-row">
              <span className="logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 17a2 2 0 0 0 2-2v-2.5a3.5 3.5 0 0 0-7 0V13m9 0h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <h1 className="title">AuroraPass</h1>
                <p className="subtitle">Generate strong passwords instantly. Copy, tweak length, and choose characters.</p>
              </div>
            </div>
          </header>
          <div className="row input-row">
            <input
              type='text'
              value={password}
              placeholder='Your secure password'
              readOnly
              ref={passwordRef}
              className="password-input"
            />
            <button
              onClick={copyPasswordToClipboard}
              className="btn btn-primary"
            >
              Copy
            </button>
            <button
              onClick={passwordGenerator}
              className="btn btn-secondary"
            >
              Regenerate
            </button>
          </div>

          <div className="sections">
            <div className="section strength">
              <div className="section-row">
                <span className="label">Strength</span>
                <span className="label-strong">{strengthMeta.label}</span>
              </div>
              <div className="strength-bar">
                <div
                  className={`strength-bar-fill strength-${strengthScore}`}
                  style={{ width: `${(strengthScore/4)*100}%` }}
                />
              </div>
            </div>

            <section className="section options">
              <h2 className="section-title">Options</h2>
              <div className="options-content">
                <div className="option">
                  <label className="option-row">
                    <span>Password length</span>
                    <span className="value">{length}</span>
                  </label>
                  <input
                    type="range"
                    min={6}
                    max={100}
                    value={length}
                    onChange={(e)=>{ setLength(e.target.value) }}
                    className="range"
                  />
                  <p className="hint">Longer passwords are generally stronger and harder to guess.</p>
                </div>

                <div className="checks">
                  <label className="check">
                    <input
                      type="checkbox"
                      defaultChecked={numAllowed}
                      id='numberInput'
                      onChange={()=>{ setNumAllowed((prev) => !prev) }}
                    />
                    <span>Include numbers</span>
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      defaultChecked={CharAllowed}
                      id="charAllowed"
                      onChange={() => { setCharAllowed((prev) => !prev) }}
                    />
                    <span>Include symbols</span>
                  </label>
                </div>
              </div>
            </section>

            <footer className="footer-tip">
              <p>Tip: Toggle options and hit Regenerate to explore different strengths.</p>
            </footer>
          </div>
          <div aria-live="polite" className={`toast ${copied ? 'toast-visible' : ''}`}>
            <div className="toast-content">Copied to clipboard</div>
          </div>
        </div>
      </div>
   </>
  );
};

export default App;