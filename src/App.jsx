import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { VehiclesProvider } from './state/VehiclesContext'
import SplashScreen from './components/SplashScreen'
import WelcomeName from './pages/WelcomeName'
import Homepage from './pages/Homepage'
import AddVehicleChoice from './pages/AddVehicleChoice'
import AddVehicleByPlate from './pages/AddVehicleByPlate'
import AddVehicleManual from './pages/AddVehicleManual'
import ParkingForm from './pages/ParkingForm'
import VignetteForm from './pages/VignetteForm'
import InsuranceForm from './pages/InsuranceForm'
import InsuranceHub from './pages/InsuranceHub'
import EditVehicle from './pages/EditVehicle'
import Profile from './pages/Profile'

const USER_NAME_KEY = 'klik-garaz-user-name'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [userName, setUserName] = useState(() => localStorage.getItem(USER_NAME_KEY) ?? '')

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  function handleNameSubmit(name) {
    localStorage.setItem(USER_NAME_KEY, name)
    setUserName(name)
  }

  if (showSplash) return <SplashScreen />
  if (!userName) return <WelcomeName onSubmit={handleNameSubmit} />

  return (
    <VehiclesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage userName={userName} />} />
          <Route path="/pojisteni" element={<InsuranceHub />} />
          <Route path="/pridat-vozidlo" element={<AddVehicleChoice />} />
          <Route path="/pridat-vozidlo/spz" element={<AddVehicleByPlate />} />
          <Route path="/pridat-vozidlo/rucne" element={<AddVehicleManual />} />
          <Route path="/vozidlo/:id/parkovani" element={<ParkingForm />} />
          <Route path="/vozidlo/:id/znamka" element={<VignetteForm />} />
          <Route path="/vozidlo/:id/pojisteni" element={<InsuranceForm />} />
          <Route path="/vozidlo/:id/upravit" element={<EditVehicle />} />
          <Route path="/profil" element={<Profile userName={userName} onSave={handleNameSubmit} />} />
        </Routes>
      </HashRouter>
    </VehiclesProvider>
  )
}

export default App
