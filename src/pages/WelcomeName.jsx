import { useState } from 'react'
import AppShell from '../components/AppShell'

export default function WelcomeName({ onSubmit }) {
  const [name, setName] = useState('')

  function handleSubmit() {
    if (!name.trim()) return
    onSubmit(name.trim())
  }

  return (
    <AppShell>
      <div className="welcome-page">
        <h1 className="welcome-title">Jak vám máme říkat?</h1>

        <div className="field">
          <label>Vaše jméno</label>
          <div className="field-input-wrap">
            <input
              type="text"
              className="field-input"
              placeholder="Např. Jana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>
        </div>

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!name.trim()}>
          Pokračovat
        </button>
      </div>
    </AppShell>
  )
}
