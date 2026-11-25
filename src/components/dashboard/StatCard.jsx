import './StatCard.css'

/**
 * StatCard
 *
 * Props:
 *  - icon: a Lucide icon component
 *  - label: short title, e.g. "Total properties"
 *  - value: the number (or text) to show
 *  - hint: small line under the label (optional)
 *  - tone: 'gold' | 'navy' | 'green' | 'blue'
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = 'gold',
}) {
  return (
    <article className="stat-card">
      <div className={`stat-card-icon stat-card-icon-${tone}`}>
        {Icon && <Icon size={24} aria-hidden="true" />}
      </div>

      <div className="stat-card-body">
        <p className="stat-card-value">{value}</p>
        <p className="stat-card-label">{label}</p>
        {hint && <p className="stat-card-hint">{hint}</p>}
      </div>
    </article>
  )
}