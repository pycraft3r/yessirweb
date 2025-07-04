import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { type Product } from './ProductCard'
import './ProductModal.css'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const modal = modalRef.current
    const backdrop = backdropRef.current
    const content = contentRef.current

    if (!modal || !backdrop || !content) return

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Animation timeline
    const tl = gsap.timeline()

    // Backdrop fade in
    tl.fromTo(backdrop, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )

    // Modal scale in
    tl.fromTo(content,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      "-=0.2"
    )

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    const modal = modalRef.current
    const backdrop = backdropRef.current
    const content = contentRef.current

    if (!modal || !backdrop || !content) {
      onClose()
      return
    }

    // Exit animation
    const tl = gsap.timeline({
      onComplete: onClose
    })

    tl.to(content, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    })

    tl.to(backdrop, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.1")
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div 
      ref={modalRef}
      className="product-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={backdropRef}
        className="modal-backdrop"
        onClick={handleBackdropClick}
      />
      
      <div ref={contentRef} className="modal-content">
        <button 
          className="modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="modal-body">
          {/* Product Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.image} 
                alt={`${product.brand} ${product.model}`}
                loading="lazy"
              />
              <div className="image-overlay">
                <button className="zoom-btn" aria-label="Zoom image">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                    <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Thumbnail gallery could go here */}
            <div className="thumbnail-gallery">
              <div className="thumbnail active">
                <img src={product.image} alt="View 1" />
              </div>
              <div className="thumbnail">
                <img src={product.image} alt="View 2" />
              </div>
              <div className="thumbnail">
                <img src={product.image} alt="View 3" />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <div className="product-brand-badge">{product.brand}</div>
              <h2 id="modal-title" className="product-title">
                {product.model}
              </h2>
              <div className="product-category">{product.category}</div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="technical-specs">
              <h3>Teknik Özellikler</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Kategori:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Marka:</span>
                  <span className="spec-value">{product.brand}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Model:</span>
                  <span className="spec-value">{product.model}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Durum:</span>
                  <span className="spec-value status-available">Stokta</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="product-features-detail">
                <h3>Özellikler</h3>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M20 6L9 17L4 12" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="certifications-detail">
                <h3>Sertifikalar</h3>
                <div className="certifications-grid">
                  {product.certifications.map((cert, index) => (
                    <div key={index} className="certification-item">
                      <div className="cert-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="btn btn-primary btn-lg">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Fiyat Teklifi Al
              </button>
              
              <button className="btn btn-outline">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Teknik Döküman
              </button>
              
              <button className="btn btn-outline">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12C9 11.518 8.886 11.062 8.684 10.658C8.482 10.254 8.1851 9.90789 7.82007 9.65735C7.45503 9.40681 7.0351 9.26011 6.60004 9.23141C6.16497 9.20272 5.73024 9.29342 5.34416 9.49332C4.95809 9.69323 4.63582 9.99353 4.41667 10.3584C4.19753 10.7233 4.09137 11.1394 4.10961 11.5567C4.12785 11.974 4.26969 12.3801 4.51953 12.7267C4.76937 13.0734 5.11575 13.3467 5.517 13.514" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M15.316 13.342C15.114 12.938 15 12.482 15 12C15 11.518 15.114 11.062 15.316 10.658C15.518 10.254 15.8149 9.90789 16.1799 9.65735C16.545 9.40681 16.9649 9.26011 17.4 9.23141C17.835 9.20272 18.2698 9.29342 18.6558 9.49332C19.0419 9.69323 19.3642 9.99353 19.5833 10.3584C19.8025 10.7233 19.9086 11.1394 19.8904 11.5567C19.8721 11.974 19.7303 12.3801 19.4805 12.7267C19.2306 13.0734 18.8843 13.3467 18.483 13.514" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M9 12H15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Canlı Destek
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal