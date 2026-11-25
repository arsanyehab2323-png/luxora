/**
 * Container
 *
 * Props:
 *  - narrow: boolean, uses the narrower max-width (good for text-heavy sections)
 *  - as: the HTML tag to render (default 'div')
 *  - className: extra class names
 */
export default function Container({
  children,
  narrow = false,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const classes = [narrow ? 'container-narrow' : 'container', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}