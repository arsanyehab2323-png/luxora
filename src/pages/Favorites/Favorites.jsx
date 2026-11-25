import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Heart, Trash2 } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useFavorites from '../../hooks/useFavorites'
import useProperties from '../../hooks/useProperties'
import useToast from '../../hooks/useToast'
import './Favorites.css'

export default function Favorites() {
  const { properties, isLoading } = useProperties()
  const { favoriteIds, clearFavorites } = useFavorites()
  const { showToast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    document.title = 'Favorites | LUXORA'
  }, [])

  // Keep the order the user saved them in, and skip deleted properties
  const saved = favoriteIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean)

  const handleClear = () => {
    clearFavorites()
    setConfirmOpen(false)
    showToast('All favorites removed', 'info')
  }

  return (
    <>
      {/* Page banner */}
      <section className="page-banner">
        <Container>
          <nav className="page-banner-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Favorites</span>
          </nav>
          <h1 className="page-banner-title">Your favorites</h1>
          <p className="page-banner-text">
            Properties you have saved are kept on this device, so you can
            come back to them any time.
          </p>
        </Container>
      </section>

      <section className="section favorites-section" aria-label="Saved properties">
        <Container>
          {isLoading ? (
            <PropertyGrid properties={[]} isLoading skeletonCount={3} />
          ) : saved.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No saved properties yet"
              message="Tap the heart on any property to save it here and compare your favorites later."
              actionLabel="Browse properties"
              actionTo="/properties"
            />
          ) : (
            <>
              <div className="favorites-toolbar">
                <p className="favorites-count" aria-live="polite">
                  <strong>{saved.length}</strong>{' '}
                  {saved.length === 1 ? 'saved property' : 'saved properties'}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  onClick={() => setConfirmOpen(true)}
                >
                  Clear all
                </Button>
              </div>

              <PropertyGrid properties={saved} />
            </>
          )}
        </Container>
      </section>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Remove all favorites?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClear}>
              Remove all
            </Button>
          </>
        }
      >
        <p>
          This will remove all {saved.length} saved{' '}
          {saved.length === 1 ? 'property' : 'properties'} from your list. This
          cannot be undone.
        </p>
      </Modal>
    </>
  )
}