import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { testimonials } from '../../data/testimonials'
import './Testimonials.css'

const AUTOPLAY_DELAY = 7000

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

function Avatar({ name, image }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="testimonial-avatar testimonial-avatar-initials" aria-hidden="true">
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      src={image}
      alt=""
      className="testimonial-avatar"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = testimonials.length

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total)
  }, [total])

  // Auto-advance (paused on hover/focus, disabled for reduced motion)
  useEffect(() => {
    if (paused || total < 2) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduceMotion) return undefined

    const timer = setInterval(goNext, AUTOPLAY_DELAY)
    return () => clearInterval(timer)
  }, [paused, total, goNext])

  if (total === 0) return null

  const current = testimonials[activeIndex]

  return (
    <section className="section testimonials" aria-label="Customer testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          description="Real stories from people who trusted us with one of the most important decisions of their lives."
        />

        <div
          className="testimonials-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote className="testimonials-quote-icon" size={56} strokeWidth={1.25} aria-hidden="true" />

          <figure key={current.id} className="testimonial fade-in" aria-live="polite">
            <div
              className="testimonial-stars"
              role="img"
              aria-label={`Rated ${current.rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill={index < current.rating ? 'currentColor' : 'none'}
                  className={index < current.rating ? 'is-filled' : ''}
                />
              ))}
            </div>

            <blockquote className="testimonial-quote">
              {current.quote}
            </blockquote>

            <figcaption className="testimonial-author">
              <Avatar name={current.name} image={current.image} />
              <div>
                <p className="testimonial-name">{current.name}</p>
                <p className="testimonial-role">
                  {current.role} · {current.location}
                </p>
              </div>
            </figcaption>
          </figure>

          {total > 1 && (
            <div className="testimonials-controls">
              <button
                type="button"
                className="testimonials-arrow"
                onClick={goPrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="testimonials-dots">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`testimonials-dot${index === activeIndex ? ' is-active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1} of ${total}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>

              <button
                type="button"
                className="testimonials-arrow"
                onClick={goNext}
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}