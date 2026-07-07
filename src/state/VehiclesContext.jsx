import { createContext, useContext, useEffect, useState } from 'react'
import { initialVehicles } from '../data/vehicles'

const STORAGE_KEY = 'klik-garaz-vehicles'
const VehiclesContext = createContext(null)

// Older saved data stored a single `vignette` object (and no `stk` field at
// all); normalize both into the current shape.
function normalizeVehicle(vehicle) {
  let normalized = vehicle

  if (!Array.isArray(normalized.vignettes)) {
    const { vignette, ...rest } = normalized
    normalized = {
      ...rest,
      vignettes: vignette?.date
        ? [{ id: crypto.randomUUID(), date: vignette.date, country: vignette.country ?? 'Česko' }]
        : [],
    }
  }

  if (!normalized.stk) {
    normalized = { ...normalized, stk: { date: null } }
  }

  if (normalized.tires === undefined) {
    normalized = { ...normalized, tires: null }
  }

  if (normalized.tireSwapConfirmedFor === undefined) {
    normalized = { ...normalized, tireSwapConfirmedFor: null }
  }

  return normalized
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw).map(normalizeVehicle)
  } catch {
    // ignore corrupt storage, fall back to defaults
  }
  return initialVehicles
}

export function VehiclesProvider({ children }) {
  const [vehicles, setVehicles] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles))
  }, [vehicles])

  function updateParking(id, date) {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, parking: { date } } : v)),
    )
  }

  function updateVignette(id, vignettes) {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, vignettes } : v)))
  }

  function updateInsurance(id, date, company) {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, insurance: { date, company } } : v)),
    )
  }

  function addVehicle({ brand, name, plate }) {
    const vehicle = {
      id: crypto.randomUUID(),
      name,
      brand,
      plate,
      insurance: { date: null },
      parking: { date: null },
      vignettes: [],
      stk: { date: null },
      tires: null,
      tireSwapConfirmedFor: null,
    }
    setVehicles((prev) => [...prev, vehicle])
  }

  function updateVehicleDetails(id, { brand, name, plate, stk, tires }) {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, brand, name, plate, stk, tires } : v)),
    )
  }

  function removeVehicle(id) {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  function confirmTireSwap(id, anchorKey) {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, tireSwapConfirmedFor: anchorKey } : v)),
    )
  }

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        updateParking,
        updateVignette,
        updateInsurance,
        addVehicle,
        updateVehicleDetails,
        removeVehicle,
        confirmTireSwap,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  )
}

export function useVehicles() {
  const ctx = useContext(VehiclesContext)
  if (!ctx) throw new Error('useVehicles must be used within VehiclesProvider')
  return ctx
}
