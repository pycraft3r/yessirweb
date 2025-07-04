import HeroSection from '../components/Hero/HeroSection'
import ProductGrid from '../components/Products/ProductGrid'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      
      {/* Content section for scroll target */}
      <section className="content-section">
        <div className="container">
          <div className="home-intro animate-fadeInUp">
            <h2 className="section-title">
              Tıbbın Geleceğini <span className="text-gradient">Şekillendiriyoruz</span>
            </h2>
            <p className="section-subtitle">
              2008'den beri dünya standartlarında cerrahi ekipman ihracatında öncü. 
              Ethicon, Smith & Nephew, Boston Scientific gibi global markaların 
              güvenilir distribütörü.
            </p>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-item animate-fadeInUp delay-100">
              <div className="stat-number text-gradient">16+</div>
              <div className="stat-label">Yıllık Deneyim</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-200">
              <div className="stat-number text-gradient">50+</div>
              <div className="stat-label">Ülkeye İhracat</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-300">
              <div className="stat-number text-gradient">1000+</div>
              <div className="stat-label">Ürün Çeşidi</div>
            </div>
            <div className="stat-item animate-fadeInUp delay-400">
              <div className="stat-number text-gradient">24/7</div>
              <div className="stat-label">Teknik Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h3 className="brands-title animate-fadeInUp">
            Güvenilir <span className="text-gradient">Partnerler</span>
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
                Cerrahi <span className="text-gradient">Mükemmellik</span>
              </h3>
              <p className="excellence-description">
                Her cerrahi prosedür için en kaliteli ekipmanları sunuyoruz. 
                ISO 13485 sertifikalı ürünlerimiz, dünya çapında sağlık profesyonelleri 
                tarafından güvenle kullanılmaktadır.
              </p>
              <div className="excellence-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>CE Sertifikalı Ürünler</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>FDA Onaylı Ekipmanlar</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>ISO 13485 Kalite Sistemi</span>
                </div>
              </div>
              <button className="btn btn-primary excellence-cta">
                Koleksiyonu İncele
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

      {/* Featured Products */}
      <ProductGrid 
        title="Öne Çıkan Ürünler"
        subtitle="En çok tercih edilen medikal ekipmanlarımız"
        columns={3}
        showFilter={false}
      />
    </div>
  )
}

export default Home