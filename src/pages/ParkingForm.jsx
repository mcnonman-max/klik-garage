import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import DateField from '../components/DateField'
import AppShell from '../components/AppShell'
import { useVehicles } from '../state/VehiclesContext'

export default function ParkingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vehicles, updateParking } = useVehicles()
  const vehicle = vehicles.find((v) => v.id === id)
  const [date, setDate] = useState(vehicle?.parking?.date ?? '')

  function handleSubmit() {
    if (!date) return
    updateParking(id, date)
    navigate('/')
  }

  return (
    <AppShell>
      <PageHeader title="Datum konce parkovacího oprávnění" />

      <div className="form-page">
        <DateField label="Konec platnosti" value={date} onChange={setDate} />

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!date}>
          Potvrdit
        </button>
      </div>
    </AppShell>
  )
}
