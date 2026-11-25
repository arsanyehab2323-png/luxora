import { useEffect, useRef, useState } from 'react'
import Container from '../../components/common/Container'
import { companyStats } from '../../data/siteData'
import './Stats.css'

const DURATION = 1800

function StatItem({ value, suffix, label }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let frameId = 0

    const animate = () => {
      if (reduceMotion) {
        setDisplay(value)
        return
      }

      const start = performance.now()

      const step = (now) => {
        const progress = Math.min((now - start) / DURATION, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(value * eased))

        if (progress < 1) frameId = requestAnimationFrame(step)
      }

      frameId = requestAnimationFrame(step)
    }

    if (!('IntersectionObserver' in window)) {
      animate()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [value])

  return (
    <div ref={ref} className="stats-item">
      <p className="stats-value" aria-label={`${value.toLocaleString('en-US')}${suffix}`}>
        <span aria-hidden="true">
          {display.toLocaleString('en-US')}
          {suffix}
        </span>
      </p>
      <p className="stats-label">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Company statistics">
      <Container>
        <div className="stats-grid">
          {companyStats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}