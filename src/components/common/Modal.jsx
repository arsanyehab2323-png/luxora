import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import './Modal.css'

/**
 * Modal
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: function called when the modal should close
 *  - title: heading text
 *  - size: 'sm' | 'md' | 'lg'
 *  - footer: optional node rendered in a footer area (buttons, etc.)
 *  - children: modal body content
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  footer,
  children,
}) {
  const dialogRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock page scroll and move focus into the dialog
  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </header>

        <div className="modal-body">{children}</div>

        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>,
    document.body
  )
}