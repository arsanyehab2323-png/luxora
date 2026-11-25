import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Facebook,
  Globe,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import Loader from '../../components/common/Loader'
import SectionHeading from '../../components/common/SectionHeading'
import ContactAgentForm from '../../components/properties/ContactAgentForm'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useProperties from '../../hooks/useProperties'
import { isAvailable } from '../../data/properties'
import './AgentProfile.css'

const SOCIAL_ICONS = {
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  instagram: { icon: Instagram, label: 'Instagram' },
  twitter: { icon: Twitter, label: 'Twitter' },
  facebook: { icon: Facebook, label: 'Facebook' },
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

export default function AgentProfile() {
  const { id } = useParams()
  const { properties, isLoading, getAgentById } = useProperties()
  const [imageFailed, setImageFailed] = useState(false)

  const agent = getAgentById(id)

  useEffect(() => {
    document.title = agent ? `${agent.name} | LUXORA` : 'Agent | LUXORA'
  }, [agent])

  // Reset the image error when switching to another agent
  useEffect(() => {
    setImageFailed(false)
  }, [id])

  if (isLoading) {
    return (
      <div className="profile-state">
        <Loader size="lg" label="Loading agent" />
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="profile-state">
        <EmptyState
          title="Agent not found"
          message="This agent may no longer be on our team, or the link is incorrect."
          actionLabel="Meet our agents"
          actionTo="/agents"
        />
      </div>
    )
  }

  const agentProperties = properties.filter(
    (property) => property.agentId === agent.id
  )
  const activeListings = agentProperties.filter(isAvailable).length

  const socialLinks = Object.entries(agent.social || {})
    .filter(([key, href]) => SOCIAL_ICONS[key] && href)
    .map(([key, href]) => ({ key, href, ...SOCIAL_ICONS[key] }))

  const firstName = agent.name.split(' ')[0]
  const showImage = agent.image && !imageFailed

  const stats = [
    agent.experience > 0 && {
      icon: Calendar,
      value: agent.experience,
      label: 'Years of experience',
    },
    agent.propertiesSold > 0 && {
      icon: Home,
      value: agent.propertiesSold,
      label: 'Properties sold',
    },
    {
      icon: Briefcase,
      value: activeListings,
      label: 'Active listings',
    },
  ].filter(Boolean)

  return (
    <>
      {/* Page banner */}
      <section className="page-banner profile-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to="/agents">Agents</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{agent.name}</span>
          </nav>
        </Container>
      </section>

      <section className="profile-main">
        <Container>
          <div className="profile-layout">
            {/* Left: identity card */}
            <aside className="profile-aside">
              <div className="profile-card">
                <div className="profile-photo">
                  {showImage ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="profile-photo-image"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <div className="profile-photo-initials" aria-hidden="true">
                      {getInitials(agent.name)}
                    </div>
                  )}
                </div>

                <div className="profile-card-body">
                  <h1 className="profile-name">{agent.name}</h1>
                  <p className="profile-role">{agent.role}</p>

                  <ul className="profile-contact">
                    <li>
                      <Phone size={18} aria-hidden="true" />
                      <a href={`tel:${agent.phone.replace(/\s+/g, '')}`}>
                        {agent.phone}
                      </a>
                    </li>
                    <li>
                      <Mail size={18} aria-hidden="true" />
                      <a href={`mailto:${agent.email}`}>{agent.email}</a>
                    </li>
                    {agent.location && (
                      <li>
                        <MapPin size={18} aria-hidden="true" />
                        <span>{agent.location}</span>
                      </li>
                    )}
                  </ul>

                  {socialLinks.length > 0 && (
                    <ul className="profile-social">
                      {socialLinks.map(({ key, href, icon: Icon, label }) => (
                        <li key={key}>
                          <a
                            href={href}
                            className="profile-social-link"
                            aria-label={`${agent.name} on ${label}`}
                          >
                            <Icon size={18} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </aside>

            {/* Right: details */}
            <div className="profile-content">
              <div className="profile-intro">
                <span className="eyebrow">{agent.specialization}</span>
                <h2 className="profile-heading">About {firstName}</h2>
                <p className="profile-bio">
                  {agent.bio ||
                    `${firstName} is a member of the LUXORA advisory team, helping clients buy, sell, and rent exceptional property.`}
                </p>
              </div>

              <ul className="profile-stats">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <li key={stat.label} className="profile-stat">
                      <Icon size={22} aria-hidden="true" />
                      <p className="profile-stat-value">{stat.value}</p>
                      <p className="profile-stat-label">{stat.label}</p>
                    </li>
                  )
                })}
              </ul>

              {agent.languages && agent.languages.length > 0 && (
                <div className="profile-languages">
                  <h3 className="profile-subheading">
                    <Globe size={18} aria-hidden="true" />
                    Languages
                  </h3>
                  <ul className="profile-tags">
                    {agent.languages.map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="profile-form-card">
                <h3 className="profile-form-title">Contact {firstName}</h3>
                <ContactAgentForm agentName={firstName} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Agent's listings */}
      <section className="section section-cream" aria-label={`Listings by ${agent.name}`}>
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            title={`Properties listed by ${firstName}`}
            description="Current and recent listings handled by this agent."
          />

          <PropertyGrid
            properties={agentProperties}
            emptyTitle="No listings yet"
            emptyMessage={`${firstName} does not have any properties listed right now.`}
          />
        </Container>
      </section>
    </>
  )
}