import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  language: 'tr' | 'en'
}

interface Office {
  id: number
  name: string
  address: string
  phone: string
  email: string
  coordinates: { lat: number; lng: number }
  type: 'headquarters' | 'branch'
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const offices: Office[] = [
    {
      id: 1,
      name: language === 'tr' ? 'Genel Merkez' : 'Headquarters',
      address: 'Maslak, Büyükdere Cd. No:237, 34398 Sarıyer/İstanbul, Turkey',
      phone: '+90 212 999 99 99',
      email: 'info@medcezirexport.com',
      coordinates: { lat: 41.1082, lng: 29.0196 },
      type: 'headquarters'
    },
    {
      id: 2,
      name: language === 'tr' ? 'Avrupa Ofisi' : 'Europe Office',
      address: 'Friedrichstraße 123, 10117 Berlin, Germany',
      phone: '+49 30 123 456',
      email: 'europe@medcezirexport.com',
      coordinates: { lat: 52.5200, lng: 13.4050 },
      type: 'branch'
    },
    {
      id: 3,
      name: language === 'tr' ? 'Asya Pasifik Ofisi' : 'Asia Pacific Office',
      address: '1 Raffles Place, #40-01, Singapore 048616',
      phone: '+65 6123 4567',
      email: 'apac@medcezirexport.com',
      coordinates: { lat: 1.2847, lng: 103.8510 },
      type: 'branch'
    }
  ]

  const contactMethods = [
    {
      icon: '📞',
      title: language === 'tr' ? '7/24 Destek Hattı' : '24/7 Support Line',
      value: '+90 212 999 99 99',
      link: 'tel:+902129999999'
    },
    {
      icon: '✉️',
      title: language === 'tr' ? 'E-posta' : 'Email',
      value: 'info@medcezirexport.com',
      link: 'mailto:info@medcezirexport.com'
    },
    {
      icon: '💬',
      title: language === 'tr' ? 'WhatsApp' : 'WhatsApp',
      value: '+90 555 999 99 99',
      link: 'https://wa.me/905559999999'
    },
    {
      icon: '🌐',
      title: language === 'tr' ? 'Sosyal Medya' : 'Social Media',
      value: '@medcezirexport',
      link: '#'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.contact-hero h1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      )

      // Contact cards animation
      gsap.fromTo('.contact-method',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.contact-methods',
            start: 'top 80%'
          }
        }
      )

      // Office cards animation
      gsap.fromTo('.office-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.offices-grid',
            start: 'top 80%'
          }
        }
      )

      // Map animation
      gsap.to('.world-map', {
        scale: 1.05,
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      })

      // Form animation
      gsap.fromTo('.contact-form',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.form-section',
            start: 'top 80%'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the form data to a server
    console.log('Form submitted:', formData)
    setShowThankYou(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
      setShowThankYou(false)
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const content = {
    tr: {
      hero: {
        title: 'İLETİŞİM',
        subtitle: 'Size Nasıl Yardımcı Olabiliriz?',
        description: 'Medikal teknoloji çözümlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.'
      },
      quickContact: 'Hızlı İletişim',
      offices: 'Ofislerimiz',
      contactForm: 'İletişim Formu',
      formLabels: {
        name: 'Ad Soyad',
        email: 'E-posta',
        phone: 'Telefon',
        company: 'Firma',
        subject: 'Konu',
        message: 'Mesajınız',
        send: 'Gönder',
        sending: 'Gönderiliyor...',
        thankYou: 'Mesajınız alındı!'
      },
      subjects: [
        'Ürün Bilgisi',
        'Fiyat Teklifi',
        'Teknik Destek',
        'Distribütörlük',
        'Diğer'
      ],
      workingHours: {
        title: 'Çalışma Saatleri',
        weekdays: 'Pazartesi - Cuma: 09:00 - 18:00',
        saturday: 'Cumartesi: 09:00 - 14:00',
        sunday: 'Pazar: Kapalı'
      }
    },
    en: {
      hero: {
        title: 'CONTACT',
        subtitle: 'How Can We Help You?',
        description: 'Contact us for detailed information about our medical technology solutions.'
      },
      quickContact: 'Quick Contact',
      offices: 'Our Offices',
      contactForm: 'Contact Form',
      formLabels: {
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        thankYou: 'Message received!'
      },
      subjects: [
        'Product Information',
        'Price Quote',
        'Technical Support',
        'Distributorship',
        'Other'
      ],
      workingHours: {
        title: 'Working Hours',
        weekdays: 'Monday - Friday: 09:00 - 18:00',
        saturday: 'Saturday: 09:00 - 14:00',
        sunday: 'Sunday: Closed'
      }
    }
  }

  const t = content[language]

  return (
    <div ref={containerRef} className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-bg">
          <div className="connection-network">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="network-node" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}>
                <div className="node-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <h1 className="text-premium">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <p className="hero-description">{t.hero.description}</p>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <h2 className="section-title">{t.quickContact}</h2>
          <div className="contact-methods">
            {contactMethods.map((method, index) => (
              <a key={index} href={method.link} className="contact-method">
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.value}</p>
                <div className="method-glow"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="world-map-container">
            <div className="world-map">
              <svg viewBox="0 0 1200 600" className="map-svg">
                {/* Simplified world map outline */}
                <path
                  d="M150,250 Q200,200 300,250 T450,250 Q500,200 600,250 T750,250 Q800,200 900,250 T1050,250"
                  fill="none"
                  stroke="rgba(0, 212, 255, 0.3)"
                  strokeWidth="2"
                />
                
                {/* Office locations */}
                {offices.map((office, index) => (
                  <g key={office.id}>
                    <circle
                      cx={200 + index * 400}
                      cy={250}
                      r="8"
                      fill="#FFD700"
                      className="office-marker"
                    >
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={200 + index * 400}
                      cy={250}
                      r="20"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2"
                      opacity="0.5"
                      className="office-pulse"
                    >
                      <animate
                        attributeName="r"
                        values="20;40;20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0;0.5"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="offices-section">
        <div className="container">
          <h2 className="section-title">{t.offices}</h2>
          <div className="offices-grid">
            {offices.map((office) => (
              <div key={office.id} className={`office-card ${office.type}`}>
                <div className="office-header">
                  <h3>{office.name}</h3>
                  {office.type === 'headquarters' && (
                    <span className="hq-badge">HQ</span>
                  )}
                </div>
                <div className="office-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <p>{office.address}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">✉️</span>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </div>
                </div>
                <button className="directions-btn">
                  {language === 'tr' ? 'Yol Tarifi Al' : 'Get Directions'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-left">
              <h2>{t.contactForm}</h2>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.formLabels.name} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.formLabels.email} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.formLabels.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.formLabels.company}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.formLabels.subject} *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select...</option>
                    {t.subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t.formLabels.message} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  {showThankYou ? t.formLabels.thankYou : t.formLabels.send}
                </button>
              </form>
            </div>

            <div className="form-right">
              <div className="info-card">
                <h3>{t.workingHours.title}</h3>
                <div className="working-hours">
                  <p>{t.workingHours.weekdays}</p>
                  <p>{t.workingHours.saturday}</p>
                  <p>{t.workingHours.sunday}</p>
                </div>
              </div>

              <div className="info-card">
                <h3>{language === 'tr' ? 'Sosyal Medya' : 'Social Media'}</h3>
                <div className="social-links">
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">YouTube</a>
                  <a href="#" className="social-link">Instagram</a>
                </div>
              </div>

              <div className="info-card emergency">
                <h3>{language === 'tr' ? 'Acil Destek' : 'Emergency Support'}</h3>
                <p>{language === 'tr' ? 
                  'Teknik acil durumlar için 7/24 destek hattımızı arayabilirsiniz.' :
                  'For technical emergencies, you can call our 24/7 support line.'
                }</p>
                <a href="tel:+902129999999" className="emergency-number">
                  +90 212 999 99 99
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact