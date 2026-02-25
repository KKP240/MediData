import { useParams, Link } from 'react-router-dom';
import medicinesData from '../data/medicines.json';

function CategoryDetail() {
  const { id } = useParams();
  const category = medicinesData.categories.find(c => c.id === id);
  const medicines = medicinesData.medicines.filter(m => m.category === id);

  if (!category) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        background: '#f0f7ff',
        minHeight: '100vh'
      }}>
        <h1>ไม่พบหมวดหมู่ยา</h1>
        <Link to="/categories" style={{ color: '#4A90E2' }}>
          กลับไปหน้าหมวดหมู่ยา
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <Link to="/categories" style={{
          display: 'inline-block',
          marginBottom: '20px',
          color: '#4A90E2',
          textDecoration: 'none'
        }}>
          <i className="fas fa-arrow-left"></i> กลับไปหน้าหมวดหมู่
        </Link>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#f0f7ff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#4A90E2',
            marginBottom: '20px'
          }}>
            <i className={`fas fa-${category.icon}`}></i>
          </div>
          <h1 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{category.name}</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {category.description}
          </p>
        </div>

        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          รายการยาในกลุ่มนี้ ({medicines.length} รายการ)
        </h2>

        {medicines.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            color: '#888'
          }}>
            <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}></i>
            ยังไม่มีข้อมูลยาในหมวดหมู่นี้
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {medicines.map((med) => (
              <Link
                key={med.id}
                to={`/medicine/${med.id}`}
                style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  borderLeft: '4px solid #4A90E2'
                }}
                className="medicine-card"
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '10px'
                }}>
                  <i className={`fas fa-${med.icon}`} style={{
                    fontSize: '1.5rem',
                    color: '#4A90E2'
                  }}></i>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{med.name}</h3>
                </div>
                <p style={{ 
                  margin: '0 0 10px 0', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}>
                  {med.description.substring(0, 100)}...
                </p>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {med.forms.slice(0, 2).map((form, idx) => (
                    <span key={idx} style={{
                      background: '#f0f7ff',
                      color: '#4A90E2',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem'
                    }}>
                      {form}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;