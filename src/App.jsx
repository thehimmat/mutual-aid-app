import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicInventory from './components/PublicInventory';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Navbar from './components/Navbar';
import './styles/inventory.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<PublicInventory />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
