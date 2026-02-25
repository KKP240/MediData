import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav style={{
      background: 'white',
      padding: '1rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{
        fontWeight: 600,
        color: '#4A90E2',
        fontSize: '1.5rem',
        textDecoration: 'none'
      }}>
        <i className="fas fa-pills"></i> MediData
      </Link>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0
      }}>
        <li>
          <Link to="/" style={{
            textDecoration: 'none',
            color: isActive('/') ? '#4A90E2' : '#666',
            fontWeight: isActive('/') ? 600 : 400,
            transition: '0.3s'
          }}>หน้าแรก</Link>
        </li>
        <li>
          <Link to="/categories" style={{
            textDecoration: 'none',
            color: isActive('/categories') ? '#4A90E2' : '#666',
            fontWeight: isActive('/categories') ? 600 : 400,
            transition: '0.3s'
          }}>ประเภทของยา</Link>
        </li>
        <li>
          <Link to="/symptoms" style={{
            textDecoration: 'none',
            color: isActive('/symptoms') ? '#4A90E2' : '#666',
            fontWeight: isActive('/symptoms') ? 600 : 400,
            transition: '0.3s'
          }}>อาการ</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;