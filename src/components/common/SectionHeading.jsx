import './SectionHeading.css'

/**
 * SectionHeading
 *
 * Props:
 *  - eyebrow: small uppercase label above the title (optional)
 *  - title: main heading text
 *  - description: short paragraph under the title (optional)
 *  - align: 'center' | 'left'
 *  - light: boolean, use light text for dark backgrounds
 *  - as: heading tag to render (default 'h2')
 *  - className: extra class names
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  as: Tag = 'h2',
  className = '',
}) {
  const classes = [
    'section-heading',
    `section-heading-${align}`,
    light ? 'section-heading-light' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {eyebrow && <span className="eyebrow section-heading-eyebrow">{eyebrow}</span>}
      <Tag className="section-heading-title">{title}</Tag>
      <hr className="divider section-heading-divider" />
      {description && <p className="section-heading-description">{description}</p>}
    </div>
  )
}