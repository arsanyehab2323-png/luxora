import Newsletter from '../../components/common/Newsletter'
import Hero from './Hero'
import FeaturedProperties from './FeaturedProperties'
import Categories from './Categories'
import WhyChooseUs from './WhyChooseUs'
import LatestProperties from './LatestProperties'
import Stats from './Stats'
import Testimonials from './Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Categories />
      <WhyChooseUs />
      <LatestProperties />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  )
}