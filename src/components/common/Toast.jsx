import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import './Toast.css'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

/**
 * Toast
 *
 * Props:
 *  - message: text to display
 *  - type: 'success' | 'error' | 'info'
 *  - duration: milliseconds before auto-close (default 3500, 0 disables)
 *  - onClose: function called when the toast should close
 */
export default function Toast({
  message,
  type = 'success',
  duration = 3500,
  onClose,
}) {
  const Icon = ICONS[type] || Info

  useEffect(() => {
    if (!duration) return undefined

    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`toast toast-${type}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <Icon className="toast-icon" size={20} aria-hidden="true" />
      <p className="toast-message">{message}</p>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}