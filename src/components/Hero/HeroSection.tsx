import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  title?: string
  subtitle?: string
  videoUrl?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "MEDİKAL İNOVASYONUN YENİ ADRESİ",
  subtitle = "2008'den beri dünya standartlarında cerrahi ekipman ihracatı",
  videoUrl = "/assets/videos/medical-bg.mp4"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const overlay = overlayRef.current

    if (!section || !video || !title || !subtitle || !cta || !overlay) return

    // Set initial states
    gsap.set([title, subtitle, cta], { 
      opacity: 0, 
      y: 50 
    })

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    })

    // Animate elements in sequence
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.5
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, "-=0.8")
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.6")

    // Parallax effect for video
    gsap.to(video, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })

    // Fade overlay on scroll
    gsap.to(overlay, {
      opacity: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "50% top",
        scrub: 1
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleScrollToContent = () => {
    const nextSection = document.querySelector('.content-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div ref={overlayRef} className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          <h1 ref={titleRef} className="hero-title">
            <span className="text-gradient">{title.split(' ')[0]}</span>{' '}
            <span>{title.split(' ').slice(1).join(' ')}</span>
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            {subtitle}
          </p>

          <div ref={ctaRef} className="hero-cta">
            <button className="btn btn-primary" onClick={handleScrollToContent}>
              Koleksiyonu Keşfet
            </button>
            <button className="btn btn-outline">
              Kurumsal
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={handleScrollToContent}>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default HeroSection