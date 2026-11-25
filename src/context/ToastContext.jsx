/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import Toast from '../components/common/Toast'

export const ToastContext = createContext(null)

const MAX_TOASTS = 4

const containerStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  zIndex: 'var(--z-toast)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.75rem',
  width: 'calc(100% - 2rem)',
  maxWidth: '400px',
  pointerEvents: 'none',
}

const itemStyle = {
  width: '100%',
  pointerEvents: 'auto',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    idRef.current += 1
    const id = idRef.current

    setToasts((prev) => [...prev, { id, message, type, duration }].slice(-MAX_TOASTS))
    return id
  }, [])

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={containerStyle} aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} style={itemStyle}>
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}