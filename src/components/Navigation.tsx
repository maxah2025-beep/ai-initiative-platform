import './Navigation.css'

interface NavigationProps {
  activeView: 'grid' | 'table' | 'dashboard' | 'analytics'
  setActiveView: (view: 'grid' | 'table' | 'dashboard' | 'analytics') => void
}

const Navigation = ({ activeView, setActiveView }: NavigationProps) => {
  const navItems = [
    { id: 'grid', label: '📋 بطاقات', icon: '▦' },
    { id: 'table', label: '📊 جدول', icon: '▤' },
    { id: 'dashboard', label: '📈 لوحة التحكم', icon: '◉' },
    { id: 'analytics', label: '🔍 التحليلات', icon: '◈' },
  ] as const

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-items">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
