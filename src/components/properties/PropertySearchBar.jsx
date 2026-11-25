import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react'
import Button from '../common/Button'
import { PROPERTY_TYPES } from '../../data/properties'
import './PropertySearchBar.css'

const SALE_RANGES = [
  { label: 'Under $2,500,000', min: 0, max: 2500000 },
  { label: '$2.5M – $5M', min: 2500000, max: 5000000 },
  { label: '$5M – $10M', min: 5000000, max: 10000000 },
  { label: 'Over $10,000,000', min: 10000000, max: '' },
]

const RENT_RANGES = [
  { label: 'Under $20,000 / month', min: 0, max: 20000 },
  { label: '$20K – $40K / month', min: 20000, max: 40000 },
  { label: 'Over $40,000 / month', min: 40000, max: '' },
]

const ALL_RANGES = [{ label: 'Any price', min: '', max: '' }]

const getRanges = (status) => {
  if (status === 'For Sale') return SALE_RANGES
  if (status === 'For Rent') return RENT_RANGES
  return ALL_RANGES
}

/**
 * PropertySearchBar
 * Collects search choices and opens /properties with them in the URL.
 *
 * Props:
 *  - className: extra class names
 */
export default function PropertySearchBar({ className = '' }) {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [rangeIndex, setRangeIndex] = useState('')

  const ranges = getRanges(status)
  const priceDisabled = status === ''

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
    setRangeIndex('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const params = new URLSearchParams()
    const trimmedLocation = location.trim()

    if (trimmedLocation) params.set('q', trimmedLocation)
    if (type) params.set('type', type)
    if (status) params.set('status', status)

    if (rangeIndex !== '' && ranges[Number(rangeIndex)]) {
      const { min, max } = ranges[Number(rangeIndex)]
      if (min !== '' && min > 0) params.set('minPrice', String(min))
      if (max !== '') params.set('maxPrice', String(max))
    }

    const query = params.toString()
    navigate(query ? `/properties?${query}` : '/properties')
  }

  return (
    <form
      className={['search-bar', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search properties"
    >
      <div className="search-bar-field search-bar-field-location">
        <label htmlFor="search-location" className="search-bar-label">
          Location
        </label>
        <div className="search-bar-input-wrap">
          <MapPin size={18} aria-hidden="true" />
          <input
            id="search-location"
            type="text"
            className="search-bar-input"
            placeholder="City, country or property name"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="search-bar-field">
        <label htmlFor="search-type" className="search-bar-label">
          Property type
        </label>
        <select
          id="search-type"
          className="search-bar-select"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="">All types</option>
          {PROPERTY_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar-field">
        <label htmlFor="search-status" className="search-bar-label">
          Buy or rent
        </label>
        <select
          id="search-status"
          className="search-bar-select"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">Buy or rent</option>
          <option value="For Sale">Buy</option>
          <option value="For Rent">Rent</option>
        </select>
      </div>

      <div className="search-bar-field">
        <label htmlFor="search-price" className="search-bar-label">
          Price range
        </label>
        <select
          id="search-price"
          className="search-bar-select"
          value={rangeIndex}
          onChange={(event) => setRangeIndex(event.target.value)}
          disabled={priceDisabled}
        >
          <option value="">
            {priceDisabled ? 'Choose buy or rent first' : 'Any price'}
          </option>
          {!priceDisabled &&
            ranges.map((range, index) => (
              <option key={range.label} value={index}>
                {range.label}
              </option>
            ))}
        </select>
      </div>

      <Button
        type="submit"
        size="lg"
        icon={Search}
        className="search-bar-submit"
      >
        Search
      </Button>
    </form>
  )
}