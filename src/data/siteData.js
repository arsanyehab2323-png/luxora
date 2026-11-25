/* ==========================================================================
   LUXORA Site Content
   All content is fictional and used for portfolio demonstration only.
   Icon values are Lucide React icon names; components map them to icons.
   ========================================================================== */

const photo = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

/* ---------- Navigation ---------- */

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Agents', path: '/agents' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const footerLinks = {
  explore: [
    { label: 'Home', path: '/' },
    { label: 'All Properties', path: '/properties' },
    { label: 'Our Agents', path: '/agents' },
    { label: 'Favorites', path: '/favorites' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Admin Dashboard', path: '/dashboard' },
  ],
}

/* ---------- Company Info ---------- */

export const companyInfo = {
  name: 'LUXORA',
  tagline: 'Exceptional homes for exceptional lives',
  description:
    'LUXORA is a fictional luxury real estate brand created for a frontend portfolio demonstration. Every listing, agent, and figure on this site is demo content.',
  email: 'hello@luxora.example.com',
  phone: '+1 (555) 010-2030',
  address: '100 Grand Avenue, Suite 2500',
  city: 'New York, NY 10001',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
  coordinates: { lat: 40.7527, lng: -73.9772 },
  social: [
    { label: 'Instagram', icon: 'Instagram', href: '#' },
    { label: 'Facebook', icon: 'Facebook', href: '#' },
    { label: 'Twitter', icon: 'Twitter', href: '#' },
    { label: 'LinkedIn', icon: 'Linkedin', href: '#' },
  ],
}

/* ---------- Homepage ---------- */

export const heroContent = {
  eyebrow: 'Luxury Real Estate',
  title: 'Find a home as extraordinary as your life',
  subtitle:
    'Discover a curated collection of the world’s finest apartments, villas, penthouses, and commercial spaces.',
  image: photo('photo-1600607687939-ce8a6c25118c', 2000),
}

export const propertyCategories = [
  {
    id: 'apartment',
    type: 'Apartment',
    label: 'Apartments',
    description: 'Refined city living',
    image: photo('photo-1545324418-cc1a3fa10c00', 900),
  },
  {
    id: 'villa',
    type: 'Villa',
    label: 'Villas',
    description: 'Private estates and retreats',
    image: photo('photo-1613490493576-7fde63acd811', 900),
  },
  {
    id: 'penthouse',
    type: 'Penthouse',
    label: 'Penthouses',
    description: 'Homes above the skyline',
    image: photo('photo-1512917774080-9991f1c4c750', 900),
  },
  {
    id: 'commercial',
    type: 'Commercial',
    label: 'Commercial',
    description: 'Prime offices and retail',
    image: photo('photo-1486406146926-c627a92ad1ab', 900),
  },
]

export const whyChooseUs = [
  {
    id: 1,
    icon: 'ShieldCheck',
    title: 'Trusted Expertise',
    text: 'Decades of combined experience guiding clients through every stage of a purchase, sale, or rental.',
  },
  {
    id: 2,
    icon: 'Gem',
    title: 'Curated Collection',
    text: 'Every property is personally reviewed, so you only see homes that meet our standard of quality.',
  },
  {
    id: 3,
    icon: 'Globe',
    title: 'Global Reach',
    text: 'Offices and partners across major cities connect you with opportunities around the world.',
  },
  {
    id: 4,
    icon: 'HeartHandshake',
    title: 'Personal Service',
    text: 'A dedicated advisor listens first, then tailors every search and negotiation to your goals.',
  },
]

export const companyStats = [
  { id: 1, value: 25, suffix: '+', label: 'Years of Experience' },
  { id: 2, value: 1200, suffix: '+', label: 'Properties Sold' },
  { id: 3, value: 40, suffix: '+', label: 'Expert Agents' },
  { id: 4, value: 15, suffix: '', label: 'Cities Worldwide' },
]

/* ---------- About Page ---------- */

export const aboutContent = {
  heroImage: photo('photo-1486406146926-c627a92ad1ab', 2000),
  storyImage: photo('photo-1600585154340-be6161a56a0c', 1200),
  intro:
    'LUXORA was imagined as a real estate house where design, discretion, and honest advice come first. We connect people with homes and spaces that fit the way they want to live.',
  story: [
    'The idea began with a simple frustration: luxury property search felt impersonal, crowded, and slow. We set out to build something different, a small team of advisors who know every property they show and every client they serve.',
    'Today, our portfolio spans apartments, villas, penthouses, and commercial spaces in some of the world’s most sought-after locations. Our approach has not changed: listen carefully, advise honestly, and handle every detail with care.',
  ],
  mission:
    'To make buying, selling, and renting exceptional property simple, transparent, and rewarding.',
  vision:
    'To be the most trusted name in luxury real estate, known for service as refined as the homes we represent.',
}

export const achievements = [
  { id: 1, icon: 'Award', title: 'Best Luxury Agency', text: 'Demo award, 2025' },
  { id: 2, icon: 'TrendingUp', title: '$2B+ in Sales', text: 'Combined portfolio value' },
  { id: 3, icon: 'Star', title: '4.9 Client Rating', text: 'Average across reviews' },
  { id: 4, icon: 'Users', title: '98% Retention', text: 'Clients who return to us' },
]

export const companyValues = [
  {
    id: 1,
    icon: 'Handshake',
    title: 'Integrity',
    text: 'We tell clients what they need to hear, not what is easiest to say.',
  },
  {
    id: 2,
    icon: 'Sparkles',
    title: 'Excellence',
    text: 'From photography to paperwork, we hold every detail to a high standard.',
  },
  {
    id: 3,
    icon: 'Lock',
    title: 'Discretion',
    text: 'Privacy is part of the service. Your plans and details stay protected.',
  },
  {
    id: 4,
    icon: 'Lightbulb',
    title: 'Insight',
    text: 'Local knowledge and market data guide every recommendation we make.',
  },
]

export const teamMembers = [
  {
    id: 1,
    name: 'Victoria Ashford',
    role: 'Founder & CEO',
    image: photo('photo-1573497019940-1c28c88b4f3e', 600),
  },
  {
    id: 2,
    name: 'Nathaniel Brooks',
    role: 'Chief Operating Officer',
    image: photo('photo-1560250097-0b93528c311a', 600),
  },
  {
    id: 3,
    name: 'Sofia Marchetti',
    role: 'Head of Design & Marketing',
    image: photo('photo-1580489944761-15a19d654956', 600),
  },
  {
    id: 4,
    name: 'Kenji Watanabe',
    role: 'Head of Investments',
    image: photo('photo-1472099645785-5658abf4ff4e', 600),
  },
]

/* ---------- Contact Page ---------- */

export const contactSubjects = [
  'Buying a property',
  'Selling a property',
  'Renting a property',
  'Commercial enquiry',
  'General question',
]

/* ---------- Newsletter ---------- */

export const newsletterContent = {
  title: 'Receive private listings first',
  text: 'Join our newsletter for new arrivals, market insights, and invitations to private viewings. This is a demo form, so no email is actually sent.',
}