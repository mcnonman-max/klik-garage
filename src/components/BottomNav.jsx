import { useLocation, useNavigate } from 'react-router-dom'
import { IconCar, IconShield, IconUser } from '@tabler/icons-react'

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isGarage = pathname === '/'
  const isInsurance = pathname.startsWith('/pojisteni')
  const isProfile = pathname.startsWith('/profil')

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${isGarage ? 'active' : ''}`} type="button" onClick={() => navigate('/')}>
        <span className="nav-icon-pill">
          <IconCar size={19} stroke={1.8} />
        </span>
        <span>Garáž</span>
      </button>
      <button
        className={`nav-item ${isInsurance ? 'active' : ''}`}
        type="button"
        onClick={() => navigate('/pojisteni')}
      >
        <span className="nav-icon-pill">
          <IconShield size={19} stroke={1.8} />
        </span>
        <span>Pojištění</span>
      </button>
      <button
        className={`nav-item ${isProfile ? 'active' : ''}`}
        type="button"
        onClick={() => navigate('/profil')}
      >
        <span className="nav-icon-pill">
          <IconUser size={19} stroke={1.8} />
        </span>
        <span>Profil</span>
      </button>
    </nav>
  )
}
