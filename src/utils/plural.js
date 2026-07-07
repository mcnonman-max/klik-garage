// Czech plural rules for "vozidlo" (vehicle).
export function vehicleCountText(n) {
  if (n === 1) return `${n} vozidlo`
  if (n >= 2 && n <= 4) return `${n} vozidla`
  return `${n} vozidel`
}

export function vehicleAttentionText(n) {
  if (n === 1) return `${n} vozidlo vyžaduje pozornost`
  if (n >= 2 && n <= 4) return `${n} vozidla vyžadují pozornost`
  return `${n} vozidel vyžaduje pozornost`
}

// Czech plural rules for "známka" (vignette).
export function vignetteCountText(n) {
  if (n === 1) return `${n} známka`
  if (n >= 2 && n <= 4) return `${n} známky`
  return `${n} známek`
}
