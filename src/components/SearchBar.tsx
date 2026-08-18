import { useState, useCallback } from 'react'
import { useInitiativesStore } from '@store/initiativesStore'
import './SearchBar.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { setFilters, applyFilters } = useInitiativesStore()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setFilters({
      searchQuery: query,
      status: [],
      priority: [],
      pillarId: [],
    })
    applyFilters()
  }, [setFilters, applyFilters])

  const handleClear = () => {
    setSearchQuery('')
    handleSearch('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 ابحث عن مبادرة..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button onClick={handleClear} className="clear-btn">✕</button>
      )}
    </div>
  )
}

export default SearchBar
