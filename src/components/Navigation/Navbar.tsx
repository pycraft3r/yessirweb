import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Navbar.css'

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface NavbarProps {
  logo?: string
  logoAlt?: string
}

const Navbar: React.FC<NavbarProps> = ({
  logo = '/assets/images/medcezir-logo.svg',
  logoAlt = 'Medcezir Export'
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<'tr' | 'en'>('tr')
  
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    { label: activeLanguage === 'tr' ? 'Ana Sayfa' : 'Home', href: '/', isActive: true },
    { label: activeLanguage === 'tr' ? 'Kurumsal' : 'Corporate', href: '/kurumsal' },
    { label: activeLanguage === 'tr' ? 'Koleksiyon' : 'Collection', href: '/koleksiyon' },
    { label: activeLanguage === 'tr' ? 'Ortaklık' : 'Partnership', href: '/ortaklik' },
    { label: activeLanguage === 'tr' ? 'İletişim' : 'Contact', href: '/iletisim' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current || !logoRef.current || !menuRef.current) return

    // Initial animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    )

    gsap.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
    )

    gsap.fromTo(menuRef.current.children,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out", 
        delay: 0.8 
      }
    )
  }, [])

  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: "power3.out" }
      )
      gsap.fromTo(mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.1, 
          delay: 0.2,
          ease: "power2.out" 
        }
      )
    } else {
      gsap.to(mobileMenuRef.current,
        { x: '100%', opacity: 0, duration: 0.3, ease: "power3.in" }
      )
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguage = () => {
    setActiveLanguage(activeLanguage === 'tr' ? 'en' : 'tr')
  }

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleLogoLeave = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleNavItemHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const span = e.currentTarget.querySelector('.nav-item-text')
    if (span) {
      gsap.to(span, {
        y: -3,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }

  const handleNavItemLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const span = e.currentTarget.querySelector('.nav-item-text')
    if (span) {
      gsap.to(span, {
        y: 0,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }

  return (
    <>
      <nav 
        ref={navRef} 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <img 
              ref={logoRef}
              src={logo} 
              alt={logoAlt}
              onMouseEnter={handleLogoHover}
              onMouseLeave={handleLogoLeave}
            />
            <span className="logo-text">MEDCEZIR</span>
          </div>

          {/* Desktop Navigation */}
          <ul ref={menuRef} className="navbar-menu">
            {navItems.map((item, index) => (
              <li 
                key={index}
                className={`navbar-item ${item.isActive ? 'active' : ''}`}
                onMouseEnter={handleNavItemHover}
                onMouseLeave={handleNavItemLeave}
              >
                <a href={item.href}>
                  <span className="nav-item-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Language & Mobile Toggle */}
          <div className="navbar-actions">
            <button 
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label="Change language"
            >
              <span className={activeLanguage === 'tr' ? 'active' : ''}>TR</span>
              <span className="separator">|</span>
              <span className={activeLanguage === 'en' ? 'active' : ''}>EN</span>
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
      >
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <a 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mobile-menu-footer">
            <p>Medcezir Export</p>
            <p className="mobile-tagline">
              {activeLanguage === 'tr' 
                ? 'Medikal İnovasyonun Yeni Adresi' 
                : 'The New Address of Medical Innovation'}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar