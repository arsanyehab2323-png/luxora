import { useState } from 'react'
import { PROPERTY_STATUSES, PROPERTY_TYPES } from '../../data/properties'
import './PropertyForm.css'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'

const URL_PATTERN = /^https?:\/\/\S+$/i

const toLines = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const getInitialValues = (property, agents) => {
  if (property) {
    return {
      title: property.title,
      location: property.location,
      address: property.address || '',
      type: property.type,
      status: property.status,
      price: String(property.price),
      bedrooms: String(property.bedrooms),
      bathrooms: String(property.bathrooms),
      area: String(property.area),
      yearBuilt: property.yearBuilt ? String(property.yearBuilt) : '',
      parking: String(property.parking ?? 0),
      agentId: property.agentId ? String(property.agentId) : '',
      featured: Boolean(property.featured),
      description: property.description,
      features: (property.features || []).join('\n'),
      amenities: (property.amenities || []).join('\n'),
      images: (property.images || []).join('\n'),
    }
  }

  return {
    title: '',
    location: '',
    address: '',
    type: PROPERTY_TYPES[0],
    status: 'For Sale',
    price: '',
    bedrooms: '3',
    bathrooms: '2',
    area: '',
    yearBuilt: String(new Date().getFullYear()),
    parking: '1',
    agentId: agents.length > 0 ? String(agents[0].id) : '',
    featured: false,
    description: '',
    features: '',
    amenities: '',
    images: DEFAULT_IMAGE,
  }
}

const isWholeNumber = (value) => /^\d+$/.test(String(value).trim())

const validate = (values) => {
  const errors = {}

  if (values.title.trim().length < 3) {
    errors.title = 'Please enter a title (at least 3 characters).'
  }

  if (!values.location.trim()) {
    errors.location = 'Please enter the location, e.g. "Dubai, UAE".'
  }

  if (!values.price.trim() || Number(values.price) <= 0) {
    errors.price = 'Please enter a price greater than 0.'
  }

  if (!isWholeNumber(values.bedrooms)) {
    errors.bedrooms = 'Enter a whole number (0 or more).'
  }

  if (!isWholeNumber(values.bathrooms)) {
    errors.bathrooms = 'Enter a whole number (0 or more).'
  }

  if (!values.area.trim() || Number(values.area) <= 0) {
    errors.area = 'Please enter the area in sq ft.'
  }

  if (values.yearBuilt.trim()) {
    const year = Number(values.yearBuilt)
    if (!Number.isInteger(year) || year < 1800 || year > 2100) {
      errors.yearBuilt = 'Enter a valid year, e.g. 2022.'
    }
  }

  if (!isWholeNumber(values.parking)) {
    errors.parking = 'Enter a whole number (0 or more).'
  }

  if (values.description.trim().length < 20) {
    errors.description = 'Please write a description (at least 20 characters).'
  }

  const imageLines = toLines(values.images)
  if (imageLines.length === 0) {
    errors.images = 'Add at least one image link.'
  } else if (imageLines.some((line) => !URL_PATTERN.test(line))) {
    errors.images = 'Each line must be a full link starting with http:// or https://'
  }

  return errors
}

/**
 * PropertyForm
 *
 * Props:
 *  - property: existing property to edit (omit to add a new one)
 *  - agents: array of agents for the agent dropdown
 *  - onSubmit(data): called with clean property data when the form is valid
 *  - formId: id of the <form>, so an outside button can submit it
 *            using the `form` attribute (default 'property-form')
 */
export default function PropertyForm({
  property,
  agents = [],
  onSubmit,
  formId = 'property-form',
}) {
  const [values, setValues] = useState(() => getInitialValues(property, agents))
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const isRental = values.status === 'For Rent' || values.status === 'Rented'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const next = { ...values, [name]: type === 'checkbox' ? checked : value }

    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const foundErrors = validate(values)
    setErrors(foundErrors)

    const allTouched = {}
    Object.keys(values).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    const firstInvalid = Object.keys(foundErrors)[0]
    if (firstInvalid) {
      document.getElementById(`pf-${firstInvalid}`)?.focus()
      return
    }

    onSubmit({
      title: values.title.trim(),
      location: values.location.trim(),
      address: values.address.trim() || values.location.trim(),
      type: values.type,
      status: values.status,
      price: Number(values.price),
      priceUnit: isRental ? 'month' : undefined,
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      area: Number(values.area),
      yearBuilt: values.yearBuilt.trim() ? Number(values.yearBuilt) : undefined,
      parking: Number(values.parking),
      agentId: values.agentId ? Number(values.agentId) : null,
      featured: values.featured,
      description: values.description.trim(),
      features: toLines(values.features),
      amenities: toLines(values.amenities),
      images: toLines(values.images),
    })
  }

  const showError = (field) => touched[field] && errors[field]

  const fieldProps = (field) => ({
    id: `pf-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': showError(field) ? `pf-${field}-error` : undefined,
  })

  const inputClass = (field, base = 'form-input') =>
    `${base}${showError(field) ? ' has-error' : ''}`

  const renderError = (field) =>
    showError(field) && (
      <p id={`pf-${field}-error`} className="form-error">
        {errors[field]}
      </p>
    )

  return (
    <form id={formId} className="pform" onSubmit={handleSubmit} noValidate>
      {/* Basic information */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Basic information</legend>

        <div className="form-group">
          <label htmlFor="pf-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={inputClass('title')}
            placeholder="e.g. Azure Skyline Penthouse"
            {...fieldProps('title')}
          />
          {renderError('title')}
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="pf-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className={inputClass('location')}
              placeholder="e.g. Downtown Dubai, UAE"
              {...fieldProps('location')}
            />
            {renderError('location')}
          </div>

          <div className="form-group">
            <label htmlFor="pf-address" className="form-label">
              Full address <span className="pform-optional">(optional)</span>
            </label>
            <input
              type="text"
              className={inputClass('address')}
              placeholder="Street and area"
              {...fieldProps('address')}
            />
          </div>
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="pf-type" className="form-label">
              Property type
            </label>
            <select className={inputClass('type', 'form-select')} {...fieldProps('type')}>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pf-status" className="form-label">
              Status
            </label>
            <select className={inputClass('status', 'form-select')} {...fieldProps('status')}>
              {PROPERTY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="pf-price" className="form-label">
              {isRental ? 'Monthly rent (USD)' : 'Price (USD)'}
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('price')}
              {...fieldProps('price')}
            />
            {renderError('price')}
          </div>

          <div className="form-group">
            <label htmlFor="pf-agentId" className="form-label">
              Listing agent
            </label>
            <select className={inputClass('agentId', 'form-select')} {...fieldProps('agentId')}>
              <option value="">Unassigned</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="pform-check" htmlFor="pf-featured">
          <input
            id="pf-featured"
            name="featured"
            type="checkbox"
            checked={values.featured}
            onChange={handleChange}
          />
          <span>Show as a featured property on the homepage</span>
        </label>
      </fieldset>

      {/* Details */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Details</legend>

        <div className="pform-row pform-row-3">
          <div className="form-group">
            <label htmlFor="pf-bedrooms" className="form-label">
              Bedrooms
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('bedrooms')}
              {...fieldProps('bedrooms')}
            />
            {renderError('bedrooms')}
          </div>

          <div className="form-group">
            <label htmlFor="pf-bathrooms" className="form-label">
              Bathrooms
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('bathrooms')}
              {...fieldProps('bathrooms')}
            />
            {renderError('bathrooms')}
          </div>

          <div className="form-group">
            <label htmlFor="pf-area" className="form-label">
              Area (sq ft)
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('area')}
              {...fieldProps('area')}
            />
            {renderError('area')}
          </div>
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="pf-yearBuilt" className="form-label">
              Year built <span className="pform-optional">(optional)</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              className={inputClass('yearBuilt')}
              {...fieldProps('yearBuilt')}
            />
            {renderError('yearBuilt')}
          </div>

          <div className="form-group">
            <label htmlFor="pf-parking" className="form-label">
              Parking spaces
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('parking')}
              {...fieldProps('parking')}
            />
            {renderError('parking')}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pf-description" className="form-label">
            Description
          </label>
          <textarea
            rows={5}
            className={inputClass('description', 'form-textarea')}
            placeholder="Describe the property, its setting, and what makes it special."
            {...fieldProps('description')}
          />
          {renderError('description')}
        </div>
      </fieldset>

      {/* Lists and images */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Features and photos</legend>

        <div className="form-group">
          <label htmlFor="pf-features" className="form-label">
            Property features <span className="pform-optional">(one per line)</span>
          </label>
          <textarea
            rows={4}
            className={inputClass('features', 'form-textarea')}
            placeholder={'Private elevator lobby\nRooftop terrace'}
            {...fieldProps('features')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-amenities" className="form-label">
            Amenities <span className="pform-optional">(one per line)</span>
          </label>
          <textarea
            rows={3}
            className={inputClass('amenities', 'form-textarea')}
            placeholder={'Concierge\nInfinity Pool'}
            {...fieldProps('amenities')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-images" className="form-label">
            Image links <span className="pform-optional">(one per line, the first is the cover)</span>
          </label>
          <textarea
            rows={4}
            className={inputClass('images', 'form-textarea')}
            placeholder="https://..."
            {...fieldProps('images')}
          />
          {renderError('images')}
        </div>
      </fieldset>
    </form>
  )
}