import { useState, useEffect } from 'react'
import LiquidNavbar from './components/Navigation/LiquidNavbar'
import CustomCursor from './components/Common/CustomCursor'
import OceanWaveOpening from './components/Hero/OceanWaveOpening'
import GeminiAssistant from './components/AI/GeminiAssistant'
import Home from './pages/Home'
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
    <div className="app">
      {/* Ocean Wave Opening Experience */}
      {showOpening && (
        <OceanWaveOpening onComplete={handleOpeningComplete} />
      )}
      
      {/* Main Application */}
      {!showOpening && (
        <>
          <CustomCursor />
          <LiquidNavbar onLanguageChange={handleLanguageChange} />
          <main>
            <Home language={currentLanguage} />
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
  )
}

export default App