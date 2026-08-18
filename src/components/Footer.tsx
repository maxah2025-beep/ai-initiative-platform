import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>عن البرنامج</h4>
            <p>منصة متكاملة لإدارة والتخطيط لمبادرات الذكاء الاصطناعي في المؤسسة</p>
          </div>
          <div className="footer-section">
            <h4>الروابط السريعة</h4>
            <ul>
              <li><a href="#">الصفحة الرئيسية</a></li>
              <li><a href="#">التقارير</a></li>
              <li><a href="#">المساعدة</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>التواصل</h4>
            <p>📧 email@organization.com</p>
            <p>📞 +966 XX XXXX XXXX</p>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} برنامج الذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
          <div className="footer-links">
            <a href="#">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
