import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import JobSeekerNavbar from './JobSeekerNavbar';
import './JobQRScan.css';

const JobQRScan = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get job details from navigation state
  const jobDetails = location.state || {
    jobTitle: "Part-time Job",
    company: "Company Name",
    workDate: new Date().toISOString().split('T')[0]
  };

  const [checkInStatus, setCheckInStatus] = useState(null); // null, 'checked-in', 'checked-out'
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleBack = () => {
    navigate('/my-applications');
  };

  const simulateCheckIn = () => {
    const now = new Date();
    setCheckInStatus('checked-in');
    setCheckInTime(now.toLocaleTimeString());
  };

  const simulateCheckOut = () => {
    const now = new Date();
    setCheckInStatus('checked-out');
    setCheckOutTime(now.toLocaleTimeString());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusMessage = () => {
    if (checkInStatus === 'checked-in') {
      return {
        icon: '✅',
        title: 'Checked In Successfully!',
        message: `You checked in at ${checkInTime}. Don't forget to check out when you finish your shift.`,
        color: '#28a745'
      };
    } else if (checkInStatus === 'checked-out') {
      return {
        icon: '🎉',
        title: 'Shift Completed!',
        message: `You checked out at ${checkOutTime}. Great work today! Your hours will be processed for payment.`,
        color: '#6f42c1'
      };
    }
    return null;
  };

  return (
    <div className="job-qr-scan-container page-with-navbar">
      <div className="qr-scan-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Applications
        </button>
      </div>

      <div className="qr-scan-content">
        {/* Job Information */}
        <div className="job-info-card">
          <h1 className="job-title">{jobDetails.jobTitle}</h1>
          <h2 className="company-name">{jobDetails.company}</h2>
          <div className="work-date">
            <span className="date-icon">📅</span>
            <span>{formatDate(jobDetails.workDate)}</span>
          </div>
        </div>

        {/* Status Message */}
        {getStatusMessage() && (
          <div className="status-message" style={{ borderColor: getStatusMessage().color }}>
            <div className="status-icon">{getStatusMessage().icon}</div>
            <div className="status-content">
              <h3 style={{ color: getStatusMessage().color }}>{getStatusMessage().title}</h3>
              <p>{getStatusMessage().message}</p>
            </div>
          </div>
        )}

        {/* QR Codes Section */}
        <div className="qr-codes-section">
          <h3>QR Codes for Attendance</h3>
          <p className="qr-instruction">
            Scan the appropriate QR code at your workplace to track your attendance
          </p>

          <div className="qr-codes-container">
            {/* Check-In QR Code */}
            <div className={`qr-code-card ${checkInStatus === 'checked-in' || checkInStatus === 'checked-out' ? 'completed' : ''}`}>
              <div className="qr-code-header">
                <h4>Check In</h4>
                {checkInStatus && (
                  <div className="completion-status">
                    {checkInStatus === 'checked-in' || checkInStatus === 'checked-out' ? '✅' : '⏳'}
                  </div>
                )}
              </div>
              
              <div className="qr-code-wrapper">
                <QRCodeSVG 
                  value={`${window.location.origin}/checkin/${jobId}`} 
                  size={160}
                  level="M"
                  includeMargin={true}
                />
                {(checkInStatus === 'checked-in' || checkInStatus === 'checked-out') && (
                  <div className="qr-overlay">
                    <div className="overlay-icon">✅</div>
                    <div className="overlay-text">Completed</div>
                  </div>
                )}
              </div>
              
              <div className="qr-description">
                <p>Scan when you arrive at work</p>
                {checkInTime && (
                  <div className="time-stamp">
                    Checked in at: <strong>{checkInTime}</strong>
                  </div>
                )}
              </div>

              {/* Demo button for testing */}
              {!checkInStatus && (
                <button className="demo-btn check-in-btn" onClick={simulateCheckIn}>
                  🔄 Simulate Check In
                </button>
              )}
            </div>

            {/* Check-Out QR Code */}
            <div className={`qr-code-card ${checkInStatus === 'checked-out' ? 'completed' : checkInStatus === 'checked-in' ? 'available' : 'disabled'}`}>
              <div className="qr-code-header">
                <h4>Check Out</h4>
                {checkInStatus && (
                  <div className="completion-status">
                    {checkInStatus === 'checked-out' ? '✅' : checkInStatus === 'checked-in' ? '🟡' : '⏳'}
                  </div>
                )}
              </div>
              
              <div className="qr-code-wrapper">
                <QRCodeSVG 
                  value={`${window.location.origin}/checkout/${jobId}`} 
                  size={160}
                  level="M"
                  includeMargin={true}
                />
                {checkInStatus === 'checked-out' && (
                  <div className="qr-overlay">
                    <div className="overlay-icon">✅</div>
                    <div className="overlay-text">Completed</div>
                  </div>
                )}
                {!checkInStatus && (
                  <div className="qr-overlay disabled-overlay">
                    <div className="overlay-icon">🔒</div>
                    <div className="overlay-text">Check in first</div>
                  </div>
                )}
              </div>
              
              <div className="qr-description">
                <p>Scan when you finish your shift</p>
                {checkOutTime && (
                  <div className="time-stamp">
                    Checked out at: <strong>{checkOutTime}</strong>
                  </div>
                )}
              </div>

              {/* Demo button for testing */}
              {checkInStatus === 'checked-in' && (
                <button className="demo-btn check-out-btn" onClick={simulateCheckOut}>
                  🔄 Simulate Check Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions-card">
          <h4>How it works:</h4>
          <ol>
            <li>Arrive at your workplace on the scheduled date</li>
            <li>Find the QR scanner or use your phone to scan the <strong>Check In</strong> QR code</li>
            <li>Complete your work shift</li>
            <li>Before leaving, scan the <strong>Check Out</strong> QR code</li>
            <li>Your hours will be automatically calculated and processed for payment</li>
          </ol>
          
          <div className="contact-help">
            <p>Need help? Contact your employer or our support team.</p>
          </div>
        </div>
      </div>
      
      <JobSeekerNavbar />
    </div>
  );
};

export default JobQRScan; 