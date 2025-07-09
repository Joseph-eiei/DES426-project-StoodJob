import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerNavbar from './JobSeekerNavbar';
import '../styles/MyApplications.css';

const MyApplications = () => {
  const navigate = useNavigate();
  
  // Sample application data - in a real app this would come from a backend
  const [allApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: "Part-time Barista",
      company: "Sunrise Coffee Co.",
      appliedDate: "2024-01-16",
      status: "accepted",
      wagePerHour: 15,
      location: "Downtown Seattle",
      image: "☕",
      workDate: "2024-01-20",
      message: "Congratulations! Please arrive at 8:00 AM on Saturday."
    },
    {
      id: 2,
      jobId: 3,
      jobTitle: "Tutoring Assistant",
      company: "Learning Center",
      appliedDate: "2024-01-26",
      status: "pending",
      wagePerHour: 22,
      location: "University District",
      image: "📚",
      workDate: null,
      message: "Application under review. We'll contact you within 3 business days."
    },
    {
      id: 3,
      jobId: 5,
      jobTitle: "Dog Walker",
      company: "Happy Paws",
      appliedDate: "2024-02-02",
      status: "accepted",
      wagePerHour: 20,
      location: "Green Lake",
      image: "🐕",
      workDate: "2024-02-05",
      message: "Great! Your first assignment is this Monday. Check in at the office."
    },
    {
      id: 4,
      jobId: 2,
      jobTitle: "Delivery Driver",
      company: "QuickEats Delivery",
      appliedDate: "2024-01-21",
      status: "finished",
      wagePerHour: 18,
      location: "Capitol Hill",
      image: "🚗",
      workDate: "2024-01-25",
      message: "Job completed successfully. Payment has been processed."
    },
    {
      id: 5,
      jobId: 6,
      jobTitle: "Event Assistant",
      company: "Premier Events",
      appliedDate: "2024-02-04",
      status: "pending",
      wagePerHour: 17,
      location: "Convention Center",
      image: "🎉",
      workDate: null,
      message: "We're reviewing your application. The event is scheduled for next week."
    },
    {
      id: 6,
      jobId: 4,
      jobTitle: "Retail Associate",
      company: "Fashion Plus",
      appliedDate: "2024-01-29",
      status: "finished",
      wagePerHour: 16,
      location: "Westfield Mall",
      image: "👔",
      workDate: "2024-02-01",
      message: "Thank you for your excellent work! We'll contact you for future opportunities."
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredApplications, setFilteredApplications] = useState(allApplications);

  // Filter applications whenever filter changes
  React.useEffect(() => {
    let filtered = [...allApplications];

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(app => app.status === selectedFilter);
    }

    // Sort by application date (newest first)
    filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

    setFilteredApplications(filtered);
  }, [selectedFilter, allApplications]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleApplicationClick = (application) => {
    if (application.status === 'accepted') {
      navigate(`/job-qr-scan/${application.jobId}`, { 
        state: { 
          jobTitle: application.jobTitle,
          company: application.company,
          workDate: application.workDate
        }
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return '⏳';
      case 'accepted': return '✅';
      case 'finished': return '🏁';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107';
      case 'accepted': return '#28a745';
      case 'finished': return '#6c757d';
      default: return '#007bff';
    }
  };

  const getFilterCount = (filter) => {
    if (filter === 'all') return allApplications.length;
    return allApplications.filter(app => app.status === filter).length;
  };

  return (
    <div className="my-applications-container page-with-navbar">
      <div className="my-applications-header">
        <h1>My Applications</h1>
        <p>Track your job applications and their status</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab filter-all ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All ({getFilterCount('all')})
        </button>
        <button 
          className={`filter-tab filter-pending ${selectedFilter === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending')}
        >
          Pending ({getFilterCount('pending')})
        </button>
        <button 
          className={`filter-tab filter-accepted ${selectedFilter === 'accepted' ? 'active' : ''}`}
          onClick={() => handleFilterChange('accepted')}
        >
          Accepted ({getFilterCount('accepted')})
        </button>
        <button 
          className={`filter-tab filter-finished ${selectedFilter === 'finished' ? 'active' : ''}`}
          onClick={() => handleFilterChange('finished')}
        >
          Finished ({getFilterCount('finished')})
        </button>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="no-applications">
            <div className="no-applications-icon">📭</div>
            <h3>No applications found</h3>
            <p>
              {selectedFilter === 'all' 
                ? "You haven't applied to any jobs yet. Start browsing available positions!"
                : `No ${selectedFilter} applications at the moment.`
              }
            </p>
            {selectedFilter === 'all' && (
              <button 
                className="browse-jobs-btn"
                onClick={() => navigate('/find-job-home')}
              >
                Browse Jobs
              </button>
            )}
          </div>
        ) : (
          filteredApplications.map(application => (
            <div 
              key={application.id} 
              className={`application-card status-${application.status} ${application.status === 'accepted' ? 'clickable' : ''}`}
              onClick={() => handleApplicationClick(application)}
            >
              <div className="card-header">
                <div className="job-info">
                  <div className="company-logo">{application.image}</div>
                  <div className="job-details-application">
                    <h3 className="job-title">{application.jobTitle}</h3>
                    <p className="company-name-application">{application.company}</p>
                    <p className="job-location">📍 {application.location}</p>
                  </div>
                </div>
                <div className="card-right">
                  <div className="status-badge">
                    <span className="status-icon">{getStatusIcon(application.status)}</span>
                    <span className="status-text">{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                  </div>
                  <div className="wage-info">${application.wagePerHour}/hr</div>
                </div>
              </div>

              <div className="card-meta">
                <div className="meta-row">
                  <span className="meta-item">
                    📅 Applied: {formatDate(application.appliedDate)}
                  </span>
                  {application.workDate && (
                    <span className="meta-item">
                      🗓️ Work: {formatDate(application.workDate)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="card-message">
                {application.message}
              </div>

              {application.status === 'accepted' && (
                <div className="action-hint">
                  👆 Tap to check-in/check-out
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <JobSeekerNavbar />
    </div>
  );
};

export default MyApplications; 