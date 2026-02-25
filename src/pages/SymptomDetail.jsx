import { useParams, Link } from 'react-router-dom';
import symptomsData from '../data/symptoms.json';

function SymptomDetail() {
  const { id } = useParams();
  const symptom = symptomsData.symptoms.find(s => s.id === id);

  if (!symptom) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>ไม่พบข้อมูลอาการ</h1>
        <Link to="/symptoms" style={{ color: '#4A90E2' }}>กลับไปหน้าอาการ</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <span style={{
            background: '#e3f2fd',
            color: '#4A90E2',
            padding: '5px 15px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            {symptom.systemName}
          </span>
          
          <h1 style={{ margin: '10px 0' }}>{symptom.name} ({symptom.nameEn})</h1>
          <p style={{ color: '#666' }}>{symptom.description}</p>

          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            padding: '25px',
            marginTop: '30px'
          }}>
            <h3 style={{ marginTop: 0 }}>วิธีดูแลตัวเองเบื้องต้น</h3>
            {symptom.selfCare.map((care, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <i className="fas fa-check-circle" style={{ color: '#27ae60' }}></i>
                <span>{care}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3>ยาที่เกี่ยวข้อง</h3>
            {symptom.relatedMedicines.map((med, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                borderBottom: '1px solid #eee',
                transition: '0.3s'
              }}>
                <span>{med.name}</span>
                <Link to={med.link} style={{ color: '#4A90E2', textDecoration: 'none' }}>
                  ดูข้อมูลยา &gt;
                </Link>
              </div>
            ))}
          </div>

          <div style={{
            background: '#fff3e0',
            borderRadius: '15px',
            padding: '20px',
            marginTop: '30px',
            border: '1px dashed orange'
          }}>
            <h4 style={{ marginTop: 0, color: '#e67e22' }}>
              <i className="fas fa-hospital"></i> เมื่อไหร่ที่ควรไปพบแพทย์?
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
              {symptom.emergencySigns.map((sign, idx) => (
                <li key={idx}>{sign}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomDetail;