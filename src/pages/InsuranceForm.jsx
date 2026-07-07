import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import DateField from '../components/DateField'
import SelectField from '../components/SelectField'
import AppShell from '../components/AppShell'
import { useVehicles } from '../state/VehiclesContext'
import { INSURERS } from '../data/vehicles'

export default function InsuranceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vehicles, updateInsurance } = useVehicles()
  const vehicle = vehicles.find((v) => v.id === id)
  const [date, setDate] = useState(vehicle?.insurance?.date ?? '')
  const [company, setCompany] = useState(vehicle?.insurance?.company ?? '')

  function handleSubmit() {
    if (!date) return
    updateInsurance(id, date, company)
    navigate('/')
  }

  return (
    <AppShell>
      <PageHeader title="Platnost pojištění" />

      <div className="form-page">
        <DateField label="Konec platnosti" value={date} onChange={setDate} />
        <SelectField
          label="Pojišťovna"
          value={company}
          onChange={setCompany}
          options={INSURERS}
          placeholder="Vyberte pojišťovnu"
        />

        <button className="primary-btn" type="button" onClick={handleSubmit} disabled={!date}>
          Potvrdit
        </button>
      </div>
    </AppShell>
  )
}
