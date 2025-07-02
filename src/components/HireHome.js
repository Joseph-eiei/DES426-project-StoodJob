import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import '../styles/HireHome.css';

const HireHome = () => {
  const navigate = useNavigate();
  
  // Sample job data - in a real app this would come from a backend
  const [jobs, setJobs] = useState([
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
  ]);

  const handleCreateJob = () => {
    navigate('/create-job');
  };

  const handleJobClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  return (
    <div className="hire-home-container page-with-navbar">
      <div className="hire-home-header">
        <h1>Your Job Postings</h1>
        <button className="create-btn" onClick={handleCreateJob}>
          Create Job
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No jobs posted yet. Create your first job posting!</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div className="job-detail">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{job.jobType}</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Wage:</span>
                  <span className="detail-value">${job.wagePerHour}/hr</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{job.hiringPeriod} hours</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Posted:</span>
                  <span className="detail-value">{job.date}</span>
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

export default HireHome; 