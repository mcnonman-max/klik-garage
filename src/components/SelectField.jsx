import { IconChevronDown } from '@tabler/icons-react'

export default function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="field-select-wrap">
        <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="field-icon">
          <IconChevronDown size={18} stroke={1.8} />
        </span>
      </div>
    </div>
  )
}
