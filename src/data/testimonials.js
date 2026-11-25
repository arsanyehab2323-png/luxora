/* ==========================================================================
   LUXORA Demo Testimonials
   All testimonials are fictional and used for portfolio demonstration only.
   ========================================================================== */

const avatar = (id, size = 200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`

export const testimonials = [
  {
    id: 1,
    name: 'Marcus Feldman',
    role: 'Private Investor',
    location: 'Dubai, UAE',
    rating: 5,
    quote:
      'From the first viewing to the final signature, the LUXORA team handled everything with precision and discretion. They found us a penthouse we never would have discovered on our own.',
    image: avatar('photo-1519085360753-af0119f7cbe7'),
  },
  {
    id: 2,
    name: 'Elena Vasquez',
    role: 'Architect',
    location: 'Miami, USA',
    rating: 5,
    quote:
      'As someone who cares deeply about design, I was impressed by how well they understood what I was looking for. Every property they showed me was exceptional.',
    image: avatar('photo-1494790108377-be9c29b29330'),
  },
  {
    id: 3,
    name: 'James Whitfield',
    role: 'Company Director',
    location: 'London, UK',
    rating: 5,
    quote:
      'Professional, responsive, and genuinely knowledgeable about the market. Our office relocation was completed ahead of schedule, with no surprises along the way.',
    image: avatar('photo-1500648767791-00dcc994a43e'),
  },
  {
    id: 4,
    name: 'Amira Haddad',
    role: 'Entrepreneur',
    location: 'Monaco, Monaco',
    rating: 5,
    quote:
      'Buying abroad can feel daunting, but LUXORA made it feel effortless. Clear communication, honest advice, and a level of service I had not experienced before.',
    image: avatar('photo-1438761681033-6461ffad8d80'),
  },
  {
    id: 5,
    name: 'Thomas Brandt',
    role: 'Surgeon',
    location: 'Zermatt, Switzerland',
    rating: 4,
    quote:
      'We rented an alpine chalet for the winter season and the experience was flawless. Every detail was prepared before we arrived, and support was always a call away.',
    image: avatar('photo-1507003211169-0a1dd7228f2d'),
  },
]