import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import symptomsData from '../data/symptoms.json';
import medicinesData from '../data/medicines.json';
import './Home.css';

function Home() {
  const quickSymptoms = symptomsData.quickSymptoms;
  const categories = medicinesData.categories;

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh' }}>
      <header style={{
        textAlign: 'center',
        padding: '80px 20px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' }}>
          ค้นหาข้อมูลยาที่คุณต้องการ
        </h1>
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
          รวบรวมข้อมูลการใช้ยาเบื้องต้น วิธีการรักษา และข้อควรระวัง
        </p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SearchBar />
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.8rem', color: '#2c3e50' }}>
          อาการที่พบบ่อย
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {quickSymptoms.map((symptom) => (
            <Link
              key={symptom.id}
              to={`/symptom/${symptom.id}`}
              className="symptom-card"
            >
              <i className={`fas fa-${symptom.icon}`}></i>
              <span>{symptom.name}</span>
            </Link>
          ))}
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.8rem', color: '#2c3e50' }}>
          หมวดหมู่ยาต่างๆ
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '25px'
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="category-card"
            >
              <i className={`fas fa-${cat.icon}`}></i>
              <h3>{cat.name}</h3>
              <p>{cat.description.substring(0, 60)}...</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;