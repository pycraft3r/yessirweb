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
  const [showOpening, setShowOpening] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr')
  const [showAI, setShowAI] = useState(false)

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
            <LiquidNavbar onLanguageChange={handleLanguageChange} />
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
          </>
        )}
      </div>
    </Router>
  )
}

export default App