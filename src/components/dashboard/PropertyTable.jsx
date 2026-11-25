import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Eye, ImageOff, Pencil, Star, Trash2 } from 'lucide-react'
import EmptyState from '../common/EmptyState'
import { formatPrice } from '../../data/properties'
import './PropertyTable.css'

const STATUS_CLASSES = {
  'For Sale': 'dash-badge-sale',
  'For Rent': 'dash-badge-rent',
  Sold: 'dash-badge-sold',
  Rented: 'dash-badge-rented',
}

function Thumbnail({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="dash-table-thumb dash-table-thumb-empty" aria-hidden="true">
        <ImageOff size={18} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="dash-table-thumb"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/**
 * PropertyTable
 *
 * Props:
 *  - properties: array of property objects to show
 *  - agents: array of agent objects (used to show the agent's name)
 *  - onEdit(property): called when the edit button is pressed
 *  - onDelete(property): called when the delete button is pressed
 *  - compact: boolean, hides the agent column and action buttons
 *             (used for the "recent listings" table on the overview)
 */
export default function PropertyTable({
  properties,
  agents = [],
  onEdit,
  onDelete,
  compact = false,
}) {
  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No properties to show"
        message="Add a new property or change your search to see results here."
      />
    )
  }

  const getAgentName = (agentId) => {
    const agent = agents.find((item) => item.id === agentId)
    return agent ? agent.name : 'Unassigned'
  }

  return (
    <div className="dash-table-wrap">
      <table className="dash-table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            {!compact && <th scope="col">Agent</th>}
            {!compact && (
              <th scope="col" className="dash-table-actions-head">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>
                <div className="dash-table-property">
                  <Thumbnail
                    src={property.images && property.images[0]}
                    alt={property.title}
                  />
                  <div className="dash-table-property-text">
                    <p className="dash-table-title">
                      {property.title}
                      {property.featured && (
                        <Star
                          size={14}
                          className="dash-table-featured"
                          aria-label="Featured property"
                        />
                      )}
                    </p>
                    <p className="dash-table-location">{property.location}</p>
                  </div>
                </div>
              </td>

              <td>{property.type}</td>

              <td>
                <span
                  className={`dash-badge ${STATUS_CLASSES[property.status] || ''}`}
                >
                  {property.status}
                </span>
              </td>

              <td className="dash-table-price">{formatPrice(property)}</td>

              {!compact && <td>{getAgentName(property.agentId)}</td>}

              {!compact && (
                <td>
                  <div className="dash-table-actions">
                    <Link
                      to={`/properties/${property.id}`}
                      className="dash-icon-button"
                      aria-label={`View ${property.title} on the website`}
                      title="View on website"
                    >
                      <Eye size={17} />
                    </Link>
                    <button
                      type="button"
                      className="dash-icon-button"
                      onClick={() => onEdit(property)}
                      aria-label={`Edit ${property.title}`}
                      title="Edit"
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      type="button"
                      className="dash-icon-button dash-icon-button-danger"
                      onClick={() => onDelete(property)}
                      aria-label={`Delete ${property.title}`}
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}