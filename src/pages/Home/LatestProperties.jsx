import { ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useProperties from '../../hooks/useProperties'
import { isAvailable } from '../../data/properties'
import './LatestProperties.css'

const MAX_LATEST = 3

export default function LatestProperties() {
  const { properties, isLoading } = useProperties()

  const latest = [...properties]
    .filter(isAvailable)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, MAX_LATEST)

  return (
    <section className="section latest" aria-label="Latest properties">
      <Container>
        <SectionHeading
          eyebrow="New Arrivals"
          title="Latest properties"
          description="Fresh to the market. Be among the first to view our newest listings before they reach the wider public."
        />

        <PropertyGrid
          properties={latest}
          isLoading={isLoading}
          skeletonCount={MAX_LATEST}
          emptyTitle="No new listings yet"
          emptyMessage="New properties will appear here as soon as they are added."
        />

        <div className="latest-footer">
          <Button
            to="/properties"
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Browse all listings
          </Button>
        </div>
      </Container>
    </section>
  )
}