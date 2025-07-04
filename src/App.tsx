import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LiquidNavbar from './components/Navigation/LiquidNavbar'
import OceanWaveOpening from './components/Hero/OceanWaveOpening'
import GeminiAssistant from './components/AI/GeminiAssistant'
import Home from './pages/Home'
import Universe from './pages/Universe'
import Collection from './pages/Collection'
import Laboratory from './pages/Laboratory'
import Partnership from './pages/Partnership'
import Contact from './pages/Contact'
import './App.css'

function App() {
  const [showOpening, setShowOpening] = useState(false) // Disabled opening animation
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr')
  const [showAI, setShowAI] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Show AI assistant after opening completes
  useEffect(() => {
    if (!showOpening) {
      const timer = setTimeout(() => {
        setShowAI(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showOpening])

  const handleOpeningComplete = () => {
    setShowOpening(false)
  }

  const handleLanguageChange = (lang: 'tr' | 'en') => {
    setCurrentLanguage(lang)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  return (
    <Router>
      <div className="app">
        {/* Ocean Wave Opening Experience */}
        {showOpening && (
          <OceanWaveOpening onComplete={handleOpeningComplete} />
        )}
        
        {/* Main Application */}
        {!showOpening && (
          <>
            <LiquidNavbar 
              onLanguageChange={handleLanguageChange} 
              isDarkMode={isDarkMode}
              onThemeToggle={handleThemeToggle}
            />
            <main>
              <Routes>
                <Route path="/" element={<Home language={currentLanguage} />} />
                <Route path="/universe" element={<Universe language={currentLanguage} />} />
                <Route path="/collection" element={<Collection language={currentLanguage} />} />
                <Route path="/laboratory" element={<Laboratory language={currentLanguage} />} />
                <Route path="/partnership" element={<Partnership language={currentLanguage} />} />
                <Route path="/contact" element={<Contact language={currentLanguage} />} />
              </Routes>
            </main>
            
            {/* AI Assistant */}
            {showAI && (
              <GeminiAssistant 
                language={currentLanguage} 
                onClose={() => setShowAI(false)} 
              />
            )}
            
            {/* AI Assistant Toggle Button */}
            {!showAI && (
              <button
                className="ai-toggle-btn"
                onClick={() => setShowAI(true)}
                aria-label="Open AI Assistant"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </Router>
  )
}

export default App