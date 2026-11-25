import { useState } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import Button from './Button'
import Container from './Container'
import useToast from '../../hooks/useToast'
import { newsletterContent } from '../../data/siteData'
import './Newsletter.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleChange = (event) => {
    setEmail(event.target.value)
    if (error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmed = email.trim()

    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    // Demo only: simulate subscribing
    setTimeout(() => {
      setSubmitting(false)
      setSubscribed(true)
      showToast('You are subscribed (demo).')
    }, 900)
  }

  const handleReset = () => {
    setEmail('')
    setError('')
    setSubscribed(false)
  }

  return (
    <section className="newsletter section-dark" aria-labelledby="newsletter-title">
      <Container narrow>
        <div className="newsletter-inner">
          <span className="eyebrow newsletter-eyebrow">Newsletter</span>
          <h2 id="newsletter-title" className="newsletter-title">
            {newsletterContent.title}
          </h2>
          <hr className="divider" />
          <p className="newsletter-text">{newsletterContent.text}</p>

          {subscribed ? (
            <div className="newsletter-success" role="status">
              <CheckCircle2 size={36} strokeWidth={1.5} aria-hidden="true" />
              <p>
                Thank you for subscribing. This is a portfolio demo, so your
                email was not stored or sent anywhere.
              </p>
              <button
                type="button"
                className="newsletter-reset"
                onClick={handleReset}
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <div className="newsletter-field">
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Email address
                </label>
                <div className="newsletter-input-wrap">
                  <Mail size={18} aria-hidden="true" />
                  <input
                    id="newsletter-email"
                    type="email"
                    className={`newsletter-input${error ? ' has-error' : ''}`}
                    placeholder="Your email address"
                    value={email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                  />
                </div>
                {error && (
                  <p id="newsletter-error" className="newsletter-error" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" loading={submitting}>
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}