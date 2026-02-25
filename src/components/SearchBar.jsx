import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import medicinesData from '../data/medicines.json';
import symptomsData from '../data/symptoms.json';

function SearchBar({ placeholder = "พิมพ์ชื่อยา หรืออาการที่พบ... (เช่น ปวดหัว, พาราเซตามอล)" }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const lowerQuery = query.toLowerCase();
      
      const medicineResults = medicinesData.medicines
        .filter(med => 
          med.name.includes(query) || 
          med.nameEn.toLowerCase().includes(lowerQuery) ||
          med.categoryName.includes(query) ||
          med.description.includes(query)
        )
        .map(med => ({ ...med, type: 'medicine' }));

      const symptomResults = symptomsData.symptoms
        .filter(sym => 
          sym.name.includes(query) || 
          sym.nameEn.toLowerCase().includes(lowerQuery) ||
          sym.description.includes(query)
        )
        .map(sym => ({ ...sym, type: 'symptom' }));

      const quickSymptomResults = symptomsData.quickSymptoms
        ?.filter(sym => 
          sym.name.includes(query) || 
          sym.id.toLowerCase().includes(lowerQuery)
        )
        .map(sym => ({ ...sym, type: 'symptom', systemName: 'อาการทั่วไป' })) || [];

      const allResults = [...medicineResults, ...symptomResults, ...quickSymptomResults]
        .filter((item, index, self) => 
          index === self.findIndex((t) => t.id === item.id && t.type === item.type)
        )
        .slice(0, 8);
      
      setSuggestions(allResults);
      setShowSuggestions(allResults.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = (item) => {
    if (item.type === 'medicine') {
      navigate(`/medicine/${item.id}`);
    } else {
      navigate(`/symptom/${item.id}`);
    }
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '15px 25px',
            borderRadius: '50px',
            border: '2px solid #eee',
            fontSize: '1rem',
            outline: 'none',
            transition: '0.3s',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            fontFamily: 'Prompt, sans-serif',
            boxSizing: 'border-box'
          }}
          onFocus={() => query.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
        />
      </form>
      
      {showSuggestions && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflow: 'hidden',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {suggestions.map((item, index) => (
            <div
              key={`${item.type}-${item.id}-${index}`}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: '15px 20px',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
                background: 'white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <i 
                className={`fas fa-${item.type === 'medicine' ? 'pills' : 'stethoscope'}`} 
                style={{ color: '#4A90E2', width: '20px' }}
              ></i>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: '#333' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  {item.type === 'medicine' ? item.categoryName : (item.systemName || 'อาการ')}
                </div>
              </div>
              <i className="fas fa-chevron-right" style={{ color: '#ccc', fontSize: '0.8rem' }}></i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;