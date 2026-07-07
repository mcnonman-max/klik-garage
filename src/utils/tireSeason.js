// Winter tires are recommended/required 1. 11. – 31. 3.; summer tires the rest
// of the year. Warn 30 days before each swap date so there's time to act.
const WARNING_DAYS = 30

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function diffDays(from, to) {
  return Math.round((startOfDay(to) - startOfDay(from)) / 86400000)
}

function isWinterSeason(date) {
  const month = date.getMonth() // 0 = leden
  return month >= 10 || month <= 2 // listopad, prosinec, leden, únor, březen
}

function anchorKeyFor(year, type) {
  return type === 'winter' ? `${year}-11-01` : `${year}-04-01`
}

function getNextAnchor(today) {
  const y = today.getFullYear()
  const candidates = [
    { date: new Date(y, 3, 1), type: 'summer', key: anchorKeyFor(y, 'summer') },
    { date: new Date(y, 10, 1), type: 'winter', key: anchorKeyFor(y, 'winter') },
    { date: new Date(y + 1, 3, 1), type: 'summer', key: anchorKeyFor(y + 1, 'summer') },
    { date: new Date(y + 1, 10, 1), type: 'winter', key: anchorKeyFor(y + 1, 'winter') },
  ].sort((a, b) => a.date - b.date)

  return candidates.find((c) => diffDays(today, c.date) >= 0)
}

// Returns { state: 'ok' | 'warning', tireType: 'summer' | 'winter', anchorKey }
export function getTireSeasonStatus(confirmedFor, today = new Date()) {
  const anchor = getNextAnchor(today)
  const daysUntil = diffDays(today, anchor.date)
  const isConfirmed = confirmedFor === anchor.key

  if (daysUntil <= WARNING_DAYS && !isConfirmed) {
    return { state: 'warning', tireType: anchor.type, anchorKey: anchor.key }
  }

  const tireType = isConfirmed ? anchor.type : isWinterSeason(today) ? 'winter' : 'summer'
  return { state: 'ok', tireType, anchorKey: anchor.key }
}
