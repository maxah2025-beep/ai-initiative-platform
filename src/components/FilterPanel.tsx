import { useInitiativesStore } from '@store/initiativesStore'
import './FilterPanel.css'

interface FilterPanelProps {
  onClose: () => void
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
  const { filters, setFilters, applyFilters, resetFilters } = useInitiativesStore()
  const { pillars } = useInitiativesStore()

  const handleStatusChange = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status]
    
    const newFilters = { ...filters, status: newStatuses }
    setFilters(newFilters)
    applyFilters()
  }

  const handlePriorityChange = (priority: string) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority]
    
    const newFilters = { ...filters, priority: newPriorities }
    setFilters(newFilters)
    applyFilters()
  }

  const handlePillarChange = (pillarId: string) => {
    const newPillars = filters.pillarId.includes(pillarId)
      ? filters.pillarId.filter((p) => p !== pillarId)
      : [...filters.pillarId, pillarId]
    
    const newFilters = { ...filters, pillarId: newPillars }
    setFilters(newFilters)
    applyFilters()
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>⚙️ تصفية متقدمة</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="filter-section">
        <h4>الحالة</h4>
        <div className="filter-options">
          {['planned', 'in-progress', 'completed', 'delayed'].map((status) => (
            <label key={status} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.status.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              <span>
                {status === 'planned' && '📋 مخطط'}
                {status === 'in-progress' && '⚡ قيد التنفيذ'}
                {status === 'completed' && '✅ مكتمل'}
                {status === 'delayed' && '⏸️ متأخر'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>الأولوية</h4>
        <div className="filter-options">
          {['high', 'medium', 'low'].map((priority) => (
            <label key={priority} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.priority.includes(priority)}
                onChange={() => handlePriorityChange(priority)}
              />
              <span>
                {priority === 'high' && '🔴 عالية'}
                {priority === 'medium' && '🟡 متوسطة'}
                {priority === 'low' && '🟢 منخفضة'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>المحور</h4>
        <div className="filter-options">
          {pillars.map((pillar) => (
            <label key={pillar.id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.pillarId.includes(pillar.id)}
                onChange={() => handlePillarChange(pillar.id)}
              />
              <span>{pillar.title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button className="reset-btn" onClick={resetFilters}>🔄 إعادة تعيين</button>
        <button className="close-filter-btn" onClick={onClose}>تم</button>
      </div>
    </div>
  )
}

export default FilterPanel
