import { Link } from 'react-router-dom';
import medicinesData from '../data/medicines.json';

function Categories() {
  const categories = medicinesData.categories;

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#2c3e50' }}>ประเภทของยาสามัญ</h1>
          <p style={{ color: '#666' }}>ทำความเข้าใจกลุ่มยาต่างๆ เพื่อการใช้งานที่ถูกต้องและปลอดภัย</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderTop: '5px solid #4A90E2',
              transition: 'transform 0.3s'
            }}>
              <i className={`fas fa-${cat.icon}`} style={{
                fontSize: '2.5rem',
                color: '#4A90E2',
                marginBottom: '20px'
              }}></i>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{cat.name}</h3>
              <p style={{ 
                color: '#7f8c8d', 
                fontSize: '0.95rem', 
                lineHeight: 1.6, 
                marginBottom: '20px',
                flexGrow: 1 
              }}>
                {cat.description}
              </p>
              <Link 
                to={`/category/${cat.id}`}  // แก้ตรงนี้จาก # เป็น /category/${cat.id}
                style={{
                  background: '#4A90E2',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: '0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#357abd';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#4A90E2';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ดูรายการยาในกลุ่มนี้
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;