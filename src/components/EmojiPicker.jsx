import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const EMOJIS = [
  '🚗', '🚙', '🏎️', '🚕', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚',
  '🏍️', '🛵', '⭐', '❤️', '🔥', '✨', '🐶', '🐱', '☀️', '❄️',
]

export default function EmojiPicker({ onSelect }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(null)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleOutsideClick(e) {
      if (
        panelRef.current?.contains(e.target) ||
        toggleRef.current?.contains(e.target)
      ) {
        return
      }
      setOpen(false)
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [open])

  function handleToggle() {
    if (!open && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    }
    setOpen((v) => !v)
  }

  return (
    <div className="emoji-picker">
      <button
        type="button"
        ref={toggleRef}
        className="emoji-picker-toggle"
        onClick={handleToggle}
        aria-label="Vybrat emoji"
      >
        😀
      </button>
      {open &&
        position &&
        createPortal(
          <div
            className="emoji-picker-panel"
            ref={panelRef}
            style={{ position: 'fixed', top: position.top, right: position.right }}
          >
            {EMOJIS.map((emoji) => (
              <button
                type="button"
                key={emoji}
                className="emoji-picker-option"
                onClick={() => {
                  onSelect(emoji)
                  setOpen(false)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}
