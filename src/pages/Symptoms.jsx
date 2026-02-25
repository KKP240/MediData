import { Link } from 'react-router-dom';
import symptomsData from '../data/symptoms.json';

function Symptoms() {
  // จัดกลุ่มอาการตามระบบร่างกาย
  const groupedSymptoms = symptomsData.symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.system]) {
      acc[symptom.system] = {
        name: symptom.systemName,
        items: []
      };
    }
    acc[symptom.system].items.push(symptom);
    return acc;
  }, {});

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1>สำรวจตามอาการ</h1>
          <p style={{ color: '#666' }}>เลือกอาการที่คุณเป็นเพื่อดูข้อมูลเบื้องต้นและการดูแลตัวเอง</p>
        </div>

        {Object.entries(groupedSymptoms).map(([systemKey, group]) => (
          <div key={systemKey} style={{ marginBottom: '40px' }}>
            <h2 style={{
              borderLeft: '5px solid #4A90E2',
              paddingLeft: '15px',
              marginBottom: '20px',
              fontSize: '1.4rem',
              color: '#2c3e50'
            }}>
              {group.name}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px'
            }}>
              {group.items.map((symptom) => (
                <Link
                  key={symptom.id}
                  to={`/symptom/${symptom.id}`}
                  style={{
                    background: 'white',
                    padding: '25px 15px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    transition: '0.3s',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                  className="symptom-card"
                >
                  <i className={`fas fa-${symptom.icon}`} style={{
                    fontSize: '2rem',
                    color: '#4A90E2',
                    marginBottom: '15px',
                    display: 'block'
                  }}></i>
                  <span>{symptom.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Symptoms;