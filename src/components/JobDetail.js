import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import BottomNavbar from './BottomNavbar';
import './JobDetail.css';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  // Sample job data - in a real app this would come from a backend
  const [job, setJob] = useState(null);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      checkIn: "2024-01-15 09:00",
      checkOut: "2024-01-15 17:00",
      status: "checked-out"
    },
    {
      id: 2,
      name: "Bob Smith",
      checkIn: "2024-01-15 08:30",
      checkOut: null,
      status: "checked-in"
    },
    {
      id: 3,
      name: "Carol Davis",
      checkIn: null,
      checkOut: null,
      status: "not-checked-in"
    }
  ]);

  const jobs = [
    {
      id: 1,
      title: "Part-time Barista",
      description: "Looking for a friendly barista to work weekends at our coffee shop",
      jobType: "Part-time",
      wagePerHour: 15,
      hiringPeriod: 20,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Delivery Driver",
      description: "Need reliable driver for food delivery service",
      jobType: "Flexible",
      wagePerHour: 18,
      hiringPeriod: 30,
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "Tutoring Assistant",
      description: "Help students with math and science homework",
      jobType: "Part-time",
      wagePerHour: 22,
      hiringPeriod: 15,
      date: "2024-01-25"
    }
  ];

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === parseInt(jobId));
    setJob(foundJob);
  }, [jobId]);

  const handlePayClick = () => {
    navigate(`/pay-employees/${jobId}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'checked-out': return '#28a745';
      case 'checked-in': return '#17a2b8';
      case 'not-checked-in': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'checked-out': return 'Completed';
      case 'checked-in': return 'Working';
      case 'not-checked-in': return 'Not Started';
      default: return 'Unknown';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-detail-container page-with-navbar">
      <div className="job-detail-header">
        <button className="back-btn" onClick={() => navigate('/hire-home')}>
          ← Back
        </button>
        <h1>{job.title}</h1>
      </div>

      <div className="qr-section">
        <h3>QR Codes for Employees</h3>
        <div className="qr-codes-container">
          <div className="qr-code-item">
            <h4>Check-In</h4>
            <div className="qr-code-container">
              <QRCodeSVG 
                value={`${window.location.origin}/checkin/${jobId}`} 
                size={150}
                level="M"
              />
            </div>
            <p className="qr-description">
              Scan to check in
            </p>
          </div>
          
          <div className="qr-code-item">
            <h4>Check-Out</h4>
            <div className="qr-code-container">
                             <QRCodeSVG 
                 value={`${window.location.origin}/checkout/${jobId}`} 
                 size={150}
                 level="M"
               />
            </div>
            <p className="qr-description">
              Scan to check out
            </p>
          </div>
        </div>
      </div>

      <div className="employees-section">
        <div className="employees-header">
          <h3>Employees ({employees.length})</h3>
          <button className="pay-btn" onClick={handlePayClick}>
            Pay Employees
          </button>
        </div>

        <div className="employees-list">
          {employees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="employee-info">
                <h4 className="employee-name">{employee.name}</h4>
                <div 
                  className="employee-status"
                  style={{ color: getStatusColor(employee.status) }}
                >
                  {getStatusText(employee.status)}
                </div>
              </div>
              
              <div className="time-info">
                <div className="time-detail">
                  <span className="time-label">Check In:</span>
                  <span className="time-value">{formatTime(employee.checkIn)}</span>
                </div>
                <div className="time-detail">
                  <span className="time-label">Check Out:</span>
                  <span className="time-value">{formatTime(employee.checkOut)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default JobDetail; 