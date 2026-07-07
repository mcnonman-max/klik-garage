import { useRef } from 'react'
import { IconCalendar } from '@tabler/icons-react'

export default function DateField({ label, value, onChange }) {
  const inputRef = useRef(null)

  function openPicker() {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker()
    } else {
      inputRef.current?.focus()
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      <div className="field-input-wrap" onClick={openPicker}>
        <input
          ref={inputRef}
          type="date"
          className="field-input has-icon"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="field-icon">
          <IconCalendar size={18} stroke={1.8} />
        </span>
      </div>
    </div>
  )
}
