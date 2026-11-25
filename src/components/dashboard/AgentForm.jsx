import { useState } from 'react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/
const URL_PATTERN = /^https?:\/\/\S+$/i

const isWholeNumber = (value) => /^\d+$/.test(String(value).trim())

const getInitialValues = (agent) => {
  if (agent) {
    return {
      name: agent.name,
      role: agent.role,
      specialization: agent.specialization,
      location: agent.location,
      experience: String(agent.experience ?? 0),
      propertiesSold: String(agent.propertiesSold ?? 0),
      email: agent.email,
      phone: agent.phone,
      languages: (agent.languages || []).join(', '),
      image: agent.image || '',
      bio: agent.bio || '',
    }
  }

  return {
    name: '',
    role: '',
    specialization: '',
    location: '',
    experience: '0',
    propertiesSold: '0',
    email: '',
    phone: '',
    languages: 'English',
    image: '',
    bio: '',
  }
}

const validate = (values) => {
  const errors = {}

  if (values.name.trim().length < 3) {
    errors.name = 'Please enter the full name (at least 3 characters).'
  }

  if (!values.role.trim()) {
    errors.role = 'Please enter a job title, e.g. "Senior Partner".'
  }

  if (!values.specialization.trim()) {
    errors.specialization = 'Please enter a specialization.'
  }

  if (!values.location.trim()) {
    errors.location = 'Please enter a location, e.g. "Dubai, UAE".'
  }

  if (!isWholeNumber(values.experience)) {
    errors.experience = 'Enter a whole number (0 or more).'
  }

  if (!isWholeNumber(values.propertiesSold)) {
    errors.propertiesSold = 'Enter a whole number (0 or more).'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter an email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.'
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (values.image.trim() && !URL_PATTERN.test(values.image.trim())) {
    errors.image = 'The link must start with http:// or https://'
  }

  return errors
}

/**
 * AgentForm
 *
 * Props:
 *  - agent: existing agent to edit (omit to add a new one)
 *  - onSubmit(data): called with clean agent data when the form is valid
 *  - formId: id of the <form>, so an outside button can submit it
 *            using the `form` attribute (default 'agent-form')
 */
export default function AgentForm({
  agent,
  onSubmit,
  formId = 'agent-form',
}) {
  const [values, setValues] = useState(() => getInitialValues(agent))
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }

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
      document.getElementById(`af-${firstInvalid}`)?.focus()
      return
    }

    const languages = values.languages
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean)

    onSubmit({
      name: values.name.trim(),
      role: values.role.trim(),
      specialization: values.specialization.trim(),
      location: values.location.trim(),
      experience: Number(values.experience),
      propertiesSold: Number(values.propertiesSold),
      email: values.email.trim(),
      phone: values.phone.trim(),
      languages: languages.length > 0 ? languages : ['English'],
      image: values.image.trim(),
      bio: values.bio.trim(),
    })
  }

  const showError = (field) => touched[field] && errors[field]

  const fieldProps = (field) => ({
    id: `af-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': showError(field) ? `af-${field}-error` : undefined,
  })

  const inputClass = (field, base = 'form-input') =>
    `${base}${showError(field) ? ' has-error' : ''}`

  const renderError = (field) =>
    showError(field) && (
      <p id={`af-${field}-error`} className="form-error">
        {errors[field]}
      </p>
    )

  return (
    <form id={formId} className="pform" onSubmit={handleSubmit} noValidate>
      {/* Profile */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Profile</legend>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="af-name" className="form-label">
              Full name
            </label>
            <input
              type="text"
              autoComplete="off"
              className={inputClass('name')}
              placeholder="e.g. Alexander Hartwell"
              {...fieldProps('name')}
            />
            {renderError('name')}
          </div>

          <div className="form-group">
            <label htmlFor="af-role" className="form-label">
              Job title
            </label>
            <input
              type="text"
              className={inputClass('role')}
              placeholder="e.g. Senior Partner"
              {...fieldProps('role')}
            />
            {renderError('role')}
          </div>
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="af-specialization" className="form-label">
              Specialization
            </label>
            <input
              type="text"
              className={inputClass('specialization')}
              placeholder="e.g. Luxury Villas & Waterfront Estates"
              {...fieldProps('specialization')}
            />
            {renderError('specialization')}
          </div>

          <div className="form-group">
            <label htmlFor="af-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className={inputClass('location')}
              placeholder="e.g. Dubai, UAE"
              {...fieldProps('location')}
            />
            {renderError('location')}
          </div>
        </div>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="af-experience" className="form-label">
              Years of experience
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('experience')}
              {...fieldProps('experience')}
            />
            {renderError('experience')}
          </div>

          <div className="form-group">
            <label htmlFor="af-propertiesSold" className="form-label">
              Properties sold
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass('propertiesSold')}
              {...fieldProps('propertiesSold')}
            />
            {renderError('propertiesSold')}
          </div>
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Contact details</legend>

        <div className="pform-row">
          <div className="form-group">
            <label htmlFor="af-email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={inputClass('email')}
              placeholder="name@example.com"
              {...fieldProps('email')}
            />
            {renderError('email')}
          </div>

          <div className="form-group">
            <label htmlFor="af-phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className={inputClass('phone')}
              placeholder="+1 555 010 2030"
              {...fieldProps('phone')}
            />
            {renderError('phone')}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="af-languages" className="form-label">
            Languages <span className="pform-optional">(separated by commas)</span>
          </label>
          <input
            type="text"
            className={inputClass('languages')}
            placeholder="English, Arabic"
            {...fieldProps('languages')}
          />
        </div>
      </fieldset>

      {/* About */}
      <fieldset className="pform-section">
        <legend className="pform-legend">Photo and biography</legend>

        <div className="form-group">
          <label htmlFor="af-image" className="form-label">
            Photo link <span className="pform-optional">(optional)</span>
          </label>
          <input
            type="url"
            className={inputClass('image')}
            placeholder="https://..."
            {...fieldProps('image')}
          />
          {renderError('image')}
        </div>

        <div className="form-group">
          <label htmlFor="af-bio" className="form-label">
            Biography <span className="pform-optional">(optional)</span>
          </label>
          <textarea
            rows={5}
            className={inputClass('bio', 'form-textarea')}
            placeholder="A short introduction shown on the agent's profile page."
            {...fieldProps('bio')}
          />
        </div>
      </fieldset>
    </form>
  )
}