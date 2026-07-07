import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconAlertTriangle, IconBell, IconChevronDown, IconPlus } from '@tabler/icons-react'
import { useVehicles } from '../state/VehiclesContext'
import { getStatus } from '../utils/dateStatus'
import { vehicleAttentionText, vehicleCountText } from '../utils/plural'
import VehicleCard from '../components/VehicleCard'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function needsAttention(vehicle) {
  const basicFieldsNeedAttention = ['insurance', 'parking'].some((key) => {
    const status = getStatus(vehicle[key]?.date)
    return status === 'warning' || status === 'critical'
  })
  const vignettesNeedAttention = (vehicle.vignettes ?? []).some((vignette) => {
    const status = getStatus(vignette.date)
    return status === 'warning' || status === 'critical'
  })
  return basicFieldsNeedAttention || vignettesNeedAttention
}

export default function Homepage({ userName }) {
  const navigate = useNavigate()
  const { vehicles } = useVehicles()
  const [sortDesc, setSortDesc] = useState(false)

  const attentionCount = useMemo(
    () => vehicles.filter(needsAttention).length,
    [vehicles],
  )

  const sortedVehicles = useMemo(() => {
    const list = [...vehicles].sort((a, b) => a.name.localeCompare(b.name, 'cs'))
    return sortDesc ? list.reverse() : list
  }, [vehicles, sortDesc])

  return (
    <AppShell>
      <div className="home-header">
        <div className="home-header-row">
          <div className="glass home-greeting" style={{ borderRadius: 18 }}>
            <p>Vítej, {userName}</p>
            <h1>Vaše garáž</h1>
          </div>
          <div className="home-header-icons">
            <button className="icon-circle" type="button" style={{ position: 'relative' }} aria-label="Oznámení">
              <IconBell size={17} stroke={1.8} />
              <span className="notif-dot" />
            </button>
          </div>
        </div>
      </div>

      {attentionCount > 0 && (
        <div className="alert-banner">
          <IconAlertTriangle size={17} stroke={1.8} />
          <p>{vehicleAttentionText(attentionCount)}</p>
        </div>
      )}

      <div className="list-toolbar">
        <p>{vehicleCountText(vehicles.length)}</p>
        <button
          className={`sort-btn ${sortDesc ? 'desc' : ''}`}
          type="button"
          onClick={() => setSortDesc((v) => !v)}
        >
          Seřadit <IconChevronDown size={13} stroke={2} />
        </button>
      </div>

      <div className="vehicle-list">
        {sortedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}

        <button className="add-vehicle-btn" type="button" onClick={() => navigate('/pridat-vozidlo')}>
          <IconPlus size={17} stroke={2} /> Přidat vozidlo
        </button>
      </div>

      <BottomNav />
    </AppShell>
  )
}
