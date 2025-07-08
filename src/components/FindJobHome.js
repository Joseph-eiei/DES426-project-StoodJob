import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerNavbar from './JobSeekerNavbar';
import '../styles/FindJobHome.css';

const FindJobHome = () => {
  const navigate = useNavigate();
  
  // Sample job data - in a real app this would come from a backend
  const [allJobs] = useState([
    {
      id: 1,
      title: "Part-time Barista",
      company: "Sunrise Coffee Co.",
      description: "Looking for a friendly barista to work weekends at our coffee shop. Perfect for students!",
      wagePerHour: 15,
      jobType: "Part-time",
      location: "Downtown Seattle",
      distance: 2.3,
      date: "2024-01-15",
      image: "☕"
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "QuickEats Delivery",
      description: "Need reliable driver for food delivery service. Flexible hours, use your own vehicle.",
      wagePerHour: 18,
      jobType: "Flexible",
      location: "Capitol Hill",
      distance: 1.8,
      date: "2024-01-20",
      image: "🚗"
    },
    {
      id: 3,
      title: "Tutoring Assistant",
      company: "Learning Center",
      description: "Help students with math and science homework. Great for education majors.",
      wagePerHour: 22,
      jobType: "Part-time",
      location: "University District",
      distance: 4.1,
      date: "2024-01-25",
      image: "📚"
    },
    {
      id: 4,
      title: "Retail Associate",
      company: "Fashion Plus",
      description: "Customer service and sales position at trendy clothing store. Weekend availability required.",
      wagePerHour: 16,
      jobType: "Part-time",
      location: "Westfield Mall",
      distance: 5.2,
      date: "2024-01-28",
      image: "👔"
    },
    {
      id: 5,
      title: "Dog Walker",
      company: "Happy Paws",
      description: "Walk dogs for busy pet owners. Perfect for animal lovers with flexible schedule.",
      wagePerHour: 20,
      jobType: "Flexible",
      location: "Green Lake",
      distance: 3.7,
      date: "2024-02-01",
      image: "🐕"
    },
    {
      id: 6,
      title: "Event Assistant",
      company: "Premier Events",
      description: "Help with event setup, registration, and coordination. Weekend and evening work.",
      wagePerHour: 17,
      jobType: "Contract",
      location: "Convention Center",
      distance: 6.8,
      date: "2024-02-03",
      image: "🎉"
    }
  ]);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [filters, setFilters] = useState({
    jobType: '',
    locationRadius: '',
    minWage: '',
    sortBy: ''
  });

  // Filter and sort jobs whenever filters change
  React.useEffect(() => {
    let filtered = [...allJobs];

    // Filter by job type
    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    // Filter by location radius
    if (filters.locationRadius) {
      filtered = filtered.filter(job => job.distance <= parseInt(filters.locationRadius));
    }

    // Filter by minimum wage
    if (filters.minWage) {
      filtered = filtered.filter(job => job.wagePerHour >= parseInt(filters.minWage));
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'wage-high':
          return b.wagePerHour - a.wagePerHour;
        case 'wage-low':
          return a.wagePerHour - b.wagePerHour;
        case 'distance':
          return a.distance - b.distance;
        case 'date':
        case '':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredJobs(filtered);
  }, [filters, allJobs]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleJobClick = (jobId) => {
    navigate(`/job-view/${jobId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="find-job-home-container page-with-navbar">
      <div className="find-job-header">
        <h1>Find Your Next Job</h1>
        <p>Discover amazing part-time opportunities near you</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label>Job Type</label>
            <select 
              value={filters.jobType} 
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
              <option value="" disabled>Job Type</option>
              <option value="">All Types</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Flexible">Flexible</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Distance (km)</label>
            <select 
              value={filters.locationRadius} 
              onChange={(e) => handleFilterChange('locationRadius', e.target.value)}
            >
              <option value="" disabled>Distance</option>
              <option value={2}>Within 2 km</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={20}>Within 20 km</option>
              <option value={50}>Within 50 km</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Wage ($/hr)</label>
            <select 
              value={filters.minWage} 
              onChange={(e) => handleFilterChange('minWage', e.target.value)}
            >
              <option value="" disabled>Min Wage</option>
              <option value={0}>Any wage</option>
              <option value={15}>$15+</option>
              <option value={18}>$18+</option>
              <option value={20}>$20+</option>
              <option value={25}>$25+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by</label>
            <select 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="" disabled>Sort by</option>
              <option value="date">Newest first</option>
              <option value="wage-high">Highest wage</option>
              <option value="wage-low">Lowest wage</option>
              <option value="distance">Closest first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-results">
        <div className="results-header">
          <h3>{filteredJobs.length} jobs found</h3>
        </div>

        <div className="jobs-grid">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <p>No jobs match your current filters. Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
                <div className="job-card-header">
                  <div className="company-logo">{job.image}</div>
                  <div className="job-basic-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <div className="job-wage">
                    <span className="wage-amount">${job.wagePerHour}</span>
                    <span className="wage-period">/hr</span>
                  </div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-details">
                  <div className="job-detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{job.location} ({job.distance} km)</span>
                  </div>
                  <div className="job-detail-item">
                    <span className="detail-icon">🏷️</span>
                    <span className="detail-text">{job.jobType}</span>
                  </div>
                  <div className="job-detail-item">
                    <span className="detail-icon">📅</span>
                    <span className="detail-text">Posted {formatDate(job.date)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <JobSeekerNavbar />
    </div>
  );
};

export default FindJobHome; 