import { useState } from 'react'
import AppShell from '../components/AppShell'
import BottomNav from '../components/BottomNav'

export default function Profile({ userName, onSave }) {
  const [name, setName] = useState(userName)
  const [saved, setSaved] = useState(false)

  const canSubmit = Boolean(name.trim()) && name.trim() !== userName

  function handleSubmit() {
    if (!name.trim()) return
    onSave(name.trim())
    setSaved(true)
  }

  function handleChange(value) {
    setName(value)
    setSaved(false)
  }

  return (
    <AppShell>
      <div className="page-header">
        <h1>Profil</h1>
      </div>

      <div className="form-page with-bottom-nav">
        <div className="field">
          <label>Vaše jméno</label>
          <div className="field-input-wrap">
            <input
              type="text"
              className="field-input"
              value={name}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!canSubmit}>
          {saved ? 'Uloženo' : 'Uložit'}
        </button>
      </div>

      <BottomNav />
    </AppShell>
  )
}
