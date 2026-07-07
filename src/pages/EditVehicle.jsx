import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SelectField from '../components/SelectField'
import DateField from '../components/DateField'
import EmojiPicker from '../components/EmojiPicker'
import AppShell from '../components/AppShell'
import { useVehicles } from '../state/VehiclesContext'
import { CAR_BRANDS } from '../data/vehicles'
import { guessBrandFromName } from '../data/brandLogos'

export default function EditVehicle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vehicles, updateVehicleDetails, removeVehicle } = useVehicles()
  const vehicle = vehicles.find((v) => v.id === id)

  const [brand, setBrand] = useState(vehicle?.brand ?? guessBrandFromName(vehicle?.name, CAR_BRANDS))
  const [name, setName] = useState(vehicle?.name ?? '')
  const [plate, setPlate] = useState(vehicle?.plate ?? '')
  const [stkDate, setStkDate] = useState(vehicle?.stk?.date ?? '')
  const [tires, setTires] = useState(vehicle?.tires ?? null)

  const canSubmit = Boolean(brand && name.trim() && plate.trim())

  function handleSubmit() {
    if (!canSubmit) return
    updateVehicleDetails(id, {
      brand,
      name: name.trim(),
      plate: plate.trim(),
      stk: { date: stkDate || null },
      tires,
    })
    navigate('/')
  }

  function handleRemove() {
    if (!window.confirm(`Opravdu chcete odebrat vozidlo „${vehicle?.name}“?`)) return
    removeVehicle(id)
    navigate('/')
  }

  return (
    <AppShell>
      <PageHeader title="Upravit vozidlo" />

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
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              autoCapitalize="characters"
            />
          </div>
        </div>

        <DateField label="STK (nepovinné)" value={stkDate} onChange={setStkDate} />

        <div className="field">
          <label>Pneumatiky (nepovinné)</label>
          <div className="switcher">
            <button
              type="button"
              className={`switcher-option ${tires === 'seasonal' ? 'active' : ''}`}
              onClick={() => setTires(tires === 'seasonal' ? null : 'seasonal')}
            >
              <span className="switcher-option-title">Sezónní</span>
              <span className="switcher-option-hint">připomenout výměnu</span>
            </button>
            <button
              type="button"
              className={`switcher-option ${tires === 'allseason' ? 'active' : ''}`}
              onClick={() => setTires(tires === 'allseason' ? null : 'allseason')}
            >
              <span className="switcher-option-title">Celoroční</span>
              <span className="switcher-option-hint">nepřipomínat nic</span>
            </button>
          </div>
        </div>

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!canSubmit}>
          Uložit změny
        </button>
        <button className="danger-btn" type="button" onClick={handleRemove}>
          Odebrat vozidlo
        </button>
      </div>
    </AppShell>
  )
}
