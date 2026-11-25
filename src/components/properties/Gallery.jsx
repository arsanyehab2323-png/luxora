import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from 'lucide-react'
import './Gallery.css'

/**
 * Gallery
 *
 * Props:
 *  - images: array of image URLs
 *  - title: property title, used for alt text
 */
export default function Gallery({ images = [], title = 'Property' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [failed, setFailed] = useState({})

  const total = images.length
  const safeIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % total)
  }, [total])

  const markFailed = (index) => {
    setFailed((prev) => ({ ...prev, [index]: true }))
  }

  // Keyboard controls and scroll lock while the lightbox is open
  useEffect(() => {
    if (!lightboxOpen || total === 0) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen, total, goPrev, goNext])

  if (total === 0) {
    return (
      <div className="gallery">
        <div className="gallery-main gallery-empty">
          <ImageOff size={48} strokeWidth={1.5} aria-hidden="true" />
          <p>No photos available</p>
        </div>
      </div>
    )
  }

  const renderImage = (index, className, loading = 'lazy') =>
    failed[index] ? (
      <div className={`gallery-placeholder ${className}`} aria-hidden="true">
        <ImageOff size={40} strokeWidth={1.5} />
      </div>
    ) : (
      <img
        src={images[index]}
        alt={`${title}, photo ${index + 1} of ${total}`}
        className={className}
        loading={loading}
        onError={() => markFailed(index)}
      />
    )

  return (
    <div className="gallery">
      {/* Main image */}
      <div className="gallery-main">
        <button
          type="button"
          className="gallery-main-button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open photo in full screen"
        >
          {renderImage(safeIndex, 'gallery-main-image', 'eager')}
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-prev"
              onClick={goPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-next"
              onClick={goNext}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <span className="gallery-counter" aria-live="polite">
          {safeIndex + 1} / {total}
        </span>

        <button
          type="button"
          className="gallery-expand"
          onClick={() => setLightboxOpen(true)}
          aria-label="View full screen"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <ul className="gallery-thumbs">
          {images.map((_, index) => (
            <li key={index}>
              <button
                type="button"
                className={`gallery-thumb${index === safeIndex ? ' is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === safeIndex}
              >
                {renderImage(index, 'gallery-thumb-image')}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      {lightboxOpen &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photo viewer`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setLightboxOpen(false)
            }}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close photo viewer"
            >
              <X size={26} />
            </button>

            <div className="lightbox-stage">
              {renderImage(safeIndex, 'lightbox-image', 'eager')}
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-arrow lightbox-arrow-prev"
                  onClick={goPrev}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  type="button"
                  className="lightbox-arrow lightbox-arrow-next"
                  onClick={goNext}
                  aria-label="Next photo"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}

            <p className="lightbox-counter">
              {safeIndex + 1} / {total}
            </p>
          </div>,
          document.body
        )}
    </div>
  )
}