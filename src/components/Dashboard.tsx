import { useMemo } from 'react'
import { useInitiativesStore } from '@store/initiativesStore'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

const Dashboard = () => {
  const { pillars } = useInitiativesStore()

  const metrics = useMemo(() => {
    let total = 0
    let completed = 0
    let inProgress = 0
    let planned = 0
    let delayed = 0
    let totalBudget = 0
    let totalProgress = 0

    pillars.forEach((pillar) => {
      totalBudget += pillar.totalBudget || 0
      pillar.initiatives.forEach((init) => {
        total++
        totalProgress += init.progress || 0
        if (init.status === 'completed') completed++
        if (init.status === 'in-progress') inProgress++
        if (init.status === 'planned') planned++
        if (init.status === 'delayed') delayed++
      })
    })

    return {
      total,
      completed,
      inProgress,
      planned,
      delayed,
      totalBudget,
      averageProgress: total > 0 ? Math.round(totalProgress / total) : 0,
    }
  }, [pillars])

  const statusData = [
    { name: 'مخطط', value: metrics.planned, color: '#5c6b7a' },
    { name: 'قيد التنفيذ', value: metrics.inProgress, color: '#c6994f' },
    { name: 'مكتمل', value: metrics.completed, color: '#4caf50' },
    { name: 'متأخر', value: metrics.delayed, color: '#f44336' },
  ]

  const pillarData = pillars.map((p) => ({
    name: p.title.replace(/[^\u0600-\u06FF\s]/g, '').split(' ')[1] || p.title,
    مبادرات: p.initiatives.length,
    الميزانية: (p.totalBudget || 0) / 1000,
  }))

  const budgetByPillar = pillars.map((p) => ({
    name: p.title.split(' ').pop() || p.title,
    value: p.totalBudget || 0,
  }))

  const COLORS = ['#12283f', '#1c3a5e', '#c6994f', '#e7cf9c', '#5c6b7a']

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Key Metrics */}
        <div className="metric-card">
          <div className="metric-label">إجمالي المبادرات</div>
          <div className="metric-value">{metrics.total}</div>
          <div className="metric-bar" style={{ width: '100%', height: '4px', background: '#e0e0e0', borderRadius: '2px', marginTop: '8px' }}>
            <div style={{ width: `${metrics.averageProgress}%`, height: '100%', background: 'linear-gradient(90deg, #c6994f, #e7cf9c)', borderRadius: '2px' }}></div>
          </div>
        </div>

        <div className="metric-card primary">
          <div className="metric-label">مكتملة</div>
          <div className="metric-value" style={{ color: '#4caf50' }}>{metrics.completed}</div>
          <div className="metric-percent">{Math.round((metrics.completed / metrics.total) * 100)}%</div>
        </div>

        <div className="metric-card warning">
          <div className="metric-label">قيد التنفيذ</div>
          <div className="metric-value" style={{ color: '#ff9800' }}>{metrics.inProgress}</div>
          <div className="metric-percent">{Math.round((metrics.inProgress / metrics.total) * 100)}%</div>
        </div>

        <div className="metric-card danger">
          <div className="metric-label">متأخرة</div>
          <div className="metric-value" style={{ color: '#f44336' }}>{metrics.delayed}</div>
          <div className="metric-percent">{Math.round((metrics.delayed / metrics.total) * 100)}%</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">مجموع الميزانية</div>
          <div className="metric-value">{(metrics.totalBudget / 1000000).toFixed(1)}M</div>
          <div className="metric-sub">ريال</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">متوسط التقدم</div>
          <div className="metric-value">{metrics.averageProgress}%</div>
          <div className="metric-bar" style={{ width: '100%', height: '4px', background: '#e0e0e0', borderRadius: '2px', marginTop: '8px' }}>
            <div style={{ width: `${metrics.averageProgress}%`, height: '100%', background: 'linear-gradient(90deg, #c6994f, #e7cf9c)', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Status Distribution */}
        <div className="chart-container">
          <h3>توزيع الحالة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Initiatives by Pillar */}
        <div className="chart-container">
          <h3>مبادرات بحسب المحور</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pillarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="مبادرات" fill="#c6994f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Distribution */}
        <div className="chart-container">
          <h3>توزيع الميزانية</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetByPillar}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${(value / 1000).toFixed(0)}K`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetByPillar.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Trend */}
        <div className="chart-container">
          <h3>التزام المبادرات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { month: 'يناير', 'مكتملة': 2, 'قيد التنفيذ': 5, 'مخطط': 7 },
                { month: 'فبراير', 'مكتملة': 3, 'قيد التنفيذ': 6, 'مخطط': 5 },
                { month: 'مارس', 'مكتملة': 4, 'قيد التنفيذ': 5, 'مخطط': 5 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="مكتملة" fill="#4caf50" />
              <Bar dataKey="قيد التنفيذ" fill="#ff9800" />
              <Bar dataKey="مخطط" fill="#5c6b7a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
