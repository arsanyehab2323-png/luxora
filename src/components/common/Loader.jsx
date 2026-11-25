import './Loader.css'

/**
 * Loader
 *
 * Props:
 *  - size: 'sm' | 'md' | 'lg'
 *  - label: text shown under the spinner (optional)
 *  - fullPage: boolean, centers the loader in the whole viewport
 *  - className: extra class names
 */
export default function Loader({
  size = 'md',
  label = '',
  fullPage = false,
  className = '',
}) {
  const classes = [
    'loader',
    `loader-${size}`,
    fullPage ? 'loader-fullpage' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className="loader-ring" aria-hidden="true" />
      {label ? (
        <p className="loader-label">{label}</p>
      ) : (
        <span className="visually-hidden">Loading</span>
      )}
    </div>
  )
}