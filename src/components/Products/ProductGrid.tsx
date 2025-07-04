import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard, { type Product } from './ProductCard'
import ProductModal from './ProductModal'
import './ProductGrid.css'

gsap.registerPlugin(ScrollTrigger)

interface ProductGridProps {
  products?: Product[]
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4
  showFilter?: boolean
  viewMode?: 'grid' | 'list'
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Endopath Stapler',
    brand: 'ETHICON',
    model: 'GST60B',
    description: 'Endopath™ teknolojisinin zirvesi. Cerrahi mükemmellik için tasarlandı.',
    image: '/assets/images/products/ethicon-gst60b.jpg',
    category: 'Endoscopic',
    certifications: ['CE', 'FDA'],
    features: ['Sterile', 'Single Use', 'Precision Cut']
  },
  {
    id: '2',
    name: 'Arthroscopy System',
    brand: 'SMITH & NEPHEW',
    model: '7205310',
    description: 'Ortopedik cerrahide güvenin adresi. Hassasiyet ve dayanıklılığın birleşimi.',
    image: '/assets/images/products/smith-nephew-7205310.jpg',
    category: 'Orthopedic',
    certifications: ['CE', 'ISO'],
    features: ['HD Vision', 'Ergonomic', 'Durable']
  },
  {
    id: '3',
    name: 'Laparoscopic Trocar',
    brand: 'COVIDIEN',
    model: 'LTR12',
    description: 'Minimal invaziv cerrahi için gelişmiş trokar sistemi.',
    image: '/assets/images/products/covidien-ltr12.jpg',
    category: 'Laparoscopic',
    certifications: ['CE', 'FDA'],
    features: ['Bladeless', 'Safety Shield', 'Easy Insertion']
  },
  {
    id: '4',
    name: 'Cardiac Stent',
    brand: 'BOSTON SCIENTIFIC',
    model: 'CS-2024',
    description: 'Kardiyovasküler müdahaleler için yenilikçi stent teknolojisi.',
    image: '/assets/images/products/boston-cs2024.jpg',
    category: 'Cardiovascular',
    certifications: ['CE', 'FDA', 'ISO'],
    features: ['Drug Eluting', 'Cobalt Chromium', 'Biocompatible']
  },
  {
    id: '5',
    name: 'Surgical Drill',
    brand: 'STRYKER',
    model: 'SD-Pro',
    description: 'Ortopedik cerrahide hassasiyet ve güç bir arada.',
    image: '/assets/images/products/stryker-sdpro.jpg',
    category: 'Orthopedic',
    certifications: ['CE', 'FDA'],
    features: ['Variable Speed', 'LED Light', 'Autoclavable']
  },
  {
    id: '6',
    name: 'Pacemaker',
    brand: 'MEDTRONIC',
    model: 'PM-Elite',
    description: 'Gelişmiş kalp pili teknolojisi ile yaşam kalitesi.',
    image: '/assets/images/products/medtronic-pmelite.jpg',
    category: 'Cardiovascular',
    certifications: ['CE', 'FDA', 'ISO'],
    features: ['MRI Compatible', 'Bluetooth', 'Long Battery']
  }
]

const ProductGrid: React.FC<ProductGridProps> = ({
  products = sampleProducts,
  title = "Premium Koleksiyon",
  subtitle = "Dünya standartlarında cerrahi ekipmanlar",
  columns = 3,
  showFilter = true,
  viewMode = 'grid'
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentViewMode, setCurrentViewMode] = useState<'grid' | 'list'>(viewMode)
  
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === activeFilter))
    }
  }, [activeFilter, products])

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !gridRef.current) return

    // Animate title and subtitle
    gsap.fromTo([titleRef.current, subtitleRef.current], 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate product cards
    const cards = gridRef.current.querySelectorAll('.product-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [filteredProducts])

  const handleFilterChange = (category: string) => {
    setActiveFilter(category)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }


  return (
    <section className="product-grid-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 ref={titleRef} className="section-title">
            {title}
          </h2>
          <p ref={subtitleRef} className="section-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Filters and Controls */}
        {showFilter && (
          <div className="grid-controls">
            <div className="filter-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category)}
                >
                  {category === 'all' ? 'Tümü' : category}
                </button>
              ))}
            </div>
            
            <div className="view-controls">
              <button 
                className={`view-toggle ${currentViewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setCurrentViewMode('grid')}
                aria-label="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button 
                className={`view-toggle ${currentViewMode === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentViewMode('list')}
                aria-label="List view"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className={`products-grid ${currentViewMode}-view columns-${columns}`}
        >
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleProductSelect}
            />
          ))}
        </div>

        {/* Load More */}
        {filteredProducts.length > 6 && (
          <div className="load-more-section">
            <button className="btn btn-outline btn-lg">
              Daha Fazla Ürün Görüntüle
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}

export default ProductGrid