import { getStatus, statusText } from '../utils/dateStatus'

export default function StatusChip({ label, icon, date, status: statusOverride, text: textOverride, onClick }) {
  const status = statusOverride ?? getStatus(date)
  const text = textOverride ?? statusText(date)
  const Icon = icon[status] ?? icon.ok

  return (
    <button className={`status-chip status-${status}`} onClick={onClick} type="button">
      <Icon size={17} stroke={1.8} />
      <span className="chip-label">{label}</span>
      <span className="chip-status">{text}</span>
    </button>
  )
}
