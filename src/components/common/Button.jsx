import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import './Button.css'

/**
 * Button
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - to: internal route (renders a router <Link>)
 *  - href: external URL (renders an <a>)
 *  - icon: a Lucide icon component (optional)
 *  - iconPosition: 'left' | 'right'
 *  - fullWidth: boolean
 *  - loading: boolean
 *  - disabled: boolean
 *  - type: 'button' | 'submit' | 'reset'
 *  - className: extra class names
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {loading ? (
        <Loader2 className="btn-spinner" size={18} aria-hidden="true" />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />
      )}
      {children && <span className="btn-label">{children}</span>}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={18} aria-hidden="true" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  )
}