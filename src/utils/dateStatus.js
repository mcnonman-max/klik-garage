// Status logic: 'unset' | 'ok' | 'warning' | 'critical'
// warning kicks in when 30 days or fewer remain; critical once the date is in the past.
const WARNING_THRESHOLD_DAYS = 30

function parseISO(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = parseISO(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / 86400000)
}

export function getStatus(dateStr) {
  if (!dateStr) return 'unset'
  const days = daysUntil(dateStr)
  if (days < 0) return 'critical'
  if (days <= WARNING_THRESHOLD_DAYS) return 'warning'
  return 'ok'
}

export function formatDate(dateStr) {
  const d = parseISO(dateStr)
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear() % 100
  return `${day}. ${month}. ${String(year).padStart(2, '0')}`
}

function dayWord(n) {
  if (n === 1) return 'den'
  if (n >= 2 && n <= 4) return 'dny'
  return 'dní'
}

const STATUS_PRIORITY = { critical: 3, warning: 2, ok: 1, unset: 0 }

export function getWorstStatus(dateStrs) {
  let worst = 'unset'
  for (const dateStr of dateStrs) {
    const status = getStatus(dateStr)
    if (STATUS_PRIORITY[status] > STATUS_PRIORITY[worst]) worst = status
  }
  return worst
}

export function statusText(dateStr) {
  const status = getStatus(dateStr)
  if (status === 'unset') return 'Nenastaveno'
  if (status === 'critical') return 'propadlé'
  if (status === 'warning') {
    const days = daysUntil(dateStr)
    return `za ${days} ${dayWord(days)}`
  }
  return `do ${formatDate(dateStr)}`
}
