import { useInitiativesStore } from '@store/initiativesStore'
import InitiativeCard from './InitiativeCard'
import './InitiativesGrid.css'

interface InitiativesGridProps {
  viewType: 'cards' | 'table'
}

const InitiativesGrid = ({ viewType }: InitiativesGridProps) => {
  const { filteredPillars } = useInitiativesStore()

  if (viewType === 'cards') {
    return (
      <div className="initiatives-grid">
        {filteredPillars.map((pillar) => (
          <div key={pillar.id} className="pillar-section">
            <div className="pillar-header">
              <h2>{pillar.title}</h2>
              <span className="pillar-count">{pillar.initiatives.length} مبادرة</span>
            </div>
            <div className="cards-grid">
              {pillar.initiatives.map((initiative) => (
                <InitiativeCard key={initiative.id} initiative={initiative} pillar={pillar} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Table View
  return (
    <div className="table-view">
      <table className="initiatives-table">
        <thead>
          <tr>
            <th>المحور</th>
            <th>المبادرة</th>
            <th>الحالة</th>
            <th>الأولوية</th>
            <th>التقدم</th>
            <th>الميزانية</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
          </tr>
        </thead>
        <tbody>
          {filteredPillars.flatMap((pillar) =>
            pillar.initiatives.map((initiative) => (
              <tr key={initiative.id} className={`status-${initiative.status}`}>
                <td className="pillar-cell">{pillar.title}</td>
                <td className="title-cell">{initiative.title}</td>
                <td className={`status-${initiative.status}`}>
                  {initiative.status === 'planned' && '📋 مخطط'}
                  {initiative.status === 'in-progress' && '⚡ قيد التنفيذ'}
                  {initiative.status === 'completed' && '✅ مكتمل'}
                  {initiative.status === 'delayed' && '⏸️ متأخر'}
                </td>
                <td className={`priority-${initiative.priority}`}>
                  {initiative.priority === 'high' && '🔴 عالية'}
                  {initiative.priority === 'medium' && '🟡 متوسطة'}
                  {initiative.priority === 'low' && '🟢 منخفضة'}
                </td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${initiative.progress || 0}%` }}></div>
                    <span>{initiative.progress || 0}%</span>
                  </div>
                </td>
                <td className="budget-cell">{initiative.budget?.toLocaleString('ar-SA') || '-'}</td>
                <td>{initiative.startDate || '-'}</td>
                <td>{initiative.endDate || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default InitiativesGrid
