import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import useProperties from '../../hooks/useProperties'
import { isAvailable } from '../../data/properties'
import { propertyCategories } from '../../data/siteData'
import './Categories.css'

function CategoryCard({ category, count }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <Link
      to={`/properties?type=${encodeURIComponent(category.type)}`}
      className="category-card"
    >
      {!imageFailed && (
        <img
          src={category.image}
          alt=""
          className="category-card-image"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="category-card-overlay" aria-hidden="true" />

      <div className="category-card-content">
        <div>
          <h3 className="category-card-title">{category.label}</h3>
          <p className="category-card-description">{category.description}</p>
        </div>

        <div className="category-card-footer">
          <span className="category-card-count">
            {count} {count === 1 ? 'listing' : 'listings'}
          </span>
          <span className="category-card-arrow" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Categories() {
  const { properties } = useProperties()

  const countFor = (type) =>
    properties.filter(
      (property) => property.type === type && isAvailable(property)
    ).length

  return (
    <section className="section section-cream categories" aria-label="Property categories">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Explore by property type"
          description="From city apartments to private estates, find the kind of space that fits the way you want to live or work."
        />

        <div className="categories-grid">
          {propertyCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={countFor(category.type)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}