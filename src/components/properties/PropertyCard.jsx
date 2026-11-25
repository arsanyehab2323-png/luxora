import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bath, BedDouble, Heart, ImageOff, MapPin, Maximize } from 'lucide-react'
import useFavorites from '../../hooks/useFavorites'
import useToast from '../../hooks/useToast'
import { formatPrice } from '../../data/properties'
import './PropertyCard.css'

const STATUS_CLASSES = {
  'For Sale': 'status-sale',
  'For Rent': 'status-rent',
  Sold: 'status-sold',
  Rented: 'status-rented',
}

/**
 * PropertyCard
 *
 * Props:
 *  - property: a property object from the data file
 *  - view: 'grid' | 'list'
 */
export default function PropertyCard({ property, view = 'grid' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const [imageFailed, setImageFailed] = useState(false)

  const {
    id,
    title,
    location,
    type,
    status,
    bedrooms,
    bathrooms,
    area,
    images,
  } = property

  const favorite = isFavorite(id)
  const detailsPath = `/properties/${id}`
  const mainImage = images && images.length > 0 ? images[0] : ''
  const showImage = mainImage && !imageFailed

  const handleFavorite = () => {
    toggleFavorite(id)
    showToast(
      favorite ? 'Removed from favorites' : 'Added to favorites',
      favorite ? 'info' : 'success'
    )
  }

  return (
    <article className={`property-card property-card-${view}`}>
      <div className="property-card-media">
        <Link
          to={detailsPath}
          className="property-card-image-link"
          aria-label={`View ${title}`}
          tabIndex={-1}
        >
          {showImage ? (
            <img
              src={mainImage}
              alt={title}
              className="property-card-image"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="property-card-placeholder" aria-hidden="true">
              <ImageOff size={40} strokeWidth={1.5} />
            </div>
          )}
        </Link>

        <span className={`property-status ${STATUS_CLASSES[status] || ''}`}>
          {status}
        </span>

        <button
          type="button"
          className={`property-card-favorite${favorite ? ' is-active' : ''}`}
          onClick={handleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
        >
          <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="property-card-body">
        <span className="property-card-type">{type}</span>

        <h3 className="property-card-title">
          <Link to={detailsPath}>{title}</Link>
        </h3>

        <p className="property-card-location">
          <MapPin size={16} aria-hidden="true" />
          <span>{location}</span>
        </p>

        <ul className="property-card-specs">
          {bedrooms > 0 && (
            <li>
              <BedDouble size={18} aria-hidden="true" />
              <span>
                {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
              </span>
            </li>
          )}
          <li>
            <Bath size={18} aria-hidden="true" />
            <span>
              {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
          </li>
          <li>
            <Maximize size={18} aria-hidden="true" />
            <span>{area.toLocaleString('en-US')} sq ft</span>
          </li>
        </ul>

        <div className="property-card-footer">
          <p className="property-card-price">{formatPrice(property)}</p>
          <Link to={detailsPath} className="property-card-link">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}