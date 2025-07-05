import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth/Authentication';
import logo from '../assets/Logo1.png';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout, user } = useContext(AuthContext);
  const role = localStorage.getItem("role"); // ✅ Fetch role from localStorage

  const LoginPage = () => {
    navigate('/login');
  };

  const RegisterPage = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <nav>
        <img src={logo} alt='nav-logo' className='logo' />
        <ul className='navbar-list'>
          <li><a href='/home'>Home</a></li>
          <li><a href='#aboutus'> About Us</a></li>
          <li><a href='/chefs'>Chefs</a></li>
          <li><a href='/recipes'>Recipes</a></li>
          <li><a href='/contact'>Contact</a></li>

          {/* ✅ Role-based Profile Link */}
          {token && (
            <>
              <li>
                <a href={
                  role === 'chef'
                    ? '/CProfile'
                    : role === 'foodlover'
                    ? '/FProfile'
                    : '/AProfile'
                }>
                  Profile
                </a>
              </li>

              {/* ✅ Admin-only Users Link */}
              {role === 'admin' && (
                <li>
                  <a href='/foodlovers'>FoodLovers</a>
                </li>
              )}
            </>
          )}
        </ul>

        <div className="nav-buttons">
          {token ? (
            <>
              <span className='welcome-text'>Hi, {user?.username || user?.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={LoginPage}>Sign in</button>
              <button onClick={RegisterPage}>Sign up</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
