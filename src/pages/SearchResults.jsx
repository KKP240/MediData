import { useSearchParams, Link } from 'react-router-dom';
import medicinesData from '../data/medicines.json';
import symptomsData from '../data/symptoms.json';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const medicineResults = medicinesData.medicines.filter(med => 
    med.name.includes(query) || 
    med.nameEn.toLowerCase().includes(query.toLowerCase()) ||
    med.categoryName.includes(query) ||
    med.description.includes(query)
  );

  const symptomResults = symptomsData.symptoms.filter(sym => 
    sym.name.includes(query) || 
    sym.nameEn.toLowerCase().includes(query.toLowerCase()) ||
    sym.description.includes(query)
  );

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h1>ผลการค้นหา: "{query}"</h1>
        
        {medicineResults.length === 0 && symptomResults.length === 0 ? (
          <p>ไม่พบผลลัพธ์ที่ตรงกับคำค้นหา</p>
        ) : (
          <>
            {medicineResults.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2>ยาที่พบ ({medicineResults.length})</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {medicineResults.map((med) => (
                    <Link
                      key={med.id}
                      to={`/medicine/${med.id}`}
                      style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                      }}
                    >
                      <h3 style={{ color: '#4A90E2', margin: '0 0 10px 0' }}>{med.name}</h3>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                        {med.description.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {symptomResults.length > 0 && (
              <div>
                <h2>อาการที่พบ ({symptomResults.length})</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {symptomResults.map((sym) => (
                    <Link
                      key={sym.id}
                      to={`/symptom/${sym.id}`}
                      style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        color: 'inherit',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                      }}
                    >
                      <h3 style={{ color: '#4A90E2', margin: '0 0 10px 0' }}>{sym.name}</h3>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                        {sym.description.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResults;