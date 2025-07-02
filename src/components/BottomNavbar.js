import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BottomNavbar.css';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/hire-home', label: 'Home', icon: '🏠' },
    { path: '/applicants', label: 'Applicant', icon: '👥' },
    { path: '/account', label: 'Account', icon: '👤' }
  ];

  return (
    <div className="bottom-navbar">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar; 