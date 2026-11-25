import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Button from '../common/Button'
import useToast from '../../hooks/useToast'
import './ContactAgentForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/

const validate = (values) => {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

/**
 * ContactAgentForm
 *
 * Props:
 *  - agentName: name of the agent being contacted
 *  - propertyTitle: title of the property (used in the default message)
 */
export default function ContactAgentForm({ agentName = 'our agent', propertyTitle = '' }) {
  const { showToast } = useToast()

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: propertyTitle
      ? `Hello, I am interested in "${propertyTitle}" and would like to arrange a viewing. Please contact me with more details.`
      : '',
  }

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }

    setValues(next)
    if (touched[name]) {
      setErrors(validate(next))
    }
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
    setTouched({ name: true, email: true, phone: true, message: true })

    if (Object.keys(foundErrors).length > 0) {
      showToast('Please fix the highlighted fields.', 'error')
      return
    }

    setSubmitting(true)

    // Demo only: simulate sending the message
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      showToast('Your message has been sent (demo).')
    }, 900)
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="agent-form-success" role="status">
        <CheckCircle2 size={44} strokeWidth={1.5} aria-hidden="true" />
        <h3>Thank you, {values.name.trim().split(' ')[0]}</h3>
        <p>
          Your message for {agentName} was received. This is a portfolio demo,
          so no email was actually sent.
        </p>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Send another message
        </Button>
      </div>
    )
  }

  const showError = (field) => touched[field] && errors[field]

  return (
    <form className="agent-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="agent-form-name" className="form-label">
          Full name
        </label>
        <input
          id="agent-form-name"
          name="name"
          type="text"
          className={`form-input${showError('name') ? ' has-error' : ''}`}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
          aria-invalid={Boolean(showError('name'))}
          aria-describedby={showError('name') ? 'agent-form-name-error' : undefined}
        />
        {showError('name') && (
          <p id="agent-form-name-error" className="form-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="agent-form-email" className="form-label">
          Email
        </label>
        <input
          id="agent-form-email"
          name="email"
          type="email"
          className={`form-input${showError('email') ? ' has-error' : ''}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          aria-invalid={Boolean(showError('email'))}
          aria-describedby={showError('email') ? 'agent-form-email-error' : undefined}
        />
        {showError('email') && (
          <p id="agent-form-email-error" className="form-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="agent-form-phone" className="form-label">
          Phone <span className="agent-form-optional">(optional)</span>
        </label>
        <input
          id="agent-form-phone"
          name="phone"
          type="tel"
          className={`form-input${showError('phone') ? ' has-error' : ''}`}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="tel"
          aria-invalid={Boolean(showError('phone'))}
          aria-describedby={showError('phone') ? 'agent-form-phone-error' : undefined}
        />
        {showError('phone') && (
          <p id="agent-form-phone-error" className="form-error">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="agent-form-message" className="form-label">
          Message
        </label>
        <textarea
          id="agent-form-message"
          name="message"
          rows={5}
          className={`form-textarea${showError('message') ? ' has-error' : ''}`}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(showError('message'))}
          aria-describedby={showError('message') ? 'agent-form-message-error' : undefined}
        />
        {showError('message') && (
          <p id="agent-form-message-error" className="form-error">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" fullWidth size="lg" loading={submitting}>
        {submitting ? 'Sending...' : `Contact ${agentName}`}
      </Button>

      <p className="agent-form-note">
        Demo form: your details are not stored or sent anywhere.
      </p>
    </form>
  )
}