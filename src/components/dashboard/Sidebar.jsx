import { Link } from 'react-router-dom'
import { ArrowLeft, Building2, LayoutDashboard, Users } from 'lucide-react'
import './Sidebar.css'

const ICONS = {
  overview: LayoutDashboard,
  properties: Building2,
  agents: Users,
}

/**
 * Sidebar
 *
 * Props:
 *  - items: array of { id, label, count? }
 *  - active: id of the active section
 *  - onSelect(id): called when a section is chosen
 */
export default function Sidebar({ items, active, onSelect }) {
  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-brand">
        <span className="dash-sidebar-mark">L</span>
        <div>
          <p className="dash-sidebar-name">Admin</p>
          <p className="dash-sidebar-sub">Demo dashboard</p>
        </div>
      </div>

      <nav className="dash-sidebar-nav" aria-label="Dashboard sections">
        {items.map((item) => {
          const Icon = ICONS[item.id] || LayoutDashboard
          const isActive = item.id === active

          return (
            <button
              key={item.id}
              type="button"
              className={`dash-sidebar-link${isActive ? ' is-active' : ''}`}
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="dash-sidebar-label">{item.label}</span>
              {typeof item.count === 'number' && (
                <span className="dash-sidebar-count">{item.count}</span>
              )}
            </button>
          )
        })}
      </nav>

      <Link to="/" className="dash-sidebar-back">
        <ArrowLeft size={18} aria-hidden="true" />
        <span>Back to website</span>
      </Link>
    </aside>
  )
}