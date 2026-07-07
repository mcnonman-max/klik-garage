import { IconCar, IconChevronRight, IconHeartbeat, IconHome, IconPlane } from '@tabler/icons-react'
import AppShell from '../components/AppShell'
import BottomNav from '../components/BottomNav'

const INSURANCE_TYPES = [
  { label: 'Pojištění auta', icon: IconCar, url: 'https://www.klik.cz/povinne-ruceni/' },
  { label: 'Pojištění majetku', icon: IconHome, url: 'https://www.klik.cz/pojisteni-majetku/' },
  { label: 'Cestovní pojištění', icon: IconPlane, url: 'https://www.klik.cz/cestovni-pojisteni/' },
  { label: 'Životní pojištění', icon: IconHeartbeat, url: 'https://www.klik.cz/zivotni-pojisteni/' },
]

export default function InsuranceHub() {
  return (
    <AppShell>
      <div className="page-header">
        <h1>Pojištění</h1>
      </div>

      <div className="menu-list">
        {INSURANCE_TYPES.map(({ label, icon: Icon, url }) => (
          <a className="glass menu-row" href={url} target="_blank" rel="noopener noreferrer" key={label}>
            <span className="vehicle-icon-sq">
              <Icon size={20} stroke={1.8} />
            </span>
            <span className="item-label">{label}</span>
            <IconChevronRight size={18} stroke={1.8} className="chevron" />
          </a>
        ))}
      </div>

      <BottomNav />
    </AppShell>
  )
}
