import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

/**
 * useToast
 * Show notifications from any component.
 *
 * Returns:
 *  - showToast(message, type = 'success', duration = 3500)
 *      type: 'success' | 'error' | 'info'
 *  - removeToast(id)
 *
 * Example:
 *  const { showToast } = useToast()
 *  showToast('Added to favorites')
 *  showToast('Something went wrong', 'error')
 */
export default function useToast() {
  const context = useContext(ToastContext)

  if (context === null) {
    throw new Error('useToast must be used inside a <ToastProvider>.')
  }

  return context
}