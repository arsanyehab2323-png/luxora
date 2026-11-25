/* ==========================================================================
   LUXORA Demo Agent Data
   All agents are fictional and used for portfolio demonstration only.
   ========================================================================== */

const portrait = (id, width = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${Math.round(width * 1.2)}&q=80`

export const initialAgents = [
  {
    id: 1,
    name: 'Alexander Hartwell',
    role: 'Senior Partner',
    specialization: 'Luxury Villas & Waterfront Estates',
    experience: 18,
    languages: ['English', 'French', 'Arabic'],
    email: 'alexander.hartwell@example.com',
    phone: '+971 4 555 0101',
    location: 'Dubai, UAE',
    propertiesSold: 214,
    bio: 'Alexander leads LUXORA’s international private-client desk, advising families and investors on trophy villas and waterfront estates across the Gulf and the Riviera. Known for his discreet, relationship-first approach, he has closed some of the region’s most significant residential transactions.',
    image: portrait('photo-1560250097-0b93528c311a'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
  {
    id: 2,
    name: 'Isabella Moreno',
    role: 'Director of Residential Sales',
    specialization: 'Modern Estates & Hillside Homes',
    experience: 14,
    languages: ['English', 'Spanish'],
    email: 'isabella.moreno@example.com',
    phone: '+1 305 555 0142',
    location: 'Miami, USA',
    propertiesSold: 167,
    bio: 'Isabella specializes in contemporary architecture and high-end residential estates in Miami and Los Angeles. Her design-led eye and sharp negotiation skills have made her a trusted advisor to buyers seeking homes with lasting value.',
    image: portrait('photo-1573496359142-b8d87734a5a2'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
  {
    id: 3,
    name: 'Oliver Whitmore',
    role: 'Head of European Properties',
    specialization: 'Prime London & Alpine Residences',
    experience: 16,
    languages: ['English', 'German'],
    email: 'oliver.whitmore@example.com',
    phone: '+44 20 5550 0183',
    location: 'London, UK',
    propertiesSold: 189,
    bio: 'Oliver oversees LUXORA’s European portfolio, from period apartments in Mayfair to ski chalets in the Swiss Alps. With over a decade in prime central London, he brings deep market knowledge and a calm, thorough approach to every client.',
    image: portrait('photo-1507003211169-0a1dd7228f2d'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
  {
    id: 4,
    name: 'Sophia Laurent',
    role: 'Senior Property Consultant',
    specialization: 'Luxury Apartments & City Living',
    experience: 11,
    languages: ['English', 'French', 'Italian'],
    email: 'sophia.laurent@example.com',
    phone: '+1 212 555 0176',
    location: 'New York, USA',
    propertiesSold: 126,
    bio: 'Sophia helps buyers and renters find exceptional apartments in Manhattan and Miami’s most coveted buildings. Her clients value her honesty, her speed, and her talent for spotting homes before they reach the open market.',
    image: portrait('photo-1580489944761-15a19d654956'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
  {
    id: 5,
    name: 'Daniel Rashid',
    role: 'Penthouse & Sky Residence Specialist',
    specialization: 'Penthouses & Branded Residences',
    experience: 13,
    languages: ['English', 'Arabic'],
    email: 'daniel.rashid@example.com',
    phone: '+971 4 555 0165',
    location: 'Dubai, UAE',
    propertiesSold: 148,
    bio: 'Daniel focuses on the world’s most exclusive sky homes, from Palm Jumeirah to Central Park West. He pairs a data-driven view of the market with a tailored, concierge-level service for international buyers.',
    image: portrait('photo-1472099645785-5658abf4ff4e'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
  {
    id: 6,
    name: 'Charlotte Bennett',
    role: 'Head of Commercial Property',
    specialization: 'Offices, Retail & Investment Assets',
    experience: 15,
    languages: ['English'],
    email: 'charlotte.bennett@example.com',
    phone: '+44 20 5550 0129',
    location: 'London, UK',
    propertiesSold: 98,
    bio: 'Charlotte leads LUXORA’s commercial division, advising corporations and investors on prime offices, flagship retail, and income-producing assets. Her analytical approach and strong market relationships deliver clear, confident outcomes.',
    image: portrait('photo-1438761681033-6461ffad8d80'),
    social: { linkedin: '#', instagram: '#', twitter: '#' },
  },
]

/* ---------- Helpers ---------- */

export const getAgentById = (agents, id) =>
  agents.find((agent) => agent.id === Number(id))