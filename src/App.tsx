import { useState, useEffect } from 'react'
import { useInitiativesStore } from '@store/initiativesStore'
import Header from '@components/Header'
import Navigation from '@components/Navigation'
import Hero from '@components/Hero'
import Dashboard from '@components/Dashboard'
import InitiativesGrid from '@components/InitiativesGrid'
import SearchBar from '@components/SearchBar'
import FilterPanel from '@components/FilterPanel'
import Footer from '@components/Footer'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<'grid' | 'table' | 'dashboard' | 'analytics'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { applyFilters } = useInitiativesStore()

  useEffect(() => {
    applyFilters()
  }, [])

  return (
    <div className="app">
      <Header />
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      <Hero />
      
      <main className="main-container">
        <div className="controls-section">
          <SearchBar />
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            ⚙️ تصفية متقدمة
          </button>
        </div>

        {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}

        {activeView === 'grid' && <InitiativesGrid viewType="cards" />}
        {activeView === 'table' && <InitiativesGrid viewType="table" />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'analytics' && (
          <div className="analytics-placeholder">
            <h2>📊 التحليلات المتقدمة</h2>
            <p>قادمة قريباً...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
