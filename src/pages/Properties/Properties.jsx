import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, LayoutGrid, List } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import PropertyFilters from '../../components/properties/PropertyFilters'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useDebounce from '../../hooks/useDebounce'
import useProperties from '../../hooks/useProperties'
import './Properties.css'

const PAGE_SIZE = 6

const FILTER_KEYS = [
  'q',
  'type',
  'status',
  'minPrice',
  'maxPrice',
  'bedrooms',
  'bathrooms',
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export default function Properties() {
  const { properties, isLoading } = useProperties()
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    document.title = 'Properties | LUXORA'
  }, [])

  /* ---------- Read filters from the URL ---------- */
  const filters = {
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
  }

  const rawSort = searchParams.get('sort')
  const sort = SORT_OPTIONS.some((option) => option.value === rawSort)
    ? rawSort
    : 'newest'

  const debouncedQuery = useDebounce(filters.q, 250)

  const activeCount = FILTER_KEYS.filter((key) => filters[key] !== '').length

  /* ---------- Update the URL ---------- */
  const updateParam = (name, value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(name, value)
        else next.delete(name)
        return next
      },
      { replace: true }
    )
  }

  const handleFilterChange = (name, value) => {
    updateParam(name, value)
    setVisibleCount(PAGE_SIZE)
  }

  const handleSortChange = (event) => {
    updateParam('sort', event.target.value === 'newest' ? '' : event.target.value)
    setVisibleCount(PAGE_SIZE)
  }

  const handleReset = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        FILTER_KEYS.forEach((key) => next.delete(key))
        return next
      },
      { replace: true }
    )
    setVisibleCount(PAGE_SIZE)
  }

  /* ---------- Filter and sort ---------- */
  const results = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase()
    const minPrice = filters.minPrice !== '' ? Number(filters.minPrice) : null
    const maxPrice = filters.maxPrice !== '' ? Number(filters.maxPrice) : null
    const minBeds = filters.bedrooms !== '' ? Number(filters.bedrooms) : null
    const minBaths = filters.bathrooms !== '' ? Number(filters.bathrooms) : null

    const filtered = properties.filter((property) => {
      if (query) {
        const haystack = [
          property.title,
          property.location,
          property.address,
          property.type,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(query)) return false
      }

      if (filters.type && property.type !== filters.type) return false
      if (filters.status && property.status !== filters.status) return false
      if (minPrice !== null && property.price < minPrice) return false
      if (maxPrice !== null && property.price > maxPrice) return false
      if (minBeds !== null && property.bedrooms < minBeds) return false
      if (minBaths !== null && property.bathrooms < minBaths) return false

      return true
    })

    return filtered.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      const byDate = new Date(b.createdAt) - new Date(a.createdAt)
      return byDate !== 0 ? byDate : b.id - a.id
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    properties,
    debouncedQuery,
    filters.type,
    filters.status,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    sort,
  ])

  const visible = results.slice(0, visibleCount)
  const hasMore = visibleCount < results.length

  return (
    <>
      {/* Page banner */}
      <section className="page-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Properties</span>
          </nav>
          <h1 className="page-banner-title">Our properties</h1>
          <p className="page-banner-text">
            Browse our full collection of luxury apartments, villas,
            penthouses, and commercial spaces.
          </p>
        </Container>
      </section>

      <section className="section properties-section">
        <Container>
          <div className="properties-layout">
            <PropertyFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
              activeCount={activeCount}
              resultsCount={results.length}
            />

            <div className="properties-results">
              {/* Toolbar */}
              <div className="properties-toolbar">
                <p className="properties-count" aria-live="polite">
                  <strong>{results.length}</strong>{' '}
                  {results.length === 1 ? 'property' : 'properties'} found
                </p>

                <div className="properties-toolbar-controls">
                  <div className="properties-sort">
                    <label htmlFor="properties-sort" className="visually-hidden">
                      Sort properties
                    </label>
                    <select
                      id="properties-sort"
                      className="properties-sort-select"
                      value={sort}
                      onChange={handleSortChange}
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="properties-view" role="group" aria-label="Choose layout">
                    <button
                      type="button"
                      className={`properties-view-button${view === 'grid' ? ' is-active' : ''}`}
                      onClick={() => setView('grid')}
                      aria-pressed={view === 'grid'}
                      aria-label="Grid view"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      type="button"
                      className={`properties-view-button${view === 'list' ? ' is-active' : ''}`}
                      onClick={() => setView('list')}
                      aria-pressed={view === 'list'}
                      aria-label="List view"
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <PropertyGrid
                properties={visible}
                view={view}
                columns={2}
                isLoading={isLoading}
                skeletonCount={4}
                emptyTitle="No properties match your search"
                emptyMessage="Try changing or removing some filters to see more results."
                emptyActionLabel={activeCount > 0 ? 'Clear all filters' : undefined}
                onEmptyAction={activeCount > 0 ? handleReset : undefined}
              />

              {/* Load more */}
              {!isLoading && results.length > 0 && (
                <div className="properties-more">
                  <p className="properties-more-text">
                    Showing {visible.length} of {results.length}
                  </p>
                  {hasMore && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    >
                      Load more
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}