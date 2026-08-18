import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1>🤖 منصة المبادرات</h1>
            <p className="tagline">برنامج الذكاء الاصطناعي لتطوير بيئة العمل</p>
          </div>
          <div className="header-actions">
            <button 
              className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              العربية
            </button>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
