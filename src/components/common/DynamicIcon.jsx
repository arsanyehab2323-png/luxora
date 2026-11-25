import {
  Award,
  Gem,
  Globe,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'

const ICONS = {
  Award,
  Gem,
  Globe,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
}

/**
 * DynamicIcon
 * Renders a Lucide icon from its name string (as used in siteData.js).
 * Falls back to a star if the name is not in the list above.
 *
 * Props:
 *  - name: icon name, e.g. 'ShieldCheck'
 *  - size, strokeWidth, className: passed to the icon
 */
export default function DynamicIcon({ name, size = 24, strokeWidth = 1.75, className = '' }) {
  const Icon = ICONS[name] || Star

  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  )
}