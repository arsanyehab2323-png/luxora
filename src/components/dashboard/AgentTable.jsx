import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Pencil, Trash2, Users } from 'lucide-react'
import EmptyState from '../common/EmptyState'
import './AgentTable.css'

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
      <div className="dash-agent-avatar dash-agent-avatar-initials" aria-hidden="true">
        {getInitials(name)}
      </div>
    )
  }

  return (
    <img
      src={image}
      alt={name}
      className="dash-agent-avatar"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/**
 * AgentTable
 *
 * Props:
 *  - agents: array of agent objects
 *  - properties: array of properties (used to count each agent's listings)
 *  - onEdit(agent): called when the edit button is pressed
 *  - onDelete(agent): called when the delete button is pressed
 */
export default function AgentTable({
  agents,
  properties = [],
  onEdit,
  onDelete,
}) {
  if (!agents || agents.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No agents yet"
        message="Add your first agent to start assigning them to properties."
      />
    )
  }

  const countListings = (agentId) =>
    properties.filter((property) => property.agentId === agentId).length

  return (
    <div className="dash-table-wrap">
      <table className="dash-table">
        <thead>
          <tr>
            <th scope="col">Agent</th>
            <th scope="col">Specialization</th>
            <th scope="col">Location</th>
            <th scope="col">Experience</th>
            <th scope="col">Listings</th>
            <th scope="col" className="dash-table-actions-head">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>
                <div className="dash-table-property">
                  <AgentAvatar name={agent.name} image={agent.image} />
                  <div className="dash-table-property-text">
                    <p className="dash-table-title">{agent.name}</p>
                    <p className="dash-table-location">{agent.role}</p>
                  </div>
                </div>
              </td>

              <td>{agent.specialization}</td>
              <td>{agent.location}</td>
              <td className="dash-table-price">
                {agent.experience} {agent.experience === 1 ? 'year' : 'years'}
              </td>
              <td className="dash-table-price">{countListings(agent.id)}</td>

              <td>
                <div className="dash-table-actions">
                  <Link
                    to={`/agents/${agent.id}`}
                    className="dash-icon-button"
                    aria-label={`View ${agent.name}'s profile on the website`}
                    title="View on website"
                  >
                    <Eye size={17} />
                  </Link>
                  <button
                    type="button"
                    className="dash-icon-button"
                    onClick={() => onEdit(agent)}
                    aria-label={`Edit ${agent.name}`}
                    title="Edit"
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    type="button"
                    className="dash-icon-button dash-icon-button-danger"
                    onClick={() => onDelete(agent)}
                    aria-label={`Delete ${agent.name}`}
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}