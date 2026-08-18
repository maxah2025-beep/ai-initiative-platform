import './Hero.css'

const Hero = () => {
  const stats = [
    { label: 'محاور رئيسية', value: '٥', color: '#12283f' },
    { label: 'مبادرة ذكاء اصطناعي', value: '١٤', color: '#c6994f' },
    { label: 'ميزانية مجموع', value: '٣.6M', color: '#1c3a5e' },
  ]

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2>المحاور الخمسة للتحول الرقمي</h2>
          <p>تربط 14 مبادرة ذكاء اصطناعي بخمسة محاور واضحة من بيئة العمل إلى الأداء المؤسسي</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item" style={{ borderTopColor: stat.color }}>
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
