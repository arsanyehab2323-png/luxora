import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'
import useFavorites from '../../hooks/useFavorites'
import { navLinks } from '../../data/siteData'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  const { favoritesCount } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'
  const isTransparent = isHome && !scrolled && !menuOpen

  // Turn the header solid once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const headerClasses = [
    'header',
    isTransparent ? 'header-transparent' : 'header-solid',
    menuOpen ? 'header-menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClasses}>
      <div className="container header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu} aria-label="LUXORA home">
          <span className="header-logo-mark">L</span>
          <span className="header-logo-text">LUXORA</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `header-link${isActive ? ' header-link-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            to="/favorites"
            className="header-favorites"
            onClick={closeMenu}
            aria-label={`Favorites, ${favoritesCount} saved`}
          >
            <Heart size={22} />
            {favoritesCount > 0 && (
              <span className="header-favorites-badge">{favoritesCount}</span>
            )}
          </Link>

          <button
            type="button"
            className="header-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' mobile-menu-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) =>
                `mobile-menu-link${isActive ? ' mobile-menu-link-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className={({ isActive }) =>
              `mobile-menu-link${isActive ? ' mobile-menu-link-active' : ''}`
            }
          >
            Favorites{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}