import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react'
import './AgentCard.css'

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

/**
 * AgentCard
 *
 * Props:
 *  - agent: an agent object from the data file
 */
export default function AgentCard({ agent }) {
  const [imageFailed, setImageFailed] = useState(false)

  const {
    id,
    name,
    role,
    specialization,
    experience,
    location,
    email,
    phone,
    image,
  } = agent

  const profilePath = `/agents/${id}`
  const showImage = image && !imageFailed

  return (
    <article className="agent-card">
      <Link
        to={profilePath}
        className="agent-card-media"
        aria-label={`View ${name}'s profile`}
        tabIndex={-1}
      >
        {showImage ? (
          <img
            src={image}
            alt={name}
            className="agent-card-image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="agent-card-initials" aria-hidden="true">
            {getInitials(name)}
          </div>
        )}
      </Link>

      <div className="agent-card-body">
        <h3 className="agent-card-name">
          <Link to={profilePath}>{name}</Link>
        </h3>
        <p className="agent-card-role">{role}</p>

        <ul className="agent-card-meta">
          <li>
            <Briefcase size={16} aria-hidden="true" />
            <span>{specialization}</span>
          </li>
          <li>
            <MapPin size={16} aria-hidden="true" />
            <span>
              {location}
              {experience > 0 ? ` · ${experience} years experience` : ''}
            </span>
          </li>
        </ul>

        <div className="agent-card-contact">
          <a
            href={`mailto:${email}`}
            className="agent-card-icon"
            aria-label={`Email ${name}`}
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="agent-card-icon"
            aria-label={`Call ${name}`}
          >
            <Phone size={18} />
          </a>
          <Link to={profilePath} className="agent-card-link">
            View profile
          </Link>
        </div>
      </div>
    </article>
  )
}