import EmptyState from '../common/EmptyState'
import PropertyCard from './PropertyCard'
import './PropertyGrid.css'

function PropertyCardSkeleton({ view }) {
  return (
    <div
      className={`property-skeleton property-skeleton-${view}`}
      aria-hidden="true"
    >
      <div className="skeleton property-skeleton-media" />
      <div className="property-skeleton-body">
        <div className="skeleton property-skeleton-line property-skeleton-line-sm" />
        <div className="skeleton property-skeleton-line property-skeleton-line-lg" />
        <div className="skeleton property-skeleton-line property-skeleton-line-md" />
        <div className="skeleton property-skeleton-line property-skeleton-line-full" />
      </div>
    </div>
  )
}

/**
 * PropertyGrid
 *
 * Props:
 *  - properties: array of property objects
 *  - view: 'grid' | 'list'
 *  - isLoading: boolean, shows skeleton cards
 *  - skeletonCount: number of skeletons to show (default 6)
 *  - columns: 2 | 3, number of columns on large screens in grid view (default 3)
 *  - emptyTitle, emptyMessage: text for the empty state
 *  - emptyActionLabel, onEmptyAction: optional button in the empty state
 *  - className: extra class names
 */
export default function PropertyGrid({
  properties,
  view = 'grid',
  isLoading = false,
  skeletonCount = 6,
  columns = 3,
  emptyTitle = 'No properties found',
  emptyMessage = 'Try adjusting your search or filters to see more results.',
  emptyActionLabel,
  onEmptyAction,
  className = '',
}) {
  const classes = [
    'property-grid',
    `property-grid-${view}`,
    `property-grid-cols-${columns}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isLoading) {
    return (
      <div className={classes} aria-busy="true" aria-label="Loading properties">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <PropertyCardSkeleton key={index} view={view} />
        ))}
      </div>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    )
  }

  return (
    <div className={classes}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} view={view} />
      ))}
    </div>
  )
}