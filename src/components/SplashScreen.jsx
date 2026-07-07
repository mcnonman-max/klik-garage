import AppShell from './AppShell'
import logo from '../assets/klikgarage_logo.png'

export default function SplashScreen() {
  return (
    <AppShell>
      <div className="splash-content">
        <img src={logo} alt="Klik Garáž" className="splash-logo" />
      </div>
    </AppShell>
  )
}
