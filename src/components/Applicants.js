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

  // State to track which job categories are expanded
  const [expandedJobs, setExpandedJobs] = useState({});

  // Group applicants by job title
  const groupedApplicants = applicants.reduce((groups, applicant) => {
    const jobTitle = applicant.jobTitle;
    if (!groups[jobTitle]) {
      groups[jobTitle] = [];
    }
    groups[jobTitle].push(applicant);
    return groups;
  }, {});

  const handleViewDetail = (applicantId) => {
    navigate(`/applicant-detail/${applicantId}`);
  };

  const toggleJobExpansion = (jobTitle) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobTitle]: !prev[jobTitle]
    }));
  };

  return (
    <div className="applicants-container page-with-navbar">
      <div className="applicants-header">
        <h1>Job Applicants</h1>
        <p>Review and manage applications for your job postings</p>
      </div>

      <div className="applicants-list-label">
        <h2>Applications by Job Category</h2>
      </div>

      <div className="job-categories">
        {Object.keys(groupedApplicants).length === 0 ? (
          <div className="no-applicants">
            <p>No applications yet. Your job postings will attract candidates soon!</p>
          </div>
        ) : (
          Object.entries(groupedApplicants).map(([jobTitle, jobApplicants]) => (
            <div key={jobTitle} className="job-category">
              <div 
                className="job-category-header"
                onClick={() => toggleJobExpansion(jobTitle)}
              >
                <div className="job-category-info">
                  <h3 className="job-title">{jobTitle}</h3>
                  <span className="applicant-count">({jobApplicants.length})</span>
                </div>
                <div className={`expand-icon ${expandedJobs[jobTitle] ? 'expanded' : ''}`}>
                  ▼
                </div>
              </div>
              
              <div className={`job-applicants-list ${expandedJobs[jobTitle] ? 'expanded' : 'collapsed'}`}>
                <div className="applicants-grid">
                  {jobApplicants.map(applicant => (
                    <div key={applicant.id} className="applicant-card" onClick={() => handleViewDetail(applicant.id)}>
                      <div className="card-content">
                        <div className="profile-section">
                          <div className="profile-image">{applicant.profileImage}</div>
                          <div className="profile-details">
                            <h3 className="applicant-name">{applicant.name}</h3>
                            <p className="applied-job">{applicant.jobTitle}</p>
                          </div>
                          <div className="card-actions">
                            <span className={`status-badge ${applicant.status}`}>{applicant.status}</span>
                          </div>
                        </div>
                        
                        <div className="application-footer">
                          <span className="application-date">{applicant.applicationDate}</span>
                          <button className="view-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(applicant.id);
                          }}>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default Applicants; 