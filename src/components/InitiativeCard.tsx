import { useState } from 'react'
import { Initiative, Pillar } from '@types'
import './InitiativeCard.css'

interface InitiativeCardProps {
  initiative: Initiative
  pillar: Pillar
}

const InitiativeCard = ({ initiative, pillar }: InitiativeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusIcons = {
    planned: '📋',
    'in-progress': '⚡',
    completed: '✅',
    delayed: '⏸️',
  }

  const priorityColors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#4caf50',
  }

  return (
    <div className={`initiative-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header">
        <div className="card-title-section">
          <span className="initiative-num">{initiative.num}</span>
          <div>
            <h3>{initiative.title}</h3>
            <p className="initiative-desc">{initiative.description.substring(0, 80)}...</p>
          </div>
        </div>
        <div className="card-status" style={{ borderRightColor: priorityColors[initiative.priority] }}>
          <span className="status-icon">{statusIcons[initiative.status]}</span>
          <span className="status-text">{initiative.status}</span>
        </div>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <span className="meta-label">الأولوية</span>
          <span className="meta-value" style={{ color: priorityColors[initiative.priority] }}>
            {initiative.priority === 'high' && '🔴 عالية'}
            {initiative.priority === 'medium' && '🟡 متوسطة'}
            {initiative.priority === 'low' && '🟢 منخفضة'}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">التقدم</span>
          <span className="meta-value">{initiative.progress || 0}%</span>
        </div>
        {initiative.budget && (
          <div className="meta-item">
            <span className="meta-label">الميزانية</span>
            <span className="meta-value">{(initiative.budget / 1000).toFixed(0)}K</span>
          </div>
        )}
      </div>

      {initiative.progress !== undefined && (
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${initiative.progress}%` }}></div>
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="card-details">
          <div className="detail-group">
            <h4>التأثير المتوقع</h4>
            <p>{initiative.impact}</p>
          </div>

          {initiative.startDate && (
            <div className="detail-group">
              <h4>الجدول الزمني</h4>
              <p>من {initiative.startDate} إلى {initiative.endDate || 'TBD'}</p>
            </div>
          )}

          {initiative.kpis && initiative.kpis.length > 0 && (
            <div className="detail-group">
              <h4>مؤشرات النجاح</h4>
              <ul className="kpis-list">
                {initiative.kpis.map((kpi, idx) => (
                  <li key={idx}>✓ {kpi}</li>
                ))}
              </ul>
            </div>
          )}

          {initiative.team && initiative.team.length > 0 && (
            <div className="detail-group">
              <h4>الفريق</h4>
              <p>{initiative.team.join('، ')}</p>
            </div>
          )}
        </div>
      )}

      <button
        className="expand-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▲ إخفاء التفاصيل' : '▼ عرض التفاصيل'}
      </button>
    </div>
  )
}

export default InitiativeCard
