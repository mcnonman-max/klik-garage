import skoda from '../assets/logos/skoda.png'
import toyota from '../assets/logos/toyota.png'
import volkswagen from '../assets/logos/volkswagen.png'

const BRAND_LOGOS = {
  skoda,
  toyota,
  volkswagen,
}

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

export function getBrandLogo(vehicle) {
  if (!vehicle) return undefined
  if (vehicle.brand) {
    const key = normalize(vehicle.brand).replace(/\s+/g, '')
    if (BRAND_LOGOS[key]) return BRAND_LOGOS[key]
  }
  if (!vehicle.name) return undefined
  const firstWord = normalize(vehicle.name).split(' ')[0]
  return BRAND_LOGOS[firstWord]
}

export function guessBrandFromName(name, brandOptions) {
  if (!name) return ''
  const firstWord = normalize(name).split(' ')[0]
  return brandOptions.find((option) => normalize(option) === firstWord) ?? ''
}
