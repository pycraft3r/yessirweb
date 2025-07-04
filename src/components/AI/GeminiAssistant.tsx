import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './GeminiAssistant.css'

// Types
interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinking?: boolean
}

interface GeminiAssistantProps {
  language?: 'tr' | 'en'
  onClose?: () => void
}

// Gemini API service
class GeminiService {
  private apiKey: string
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAPg17fmMTRLEEFg1W5u8xI5FJRyy9dfYI'
  }

  async generateResponse(prompt: string, language: 'tr' | 'en' = 'tr'): Promise<string> {
    const systemPrompt = language === 'tr' 
      ? `Sen Medcezir Export şirketinin AI asistanısın. Medikal cihaz ihracatı konusunda uzman bir danışmansın. 
         Şirket 2008'den beri Ethicon, Smith & Nephew, Boston Scientific, Medtronic gibi dünya markalarının 
         distribütörü olarak çalışıyor. Türkiye'de merkezi olan şirket 50+ ülkeye ihracat yapıyor.
         
         Görevlerin:
         - Medikal cihazlar hakkında bilgi vermek
         - Ürün önerileri yapmak  
         - Sertifikasyon süreçleri hakkında bilgi vermek
         - Fiyat teklifleri için yönlendirme yapmak
         - Profesyonel ve samimi bir tonda yanıtlar vermek
         
         Lütfen kısa, net ve yardımcı yanıtlar ver.`
      : `You are the AI assistant for Medcezir Export. You are an expert consultant in medical device export.
         The company has been working as a distributor for world brands like Ethicon, Smith & Nephew, 
         Boston Scientific, Medtronic since 2008. Based in Turkey, the company exports to 50+ countries.
         
         Your tasks:
         - Provide information about medical devices
         - Make product recommendations
         - Inform about certification processes
         - Guide for price quotes
         - Provide professional and friendly responses
         
         Please give short, clear and helpful answers.`

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nKullanıcı sorusu: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      })

      const data = await response.json()
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      }
      
      throw new Error('Invalid response format')
    } catch (error) {
      console.error('Gemini API Error:', error)
      return language === 'tr' 
        ? 'Üzgünüm, şu anda size yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin.'
        : 'Sorry, I cannot assist you right now. Please try again later.'
    }
  }
}

// Quick suggestions
const quickSuggestions = {
  tr: [
    "Endoskopik cerrahi aletleri hakkında bilgi alabilir miyim?",
    "Hangi markaların distribütörüsünüz?", 
    "Ürünlerinizin sertifikaları neler?",
    "Fiyat teklifi nasıl alabilirim?",
    "Hangi ülkelere ihracat yapıyorsunuz?"
  ],
  en: [
    "Can I get information about endoscopic surgical instruments?",
    "Which brands do you distribute?",
    "What certifications do your products have?", 
    "How can I get a price quote?",
    "Which countries do you export to?"
  ]
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ 
  language = 'tr', 
  onClose 
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const assistantRef = useRef<HTMLDivElement>(null)
  const geminiService = useRef(new GeminiService())

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: language === 'tr' 
        ? `Merhaba! Ben Medcezir Export AI asistanıyım. Medikal cihazlar, ürün önerileri ve şirketimiz hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?`
        : `Hello! I'm the Medcezir Export AI assistant. I can answer your questions about medical devices, product recommendations, and our company. How can I help you?`,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [language])

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  // Entrance animation
  useEffect(() => {
    if (assistantRef.current) {
      gsap.fromTo(assistantRef.current,
        { 
          scale: 0, 
          rotation: -180, 
          opacity: 0,
          x: 100,
          y: 100
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8, 
          ease: "back.out(1.7)",
          delay: 0.3
        }
      )
    }
  }, [])

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim()
    if (!messageContent || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user', 
      content: messageContent,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    // Add thinking indicator
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      thinking: true
    }
    setMessages(prev => [...prev, thinkingMessage])

    try {
      const response = await geminiService.current.generateResponse(messageContent, language)
      
      // Remove thinking message and add real response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.thinking)
        const assistantMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: response,
          timestamp: new Date()
        }
        return [...filtered, assistantMessage]
      })
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.thinking)
        const errorMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: language === 'tr' 
            ? 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.'
            : 'Sorry, an error occurred. Please try again.',
          timestamp: new Date()
        }
        return [...filtered, errorMessage]
      })
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    
    if (assistantRef.current) {
      if (isMinimized) {
        gsap.to(assistantRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      } else {
        gsap.to(assistantRef.current, {
          scale: 0.1,
          duration: 0.4,
          ease: "power2.in"
        })
      }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      ref={assistantRef}
      className={`gemini-assistant ${isMinimized ? 'minimized' : ''}`}
    >
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-avatar">
          <div className="avatar-pulse"></div>
          <div className="avatar-inner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        <div className="assistant-info">
          <h3 className="assistant-name">
            {language === 'tr' ? 'Medcezir AI' : 'Medcezir AI'}
          </h3>
          <p className="assistant-status">
            {isTyping 
              ? (language === 'tr' ? 'Yazıyor...' : 'Typing...') 
              : (language === 'tr' ? 'Çevrimiçi' : 'Online')
            }
          </p>
        </div>

        <div className="assistant-controls">
          <button 
            className="control-btn minimize-btn"
            onClick={toggleMinimize}
            aria-label={language === 'tr' ? 'Küçült' : 'Minimize'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 12L18 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          {onClose && (
            <button 
              className="control-btn close-btn"
              onClick={onClose}
              aria-label={language === 'tr' ? 'Kapat' : 'Close'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.thinking ? (
              <div className="thinking-indicator">
                <div className="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="thinking-text">
                  {language === 'tr' ? 'Düşünüyor...' : 'Thinking...'}
                </span>
              </div>
            ) : (
              <>
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Quick suggestions */}
      {messages.length === 1 && (
        <div className="quick-suggestions">
          <p className="suggestions-label">
            {language === 'tr' ? 'Hızlı sorular:' : 'Quick questions:'}
          </p>
          <div className="suggestions-grid">
            {quickSuggestions[language].map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSendMessage(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="input-container">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'tr' ? 'Bir soru sorun...' : 'Ask a question...'}
            disabled={isLoading}
            className="message-input"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="send-btn"
            aria-label={language === 'tr' ? 'Gönder' : 'Send'}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Powered by */}
      <div className="powered-by">
        <span>{language === 'tr' ? 'Destekleyen:' : 'Powered by:'}</span>
        <strong>Gemini 2.0 Flash</strong>
      </div>
    </div>
  )
}

export default GeminiAssistant