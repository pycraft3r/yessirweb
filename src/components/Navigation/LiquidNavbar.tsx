import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LiquidNavbar.css'

gsap.registerPlugin(ScrollTrigger)

interface NavItem {
  id: string
  label: string
  labelEn: string
  href: string
  icon?: string
  isActive?: boolean
}

interface LiquidNavbarProps {
  logo?: string
  logoAlt?: string
  onLanguageChange?: (lang: 'tr' | 'en') => void
  isDarkMode?: boolean
  onThemeToggle?: () => void
}

const LiquidNavbar: React.FC<LiquidNavbarProps> = ({
  logo = '/assets/images/medcezir-logo.svg',
  logoAlt = 'Medcezir Export',
  onLanguageChange,
  isDarkMode = false,
  onThemeToggle
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const [activeItem, setActiveItem] = useState('home')
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navRef = useRef<HTMLElement>(null)
  const liquidBlobRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const logoRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    { id: 'home', label: 'Ana Sayfa', labelEn: 'Home', href: '/', icon: '🏠', isActive: true },
    { id: 'universe', label: 'Evren', labelEn: 'Universe', href: '/universe', icon: '🌌' },
    { id: 'collection', label: 'Koleksiyon', labelEn: 'Collection', href: '/collection', icon: '💎' },
    { id: 'laboratory', label: 'Laboratuvar', labelEn: 'Laboratory', href: '/laboratory', icon: '🧪' },
    { id: 'partnership', label: 'Ortaklık', labelEn: 'Partnership', href: '/partnership', icon: '🤝' },
    { id: 'contact', label: 'İletişim', labelEn: 'Contact', href: '/contact', icon: '📞' }
  ]

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initial animations
  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    )

    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.8 }
      )
    }

    // Animate menu items with liquid wave effect
    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          { y: -50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "elastic.out(1, 0.3)",
            delay: 1 + index * 0.1
          }
        )
      }
    })
  }, [])

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname
    const activeNav = navItems.find(item => item.href === currentPath)
    if (activeNav) {
      setActiveItem(activeNav.id)
    }
  }, [location.pathname])

  // Liquid blob animation
  useEffect(() => {
    if (!liquidBlobRef.current) return

    const blob = liquidBlobRef.current
    const activeIndex = navItems.findIndex(item => item.id === activeItem)
    const activeElement = menuItemsRef.current[activeIndex]

    if (activeElement) {
      const rect = activeElement.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()
      
      if (navRect) {
        const x = rect.left - navRect.left + rect.width / 2
        const y = rect.top - navRect.top + rect.height / 2

        gsap.to(blob, {
          x: x - 20,
          y: y - 20,
          duration: 0.8,
          ease: "power3.out"
        })
      }
    }
  }, [activeItem, navItems])

  // Language toggle
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'tr' ? 'en' : 'tr'
    setCurrentLanguage(newLang)
    onLanguageChange?.(newLang)
  }

  // Handle menu item hover
  const handleMenuItemHover = (_itemId: string, element: HTMLLIElement) => {
    if (liquidBlobRef.current) {
      const rect = element.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()
      
      if (navRect) {
        const x = rect.left - navRect.left + rect.width / 2
        const y = rect.top - navRect.top + rect.height / 2

        gsap.to(liquidBlobRef.current, {
          x: x - 25,
          y: y - 25,
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    // Ripple effect
    const ripple = document.createElement('div')
    ripple.className = 'nav-ripple'
    element.appendChild(ripple)

    gsap.fromTo(ripple, 
      { scale: 0, opacity: 0.6 },
      { 
        scale: 2, 
        opacity: 0, 
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => ripple.remove()
      }
    )
  }

  // Handle menu item leave
  const handleMenuItemLeave = () => {
    if (liquidBlobRef.current) {
      gsap.to(liquidBlobRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  // Handle menu item click
  const handleMenuItemClick = (itemId: string) => {
    setActiveItem(itemId)
    setIsMenuOpen(false)
  }

  // Logo hover effects
  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        rotation: 3,
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

  return (
    <nav 
      ref={navRef}
      className={`liquid-navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-container">
        {/* Liquid Background */}
        <div className="liquid-background">
          <svg viewBox="0 0 1200 120" className="liquid-wave">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  fill="rgba(0, 212, 255, 0.1)">
              <animate attributeName="d" 
                       dur="10s" 
                       repeatCount="indefinite"
                       values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;
                               M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z;
                               M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"/>
            </path>
          </svg>
        </div>

        {/* Logo */}
        <Link to="/" className="logo-link">
          <div 
            ref={logoRef}
            className="liquid-logo"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <div className="logo-container">
              <div className="logo-wave">
                <svg viewBox="0 0 100 100" className="logo-bg">
                  <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
                  <defs>
                    <linearGradient id="logoGradient">
                      <stop offset="0%" stopColor="#00D4FF"/>
                      <stop offset="100%" stopColor="#FFD700"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <img src={logo} alt={logoAlt} className="logo-img"/>
              <div className="logo-text">
                <span className="logo-title">MEDCEZIR</span>
                <span className="logo-subtitle">EXPORT</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Liquid Blob Indicator */}
        <div ref={liquidBlobRef} className="liquid-blob"></div>

        {/* Desktop Navigation */}
        <ul className="liquid-menu">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              ref={el => { menuItemsRef.current[index] = el }}
              className={`liquid-menu-item ${item.id === activeItem ? 'active' : ''}`}
              onMouseEnter={(e) => handleMenuItemHover(item.id, e.currentTarget)}
              onMouseLeave={handleMenuItemLeave}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <Link to={item.href} className="liquid-link">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">
                  {currentLanguage === 'tr' ? item.label : item.labelEn}
                </span>
                <div className="nav-liquid-effect"></div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="navbar-controls">
          {/* Language Toggle */}
          <button 
            className="language-toggle liquid-btn"
            onClick={toggleLanguage}
            aria-label="Change language"
          >
            <span className={`lang-option ${currentLanguage === 'tr' ? 'active' : ''}`}>TR</span>
            <div className="lang-divider"></div>
            <span className={`lang-option ${currentLanguage === 'en' ? 'active' : ''}`}>EN</span>
          </button>

          {/* Dark Mode Toggle */}
          <button 
            className="theme-toggle liquid-btn"
            onClick={onThemeToggle}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3V1M12 23V21M4.22 4.22L2.81 2.81M21.19 21.19L19.78 19.78M1 12H3M21 12H23M4.22 19.78L2.81 21.19M21.19 2.81L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle liquid-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-liquid-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-background">
          <div className="liquid-particles">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={item.id} className="mobile-nav-item" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <Link 
                  to={item.href}
                  className={`mobile-nav-link ${item.id === activeItem ? 'active' : ''}`}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-text">
                    {currentLanguage === 'tr' ? item.label : item.labelEn}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mobile-menu-footer">
            <h3>MEDCEZIR EXPORT</h3>
            <p>Where Medicine Meets Luxury</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default LiquidNavbar