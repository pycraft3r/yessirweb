import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Partnership.css'

gsap.registerPlugin(ScrollTrigger)

interface PartnershipProps {
  language: 'tr' | 'en'
}

interface Partner {
  id: number
  name: string
  logo: string
  country: string
  since: string
  type: 'distributor' | 'hospital' | 'research' | 'supplier'
}

const Partnership: React.FC<PartnershipProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedPartnerType, setSelectedPartnerType] = useState<string>('all')
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const partners: Partner[] = [
    { id: 1, name: 'MedTech Europe', logo: '🏥', country: 'Germany', since: '2015', type: 'distributor' },
    { id: 2, name: 'Asian Medical Group', logo: '🌏', country: 'Singapore', since: '2016', type: 'distributor' },
    { id: 3, name: 'Johns Hopkins Hospital', logo: '🏨', country: 'USA', since: '2017', type: 'hospital' },
    { id: 4, name: 'Oxford Research Lab', logo: '🔬', country: 'UK', since: '2018', type: 'research' },
    { id: 5, name: 'Tokyo Medical Center', logo: '🗾', country: 'Japan', since: '2019', type: 'hospital' },
    { id: 6, name: 'BioSupply Chain', logo: '📦', country: 'Netherlands', since: '2020', type: 'supplier' },
    { id: 7, name: 'Mayo Clinic', logo: '⚕️', country: 'USA', since: '2021', type: 'hospital' },
    { id: 8, name: 'Swiss Med Partners', logo: '🇨🇭', country: 'Switzerland', since: '2022', type: 'distributor' }
  ]

  const benefits = [
    {
      icon: '🌐',
      title: 'Global Ağ',
      titleEn: 'Global Network',
      desc: '150+ ülkede güçlü dağıtım ağı',
      descEn: 'Strong distribution network in 150+ countries'
    },
    {
      icon: '🛡️',
      title: 'Güvenilir Marka',
      titleEn: 'Trusted Brand',
      desc: '25 yıllık sektör deneyimi ve güvenilirlik',
      descEn: '25 years of industry experience and reliability'
    },
    {
      icon: '📈',
      title: 'Büyüme Fırsatları',
      titleEn: 'Growth Opportunities',
      desc: 'Yıllık %30+ büyüme oranı ile gelişen pazar',
      descEn: 'Growing market with 30%+ annual growth rate'
    },
    {
      icon: '🎓',
      title: 'Eğitim Desteği',
      titleEn: 'Training Support',
      desc: 'Sürekli eğitim ve sertifikasyon programları',
      descEn: 'Continuous training and certification programs'
    },
    {
      icon: '💎',
      title: 'Premium Ürünler',
      titleEn: 'Premium Products',
      desc: '5000+ yüksek kaliteli medikal cihaz',
      descEn: '5000+ high quality medical devices'
    },
    {
      icon: '🤝',
      title: '7/24 Destek',
      titleEn: '24/7 Support',
      desc: 'Teknik ve satış sonrası destek hizmetleri',
      descEn: 'Technical and after-sales support services'
    }
  ]

  const partnerTypes = [
    { value: 'all', label: 'Tümü', labelEn: 'All' },
    { value: 'distributor', label: 'Distribütörler', labelEn: 'Distributors' },
    { value: 'hospital', label: 'Hastaneler', labelEn: 'Hospitals' },
    { value: 'research', label: 'Araştırma', labelEn: 'Research' },
    { value: 'supplier', label: 'Tedarikçiler', labelEn: 'Suppliers' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.partnership-hero h1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )

      // Network animation
      gsap.to('.network-globe', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none'
      })

      // Partner cards animation
      ScrollTrigger.batch('.partner-card', {
        onEnter: elements => {
          gsap.fromTo(elements,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)'
            }
          )
        }
      })

      // Benefits animation
      gsap.fromTo('.benefit-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 80%'
          }
        }
      )

      // Success stories counter
      gsap.to('.success-number', {
        textContent: 500,
        duration: 2,
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.success-stats',
          start: 'top 80%'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const filteredPartners = selectedPartnerType === 'all' 
    ? partners 
    : partners.filter(p => p.type === selectedPartnerType)

  const content = {
    tr: {
      hero: {
        title: 'GÜÇLÜ ORTAKLIKLAR',
        subtitle: 'Birlikte Daha Güçlü, Birlikte Daha İleri',
        description: 'Dünya genelinde güvenilir iş ortaklarımızla medikal teknolojinin geleceğini şekillendiriyoruz.'
      },
      becomePartner: 'Partner Olun',
      ourPartners: 'İş Ortaklarımız',
      benefits: 'Partner Avantajları',
      successStories: 'Başarı Hikayeleri',
      application: 'Başvuru Formu',
      filter: 'Filtrele',
      since: 'den beri',
      applyNow: 'Hemen Başvur',
      formLabels: {
        company: 'Şirket Adı',
        name: 'Yetkili Adı Soyadı',
        email: 'E-posta',
        phone: 'Telefon',
        country: 'Ülke',
        type: 'Ortaklık Türü',
        message: 'Mesajınız',
        submit: 'Başvuruyu Gönder'
      }
    },
    en: {
      hero: {
        title: 'STRONG PARTNERSHIPS',
        subtitle: 'Stronger Together, Further Together',
        description: 'Shaping the future of medical technology with our trusted business partners worldwide.'
      },
      becomePartner: 'Become a Partner',
      ourPartners: 'Our Partners',
      benefits: 'Partner Benefits',
      successStories: 'Success Stories',
      application: 'Application Form',
      filter: 'Filter',
      since: 'Since',
      applyNow: 'Apply Now',
      formLabels: {
        company: 'Company Name',
        name: 'Contact Person',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        type: 'Partnership Type',
        message: 'Your Message',
        submit: 'Submit Application'
      }
    }
  }

  const t = content[language]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert(language === 'tr' ? 'Başvurunuz alındı!' : 'Application received!')
    setShowApplicationForm(false)
  }

  return (
    <div ref={containerRef} className="partnership-page">
      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="hero-network">
          <div className="network-globe">
            <div className="globe-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="connection-lines">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="connection-line" style={{
                  transform: `rotate(${i * 45}deg)`
                }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="text-premium">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-description">{t.hero.description}</p>
          <button 
            className="cta-button"
            onClick={() => setShowApplicationForm(true)}
          >
            {t.becomePartner}
          </button>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">{t.benefits}</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{language === 'tr' ? benefit.title : benefit.titleEn}</h3>
                <p>{language === 'tr' ? benefit.desc : benefit.descEn}</p>
                <div className="benefit-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="partners-section">
        <div className="container">
          <h2 className="section-title">{t.ourPartners}</h2>
          
          {/* Filter Tabs */}
          <div className="filter-tabs">
            {partnerTypes.map((type) => (
              <button
                key={type.value}
                className={`filter-tab ${selectedPartnerType === type.value ? 'active' : ''}`}
                onClick={() => setSelectedPartnerType(type.value)}
              >
                {language === 'tr' ? type.label : type.labelEn}
              </button>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="partners-grid">
            {filteredPartners.map((partner) => (
              <div key={partner.id} className="partner-card">
                <div className="partner-logo">{partner.logo}</div>
                <h3>{partner.name}</h3>
                <p className="partner-country">{partner.country}</p>
                <p className="partner-since">{t.since} {partner.since}</p>
                <div className="partner-type-badge">{partner.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="success-section">
        <div className="container">
          <h2 className="section-title">{t.successStories}</h2>
          <div className="success-stats">
            <div className="stat-card">
              <span className="success-number">0</span>
              <span className="stat-suffix">+</span>
              <p>{language === 'tr' ? 'Mutlu İş Ortağı' : 'Happy Partners'}</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">150+</span>
              <p>{language === 'tr' ? 'Ülke' : 'Countries'}</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">25</span>
              <p>{language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}</p>
            </div>
            <div className="stat-card">
              <span className="stat-value">99%</span>
              <p>{language === 'tr' ? 'Memnuniyet Oranı' : 'Satisfaction Rate'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="stories-section">
        <div className="container">
          <div className="stories-carousel">
            <div className="story-card">
              <div className="story-quote">"</div>
              <p className="story-text">
                {language === 'tr' ? 
                  'MEDCEZIR ile çalışmak, hastalarımıza en iyi hizmeti sunmamızı sağladı. Kaliteli ürünleri ve güçlü desteği ile sektördeki en güvenilir iş ortağımız.' :
                  'Working with MEDCEZIR has enabled us to provide the best service to our patients. They are our most trusted business partner with quality products and strong support.'
                }
              </p>
              <div className="story-author">
                <strong>Dr. Sarah Johnson</strong>
                <span>Johns Hopkins Hospital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{language === 'tr' ? 'Siz de Ailemize Katılın' : 'Join Our Family'}</h2>
            <p>
              {language === 'tr' ? 
                'Dünya genelinde 500+ iş ortağımızla birlikte medikal teknolojinin geleceğini şekillendirin.' :
                'Shape the future of medical technology with our 500+ business partners worldwide.'
              }
            </p>
            <button 
              className="cta-button-large"
              onClick={() => setShowApplicationForm(true)}
            >
              {t.applyNow}
            </button>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="application-modal" onClick={() => setShowApplicationForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowApplicationForm(false)}>✕</button>
            
            <h2>{t.application}</h2>
            
            <form onSubmit={handleFormSubmit} className="application-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>{t.formLabels.company}</label>
                  <input type="text" required />
                </div>
                
                <div className="form-group">
                  <label>{t.formLabels.name}</label>
                  <input type="text" required />
                </div>
                
                <div className="form-group">
                  <label>{t.formLabels.email}</label>
                  <input type="email" required />
                </div>
                
                <div className="form-group">
                  <label>{t.formLabels.phone}</label>
                  <input type="tel" required />
                </div>
                
                <div className="form-group">
                  <label>{t.formLabels.country}</label>
                  <input type="text" required />
                </div>
                
                <div className="form-group">
                  <label>{t.formLabels.type}</label>
                  <select required>
                    <option value="">Select...</option>
                    <option value="distributor">Distributor</option>
                    <option value="hospital">Hospital</option>
                    <option value="research">Research</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>{t.formLabels.message}</label>
                <textarea rows={4} required></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                {t.formLabels.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Partnership