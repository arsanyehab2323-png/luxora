import { useState } from 'react'
import { ArrowRight, Users } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import PropertySearchBar from '../../components/properties/PropertySearchBar'
import { heroContent } from '../../data/siteData'
import './Hero.css'

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-background" aria-hidden="true">
        {!imageFailed && (
          <img
            src={heroContent.image}
            alt=""
            className="hero-image"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="hero-overlay" />
      </div>

      <Container className="hero-container">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow fade-up">
            {heroContent.eyebrow}
          </span>

          <h1 id="hero-title" className="hero-title fade-up">
            {heroContent.title}
          </h1>

          <p className="hero-subtitle fade-up">{heroContent.subtitle}</p>

          <div className="hero-actions fade-up">
            <Button to="/properties" size="lg" icon={ArrowRight} iconPosition="right">
              Explore properties
            </Button>
            <Button to="/agents" size="lg" variant="outline-light" icon={Users}>
              Meet our agents
            </Button>
          </div>
        </div>

        <div className="hero-search fade-up">
          <PropertySearchBar />
        </div>
      </Container>
    </section>
  )
}