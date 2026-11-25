import { ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import PropertyGrid from '../../components/properties/PropertyGrid'
import useProperties from '../../hooks/useProperties'
import { isAvailable } from '../../data/properties'
import './FeaturedProperties.css'

const MAX_FEATURED = 6

export default function FeaturedProperties() {
  const { properties, isLoading } = useProperties()

  const featured = properties
    .filter((property) => property.featured && isAvailable(property))
    .slice(0, MAX_FEATURED)

  return (
    <section className="section featured" aria-label="Featured luxury properties">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Featured luxury properties"
          description="A hand-picked selection of our most exceptional homes, chosen for their design, location, and lasting value."
        />

        <PropertyGrid
          properties={featured}
          isLoading={isLoading}
          skeletonCount={3}
          emptyTitle="No featured properties yet"
          emptyMessage="Mark a property as featured from the dashboard and it will appear here."
        />

        <div className="featured-footer">
          <Button
            to="/properties"
            variant="outline"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            View all properties
          </Button>
        </div>
      </Container>
    </section>
  )
}