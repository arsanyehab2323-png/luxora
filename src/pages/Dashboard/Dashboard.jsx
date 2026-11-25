import { useEffect, useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  Key,
  Plus,
  RotateCcw,
  Search,
  Star,
  Tag,
  Users,
} from 'lucide-react'
import AgentForm from '../../components/dashboard/AgentForm'
import AgentTable from '../../components/dashboard/AgentTable'
import PropertyForm from '../../components/dashboard/PropertyForm'
import PropertyTable from '../../components/dashboard/PropertyTable'
import Sidebar from '../../components/dashboard/Sidebar'
import StatCard from '../../components/dashboard/StatCard'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import Modal from '../../components/common/Modal'
import useProperties from '../../hooks/useProperties'
import useToast from '../../hooks/useToast'
import { PROPERTY_STATUSES, isAvailable } from '../../data/properties'
import './Dashboard.css'

const RECENT_COUNT = 5

export default function Dashboard() {
  const {
    properties,
    agents,
    isLoading,
    addProperty,
    updateProperty,
    deleteProperty,
    addAgent,
    updateAgent,
    deleteAgent,
    resetData,
  } = useProperties()
  const { showToast } = useToast()

  const [section, setSection] = useState('overview')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // formState: { type: 'property' | 'agent', item: object | null } | null
  const [formState, setFormState] = useState(null)
  // confirmState: { kind: 'property' | 'agent' | 'reset', item?: object } | null
  const [confirmState, setConfirmState] = useState(null)

  useEffect(() => {
    document.title = 'Admin Dashboard | LUXORA'
  }, [])

  /* ---------- Derived data ---------- */
  const stats = useMemo(
    () => ({
      total: properties.length,
      available: properties.filter(isAvailable).length,
      sold: properties.filter((item) => item.status === 'Sold').length,
      rented: properties.filter((item) => item.status === 'Rented').length,
      featured: properties.filter((item) => item.featured).length,
      agents: agents.length,
    }),
    [properties, agents]
  )

  const recent = useMemo(
    () =>
      [...properties]
        .sort((a, b) => {
          const byDate = new Date(b.createdAt) - new Date(a.createdAt)
          return byDate !== 0 ? byDate : b.id - a.id
        })
        .slice(0, RECENT_COUNT),
    [properties]
  )

  const filteredProperties = useMemo(() => {
    const search = query.trim().toLowerCase()

    return properties.filter((property) => {
      if (statusFilter && property.status !== statusFilter) return false

      if (search) {
        const haystack = [property.title, property.location, property.type]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(search)) return false
      }

      return true
    })
  }, [properties, query, statusFilter])

  const sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'Properties', count: properties.length },
    { id: 'agents', label: 'Agents', count: agents.length },
  ]

  /* ---------- Navigation ---------- */
  const handleSelectSection = (id) => {
    setSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ---------- Forms ---------- */
  const closeForm = () => setFormState(null)

  const handlePropertySubmit = (data) => {
    if (formState.item) {
      updateProperty(formState.item.id, data)
      showToast('Property updated')
    } else {
      addProperty(data)
      showToast('Property added')
    }
    closeForm()
  }

  const handleAgentSubmit = (data) => {
    if (formState.item) {
      updateAgent(formState.item.id, data)
      showToast('Agent updated')
    } else {
      addAgent(data)
      showToast('Agent added')
    }
    closeForm()
  }

  /* ---------- Confirmations ---------- */
  const closeConfirm = () => setConfirmState(null)

  const handleConfirm = () => {
    if (!confirmState) return

    if (confirmState.kind === 'property') {
      deleteProperty(confirmState.item.id)
      showToast('Property deleted', 'info')
    }

    if (confirmState.kind === 'agent') {
      // Unassign this agent's properties so none point to a deleted agent
      properties
        .filter((property) => property.agentId === confirmState.item.id)
        .forEach((property) => updateProperty(property.id, { agentId: null }))

      deleteAgent(confirmState.item.id)
      showToast('Agent deleted', 'info')
    }

    if (confirmState.kind === 'reset') {
      resetData()
      showToast('Demo data has been reset', 'info')
    }

    closeConfirm()
  }

  const getConfirmContent = () => {
    if (!confirmState) return { title: '', body: '', action: 'Confirm' }

    if (confirmState.kind === 'property') {
      return {
        title: 'Delete this property?',
        body: `"${confirmState.item.title}" will be removed from the website. This cannot be undone.`,
        action: 'Delete property',
      }
    }

    if (confirmState.kind === 'agent') {
      const listings = properties.filter(
        (property) => property.agentId === confirmState.item.id
      ).length

      return {
        title: 'Delete this agent?',
        body:
          listings > 0
            ? `${confirmState.item.name} will be removed. Their ${listings} ${
                listings === 1 ? 'listing' : 'listings'
              } will become unassigned.`
            : `${confirmState.item.name} will be removed from the team. This cannot be undone.`,
        action: 'Delete agent',
      }
    }

    return {
      title: 'Reset demo data?',
      body: 'All properties and agents will go back to the original demo content. Any changes you made will be lost.',
      action: 'Reset data',
    }
  }

  const confirmContent = getConfirmContent()

  /* ---------- Render ---------- */
  if (isLoading) {
    return (
      <div className="dash-loading">
        <Loader size="lg" label="Loading dashboard" />
      </div>
    )
  }

  const isPropertyForm = formState && formState.type === 'property'
  const isAgentForm = formState && formState.type === 'agent'

  return (
    <div className="dash">
      <Sidebar
        items={sidebarItems}
        active={section}
        onSelect={handleSelectSection}
      />

      <main className="dash-main">
        {/* ---------- Overview ---------- */}
        {section === 'overview' && (
          <>
            <header className="dash-header">
              <div>
                <h1 className="dash-title">Dashboard overview</h1>
                <p className="dash-subtitle">
                  A snapshot of your listings and team. All data is demo data
                  stored in this browser.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={RotateCcw}
                onClick={() => setConfirmState({ kind: 'reset' })}
              >
                Reset demo data
              </Button>
            </header>

            <div className="dash-stats">
              <StatCard
                icon={Building2}
                tone="navy"
                value={stats.total}
                label="Total properties"
                hint="All listings"
              />
              <StatCard
                icon={CheckCircle2}
                tone="green"
                value={stats.available}
                label="Available"
                hint="For sale or rent"
              />
              <StatCard
                icon={Tag}
                tone="gold"
                value={stats.sold}
                label="Sold"
              />
              <StatCard
                icon={Key}
                tone="blue"
                value={stats.rented}
                label="Rented"
              />
              <StatCard
                icon={Star}
                tone="gold"
                value={stats.featured}
                label="Featured"
                hint="Shown on the homepage"
              />
              <StatCard
                icon={Users}
                tone="navy"
                value={stats.agents}
                label="Total agents"
              />
            </div>

            <section className="dash-panel" aria-label="Recent listings">
              <div className="dash-panel-header">
                <h2 className="dash-panel-title">Recent listings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSelectSection('properties')}
                >
                  View all
                </Button>
              </div>
              <PropertyTable properties={recent} agents={agents} compact />
            </section>
          </>
        )}

        {/* ---------- Properties ---------- */}
        {section === 'properties' && (
          <>
            <header className="dash-header">
              <div>
                <h1 className="dash-title">Properties</h1>
                <p className="dash-subtitle">
                  Add, edit, or remove the listings shown on the website.
                </p>
              </div>
              <Button
                icon={Plus}
                onClick={() => setFormState({ type: 'property', item: null })}
              >
                Add property
              </Button>
            </header>

            <div className="dash-toolbar">
              <div className="dash-search">
                <label htmlFor="dash-property-search" className="visually-hidden">
                  Search properties
                </label>
                <Search size={18} aria-hidden="true" />
                <input
                  id="dash-property-search"
                  type="text"
                  className="dash-search-input"
                  placeholder="Search by title, location, or type"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="dash-property-status" className="visually-hidden">
                  Filter by status
                </label>
                <select
                  id="dash-property-status"
                  className="dash-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="">All statuses</option>
                  {PROPERTY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="dash-count" aria-live="polite">
              <strong>{filteredProperties.length}</strong>{' '}
              {filteredProperties.length === 1 ? 'property' : 'properties'}
            </p>

            <PropertyTable
              properties={filteredProperties}
              agents={agents}
              onEdit={(property) => setFormState({ type: 'property', item: property })}
              onDelete={(property) =>
                setConfirmState({ kind: 'property', item: property })
              }
            />
          </>
        )}

        {/* ---------- Agents ---------- */}
        {section === 'agents' && (
          <>
            <header className="dash-header">
              <div>
                <h1 className="dash-title">Agents</h1>
                <p className="dash-subtitle">
                  Manage the advisors shown on the website.
                </p>
              </div>
              <Button
                icon={Plus}
                onClick={() => setFormState({ type: 'agent', item: null })}
              >
                Add agent
              </Button>
            </header>

            <AgentTable
              agents={agents}
              properties={properties}
              onEdit={(agent) => setFormState({ type: 'agent', item: agent })}
              onDelete={(agent) => setConfirmState({ kind: 'agent', item: agent })}
            />
          </>
        )}
      </main>

      {/* ---------- Property form modal ---------- */}
      <Modal
        isOpen={Boolean(isPropertyForm)}
        onClose={closeForm}
        title={formState && formState.item ? 'Edit property' : 'Add property'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" form="property-form">
              {formState && formState.item ? 'Save changes' : 'Add property'}
            </Button>
          </>
        }
      >
        {isPropertyForm && (
          <PropertyForm
            property={formState.item || undefined}
            agents={agents}
            onSubmit={handlePropertySubmit}
          />
        )}
      </Modal>

      {/* ---------- Agent form modal ---------- */}
      <Modal
        isOpen={Boolean(isAgentForm)}
        onClose={closeForm}
        title={formState && formState.item ? 'Edit agent' : 'Add agent'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" form="agent-form">
              {formState && formState.item ? 'Save changes' : 'Add agent'}
            </Button>
          </>
        }
      >
        {isAgentForm && (
          <AgentForm
            agent={formState.item || undefined}
            onSubmit={handleAgentSubmit}
          />
        )}
      </Modal>

      {/* ---------- Confirm modal ---------- */}
      <Modal
        isOpen={Boolean(confirmState)}
        onClose={closeConfirm}
        title={confirmContent.title}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={closeConfirm}>
              Cancel
            </Button>
            <Button
              variant={confirmState && confirmState.kind === 'reset' ? 'secondary' : 'danger'}
              onClick={handleConfirm}
            >
              {confirmContent.action}
            </Button>
          </>
        }
      >
        <p>{confirmContent.body}</p>
      </Modal>
    </div>
  )
}