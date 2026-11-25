import Container from '../../components/common/Container'
import DynamicIcon from '../../components/common/DynamicIcon'
import SectionHeading from '../../components/common/SectionHeading'
import { whyChooseUs } from '../../data/siteData'
import './WhyChooseUs.css'

export default function WhyChooseUs() {
  return (
    <section className="section section-dark why" aria-label="Why choose LUXORA">
      <Container>
        <SectionHeading
          light
          eyebrow="Why LUXORA"
          title="A higher standard of real estate"
          description="We combine local expertise, careful curation, and genuine care for every client, from the first conversation to the final handover."
        />

        <div className="why-grid">
          {whyChooseUs.map((item) => (
            <article key={item.id} className="why-card">
              <div className="why-card-icon">
                <DynamicIcon name={item.icon} size={28} />
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}