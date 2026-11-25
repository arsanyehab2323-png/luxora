import { useState } from 'react'
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import Button from '../common/Button'
import { PROPERTY_STATUSES, PROPERTY_TYPES } from '../../data/properties'
import './PropertyFilters.css'

const COUNT_OPTIONS = [
  { label: 'Any', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
]

function CountPicker({ label, name, value, onChange }) {
  return (
    <div className="filters-group">
      <span className="filters-label" id={`filter-${name}-label`}>
        {label}
      </span>
      <div
        className="filters-counts"
        role="group"
        aria-labelledby={`filter-${name}-label`}
      >
        {COUNT_OPTIONS.map((option) => (
          <button
            key={option.label}
            type="button"
            className={`filters-count${value === option.value ? ' is-active' : ''}`}
            onClick={() => onChange(name, option.value)}
            aria-pressed={value === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * PropertyFilters
 *
 * Props:
 *  - filters: { q, type, status, minPrice, maxPrice, bedrooms, bathrooms }
 *      (all values are strings, empty string means "no filter")
 *  - onChange(name, value): called when one filter changes
 *  - onReset(): called when the user clears all filters
 *  - activeCount: number of filters currently active
 *  - resultsCount: number of properties matching the filters
 *  - className: extra class names
 */
export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  activeCount = 0,
  resultsCount = 0,
  className = '',
}) {
  const [open, setOpen] = useState(false)

  const handleField = (event) => {
    onChange(event.target.name, event.target.value)
  }

  return (
    <aside className={['filters', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="filters-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="filters-panel"
      >
        <SlidersHorizontal size={18} aria-hidden="true" />
        <span>Filters</span>
        {activeCount > 0 && <span className="filters-badge">{activeCount}</span>}
        {open && <X size={18} className="filters-toggle-close" aria-hidden="true" />}
      </button>

      <div
        id="filters-panel"
        className={`filters-panel${open ? ' filters-panel-open' : ''}`}
      >
        <div className="filters-header">
          <h2 className="filters-title">Refine your search</h2>
          <button
            type="button"
            className="filters-reset"
            onClick={onReset}
            disabled={activeCount === 0}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="filters-group">
          <label htmlFor="filter-q" className="filters-label">
            Location or name
          </label>
          <div className="filters-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="filter-q"
              name="q"
              type="text"
              className="filters-input"
              placeholder="e.g. Dubai, Villa, Penthouse"
              value={filters.q}
              onChange={handleField}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="filters-group">
          <label htmlFor="filter-type" className="filters-label">
            Property type
          </label>
          <select
            id="filter-type"
            name="type"
            className="filters-select"
            value={filters.type}
            onChange={handleField}
          >
            <option value="">All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-group">
          <label htmlFor="filter-status" className="filters-label">
            Availability
          </label>
          <select
            id="filter-status"
            name="status"
            className="filters-select"
            value={filters.status}
            onChange={handleField}
          >
            <option value="">All listings</option>
            {PROPERTY_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-group">
          <span className="filters-label" id="filter-price-label">
            Price (USD)
          </span>
          <div
            className="filters-range"
            role="group"
            aria-labelledby="filter-price-label"
          >
            <input
              name="minPrice"
              type="number"
              min="0"
              inputMode="numeric"
              className="filters-input"
              placeholder="Min"
              aria-label="Minimum price"
              value={filters.minPrice}
              onChange={handleField}
            />
            <span className="filters-range-dash" aria-hidden="true">
              –
            </span>
            <input
              name="maxPrice"
              type="number"
              min="0"
              inputMode="numeric"
              className="filters-input"
              placeholder="Max"
              aria-label="Maximum price"
              value={filters.maxPrice}
              onChange={handleField}
            />
          </div>
          <p className="filters-hint">
            Sale prices and monthly rents are both included.
          </p>
        </div>

        <CountPicker
          label="Bedrooms"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={onChange}
        />

        <CountPicker
          label="Bathrooms"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={onChange}
        />

        <div className="filters-footer">
          <p className="filters-results" aria-live="polite">
            <strong>{resultsCount}</strong>{' '}
            {resultsCount === 1 ? 'property' : 'properties'} found
          </p>
          <Button
            variant="secondary"
            fullWidth
            className="filters-apply"
            onClick={() => setOpen(false)}
          >
            Show results
          </Button>
        </div>
      </div>
    </aside>
  )
}