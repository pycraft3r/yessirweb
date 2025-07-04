import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CustomCursor.css'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursor || !cursorDot) return

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      })
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    // Hover handlers for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      })
      cursor.classList.add('cursor-hover')
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      cursor.classList.remove('cursor-hover')
    }

    // Medical plus icon for special elements
    const handleMedicalEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out"
      })
      cursor.classList.add('cursor-medical')
    }

    const handleMedicalLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      cursor.classList.remove('cursor-medical')
    }

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.2
      })
    }

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.2
      })
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Medical elements (product cards, etc.)
    const medicalElements = document.querySelectorAll('[data-cursor="medical"]')
    medicalElements.forEach(element => {
      element.addEventListener('mouseenter', handleMedicalEnter)
      element.addEventListener('mouseleave', handleMedicalLeave)
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })

      medicalElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMedicalEnter)
        element.removeEventListener('mouseleave', handleMedicalLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-content">
          <svg className="cursor-plus" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 4V20M4 12H20" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
    </>
  )
}

export default CustomCursor