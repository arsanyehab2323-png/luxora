import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Compass, Target } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import DynamicIcon from '../../components/common/DynamicIcon'
import SectionHeading from '../../components/common/SectionHeading'
import {
  aboutContent,
  achievements,
  companyValues,
  teamMembers,
} from '../../data/siteData'
import './About.css'

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

function TeamMember({ member }) {
  const [failed, setFailed] = useState(false)

  return (
    <article className="team-card">
      <div className="team-card-media">
        {member.image && !failed ? (
          <img
            src={member.image}
            alt={member.name}
            className="team-card-image"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="team-card-initials" aria-hidden="true">
            {getInitials(member.name)}
          </div>
        )}
      </div>
      <h3 className="team-card-name">{member.name}</h3>
      <p className="team-card-role">{member.role}</p>
    </article>
  )
}

export default function About() {
  const [storyImageFailed, setStoryImageFailed] = useState(false)

  useEffect(() => {
    document.title = 'About Us | LUXORA'
  }, [])

  return (
    <>
      {/* Page banner */}
      <section className="page-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">About Us</span>
          </nav>
          <h1 className="page-banner-title">About LUXORA</h1>
          <p className="page-banner-text">{aboutContent.intro}</p>
        </Container>
      </section>

      {/* Our story */}
      <section className="section about-story" aria-label="Our story">
        <Container>
          <div className="about-story-grid">
            <div className="about-story-media">
              {!storyImageFailed ? (
                <img
                  src={aboutContent.storyImage}
                  alt="A modern luxury interior designed by LUXORA"
                  className="about-story-image"
                  loading="lazy"
                  onError={() => setStoryImageFailed(true)}
                />
              ) : (
                <div className="about-story-fallback" aria-hidden="true" />
              )}
            </div>

            <div className="about-story-text">
              <SectionHeading
                align="left"
                eyebrow="Our Story"
                title="Built on trust, driven by design"
                className="about-story-heading"
              />
              {aboutContent.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission and vision */}
      <section className="section section-cream" aria-label="Mission and vision">
        <Container>
          <div className="about-mv-grid">
            <article className="about-mv-card">
              <div className="about-mv-icon">
                <Target size={28} aria-hidden="true" />
              </div>
              <h2 className="about-mv-title">Our mission</h2>
              <p>{aboutContent.mission}</p>
            </article>

            <article className="about-mv-card">
              <div className="about-mv-icon">
                <Compass size={28} aria-hidden="true" />
              </div>
              <h2 className="about-mv-title">Our vision</h2>
              <p>{aboutContent.vision}</p>
            </article>
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section className="section section-dark" aria-label="Company achievements">
        <Container>
          <SectionHeading
            light
            eyebrow="Achievements"
            title="A track record we are proud of"
          />

          <div className="about-achievements">
            {achievements.map((item) => (
              <article key={item.id} className="about-achievement">
                <div className="about-achievement-icon">
                  <DynamicIcon name={item.icon} size={26} />
                </div>
                <h3 className="about-achievement-title">{item.title}</h3>
                <p className="about-achievement-text">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section" aria-label="Our values">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="The principles behind every decision"
            description="These four ideas guide how we treat clients, colleagues, and every property we represent."
          />

          <div className="about-values">
            {companyValues.map((value) => (
              <article key={value.id} className="about-value">
                <div className="about-value-icon">
                  <DynamicIcon name={value.icon} size={26} />
                </div>
                <h3 className="about-value-title">{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section section-cream" aria-label="Our team">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the team behind LUXORA"
            description="Experienced professionals who combine market knowledge with a genuine passion for exceptional property."
          />

          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="section section-dark about-cta" aria-label="Get in touch">
        <Container narrow>
          <div className="about-cta-inner">
            <h2 className="about-cta-title">Ready to find your next home?</h2>
            <p>
              Whether you are buying, selling, or renting, our advisors are
              ready to guide you through every step.
            </p>
            <div className="about-cta-actions">
              <Button to="/contact" size="lg" icon={ArrowRight} iconPosition="right">
                Contact us
              </Button>
              <Button to="/properties" size="lg" variant="outline-light">
                Browse properties
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}