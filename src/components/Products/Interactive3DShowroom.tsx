import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Text, 
  Float, 
  Html, 
  Environment, 
  ContactShadows,
  Sparkles,
  Billboard,
  Box,
  Sphere,
  Cylinder
} from '@react-three/drei'
import { gsap } from 'gsap'
import { Mesh, Group } from 'three'
import './Interactive3DShowroom.css'

// Product data interface
interface Product {
  id: string
  name: string
  nameEn: string
  category: string
  brand: string
  description: string
  descriptionEn: string
  price: string
  certifications: string[]
  image: string
  model3d?: string
  specifications: {
    material: string
    dimensions: string
    weight: string
    sterilization: string
  }
}

// Mock product data
const products: Product[] = [
  {
    id: 'ethicon-gst60b',
    name: 'Ethicon Endoscopic Linear Cutter',
    nameEn: 'Ethicon Endoscopic Linear Cutter',
    category: 'Cerrahi Aletler',
    brand: 'Ethicon',
    description: 'Endoskopik cerrahi için yüksek kaliteli lineer kesici',
    descriptionEn: 'High-quality linear cutter for endoscopic surgery',
    price: '$1,250',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    image: '/assets/images/products/ethicon-gst60b.jpg',
    specifications: {
      material: 'Stainless Steel',
      dimensions: '23cm x 3cm',
      weight: '120g',
      sterilization: 'Steam, ETO'
    }
  },
  {
    id: 'smith-nephew-7205310',
    name: 'Smith & Nephew Arthroskopi Sistemi',
    nameEn: 'Smith & Nephew Arthroscopy System',
    category: 'Görüntüleme',
    brand: 'Smith & Nephew',
    description: 'Yüksek çözünürlüklü arthroskopi sistemi',
    descriptionEn: 'High-resolution arthroscopy system',
    price: '$15,800',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    image: '/assets/images/products/smith-nephew-scope.jpg',
    specifications: {
      material: 'Titanium Alloy',
      dimensions: '30cm x 0.8cm',
      weight: '85g',
      sterilization: 'Steam Autoclave'
    }
  },
  {
    id: 'medtronic-stapler',
    name: 'Medtronic Dikiş Makinesi',
    nameEn: 'Medtronic Surgical Stapler',
    category: 'Dikiş Sistemleri',
    brand: 'Medtronic',
    description: 'Hassas cerrahi dikiş sistemi',
    descriptionEn: 'Precision surgical stapling system',
    price: '$890',
    certifications: ['CE', 'FDA'],
    image: '/assets/images/products/medtronic-stapler.jpg',
    specifications: {
      material: 'Medical Grade Plastic',
      dimensions: '25cm x 5cm',
      weight: '200g',
      sterilization: 'Single Use'
    }
  }
]

// 3D Product Model Component
const Product3DModel = ({ 
  product, 
  position, 
  isSelected, 
  onClick 
}: { 
  product: Product
  position: [number, number, number]
  isSelected: boolean
  onClick: () => void 
}) => {
  const meshRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      
      if (isSelected) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }
  })

  useEffect(() => {
    if (groupRef.current && isSelected) {
      gsap.to(groupRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.5,
        ease: "power2.out"
      })
    } else if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [isSelected])

  // Fallback 3D shapes for different product categories
  const renderProductShape = () => {
    switch (product.category) {
      case 'Cerrahi Aletler':
        return (
          <Cylinder ref={meshRef} args={[0.1, 0.2, 2]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={isSelected ? "#FFD700" : "#C0C0C0"} 
              metalness={0.8} 
              roughness={0.2}
            />
          </Cylinder>
        )
      case 'Görüntüleme':
        return (
          <Box ref={meshRef} args={[0.3, 1.5, 0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={isSelected ? "#00D4FF" : "#333333"} 
              metalness={0.6} 
              roughness={0.3}
            />
          </Box>
        )
      case 'Dikiş Sistemleri':
        return (
          <Box ref={meshRef} args={[1, 0.3, 0.2]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={isSelected ? "#FF6B6B" : "#666666"} 
              metalness={0.5} 
              roughness={0.4}
            />
          </Box>
        )
      default:
        return (
          <Sphere ref={meshRef} args={[0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={isSelected ? "#FFD700" : "#808080"} 
              metalness={0.7} 
              roughness={0.3}
            />
          </Sphere>
        )
    }
  }

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        {renderProductShape()}
        
        {/* Product label */}
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.2}
            color={isSelected ? "#FFD700" : "#FFFFFF"}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            {product.name}
          </Text>
          <Text
            position={[0, 1.2, 0]}
            fontSize={0.12}
            color={isSelected ? "#00D4FF" : "#CCCCCC"}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Regular.woff"
          >
            {product.brand}
          </Text>
        </Billboard>

        {/* Selection glow */}
        {isSelected && (
          <Sparkles 
            count={50} 
            scale={2} 
            size={2} 
            speed={0.5} 
            color="#FFD700" 
            opacity={0.6}
          />
        )}
      </Float>
      
      {/* Contact shadow */}
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1, 0]}
        opacity={0.3}
        width={2}
        height={2}
        blur={1}
        far={1}
      />
    </group>
  )
}

// Camera Controls Component
const CameraController = ({ selectedProduct }: { selectedProduct: Product | null }) => {
  const { camera } = useThree()
  
  useEffect(() => {
    if (selectedProduct) {
      gsap.to(camera.position, {
        x: 3,
        y: 2,
        z: 5,
        duration: 1.5,
        ease: "power3.out"
      })
    } else {
      gsap.to(camera.position, {
        x: 0,
        y: 5,
        z: 8,
        duration: 1.5,
        ease: "power3.out"
      })
    }
  }, [selectedProduct, camera])

  return null
}

// Product Info Panel Component
const ProductInfoPanel = ({ 
  product, 
  onClose, 
  language 
}: { 
  product: Product | null
  onClose: () => void
  language: 'tr' | 'en'
}) => {
  if (!product) return null

  return (
    <div className="product-info-panel">
      <button className="close-btn" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>
      
      <div className="product-info-content">
        <div className="product-header">
          <h2>{language === 'tr' ? product.name : product.nameEn}</h2>
          <div className="product-meta">
            <span className="brand">{product.brand}</span>
            <span className="price">{product.price}</span>
          </div>
        </div>

        <div className="product-description">
          <p>{language === 'tr' ? product.description : product.descriptionEn}</p>
        </div>

        <div className="product-specifications">
          <h3>{language === 'tr' ? 'Teknik Özellikler' : 'Specifications'}</h3>
          <div className="spec-grid">
            <div className="spec-item">
              <span className="spec-label">
                {language === 'tr' ? 'Malzeme' : 'Material'}:
              </span>
              <span className="spec-value">{product.specifications.material}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">
                {language === 'tr' ? 'Boyutlar' : 'Dimensions'}:
              </span>
              <span className="spec-value">{product.specifications.dimensions}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">
                {language === 'tr' ? 'Ağırlık' : 'Weight'}:
              </span>
              <span className="spec-value">{product.specifications.weight}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">
                {language === 'tr' ? 'Sterilizasyon' : 'Sterilization'}:
              </span>
              <span className="spec-value">{product.specifications.sterilization}</span>
            </div>
          </div>
        </div>

        <div className="product-certifications">
          <h3>{language === 'tr' ? 'Sertifikalar' : 'Certifications'}</h3>
          <div className="cert-badges">
            {product.certifications.map((cert, index) => (
              <span key={index} className="cert-badge">{cert}</span>
            ))}
          </div>
        </div>

        <div className="product-actions">
          <button className="btn-primary">
            {language === 'tr' ? 'Teklif Al' : 'Get Quote'}
          </button>
          <button className="btn-secondary">
            {language === 'tr' ? 'Detaylar' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Component
const Interactive3DShowroom = ({ language = 'tr' }: { language?: 'tr' | 'en' }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  // const [hoveredProduct, setHoveredProduct] = useState<string | null>(null) // Removed unused state
  const [showControls, setShowControls] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product === selectedProduct ? null : product)
  }

  const getProductPosition = (index: number): [number, number, number] => {
    const angle = (index * Math.PI * 2) / products.length
    const radius = 4
    return [
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius
    ]
  }

  return (
    <div className="interactive-3d-showroom" ref={containerRef}>
      <div className="showroom-header">
        <h2 className="showroom-title">
          {language === 'tr' ? 'İnteraktif Ürün Galerisi' : 'Interactive Product Gallery'}
        </h2>
        <p className="showroom-subtitle">
          {language === 'tr' 
            ? 'Ürünleri 3D ortamda inceleyin ve detayları keşfedin'
            : 'Explore products in 3D environment and discover details'
          }
        </p>
      </div>

      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 5, 8], fov: 50 }}
          shadows
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={
            <Html center>
              <div className="loading-3d">
                <div className="loader-3d"></div>
                <p>{language === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
              </div>
            </Html>
          }>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              castShadow
            />
            <pointLight position={[0, 10, 0]} intensity={0.3} color="#00D4FF" />
            <pointLight position={[-10, 5, -10]} intensity={0.2} color="#FFD700" />

            {/* Environment */}
            <Environment preset="studio" />

            {/* Products */}
            {products.map((product, index) => (
              <Product3DModel
                key={product.id}
                product={product}
                position={getProductPosition(index)}
                isSelected={selectedProduct?.id === product.id}
                onClick={() => handleProductClick(product)}
              />
            ))}

            {/* Camera controls */}
            <CameraController selectedProduct={selectedProduct} />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={15}
              maxPolarAngle={Math.PI / 2}
            />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                metalness={0.8} 
                roughness={0.2}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Suspense>
        </Canvas>

        {/* Controls overlay */}
        {showControls && (
          <div className="controls-overlay">
            <div className="control-hint">
              <span className="icon">🖱️</span>
              <span>{language === 'tr' ? 'Döndür' : 'Rotate'}</span>
            </div>
            <div className="control-hint">
              <span className="icon">🔍</span>
              <span>{language === 'tr' ? 'Yakınlaştır' : 'Zoom'}</span>
            </div>
            <div className="control-hint">
              <span className="icon">👆</span>
              <span>{language === 'tr' ? 'Tıkla' : 'Click'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Product info panel */}
      <ProductInfoPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
      />

      {/* Product navigation */}
      <div className="product-navigation">
        {products.map((product) => (
          <button
            key={product.id}
            className={`nav-dot ${selectedProduct?.id === product.id ? 'active' : ''}`}
            onClick={() => handleProductClick(product)}
            aria-label={`Select ${product.name}`}
          >
            <span className="dot-label">{product.brand}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Interactive3DShowroom