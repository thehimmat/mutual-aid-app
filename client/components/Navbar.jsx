import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Mutual Aid Inventory</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/admin/login">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 