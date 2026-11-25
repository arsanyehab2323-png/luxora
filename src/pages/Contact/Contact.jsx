import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import useToast from '../../hooks/useToast'
import { companyInfo, contactSubjects } from '../../data/siteData'
import './Contact.css'

const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const MAP_DELTA = 0.008

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

  if (!values.subject) {
    errors.subject = 'Please choose a subject.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

export default function Contact() {
  const { showToast } = useToast()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us | LUXORA'
  }, [])

  const { lat, lng } = companyInfo.coordinates
  const bbox = [lng - MAP_DELTA, lat - MAP_DELTA, lng + MAP_DELTA, lat + MAP_DELTA].join(',')
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${lat},${lng}`
  const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`

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
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })

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
    setValues(INITIAL_VALUES)
    setErrors({})
    setTouched({})
    setSubmitted(false)
  }

  const showError = (field) => touched[field] && errors[field]

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': showError(field) ? `contact-${field}-error` : undefined,
  })

  const renderError = (field) =>
    showError(field) && (
      <p id={`contact-${field}-error`} className="form-error">
        {errors[field]}
      </p>
    )

  return (
    <>
      {/* Page banner */}
      <section className="page-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Contact</span>
          </nav>
          <h1 className="page-banner-title">Contact us</h1>
          <p className="page-banner-text">
            Have a question or ready to start your search? Send us a message
            and an advisor will be in touch.
          </p>
        </Container>
      </section>

      <section className="section contact-section" aria-label="Contact details and form">
        <Container>
          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success" role="status">
                  <CheckCircle2 size={52} strokeWidth={1.5} aria-hidden="true" />
                  <h2>Thank you, {values.name.trim().split(' ')[0]}</h2>
                  <p>
                    Your message was received. This is a portfolio demo, so no
                    email was actually sent and your details were not stored.
                  </p>
                  <Button variant="outline" onClick={handleReset}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="contact-form-title">Send us a message</h2>
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="contact-form-row">
                      <div className="form-group">
                        <label htmlFor="contact-name" className="form-label">
                          Full name
                        </label>
                        <input
                          type="text"
                          autoComplete="name"
                          className={`form-input${showError('name') ? ' has-error' : ''}`}
                          {...fieldProps('name')}
                        />
                        {renderError('name')}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          className={`form-input${showError('email') ? ' has-error' : ''}`}
                          {...fieldProps('email')}
                        />
                        {renderError('email')}
                      </div>
                    </div>

                    <div className="contact-form-row">
                      <div className="form-group">
                        <label htmlFor="contact-phone" className="form-label">
                          Phone <span className="contact-optional">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          autoComplete="tel"
                          className={`form-input${showError('phone') ? ' has-error' : ''}`}
                          {...fieldProps('phone')}
                        />
                        {renderError('phone')}
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject" className="form-label">
                          Subject
                        </label>
                        <select
                          className={`form-select${showError('subject') ? ' has-error' : ''}`}
                          {...fieldProps('subject')}
                        >
                          <option value="">Choose a subject</option>
                          {contactSubjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                        {renderError('subject')}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        Message
                      </label>
                      <textarea
                        rows={6}
                        className={`form-textarea${showError('message') ? ' has-error' : ''}`}
                        {...fieldProps('message')}
                      />
                      {renderError('message')}
                    </div>

                    <Button type="submit" size="lg" loading={submitting}>
                      {submitting ? 'Sending...' : 'Send message'}
                    </Button>

                    <p className="contact-note">
                      Demo form: your details are not stored or sent anywhere.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Office details */}
            <aside className="contact-info">
              <h2 className="contact-info-title">Our office</h2>

              <ul className="contact-info-list">
                <li>
                  <span className="contact-info-icon">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="contact-info-label">Address</p>
                    <p>
                      {companyInfo.address}
                      <br />
                      {companyInfo.city}
                    </p>
                  </div>
                </li>
                <li>
                  <span className="contact-info-icon">
                    <Phone size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="contact-info-label">Phone</p>
                    <a href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}>
                      {companyInfo.phone}
                    </a>
                  </div>
                </li>
                <li>
                  <span className="contact-info-icon">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="contact-info-label">Email</p>
                    <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                  </div>
                </li>
                <li>
                  <span className="contact-info-icon">
                    <Clock size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="contact-info-label">Opening hours</p>
                    <p>{companyInfo.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="contact-social">
                <p className="contact-info-label">Follow us</p>
                <ul className="contact-social-list">
                  {companyInfo.social.map((item) => {
                    const Icon = SOCIAL_ICONS[item.icon]
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="contact-social-link"
                          aria-label={item.label}
                        >
                          {Icon && <Icon size={18} />}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="contact-map-section" aria-label="Office location map">
        <Container>
          <div className="contact-map">
            <iframe
              title="Map showing the LUXORA office location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <a
            href={mapLink}
            className="contact-map-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open larger map
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </Container>
      </section>
    </>
  )
}