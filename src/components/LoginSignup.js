import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = () => {
  const [phoneEmail, setPhoneEmail] = useState('');
  const navigate = useNavigate();

  const handleInputSubmit = () => {
    if (phoneEmail.trim()) {
      navigate('/id-scan');
    }
  };

  const handleGmailLogin = () => {
    navigate('/id-scan');
  };

  const handleFacebookLogin = () => {
    navigate('/id-scan');
  };

  return (
    <div className="login-signup-container">
      <div className="login-content">
        <h1 className="app-title">StoodJob</h1>
        <p className="subtitle">Find or hire part-time jobs</p>
        
        <div className="login-form">
          <div className="input-section">
            <input
              type="text"
              placeholder="Phone number or Email"
              value={phoneEmail}
              onChange={(e) => setPhoneEmail(e.target.value)}
              className="phone-email-input"
            />
            <button 
              onClick={handleInputSubmit}
              className="continue-btn"
              disabled={!phoneEmail.trim()}
            >
              Continue
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button onClick={handleGmailLogin} className="social-btn gmail-btn">
              <span className="social-icon">📧</span>
              Continue with Gmail
            </button>
            <button onClick={handleFacebookLogin} className="social-btn facebook-btn">
              <span className="social-icon">📘</span>
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup; 