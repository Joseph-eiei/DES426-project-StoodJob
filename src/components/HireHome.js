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
      date: "2024-01-15",
      status: "active",
      applicationStatus: "open",
      applicants: 3
    },
    {
      id: 2,
      title: "Delivery Driver",
      description: "Need reliable driver for food delivery service",
      jobType: "Flexible",
      wagePerHour: 18,
      hiringPeriod: 30,
      date: "2024-01-20",
      status: "active",
      applicationStatus: "open",
      applicants: 7
    },
    {
      id: 3,
      title: "Tutoring Assistant",
      description: "Help students with math and science homework",
      jobType: "Part-time",
      wagePerHour: 22,
      hiringPeriod: 15,
      date: "2024-01-25",
      status: "active",
      applicationStatus: "closed",
      applicants: 3
    },
    {
      id: 4,
      title: "Weekend Cashier",
      description: "Seeking responsible cashier for busy retail store, weekend shifts available",
      jobType: "Part-time",
      wagePerHour: 16,
      hiringPeriod: 25,
      date: "2024-01-28",
      status: "draft",
      applicants: 0
    }
  ]);

  const handleCreateJob = () => {
    navigate('/create-job');
  };

  const handleJobClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const handleViewApplicants = (jobId, e) => {
    e.stopPropagation();
    navigate(`/job-detail/${jobId}`);
  };

  const handlePayEmployees = (jobId, e) => {
    e.stopPropagation();
    navigate(`/pay-employees/${jobId}`);
  };

  const handleCloseApplications = (jobId, e) => {
    e.stopPropagation();
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, applicationStatus: "closed" }
          : job
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="hire-home-container page-with-navbar">
      <div className="hire-home-header">
        <h1>Your Jobs</h1>
        <button className="create-btn" onClick={handleCreateJob}>
          + New Job
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No jobs posted yet. Create your first job posting!</p>
          </div>
        ) : (
          jobs.map(job => (
            <div 
              key={job.id} 
              className={`job-card ${job.status === 'draft' ? 'draft-card' : ''}`}
              onClick={job.status === 'active' ? () => handleJobClick(job.id) : undefined}
            >
              <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-status-container">
                  <span className={`job-status ${job.status}`}>
                    {job.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                  {job.status === 'active' && (
                    <span className={`application-status ${job.applicationStatus}`}>
                      {job.applicationStatus === 'open' ? 'Open' : 'Closed'}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div className="job-detail">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{job.jobType}</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Wage</span>
                  <span className="detail-value wage">${job.wagePerHour}/hr</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{job.hiringPeriod}h</span>
                </div>
                
                <div className="job-detail">
                  <span className="detail-label">Posted</span>
                  <span className="detail-value">{formatDate(job.date)}</span>
                </div>
              </div>

              {job.status === 'active' && (
                <div className="job-actions">
                  <button 
                    className="action-btn primary"
                    onClick={(e) => handleViewApplicants(job.id, e)}
                  >
                    View Employees ({job.applicants})
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={(e) => handlePayEmployees(job.id, e)}
                  >
                    Pay Employees
                  </button>
                  {job.applicationStatus === 'open' && (
                    <button 
                      className="action-btn close-btn"
                      onClick={(e) => handleCloseApplications(job.id, e)}
                    >
                      Close Applications
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <BottomNavbar />
    </div>
  );
  };
  
export default HireHome; 