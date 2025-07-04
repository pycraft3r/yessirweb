import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Collection.css'

gsap.registerPlugin(ScrollTrigger)

interface CollectionProps {
  language: 'tr' | 'en'
}

interface Product {
  id: string
  name: string
  nameEn: string
  category: string
  description: string
  descriptionEn: string
  image: string
  specs: string[]
  specsEn: string[]
  featured?: boolean
}

const Collection: React.FC<CollectionProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', name: 'Tüm Ürünler', nameEn: 'All Products', icon: '🏥' },
    { id: 'diagnostic', name: 'Tanı Cihazları', nameEn: 'Diagnostic Equipment', icon: '🔬' },
    { id: 'surgical', name: 'Cerrahi Ekipmanlar', nameEn: 'Surgical Equipment', icon: '⚕️' },
    { id: 'monitoring', name: 'Monitör Sistemleri', nameEn: 'Monitoring Systems', icon: '📊' },
    { id: 'laboratory', name: 'Laboratuvar', nameEn: 'Laboratory', icon: '🧪' },
    { id: 'emergency', name: 'Acil Tıp', nameEn: 'Emergency Medicine', icon: '🚑' }
  ]

  const products: Product[] = [
    {
      id: '1',
      name: 'UltraScan Pro 5000',
      nameEn: 'UltraScan Pro 5000',
      category: 'diagnostic',
      description: 'Yeni nesil ultrason görüntüleme sistemi, AI destekli tanı özelliği',
      descriptionEn: 'Next-generation ultrasound imaging system with AI-powered diagnostics',
      image: '/assets/products/ultrascan.jpg',
      specs: ['4D Görüntüleme', 'AI Tanı Desteği', '30" Dokunmatik Ekran', 'Kablosuz Prob'],
      specsEn: ['4D Imaging', 'AI Diagnostic Support', '30" Touch Screen', 'Wireless Probe'],
      featured: true
    },
    {
      id: '2',
      name: 'SurgeoMaster X1',
      nameEn: 'SurgeoMaster X1',
      category: 'surgical',
      description: 'Robotik cerrahi asistan sistemi, hassas operasyonlar için',
      descriptionEn: 'Robotic surgical assistant system for precision operations',
      image: '/assets/products/surgeomaster.jpg',
      specs: ['Robotik Kollar', '0.1mm Hassasiyet', 'Haptik Geri Bildirim', '3D Görüntüleme'],
      specsEn: ['Robotic Arms', '0.1mm Precision', 'Haptic Feedback', '3D Visualization'],
      featured: true
    },
    {
      id: '3',
      name: 'VitalGuard 360',
      nameEn: 'VitalGuard 360',
      category: 'monitoring',
      description: 'Kapsamlı hasta monitör sistemi, gerçek zamanlı veri analizi',
      descriptionEn: 'Comprehensive patient monitoring system with real-time data analysis',
      image: '/assets/products/vitalguard.jpg',
      specs: ['12 Parametre', 'Kablosuz Bağlantı', 'Cloud Entegrasyonu', '24 Saat Pil'],
      specsEn: ['12 Parameters', 'Wireless Connectivity', 'Cloud Integration', '24h Battery']
    },
    {
      id: '4',
      name: 'LabGenius 2000',
      nameEn: 'LabGenius 2000',
      category: 'laboratory',
      description: 'Otomatik kan analiz sistemi, 200 test/saat kapasitesi',
      descriptionEn: 'Automated blood analysis system, 200 tests/hour capacity',
      image: '/assets/products/labgenius.jpg',
      specs: ['200 Test/Saat', 'AI Analiz', 'Otomatik Kalibrasyon', 'Barkod Okuyucu'],
      specsEn: ['200 Tests/Hour', 'AI Analysis', 'Auto Calibration', 'Barcode Reader']
    },
    {
      id: '5',
      name: 'CardioSaver Elite',
      nameEn: 'CardioSaver Elite',
      category: 'emergency',
      description: 'Profesyonel defibrilatör, otomatik ritim analizi',
      descriptionEn: 'Professional defibrillator with automatic rhythm analysis',
      image: '/assets/products/cardiosaver.jpg',
      specs: ['Bifazik Teknoloji', 'Otomatik Analiz', 'CPR Rehberi', 'Veri Kayıt'],
      specsEn: ['Biphasic Technology', 'Auto Analysis', 'CPR Guide', 'Data Recording']
    },
    {
      id: '6',
      name: 'MRI Quantum Pro',
      nameEn: 'MRI Quantum Pro',
      category: 'diagnostic',
      description: '3 Tesla MRI sistemi, kuantum teknolojisi ile geliştirilmiş',
      descriptionEn: '3 Tesla MRI system enhanced with quantum technology',
      image: '/assets/products/mriquantum.jpg',
      specs: ['3 Tesla', 'Kuantum Sensörler', 'AI Görüntü İşleme', 'Sessiz Tarama'],
      specsEn: ['3 Tesla', 'Quantum Sensors', 'AI Image Processing', 'Silent Scanning'],
      featured: true
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.collection-hero h1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )

      gsap.fromTo('.collection-hero p',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: 'power3.out' }
      )

      // Category cards animation
      gsap.fromTo('.category-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.categories-grid',
            start: 'top 80%'
          }
        }
      )

      // Product cards animation
      ScrollTrigger.batch('.product-card', {
        onEnter: elements => {
          gsap.fromTo(elements,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              overwrite: true,
              ease: 'power3.out'
            }
          )
        },
        onLeave: elements => {
          gsap.to(elements, {
            opacity: 0,
            y: -100,
            duration: 0.5,
            stagger: 0.15,
            overwrite: true
          })
        },
        onEnterBack: elements => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            overwrite: true
          })
        },
        onLeaveBack: elements => {
          gsap.to(elements, {
            opacity: 0,
            y: 100,
            duration: 0.5,
            stagger: 0.15,
            overwrite: true
          })
        },
        start: 'top bottom-=100',
        end: 'bottom top+=100'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const content = {
    tr: {
      title: 'PREMİUM MEDİKAL KOLEKSİYON',
      subtitle: 'En son teknoloji medikal cihazlar, üstün kalite anlayışı',
      search: 'Ürün ara...',
      viewDetails: 'Detayları Gör',
      specifications: 'Teknik Özellikler',
      downloadCatalog: 'Katalog İndir',
      requestQuote: 'Fiyat Teklifi Al',
      featured: 'Öne Çıkan'
    },
    en: {
      title: 'PREMIUM MEDICAL COLLECTION',
      subtitle: 'State-of-the-art medical devices with superior quality',
      search: 'Search products...',
      viewDetails: 'View Details',
      specifications: 'Specifications',
      downloadCatalog: 'Download Catalog',
      requestQuote: 'Request Quote',
      featured: 'Featured'
    }
  }

  const t = content[language]

  return (
    <div ref={containerRef} className="collection-page">
      {/* Hero Section */}
      <section className="collection-hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <h1 className="text-premium">{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">
                  {language === 'tr' ? category.name : category.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div ref={productGridRef} className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.featured && (
                  <div className="featured-badge">{t.featured}</div>
                )}
                <div className="product-image">
                  <div className="image-placeholder">
                    <span className="placeholder-icon">🏥</span>
                  </div>
                  <div className="product-overlay">
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {t.viewDetails}
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{language === 'tr' ? product.name : product.nameEn}</h3>
                  <p>{language === 'tr' ? product.description : product.descriptionEn}</p>
                  <div className="product-specs">
                    {(language === 'tr' ? product.specs : product.specsEn).slice(0, 2).map((spec, index) => (
                      <span key={index} className="spec-tag">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="product-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            
            <div className="modal-grid">
              <div className="modal-image">
                <div className="image-placeholder-large">
                  <span className="placeholder-icon">🏥</span>
                </div>
              </div>
              
              <div className="modal-info">
                <h2>{language === 'tr' ? selectedProduct.name : selectedProduct.nameEn}</h2>
                <p className="modal-description">
                  {language === 'tr' ? selectedProduct.description : selectedProduct.descriptionEn}
                </p>
                
                <div className="modal-specs">
                  <h3>{t.specifications}</h3>
                  <ul>
                    {(language === 'tr' ? selectedProduct.specs : selectedProduct.specsEn).map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-primary">{t.downloadCatalog}</button>
                  <button className="btn-secondary">{t.requestQuote}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{language === 'tr' ? 'Tüm Koleksiyonu Keşfedin' : 'Explore Full Collection'}</h2>
            <p>{language === 'tr' ? 
              '5000+ premium medikal cihaz kataloğumuzu indirin' : 
              'Download our catalog of 5000+ premium medical devices'
            }</p>
            <button className="btn-premium">{t.downloadCatalog}</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collection