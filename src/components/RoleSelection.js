import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      if (selectedRole === 'hire') {
        navigate('/hire-home');
      } else if (selectedRole === 'find-job') {
        alert('Find Job feature coming soon!');
      }
    }
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-content">
        <h2 className="page-title">What brings you here?</h2>
        <p className="instruction">Choose how you'd like to use StoodJob</p>
        
        <div className="role-options">
          <div 
            className={`role-card ${selectedRole === 'find-job' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('find-job')}
          >
            <div className="role-icon">🔍</div>
            <h3 className="role-title">Find a Job</h3>
            <p className="role-description">
              Browse and apply for part-time opportunities
            </p>
          </div>

          <div 
            className={`role-card ${selectedRole === 'hire' ? 'selected' : ''}`}
            onClick={() => handleRoleSelect('hire')}
          >
            <div className="role-icon">💼</div>
            <h3 className="role-title">Hire Talent</h3>
            <p className="role-description">
              Post jobs and find the right people for your needs
            </p>
          </div>
        </div>

        <button 
          onClick={handleNext}
          className={`next-btn ${selectedRole ? 'active' : 'disabled'}`}
          disabled={!selectedRole}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default RoleSelection; 