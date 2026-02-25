import { useParams, Link } from 'react-router-dom';
import medicinesData from '../data/medicines.json';

function MedicineDetail() {
  const { id } = useParams();
  const medicine = medicinesData.medicines.find(m => m.id === id);

  if (!medicine) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>ไม่พบข้อมูลยา</h1>
        <Link to="/categories" style={{ color: '#4A90E2' }}>กลับไปหน้าหมวดหมู่ยา</Link>
      </div>
    );
  }

  const sectionStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    color: '#4A90E2',
    borderBottom: '2px solid #f0f7ff',
    paddingBottom: '10px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <Link to="/categories" style={{
          display: 'inline-block',
          marginBottom: '20px',
          color: '#4A90E2',
          textDecoration: 'none'
        }}>
          <i className="fas fa-arrow-left"></i> กลับไปหน้าหมวดหมู่ยา
        </Link>

        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: '#f0f7ff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#4A90E2'
          }}>
            <i className={`fas fa-${medicine.icon}`}></i>
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{medicine.name} ({medicine.nameEn})</h1>
            <p style={{ color: '#666', margin: '5px 0' }}>กลุ่มยา: {medicine.categoryName}</p>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            <i className="fas fa-info-circle"></i> ข้อมูลทั่วไป
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee', color: '#7f8c8d', width: '30%' }}>
                  ชื่อสามัญ
                </th>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{medicine.nameEn}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee', color: '#7f8c8d' }}>
                  สรรพคุณ
                </th>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{medicine.description}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #eee', color: '#7f8c8d' }}>
                  รูปแบบยา
                </th>
                <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{medicine.forms.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            <i className="fas fa-clock"></i> วิธีใช้ยา
          </h3>
          <p>รับประทาน {medicine.dosage.frequency} <b>{medicine.dosage.maxDaily}</b></p>
          <ul>
            <li>ผู้ใหญ่: {medicine.dosage.adult}</li>
            <li>เด็ก: {medicine.dosage.child}</li>
          </ul>
        </div>

        <div style={{
          background: '#fff5f5',
          borderLeft: '5px solid #e74c3c',
          padding: '20px',
          borderRadius: '10px',
          color: '#c0392b'
        }}>
          <h4 style={{ marginTop: 0 }}>
            <i className="fas fa-exclamation-triangle"></i> ข้อควรระวังสำคัญ
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {medicine.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MedicineDetail;