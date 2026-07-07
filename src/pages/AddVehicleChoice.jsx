import { useNavigate } from 'react-router-dom'
import { IconChevronRight, IconPencil, IconSearch } from '@tabler/icons-react'
import AppShell from '../components/AppShell'
import PageHeader from '../components/PageHeader'

export default function AddVehicleChoice() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <PageHeader title="Přidat vozidlo" closeIcon />

      <div className="menu-list">
        <button className="glass menu-row" type="button" onClick={() => navigate('/pridat-vozidlo/spz')}>
          <span className="vehicle-icon-sq">
            <IconSearch size={20} stroke={1.8} />
          </span>
          <span className="item-label">Najít podle SPZ</span>
          <IconChevronRight size={18} stroke={1.8} className="chevron" />
        </button>
        <button className="glass menu-row" type="button" onClick={() => navigate('/pridat-vozidlo/rucne')}>
          <span className="vehicle-icon-sq">
            <IconPencil size={20} stroke={1.8} />
          </span>
          <span className="item-label">Zadat ručně</span>
          <IconChevronRight size={18} stroke={1.8} className="chevron" />
        </button>
      </div>
    </AppShell>
  )
}
