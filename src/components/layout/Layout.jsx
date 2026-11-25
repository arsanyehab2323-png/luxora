import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const shellStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}

const mainStyle = {
  flex: 1,
}

export default function Layout() {
  return (
    <div style={shellStyle}>
      <ScrollToTop />
      <Header />
      <main id="main-content" style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}