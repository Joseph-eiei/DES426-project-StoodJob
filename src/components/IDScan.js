import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IDScan.css';

const IDScan = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [idScanned, setIdScanned] = useState(false);
  const navigate = useNavigate();

  const handleScanID = () => {
    // Simulate ID scanning
    setIdScanned(true);
  };

  const handleNext = () => {
    if (acceptedTerms && idScanned) {
      navigate('/role-selection');
    }
  };

  return (
    <div className="id-scan-container">
      <div className="id-scan-content">
        <h2 className="page-title">Verify Your Identity</h2>
        <p className="instruction">Please scan your national ID to continue</p>
        
        <div className="scan-section">
          <div className={`scan-area ${idScanned ? 'scanned' : ''}`}>
            {!idScanned ? (
              <div className="scan-placeholder">
                <div className="camera-icon">📷</div>
                <p>Tap to scan your ID</p>
                <button onClick={handleScanID} className="scan-btn">
                  Scan National ID
                </button>
              </div>
            ) : (
              <div className="scan-success">
                <div className="check-icon">✅</div>
                <p>ID successfully scanned</p>
              </div>
            )}
          </div>
        </div>

        <div className="terms-section">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span className="checkmark"></span>
            <span className="terms-text">
              I accept the <a href="#" className="terms-link">Terms and Conditions</a>
            </span>
          </label>
        </div>

        <button 
          onClick={handleNext}
          className={`next-btn ${acceptedTerms && idScanned ? 'active' : 'disabled'}`}
          disabled={!acceptedTerms || !idScanned}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IDScan; 