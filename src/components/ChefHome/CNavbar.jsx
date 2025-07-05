import React from 'react';
import '../../css/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const CNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");  
    navigate("/home");
    window.location.reload(); 
  };

  return (
    <div className='navbar'>
      <nav>
        <img src='src/assets/Logo1.png' alt='nav-logo' className='logo' />
        <ul className='navbar-list'>
          <li><Link to='/Chome'>Home</Link></li>
          <li><Link to='/aboutUs'>About Us</Link></li>
          <li><Link to='/chefs'>Chefs</Link></li>
          <li><Link to='/recipes'>Recipes</Link></li>
          <li><a href='#'>Contact</a></li>
          <li><Link to='/Cprofile'>Profile</Link></li>
        </ul>

        <div className="nav-right">
          <div className="cprofile">
            <FaUser />
          </div>
          <div className="nav-buttons">
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CNavbar;
