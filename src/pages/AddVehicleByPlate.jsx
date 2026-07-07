import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import AppShell from '../components/AppShell'

export default function AddVehicleByPlate() {
  const [plate, setPlate] = useState('')

  return (
    <AppShell>
      <PageHeader title="Přidat vozidlo" backTo="/pridat-vozidlo" />

      <div className="form-page">
        <div className="field">
          <label>SPZ</label>
          <div className="field-input-wrap">
            <input
              type="text"
              className="field-input"
              placeholder="1AB 2345"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              autoCapitalize="characters"
            />
          </div>
        </div>

        <button className="primary-btn" type="button">
          Další
        </button>
      </div>
    </AppShell>
  )
}
