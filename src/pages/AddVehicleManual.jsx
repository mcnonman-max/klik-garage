import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SelectField from '../components/SelectField'
import EmojiPicker from '../components/EmojiPicker'
import AppShell from '../components/AppShell'
import { useVehicles } from '../state/VehiclesContext'
import { CAR_BRANDS } from '../data/vehicles'

export default function AddVehicleManual() {
  const navigate = useNavigate()
  const { addVehicle } = useVehicles()
  const [brand, setBrand] = useState('')
  const [name, setName] = useState('')
  const [plate, setPlate] = useState('')

  const canSubmit = Boolean(brand && name.trim() && plate.trim())

  function handleSubmit() {
    if (!canSubmit) return
    addVehicle({ brand, name: name.trim(), plate: plate.trim() })
    navigate('/')
  }

  return (
    <AppShell>
      <PageHeader title="Zadat ručně" backTo="/pridat-vozidlo" />

      <div className="form-page">
        <SelectField
          label="Značka"
          value={brand}
          onChange={setBrand}
          options={CAR_BRANDS}
          placeholder="Vyberte značku"
        />

        <div className="field">
          <label>Jméno vozu</label>
          <div className="field-input-wrap">
            <input
              type="text"
              className="field-input has-icon"
              placeholder="Např. Škoda Octavia..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <EmojiPicker onSelect={(emoji) => setName((prev) => (prev ? `${prev} ${emoji}` : emoji))} />
          </div>
        </div>

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

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!canSubmit}>
          Přidat vůz
        </button>
      </div>
    </AppShell>
  )
}
