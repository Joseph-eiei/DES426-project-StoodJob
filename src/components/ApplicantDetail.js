import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import './ApplicantDetail.css';

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample detailed applicant data - in a real app this would be fetched from backend
  const [applicant] = useState({
    1: {
      id: 1,
      name: "Sarah Johnson",
      profileImage: "👩‍💼",
      description: "Experienced barista with 3 years in coffee service. Passionate about creating the perfect cup and providing excellent customer service.",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      rating: 4.8,
      reviewCount: 12,
      reviews: [
        { text: "Excellent service and very friendly!", rating: 5 },
        { text: "Always on time and professional", rating: 5 },
        { text: "Great attention to detail", rating: 4 }
      ],
      jobTitle: "Part-time Barista",
      jobDescription: "Looking for a friendly barista to work weekends at our coffee shop",
      wagePerHour: 15,
      jobType: "Part-time",
      hiringPeriod: 20,
      applicationDate: "2024-01-16",
      status: "pending",
      availability: "Weekends and evenings",
      experience: "3 years of coffee shop experience, certified in latte art"
    },
    2: {
      id: 2,
      name: "Mike Chen",
      profileImage: "👨‍🚀",
      description: "Reliable driver with clean driving record and 5+ years delivery experience.",
      email: "mike.chen@email.com",
      phone: "(555) 987-6543",
      rating: 4.9,
      reviewCount: 8,
      reviews: [
        { text: "Always delivers on time!", rating: 5 },
        { text: "Very professional and courteous", rating: 5 }
      ],
      jobTitle: "Delivery Driver",
      jobDescription: "Need reliable driver for food delivery service",
      wagePerHour: 18,
      jobType: "Flexible",
      hiringPeriod: 30,
      applicationDate: "2024-01-21",
      status: "pending",
      availability: "Full-time, flexible hours",
      experience: "5+ years delivery experience, clean driving record, own vehicle"
    },
    3: {
      id: 3,
      name: "Emily Rodriguez",
      profileImage: "👩‍🎓",
      description: "Math tutor with teaching experience and passion for helping students succeed.",
      email: "emily.rodriguez@email.com",
      phone: "(555) 456-7890",
      rating: 4.7,
      reviewCount: 15,
      reviews: [
        { text: "Great tutor, very patient with my daughter", rating: 5 },
        { text: "Helped improve my grades significantly", rating: 5 },
        { text: "Explains concepts very clearly", rating: 4 }
      ],
      jobTitle: "Tutoring Assistant",
      jobDescription: "Help students with math and science homework",
      wagePerHour: 22,
      jobType: "Part-time",
      hiringPeriod: 15,
      applicationDate: "2024-01-26",
      status: "pending",
      availability: "Afternoons and evenings",
      experience: "2 years tutoring experience, Mathematics degree"
    }
  }[id]);

  const [status, setStatus] = useState(applicant?.status || 'pending');

  const handleAccept = () => {
    setStatus('accepted');
    // In a real app, you would make an API call here
    alert('Applicant accepted successfully!');
  };

  const handleDecline = () => {
    setStatus('declined');
    // In a real app, you would make an API call here
    alert('Applicant declined.');
  };

  const handleBack = () => {
    navigate('/applicants');
  };

  if (!applicant) {
    return (
      <div className="applicant-detail-container page-with-navbar">
        <div className="error-message">
          <h2>Applicant not found</h2>
          <button onClick={handleBack} className="back-btn">Back to Applicants</button>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="applicant-detail-container page-with-navbar">
      <div className="detail-header">
        <button onClick={handleBack} className="back-btn">← Back</button>
        <h1>Applicant Details</h1>
      </div>

      <div className="detail-content">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-image-large">{applicant.profileImage}</div>
            <div className="profile-info-main">
              <h2 className="applicant-name-large">{applicant.name}</h2>
              <p className="applicant-description-large">{applicant.description}</p>
              <div className="rating-section">
                <span className="rating">⭐ {applicant.rating}</span>
                <span className="review-count">({applicant.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>📧 {applicant.email}</p>
            <p>📱 {applicant.phone}</p>
            <p>🕒 Available: {applicant.availability}</p>
            <p>💼 Experience: {applicant.experience}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-card">
          <h3>Reviews</h3>
          <div className="reviews-list">
            {applicant.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Application Details */}
        <div className="job-details-card">
          <h3>Application Details</h3>
          <div className="job-info">
            <h4>{applicant.jobTitle}</h4>
            <p className="job-description-detail">{applicant.jobDescription}</p>
            
            <div className="job-details-grid">
              <div className="detail-item">
                <span className="detail-label">Wage:</span>
                <span className="detail-value">${applicant.wagePerHour}/hr</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{applicant.jobType}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{applicant.hiringPeriod} hours</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Applied:</span>
                <span className="detail-value">{applicant.applicationDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {status === 'pending' ? (
            <>
              <button className="accept-btn" onClick={handleAccept}>
                ✓ Accept Application
              </button>
              <button className="decline-btn" onClick={handleDecline}>
                ✗ Decline Application
              </button>
            </>
          ) : (
            <div className="status-message">
              <span className={`status-badge ${status}`}>
                {status === 'accepted' ? '✓ Accepted' : '✗ Declined'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default ApplicantDetail; 