import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Laboratory.css'

gsap.registerPlugin(ScrollTrigger)

interface LaboratoryProps {
  language: 'tr' | 'en'
}

const Laboratory: React.FC<LaboratoryProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeResearch, setActiveResearch] = useState(0)
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null)

  const researchAreas = [
    {
      id: 1,
      title: 'Biyomedikal Araştırmalar',
      titleEn: 'Biomedical Research',
      description: 'Yeni nesil biyomalzemeler ve implant teknolojileri geliştiriyoruz',
      descriptionEn: 'Developing next-generation biomaterials and implant technologies',
      icon: '🧬',
      stats: { projects: 45, patents: 12, researchers: 28 }
    },
    {
      id: 2,
      title: 'AI & Makine Öğrenmesi',
      titleEn: 'AI & Machine Learning',
      description: 'Tanı ve tedavi süreçlerini optimize eden AI çözümleri',
      descriptionEn: 'AI solutions optimizing diagnosis and treatment processes',
      icon: '🤖',
      stats: { projects: 38, patents: 8, researchers: 22 }
    },
    {
      id: 3,
      title: 'Nanoteknoloji',
      titleEn: 'Nanotechnology',
      description: 'Nano ölçekte medikal cihazlar ve ilaç taşıyıcı sistemler',
      descriptionEn: 'Nanoscale medical devices and drug delivery systems',
      icon: '🔬',
      stats: { projects: 29, patents: 15, researchers: 18 }
    },
    {
      id: 4,
      title: 'Robotik Cerrahi',
      titleEn: 'Robotic Surgery',
      description: 'Minimal invaziv cerrahi için gelişmiş robotik sistemler',
      descriptionEn: 'Advanced robotic systems for minimally invasive surgery',
      icon: '🦾',
      stats: { projects: 22, patents: 10, researchers: 25 }
    }
  ]

  const certificates = [
    { id: 1, name: 'ISO 13485:2016', desc: 'Medical Device Quality Management' },
    { id: 2, name: 'CE Mark', desc: 'European Conformity' },
    { id: 3, name: 'FDA Approval', desc: 'U.S. Food & Drug Administration' },
    { id: 4, name: 'ISO 9001:2015', desc: 'Quality Management Systems' },
    { id: 5, name: 'GMP Certified', desc: 'Good Manufacturing Practice' },
    { id: 6, name: 'ISO 14001:2015', desc: 'Environmental Management' }
  ]

  const labFeatures = [
    {
      title: 'Steril Test Odaları',
      titleEn: 'Sterile Test Rooms',
      desc: 'Class 100 temiz oda standartları',
      descEn: 'Class 100 clean room standards',
      icon: '🧪'
    },
    {
      title: '3D Biyoyazıcılar',
      titleEn: '3D Bioprinters',
      desc: 'Doku ve organ modelleme',
      descEn: 'Tissue and organ modeling',
      icon: '🖨️'
    },
    {
      title: 'Simülasyon Merkezi',
      titleEn: 'Simulation Center',
      desc: 'Gerçek zamanlı cerrahi simülasyonlar',
      descEn: 'Real-time surgical simulations',
      icon: '💻'
    },
    {
      title: 'Test Laboratuvarları',
      titleEn: 'Testing Laboratories',
      desc: '500+ farklı test protokolü',
      descEn: '500+ different test protocols',
      icon: '🔧'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.lab-hero h1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )

      // Lab equipment floating animation
      gsap.to('.floating-equipment', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          each: 0.2,
          from: 'random'
        }
      })

      // Research areas animation
      gsap.fromTo('.research-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.research-areas',
            start: 'top 80%'
          }
        }
      )

      // 360 view rotation
      gsap.to('.lab-360-view', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
      })

      // Stats counter animation
      const stats = gsap.utils.toArray('.stat-number')
      stats.forEach((stat: any) => {
        const endValue = parseInt(stat.textContent)
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%'
            }
          }
        )
      })

      // Parallax sections
      gsap.utils.toArray('.lab-section').forEach((section: any) => {
        const bg = section.querySelector('.section-bg')
        if (bg) {
          gsap.fromTo(bg,
            { y: -50 },
            {
              y: 50,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const content = {
    tr: {
      hero: {
        title: 'İNOVASYON LABORATUVARI',
        subtitle: 'Geleceğin Medikal Teknolojilerini Bugünden Şekillendiriyoruz',
        description: 'Dünya standartlarında AR-GE merkezi ve test laboratuvarlarımızla sağlık sektörüne öncülük ediyoruz.'
      },
      virtualTour: 'Sanal Tur',
      research: 'Araştırma Alanları',
      facilities: 'Tesislerimiz',
      quality: 'Kalite Sertifikaları',
      innovation: 'İnovasyon Merkezi',
      viewDetails: 'Detayları Gör',
      stats: {
        area: 'Laboratuvar Alanı',
        researchers: 'Araştırmacı',
        projects: 'Aktif Proje',
        patents: 'Patent'
      }
    },
    en: {
      hero: {
        title: 'INNOVATION LABORATORY',
        subtitle: 'Shaping Tomorrow\'s Medical Technologies Today',
        description: 'Leading the healthcare sector with our world-class R&D center and testing laboratories.'
      },
      virtualTour: 'Virtual Tour',
      research: 'Research Areas',
      facilities: 'Our Facilities',
      quality: 'Quality Certificates',
      innovation: 'Innovation Center',
      viewDetails: 'View Details',
      stats: {
        area: 'Laboratory Area',
        researchers: 'Researchers',
        projects: 'Active Projects',
        patents: 'Patents'
      }
    }
  }

  const t = content[language]

  return (
    <div ref={containerRef} className="laboratory-page">
      {/* Hero Section */}
      <section className="lab-hero">
        <div className="hero-background">
          <div className="floating-equipment equipment-1">🔬</div>
          <div className="floating-equipment equipment-2">🧬</div>
          <div className="floating-equipment equipment-3">⚗️</div>
          <div className="floating-equipment equipment-4">🦠</div>
          <div className="floating-equipment equipment-5">💉</div>
        </div>
        <div className="container">
          <h1 className="text-premium">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-description">{t.hero.description}</p>
          <button className="virtual-tour-btn">
            <span className="tour-icon">🎥</span>
            {t.virtualTour}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lab-section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📐</div>
              <div className="stat-content">
                <span className="stat-number">15000</span>
                <span className="stat-unit">m²</span>
              </div>
              <p className="stat-label">{t.stats.area}</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👨‍🔬</div>
              <div className="stat-content">
                <span className="stat-number">250</span>
                <span className="stat-unit">+</span>
              </div>
              <p className="stat-label">{t.stats.researchers}</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-number">134</span>
              </div>
              <p className="stat-label">{t.stats.projects}</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📜</div>
              <div className="stat-content">
                <span className="stat-number">45</span>
              </div>
              <p className="stat-label">{t.stats.patents}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="lab-section research-section">
        <div className="section-bg"></div>
        <div className="container">
          <h2 className="section-title">{t.research}</h2>
          <div className="research-areas">
            {researchAreas.map((area, index) => (
              <div
                key={area.id}
                className={`research-card ${activeResearch === index ? 'active' : ''}`}
                onClick={() => setActiveResearch(index)}
              >
                <div className="research-icon">{area.icon}</div>
                <h3>{language === 'tr' ? area.title : area.titleEn}</h3>
                <p>{language === 'tr' ? area.description : area.descriptionEn}</p>
                <div className="research-stats">
                  <span>{area.stats.projects} {language === 'tr' ? 'Proje' : 'Projects'}</span>
                  <span>{area.stats.patents} Patent</span>
                  <span>{area.stats.researchers} {language === 'tr' ? 'Uzman' : 'Experts'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 360 Lab View */}
      <section className="lab-section view-360-section">
        <div className="container">
          <h2 className="section-title">{t.innovation}</h2>
          <div className="lab-360-container">
            <div className="lab-360-view">
              <div className="lab-room">
                <div className="room-equipment">
                  {labFeatures.map((feature, index) => (
                    <div key={index} className="equipment-item" style={{
                      transform: `rotate(${index * 90}deg) translateX(150px) rotate(-${index * 90}deg)`
                    }}>
                      <div className="equipment-icon">{feature.icon}</div>
                      <div className="equipment-info">
                        <h4>{language === 'tr' ? feature.title : feature.titleEn}</h4>
                        <p>{language === 'tr' ? feature.desc : feature.descEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Features Grid */}
      <section className="lab-section features-section">
        <div className="section-bg"></div>
        <div className="container">
          <h2 className="section-title">{t.facilities}</h2>
          <div className="features-grid">
            {labFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <span className="feature-icon">{feature.icon}</span>
                  <h3>{language === 'tr' ? feature.title : feature.titleEn}</h3>
                </div>
                <p>{language === 'tr' ? feature.desc : feature.descEn}</p>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="lab-section certificates-section">
        <div className="container">
          <h2 className="section-title">{t.quality}</h2>
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="certificate-card"
                onClick={() => setSelectedCertificate(cert.id)}
              >
                <div className="cert-badge">
                  <span className="cert-icon">🏆</span>
                </div>
                <h3>{cert.name}</h3>
                <p>{cert.desc}</p>
                <div className="cert-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="cert-modal" onClick={() => setSelectedCertificate(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCertificate(null)}>✕</button>
            <div className="cert-display">
              <div className="cert-seal">🏆</div>
              <h2>{certificates.find(c => c.id === selectedCertificate)?.name}</h2>
              <p>{certificates.find(c => c.id === selectedCertificate)?.desc}</p>
              <div className="cert-details">
                <p>{language === 'tr' ? 
                  'Bu sertifika, medikal cihaz üretiminde en yüksek kalite standartlarına uygunluğumuzu belgeler.' :
                  'This certificate confirms our compliance with the highest quality standards in medical device manufacturing.'
                }</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Innovation Timeline */}
      <section className="lab-section timeline-section">
        <div className="section-bg"></div>
        <div className="container">
          <div className="innovation-timeline">
            <div className="timeline-header">
              <h2>{language === 'tr' ? 'İnovasyon Yolculuğumuz' : 'Our Innovation Journey'}</h2>
            </div>
            <div className="timeline-track">
              <div className="timeline-progress"></div>
              <div className="timeline-points">
                <div className="timeline-point active">
                  <span className="point-year">2020</span>
                  <span className="point-title">{language === 'tr' ? 'AI Lab Kuruldu' : 'AI Lab Established'}</span>
                </div>
                <div className="timeline-point active">
                  <span className="point-year">2021</span>
                  <span className="point-title">{language === 'tr' ? 'Nano Lab Açıldı' : 'Nano Lab Opened'}</span>
                </div>
                <div className="timeline-point active">
                  <span className="point-year">2022</span>
                  <span className="point-title">{language === 'tr' ? 'Robotik Merkezi' : 'Robotics Center'}</span>
                </div>
                <div className="timeline-point">
                  <span className="point-year">2024</span>
                  <span className="point-title">{language === 'tr' ? 'Kuantum Lab' : 'Quantum Lab'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Laboratory