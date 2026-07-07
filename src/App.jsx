import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { VehiclesProvider } from './state/VehiclesContext'
import SplashScreen from './components/SplashScreen'
import Homepage from './pages/Homepage'
import AddVehicleChoice from './pages/AddVehicleChoice'
import AddVehicleByPlate from './pages/AddVehicleByPlate'
import AddVehicleManual from './pages/AddVehicleManual'
import ParkingForm from './pages/ParkingForm'
import VignetteForm from './pages/VignetteForm'
import InsuranceForm from './pages/InsuranceForm'
import InsuranceHub from './pages/InsuranceHub'
import EditVehicle from './pages/EditVehicle'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashScreen />

  return (
    <VehiclesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pojisteni" element={<InsuranceHub />} />
          <Route path="/pridat-vozidlo" element={<AddVehicleChoice />} />
          <Route path="/pridat-vozidlo/spz" element={<AddVehicleByPlate />} />
          <Route path="/pridat-vozidlo/rucne" element={<AddVehicleManual />} />
          <Route path="/vozidlo/:id/parkovani" element={<ParkingForm />} />
          <Route path="/vozidlo/:id/znamka" element={<VignetteForm />} />
          <Route path="/vozidlo/:id/pojisteni" element={<InsuranceForm />} />
          <Route path="/vozidlo/:id/upravit" element={<EditVehicle />} />
        </Routes>
      </HashRouter>
    </VehiclesProvider>
  )
}

export default App
