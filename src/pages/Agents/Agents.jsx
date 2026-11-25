import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Search } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import AgentCard from '../../components/properties/AgentCard'
import useDebounce from '../../hooks/useDebounce'
import useProperties from '../../hooks/useProperties'
import './Agents.css'

export default function Agents() {
  const { agents, isLoading } = useProperties()
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    document.title = 'Our Agents | LUXORA'
  }, [])

  const cities = useMemo(
    () => [...new Set(agents.map((agent) => agent.location).filter(Boolean))].sort(),
    [agents]
  )

  const results = useMemo(() => {
    const search = debouncedQuery.trim().toLowerCase()

    return agents.filter((agent) => {
      if (city && agent.location !== city) return false

      if (search) {
        const haystack = [agent.name, agent.role, agent.specialization]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(search)) return false
      }

      return true
    })
  }, [agents, debouncedQuery, city])

  const hasFilters = query.trim() !== '' || city !== ''

  const handleReset = () => {
    setQuery('')
    setCity('')
  }

  return (
    <>
      {/* Page banner */}
      <section className="page-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Agents</span>
          </nav>
          <h1 className="page-banner-title">Our agents</h1>
          <p className="page-banner-text">
            Meet the advisors who guide our clients through every purchase,
            sale, and rental with expertise and discretion.
          </p>
        </Container>
      </section>

      <section className="section agents-section" aria-label="Agents list">
        <Container>
          {/* Toolbar */}
          <div className="agents-toolbar">
            <div className="agents-search">
              <label htmlFor="agents-search" className="visually-hidden">
                Search agents
              </label>
              <Search size={18} aria-hidden="true" />
              <input
                id="agents-search"
                type="text"
                className="agents-search-input"
                placeholder="Search by name or specialization"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="agents-city">
              <label htmlFor="agents-city" className="visually-hidden">
                Filter by city
              </label>
              <select
                id="agents-city"
                className="agents-city-select"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              >
                <option value="">All locations</option>
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="agents-count" aria-live="polite">
            <strong>{results.length}</strong>{' '}
            {results.length === 1 ? 'agent' : 'agents'} found
          </p>

          {/* Results */}
          {isLoading ? (
            <div className="agents-grid" aria-busy="true" aria-label="Loading agents">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="agents-skeleton" aria-hidden="true">
                  <div className="skeleton agents-skeleton-media" />
                  <div className="agents-skeleton-body">
                    <div className="skeleton agents-skeleton-line agents-skeleton-line-lg" />
                    <div className="skeleton agents-skeleton-line agents-skeleton-line-md" />
                    <div className="skeleton agents-skeleton-line" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              title="No agents match your search"
              message="Try a different name, specialization, or location."
              actionLabel={hasFilters ? 'Clear filters' : undefined}
              onAction={hasFilters ? handleReset : undefined}
            />
          ) : (
            <div className="agents-grid">
              {results.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Call to action */}
      <section className="section section-dark agents-cta" aria-label="Contact us">
        <Container narrow>
          <div className="agents-cta-inner">
            <h2>Not sure who to speak with?</h2>
            <p>
              Tell us what you are looking for and we will match you with the
              right advisor for your needs.
            </p>
            <Button to="/contact" size="lg">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}