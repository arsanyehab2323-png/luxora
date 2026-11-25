import { SearchX } from 'lucide-react'
import Button from './Button'
import './EmptyState.css'

/**
 * EmptyState
 *
 * Props:
 *  - icon: a Lucide icon component (default: SearchX)
 *  - title: heading text
 *  - message: supporting text (optional)
 *  - actionLabel: text for the action button (optional)
 *  - actionTo: internal route for the button (optional)
 *  - onAction: click handler for the button (optional)
 *  - className: extra class names
 */
export default function EmptyState({
  icon: Icon = SearchX,
  title = 'Nothing to show yet',
  message = '',
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) {
  const classes = ['empty-state', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="empty-state-icon" aria-hidden="true">
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {actionLabel && (actionTo || onAction) && (
        <Button to={actionTo} onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}