import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import '../styles/Applicants.css';

const Applicants = () => {
  const navigate = useNavigate();
  
  // Sample applicant data - in a real app this would come from a backend
  const [applicants] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      profileImage: "👩‍💼",
      description: "Experienced barista with 3 years in coffee service",
      jobTitle: "Part-time Barista",
      jobDescription: "Looking for a friendly barista to work weekends at our coffee shop",
      applicationDate: "2024-01-16",
      status: "pending"
    },
    {
      id: 2,
      name: "Mike Chen",
      profileImage: "👨‍🚀",
      description: "Reliable driver with clean driving record",
      jobTitle: "Delivery Driver",
      jobDescription: "Need reliable driver for food delivery service",
      applicationDate: "2024-01-21",
      status: "pending"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      profileImage: "👩‍🎓",
      description: "Math tutor with teaching experience",
      jobTitle: "Tutoring Assistant",
      jobDescription: "Help students with math and science homework",
      applicationDate: "2024-01-26",
      status: "pending"
    },
    {
      id: 4,
      name: "David Kim",
      profileImage: "👨‍💻",
      description: "Student looking for flexible part-time work",
      jobTitle: "Part-time Barista",
      jobDescription: "Looking for a friendly barista to work weekends at our coffee shop",
      applicationDate: "2024-01-18",
      status: "pending"
    }
  ]);

  const handleViewDetail = (applicantId) => {
    navigate(`/applicant-detail/${applicantId}`);
  };

  return (
    <div className="applicants-container page-with-navbar">
      <div className="applicants-header">
        <h1>Job Applicants</h1>
        <p>Review and manage applications for your job postings</p>
      </div>

      <div className="applicants-grid">
        {applicants.length === 0 ? (
          <div className="no-applicants">
            <p>No applications yet. Your job postings will attract candidates soon!</p>
          </div>
        ) : (
          applicants.map(applicant => (
            <div key={applicant.id} className="applicant-card" onClick={() => handleViewDetail(applicant.id)}>
              <div className="applicant-header">
                <div className="profile-section">
                  <div className="profile-image">{applicant.profileImage}</div>
                  <div className="profile-info">
                    <h3 className="applicant-name">{applicant.name}</h3>
                    <p className="applicant-description">{applicant.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="application-info">
                <h4 className="applied-job-title">Applied for: {applicant.jobTitle}</h4>
                <p className="job-description">{applicant.jobDescription}</p>
                
                <div className="application-meta">
                  <span className="application-date">Applied: {applicant.applicationDate}</span>
                  <span className={`status-badge ${applicant.status}`}>{applicant.status}</span>
                </div>
              </div>
              
              <button className="view-detail-btn" onClick={(e) => {
                e.stopPropagation();
                handleViewDetail(applicant.id);
              }}>
                View Details
              </button>
            </div>
          ))
        )}
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default Applicants; 