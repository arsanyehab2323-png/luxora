import { useEffect } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import './NotFound.css'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | LUXORA'
  }, [])

  return (
    <section className="notfound" aria-labelledby="notfound-title">
      <Container narrow>
        <div className="notfound-inner">
          <p className="notfound-code" aria-hidden="true">
            404
          </p>
          <span className="eyebrow">Page not found</span>
          <h1 id="notfound-title" className="notfound-title">
            This page seems to have moved out
          </h1>
          <hr className="divider" />
          <p className="notfound-text">
            The page you are looking for does not exist, or the link may be
            incorrect. Let us help you find your way back.
          </p>

          <div className="notfound-actions">
            <Button to="/" size="lg" icon={ArrowLeft}>
              Back to home
            </Button>
            <Button to="/properties" size="lg" variant="outline" icon={Search}>
              Browse properties
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}