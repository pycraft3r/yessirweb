import HeroSection from '../components/Hero/HeroSection'
import ProductGrid from '../components/Products/ProductGrid'
import Interactive3DShowroom from '../components/Products/Interactive3DShowroom'
import './Home.css'

interface HomeProps {
  language?: 'tr' | 'en'
}

const Home: React.FC<HomeProps> = ({ language = 'tr' }) => {
  return (
    <div className="home-page">
      <HeroSection />
      
      {/* Content section for scroll target */}
      <section className="content-section">
        <div className="container">
          <div className="home-intro animate-fadeInUp">
            <h2 className="section-title">
              {language === 'tr' 
                ? (<>Tıbbın Geleceğini <span className="text-gradient">Şekillendiriyoruz</span></>) 
                : (<>Shaping the <span className="text-gradient">Future of Medicine</span></>)
              }
            </h2>
            <p className="section-subtitle">
              {language === 'tr' 
                ? "2008'den beri dünya standartlarında cerrahi ekipman ihracatında öncü. Ethicon, Smith & Nephew, Boston Scientific gibi global markaların güvenilir distribütörü."
                : "Leading in world-class surgical equipment export since 2008. Trusted distributor of global brands like Ethicon, Smith & Nephew, Boston Scientific."
              }
            </p>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-item animate-fadeInUp delay-100">
              <div className="stat-number text-gradient">16+</div>
              <div className="stat-label">{language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-200">
              <div className="stat-number text-gradient">50+</div>
              <div className="stat-label">{language === 'tr' ? 'Ülkeye İhracat' : 'Export Countries'}</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-300">
              <div className="stat-number text-gradient">1000+</div>
              <div className="stat-label">{language === 'tr' ? 'Ürün Çeşidi' : 'Product Types'}</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-400">
              <div className="stat-number text-gradient">24/7</div>
              <div className="stat-label">{language === 'tr' ? 'Teknik Destek' : 'Technical Support'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h3 className="brands-title animate-fadeInUp">
            {language === 'tr' 
              ? (<>Güvenilir <span className="text-gradient">Partnerler</span></>) 
              : (<>Trusted <span className="text-gradient">Partners</span></>)
            }
          </h3>
          <div className="brands-grid">
            <div className="brand-card animate-fadeInUp delay-100">
              <img src="/assets/images/brands/ethicon.png" alt="Ethicon" />
            </div>
            <div className="brand-card animate-fadeInUp delay-200">
              <img src="/assets/images/brands/smith-nephew.png" alt="Smith & Nephew" />
            </div>
            <div className="brand-card animate-fadeInUp delay-300">
              <img src="/assets/images/brands/boston-scientific.png" alt="Boston Scientific" />
            </div>
            <div className="brand-card animate-fadeInUp delay-400">
              <img src="/assets/images/brands/medtronic.png" alt="Medtronic" />
            </div>
            <div className="brand-card animate-fadeInUp delay-500">
              <img src="/assets/images/brands/stryker.png" alt="Stryker" />
            </div>
            <div className="brand-card animate-fadeInUp delay-600">
              <img src="/assets/images/brands/covidien.png" alt="Covidien" />
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="excellence-section">
        <div className="container">
          <div className="excellence-content">
            <div className="excellence-text animate-fadeInLeft">
              <h3 className="excellence-title">
                {language === 'tr' 
                  ? (<>Cerrahi <span className="text-gradient">Mükemmellik</span></>) 
                  : (<>Surgical <span className="text-gradient">Excellence</span></>)
                }
              </h3>
              <p className="excellence-description">
                {language === 'tr' 
                  ? "Her cerrahi prosedür için en kaliteli ekipmanları sunuyoruz. ISO 13485 sertifikalı ürünlerimiz, dünya çapında sağlık profesyonelleri tarafından güvenle kullanılmaktadır."
                  : "We provide the highest quality equipment for every surgical procedure. Our ISO 13485 certified products are trusted by healthcare professionals worldwide."
                }
              </p>
              <div className="excellence-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{language === 'tr' ? 'CE Sertifikalı Ürünler' : 'CE Certified Products'}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{language === 'tr' ? 'FDA Onaylı Ekipmanlar' : 'FDA Approved Equipment'}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{language === 'tr' ? 'ISO 13485 Kalite Sistemi' : 'ISO 13485 Quality System'}</span>
                </div>
              </div>
              <button className="btn btn-primary excellence-cta">
                {language === 'tr' ? 'Koleksiyonu İncele' : 'Explore Collection'}
              </button>
            </div>
            <div className="excellence-visual animate-fadeInRight">
              <div className="visual-placeholder">
                <img 
                  src="/assets/images/medical-excellence.jpg" 
                  alt="Medical Excellence"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Showroom */}
      <Interactive3DShowroom language={language} />
      
      {/* Featured Products */}
      <ProductGrid 
        title={language === 'tr' ? "Öne Çıkan Ürünler" : "Featured Products"}
        subtitle={language === 'tr' ? "En çok tercih edilen medikal ekipmanlarımız" : "Our most preferred medical equipment"}
        columns={3}
        showFilter={false}
      />
    </div>
  )
}

export default Home