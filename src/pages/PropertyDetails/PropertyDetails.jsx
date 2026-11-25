import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Phone,
} from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import Loader from '../../components/common/Loader'
import SectionHeading from '../../components/common/SectionHeading'
import ContactAgentForm from '../../components/properties/ContactAgentForm'
import Gallery from '../../components/properties/Gallery'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useFavorites from '../../hooks/useFavorites'
import useProperties from '../../hooks/useProperties'
import useToast from '../../hooks/useToast'
import { formatPrice, isAvailable } from '../../data/properties'
import { companyInfo } from '../../data/siteData'
import './PropertyDetails.css'

const STATUS_CLASSES = {
  'For Sale': 'status-sale',
  'For Rent': 'status-rent',
  Sold: 'status-sold',
  Rented: 'status-rented',
}

const MAP_DELTA = 0.01
const MAX_SIMILAR = 3

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

function AgentAvatar({ name, image }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="details-agent-avatar details-agent-initials" aria-hidden="true">
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={name}
      className="details-agent-avatar"
      onError={() => setFailed(true)}
    />
  )
}

export default function PropertyDetails() {
  const { id } = useParams()
  const { properties, isLoading, getPropertyById, getAgentById } = useProperties()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  const property = getPropertyById(id)

  useEffect(() => {
    document.title = property
      ? `${property.title} | LUXORA`
      : 'Property | LUXORA'
  }, [property])

  /* ---------- Loading and not-found states ---------- */
  if (isLoading) {
    return (
      <div className="details-state">
        <Loader size="lg" label="Loading property" />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="details-state">
        <EmptyState
          title="Property not found"
          message="This listing may have been removed, or the link is incorrect."
          actionLabel="Browse all properties"
          actionTo="/properties"
        />
      </div>
    )
  }

  /* ---------- Derived data ---------- */
  const agent = getAgentById(property.agentId)
  const favorite = isFavorite(property.id)

  const similar = properties
    .filter(
      (item) =>
        item.id !== property.id && item.type === property.type && isAvailable(item)
    )
    .slice(0, MAX_SIMILAR)

  const hasCoordinates =
    property.coordinates &&
    Number.isFinite(property.coordinates.lat) &&
    Number.isFinite(property.coordinates.lng)

  let mapSrc = ''
  let mapLink = ''
  if (hasCoordinates) {
    const { lat, lng } = property.coordinates
    const bbox = [
      lng - MAP_DELTA,
      lat - MAP_DELTA,
      lng + MAP_DELTA,
      lat + MAP_DELTA,
    ].join(',')
    mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${lat},${lng}`
    mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`
  }

  const handleFavorite = () => {
    toggleFavorite(property.id)
    showToast(
      favorite ? 'Removed from favorites' : 'Added to favorites',
      favorite ? 'info' : 'success'
    )
  }

  const specs = [
    property.bedrooms > 0 && {
      icon: BedDouble,
      label: 'Bedrooms',
      value: property.bedrooms,
    },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    {
      icon: Maximize,
      label: 'Area',
      value: `${property.area.toLocaleString('en-US')} sq ft`,
    },
    { icon: Building2, label: 'Type', value: property.type },
    property.parking > 0 && {
      icon: Car,
      label: 'Parking',
      value: `${property.parking} ${property.parking === 1 ? 'space' : 'spaces'}`,
    },
    property.yearBuilt && {
      icon: Calendar,
      label: 'Year built',
      value: property.yearBuilt,
    },
  ].filter(Boolean)

  const agentName = agent ? agent.name : 'our team'
  const agentPhone = agent ? agent.phone : companyInfo.phone
  const agentEmail = agent ? agent.email : companyInfo.email

  return (
    <>
      {/* Breadcrumb bar */}
      <section className="details-top">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to="/properties">Properties</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{property.title}</span>
          </nav>
        </Container>
      </section>

      <section className="details-main">
        <Container>
          {/* Title row */}
          <header className="details-header">
            <div className="details-header-text">
              <div className="details-badges">
                <span className={`property-status details-status ${STATUS_CLASSES[property.status] || ''}`}>
                  {property.status}
                </span>
                <span className="details-type">{property.type}</span>
              </div>

              <h1 className="details-title">{property.title}</h1>

              <p className="details-location">
                <MapPin size={18} aria-hidden="true" />
                <span>{property.address || property.location}</span>
              </p>
            </div>

            <div className="details-header-side">
              <p className="details-price">{formatPrice(property)}</p>
              <button
                type="button"
                className={`details-favorite${favorite ? ' is-active' : ''}`}
                onClick={handleFavorite}
                aria-pressed={favorite}
              >
                <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
                {favorite ? 'Saved' : 'Save to favorites'}
              </button>
            </div>
          </header>

          <div className="details-layout">
            {/* Left column */}
            <div className="details-content">
              <Gallery images={property.images} title={property.title} />

              <ul className="details-specs">
                {specs.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <li key={spec.label} className="details-spec">
                      <Icon size={22} aria-hidden="true" />
                      <div>
                        <p className="details-spec-value">{spec.value}</p>
                        <p className="details-spec-label">{spec.label}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="details-block">
                <h2 className="details-block-title">About this property</h2>
                <p className="details-description">{property.description}</p>
              </div>

              {property.features.length > 0 && (
                <div className="details-block">
                  <h2 className="details-block-title">Property features</h2>
                  <ul className="details-list">
                    {property.features.map((feature) => (
                      <li key={feature}>
                        <Check size={18} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.amenities.length > 0 && (
                <div className="details-block">
                  <h2 className="details-block-title">Amenities</h2>
                  <ul className="details-tags">
                    {property.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasCoordinates && (
                <div className="details-block">
                  <h2 className="details-block-title">Location</h2>
                  <div className="details-map">
                    <iframe
                      title={`Map showing ${property.title}`}
                      src={mapSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <a
                    href={mapLink}
                    className="details-map-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open larger map
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            {/* Right column */}
            <aside className="details-sidebar">
              <div className="details-card">
                <div className="details-agent">
                  {agent ? (
                    <AgentAvatar name={agent.name} image={agent.image} />
                  ) : (
                    <div className="details-agent-avatar details-agent-initials" aria-hidden="true">
                      L
                    </div>
                  )}
                  <div>
                    <p className="details-agent-label">Listing agent</p>
                    <h2 className="details-agent-name">
                      {agent ? (
                        <Link to={`/agents/${agent.id}`}>{agent.name}</Link>
                      ) : (
                        'LUXORA Team'
                      )}
                    </h2>
                    {agent && <p className="details-agent-role">{agent.role}</p>}
                  </div>
                </div>

                <ul className="details-agent-contact">
                  <li>
                    <Phone size={16} aria-hidden="true" />
                    <a href={`tel:${agentPhone.replace(/\s+/g, '')}`}>{agentPhone}</a>
                  </li>
                  <li>
                    <Mail size={16} aria-hidden="true" />
                    <a href={`mailto:${agentEmail}`}>{agentEmail}</a>
                  </li>
                </ul>

                <hr className="details-card-divider" />

                <h3 className="details-form-title">Request a viewing</h3>
                <ContactAgentForm
                  agentName={agent ? agent.name.split(' ')[0] : 'our team'}
                  propertyTitle={property.title}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="section section-cream details-similar" aria-label="Similar properties">
          <Container>
            <SectionHeading
              eyebrow="You may also like"
              title="Similar properties"
              description={`More ${property.type.toLowerCase()} listings from our collection.`}
            />
            <PropertyGrid properties={similar} />
            <div className="details-similar-footer">
              <Button to="/properties" variant="outline" size="lg">
                View all properties
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}