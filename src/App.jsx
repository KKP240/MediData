import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Symptoms from './pages/Symptoms';
import MedicineDetail from './pages/MedicineDetail';
import SymptomDetail from './pages/SymptomDetail';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div style={{ 
        fontFamily: "'Prompt', sans-serif",
        backgroundColor: '#f0f7ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap" 
          rel="stylesheet" 
        />
        
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/symptom/:id" element={<SymptomDetail />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;