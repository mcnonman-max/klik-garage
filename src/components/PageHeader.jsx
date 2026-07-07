import { useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconX } from '@tabler/icons-react'

export default function PageHeader({ title, closeIcon = false, backTo = '/' }) {
  const navigate = useNavigate()

  return (
    <div className="page-header">
      <button
        className="icon-btn"
        type="button"
        onClick={() => navigate(backTo)}
        aria-label={closeIcon ? 'Zavřít' : 'Zpět'}
      >
        {closeIcon ? <IconX size={18} stroke={1.8} /> : <IconChevronLeft size={19} stroke={1.8} />}
      </button>
      <h1>{title}</h1>
    </div>
  )
}
