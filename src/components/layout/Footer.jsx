import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import { companyInfo, footerLinks } from '../../data/siteData'
import './Footer.css'

const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="LUXORA home">
              <span className="footer-logo-mark">L</span>
              <span className="footer-logo-text">{companyInfo.name}</span>
            </Link>
            <p className="footer-tagline">{companyInfo.tagline}</p>
            <p className="footer-description">{companyInfo.description}</p>

            <ul className="footer-social">
              {companyInfo.social.map((item) => {
                const Icon = SOCIAL_ICONS[item.icon]
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="footer-social-link"
                      aria-label={item.label}
                    >
                      {Icon && <Icon size={18} />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Explore */}
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-list">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list footer-contact">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>
                  {companyInfo.address}
                  <br />
                  {companyInfo.city}
                </span>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <span>{companyInfo.phone}</span>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                <span>{companyInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {companyInfo.name}. A frontend portfolio demo. All
            properties, agents, and figures are fictional.
          </p>
        </div>
      </div>
    </footer>
  )
}