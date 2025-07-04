import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Universe.css'

gsap.registerPlugin(ScrollTrigger)

interface UniverseProps {
  language: 'tr' | 'en'
}

const Universe: React.FC<UniverseProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.universe-hero h1', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )

      gsap.fromTo('.universe-hero p', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: 'power3.out' }
      )

      // Globe rotation animation
      if (globeRef.current) {
        gsap.to(globeRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: 'none'
        })
      }

      // Parallax effects
      gsap.utils.toArray('.universe-section').forEach((section: any) => {
        const bg = section.querySelector('.section-bg')
        
        gsap.fromTo(bg, {
          y: -50,
        }, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })

        // Fade in animations
        gsap.fromTo(section.querySelectorAll('.fade-in'), 
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item')
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const content = {
    tr: {
      hero: {
        title: 'MEDCEZİR EVRENİ',
        subtitle: 'Tıbbın Lüksle Buluştuğu Sınırsız Evren',
        description: 'Dünya genelinde sağlık teknolojilerini en üst düzeyde sunarak, insanlığın refahına katkıda bulunuyoruz.'
      },
      vision: {
        title: 'VİZYONUMUZ',
        description: 'Medikal teknolojide öncü, güvenilir ve yenilikçi bir dünya markası olmak.',
        features: [
          { title: 'Global Erişim', desc: '150+ ülkede aktif distribütör ağı' },
          { title: 'Yenilikçi Çözümler', desc: 'AR-GE\'ye yıllık %20 yatırım' },
          { title: 'Sürdürülebilirlik', desc: 'Karbon nötr üretim tesisleri' }
        ]
      },
      mission: {
        title: 'MİSYONUMUZ',
        description: 'En son teknoloji medikal cihazları, premium kalite anlayışıyla dünyaya sunmak.',
        values: ['Kalite', 'Güvenilirlik', 'İnovasyon', 'Sürdürülebilirlik']
      },
      timeline: {
        title: 'BAŞARI HİKAYEMİZ',
        events: [
          { year: '2010', title: 'Kuruluş', desc: 'İstanbul\'da ilk ofisimiz açıldı' },
          { year: '2015', title: 'Global Genişleme', desc: 'Avrupa ve Asya pazarlarına giriş' },
          { year: '2018', title: 'Teknoloji Merkezi', desc: 'AR-GE merkezimiz faaliyete geçti' },
          { year: '2020', title: 'Dijital Dönüşüm', desc: 'AI destekli üretim sistemleri' },
          { year: '2024', title: 'Dünya Lideri', desc: '150+ ülkede premium medikal çözümler' }
        ]
      },
      stats: {
        countries: '150+ Ülke',
        products: '5000+ Ürün',
        team: '10K+ Çalışan',
        satisfaction: '%99 Memnuniyet'
      }
    },
    en: {
      hero: {
        title: 'MEDCEZIR UNIVERSE',
        subtitle: 'The Infinite Universe Where Medicine Meets Luxury',
        description: 'Contributing to human welfare by offering healthcare technologies at the highest level worldwide.'
      },
      vision: {
        title: 'OUR VISION',
        description: 'To be a pioneering, reliable and innovative global brand in medical technology.',
        features: [
          { title: 'Global Reach', desc: 'Active distributor network in 150+ countries' },
          { title: 'Innovative Solutions', desc: '20% annual investment in R&D' },
          { title: 'Sustainability', desc: 'Carbon neutral production facilities' }
        ]
      },
      mission: {
        title: 'OUR MISSION',
        description: 'To provide the world with state-of-the-art medical devices with a premium quality approach.',
        values: ['Quality', 'Reliability', 'Innovation', 'Sustainability']
      },
      timeline: {
        title: 'OUR SUCCESS STORY',
        events: [
          { year: '2010', title: 'Foundation', desc: 'Our first office opened in Istanbul' },
          { year: '2015', title: 'Global Expansion', desc: 'Entry into European and Asian markets' },
          { year: '2018', title: 'Technology Center', desc: 'Our R&D center became operational' },
          { year: '2020', title: 'Digital Transformation', desc: 'AI-powered production systems' },
          { year: '2024', title: 'World Leader', desc: 'Premium medical solutions in 150+ countries' }
        ]
      },
      stats: {
        countries: '150+ Countries',
        products: '5000+ Products',
        team: '10K+ Employees',
        satisfaction: '99% Satisfaction'
      }
    }
  }

  const t = content[language]

  return (
    <div ref={containerRef} className="universe-page">
      {/* Hero Section */}
      <section className="universe-hero">
        <div className="universe-stars"></div>
        <div className="universe-nebula"></div>
        <div className="container">
          <h1 className="text-premium">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-description">{t.hero.description}</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="universe-section vision-section">
        <div className="section-bg"></div>
        <div className="container">
          <h2 className="section-title fade-in">{t.vision.title}</h2>
          <p className="section-description fade-in">{t.vision.description}</p>
          
          <div className="vision-features">
            {t.vision.features.map((feature, index) => (
              <div key={index} className="feature-card fade-in">
                <div className="feature-icon">
                  <div className="icon-glow"></div>
                  <span>{index === 0 ? '🌍' : index === 1 ? '💡' : '🌱'}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="universe-section network-section">
        <div className="section-bg"></div>
        <div className="container">
          <div className="network-content">
            <div className="globe-container fade-in">
              <div ref={globeRef} className="interactive-globe">
                <div className="globe-sphere">
                  <div className="globe-lines"></div>
                  <div className="globe-dots"></div>
                </div>
              </div>
            </div>
            
            <div className="stats-grid fade-in">
              <div className="stat-card">
                <h3>{t.stats.countries}</h3>
                <p>{language === 'tr' ? 'Global Erişim' : 'Global Reach'}</p>
              </div>
              <div className="stat-card">
                <h3>{t.stats.products}</h3>
                <p>{language === 'tr' ? 'Premium Ürün' : 'Premium Products'}</p>
              </div>
              <div className="stat-card">
                <h3>{t.stats.team}</h3>
                <p>{language === 'tr' ? 'Uzman Kadro' : 'Expert Team'}</p>
              </div>
              <div className="stat-card">
                <h3>{t.stats.satisfaction}</h3>
                <p>{language === 'tr' ? 'Müşteri Memnuniyeti' : 'Customer Satisfaction'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="universe-section mission-section">
        <div className="section-bg"></div>
        <div className="container">
          <h2 className="section-title fade-in">{t.mission.title}</h2>
          <p className="section-description fade-in">{t.mission.description}</p>
          
          <div className="values-grid">
            {t.mission.values.map((value, index) => (
              <div key={index} className="value-card fade-in">
                <div className="value-number">0{index + 1}</div>
                <h3>{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="universe-section timeline-section">
        <div className="section-bg"></div>
        <div className="container">
          <h2 className="section-title fade-in">{t.timeline.title}</h2>
          
          <div ref={timelineRef} className="timeline-container">
            <div className="timeline-line"></div>
            {t.timeline.events.map((event, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{event.year}</span>
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Universe