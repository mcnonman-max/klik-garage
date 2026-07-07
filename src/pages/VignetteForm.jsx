import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import PageHeader from '../components/PageHeader'
import DateField from '../components/DateField'
import SelectField from '../components/SelectField'
import AppShell from '../components/AppShell'
import { useVehicles } from '../state/VehiclesContext'
import { NATIONALITIES } from '../data/vehicles'

function emptyRow() {
  return { id: crypto.randomUUID(), date: '', country: 'Česko' }
}

export default function VignetteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vehicles, updateVignette } = useVehicles()
  const vehicle = vehicles.find((v) => v.id === id)

  const [rows, setRows] = useState(() => {
    const existing = vehicle?.vignettes ?? []
    return existing.length > 0 ? existing.map((v) => ({ ...v })) : [emptyRow()]
  })

  function updateRow(rowId, patch) {
    setRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, ...patch } : row)))
  }

  function removeRow(rowId) {
    setRows((prev) => prev.filter((row) => row.id !== rowId))
  }

  function handleSubmit() {
    updateVignette(
      id,
      rows.filter((row) => row.date).map(({ id: rowId, date, country }) => ({ id: rowId, date, country })),
    )
    navigate('/')
  }

  return (
    <AppShell>
      <PageHeader title="Platnost dálniční známky" />

      <div className="form-page">
        {rows.map((row, index) => (
          <div className="glass vignette-row" key={row.id}>
            <div className="vignette-row-header">
              <span className="vignette-row-title">Známka {index + 1}</span>
              <button
                className="row-remove-btn"
                type="button"
                onClick={() => removeRow(row.id)}
                aria-label="Odebrat známku"
              >
                <IconTrash size={16} stroke={1.8} />
              </button>
            </div>
            <DateField label="Konec platnosti" value={row.date} onChange={(date) => updateRow(row.id, { date })} />
            <SelectField
              label="Národnost"
              value={row.country}
              onChange={(country) => updateRow(row.id, { country })}
              options={NATIONALITIES}
            />
          </div>
        ))}

        <button className="add-vehicle-btn" type="button" onClick={() => setRows((prev) => [...prev, emptyRow()])}>
          <IconPlus size={17} stroke={2} /> Přidat další známku
        </button>

        <button className="primary-btn" type="button" onClick={handleSubmit}>
          Potvrdit
        </button>
      </div>
    </AppShell>
  )
}
