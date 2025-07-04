import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import './ProductCard.css'

export interface Product {
  id: string
  name: string
  brand: string
  model: string
  description: string
  image: string
  category: string
  certifications?: string[]
  features?: string[]
}

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    
    if (cardRef.current && imageRef.current && contentRef.current) {
      // Card lift animation
      gsap.to(cardRef.current, {
        y: -15,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      })

      // Image zoom and rotation
      gsap.to(imageRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.6,
        ease: "power2.out"
      })

      // Content slide up
      gsap.to(contentRef.current, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    
    if (cardRef.current && imageRef.current && contentRef.current) {
      // Reset card position
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      })

      // Reset image
      gsap.to(imageRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out"
      })

      // Reset content
      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product)
    }
  }

  return (
    <div 
      ref={cardRef}
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="medical"
    >
      <div className="product-image-container">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={`${product.brand} ${product.model}`}
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <button 
            className="btn btn-outline view-details-btn"
            onClick={handleViewDetails}
          >
            Detayları İncele
          </button>
        </div>
        
        {/* Certifications badges */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="certifications">
            {product.certifications.slice(0, 2).map((cert, index) => (
              <span key={index} className="certification-badge">
                {cert}
              </span>
            ))}
          </div>
        )}
      </div>

      <div ref={contentRef} className="product-content">
        <div className="product-header">
          <h3 className="product-brand">{product.brand}</h3>
          <span className="product-model">{product.model}</span>
        </div>
        
        <p className="product-description">
          {product.description}
        </p>

        {/* Features preview */}
        {product.features && product.features.length > 0 && (
          <div className="product-features">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="product-actions">
          <button 
            className="btn btn-primary"
            onClick={handleViewDetails}
          >
            Fiyat Teklifi Al
          </button>
          <button className="btn btn-outline btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M21 9V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V9M21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9M21 9H3M16 13H8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Katalog
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard