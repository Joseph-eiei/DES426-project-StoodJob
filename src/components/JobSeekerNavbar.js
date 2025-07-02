import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavbar.css';

const JobSeekerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/find-job-home', label: 'Jobs', icon: '🔍' },
    { path: '/my-applications', label: 'Applications', icon: '📋' },
    { path: '/job-seeker-account', label: 'Account', icon: '👤' }
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

export default JobSeekerNavbar; 