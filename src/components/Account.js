import React, { useState } from 'react';
import BottomNavbar from './BottomNavbar';
import './Account.css';

const Account = () => {
  // Sample user data - in a real app this would come from a backend/auth system
  const [user] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 234-5678",
    profileImage: "👨‍💼",
    company: "Tech Startup Inc.",
    location: "San Francisco, CA",
    memberSince: "January 2024",
    jobsPosted: 5,
    activeApplications: 12,
    bio: "Experienced hiring manager looking for talented individuals to join our growing team. We believe in creating opportunities for everyone.",
    rating: 4.6,
    reviewCount: 8
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would make an API call here to save the changes
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentUser = isEditing ? editedUser : user;

  return (
    <div className="account-container page-with-navbar">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Manage your profile and account settings</p>
      </div>

      <div className="account-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-section">
              <div className="profile-image-large">{currentUser.profileImage}</div>
              <div className="profile-rating">
                <span className="rating">⭐ {currentUser.rating}</span>
                <span className="review-text">({currentUser.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  ✏️ Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    ✓ Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ✗ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{currentUser.name}</span>
              )}
            </div>

            <div className="info-row">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{currentUser.email}</span>
              )}
            </div>

            <div className="info-row">
              <label>Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={currentUser.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{currentUser.phone}</span>
              )}
            </div>

            <div className="info-row">
              <label>Company:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentUser.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{currentUser.company}</span>
              )}
            </div>

            <div className="info-row">
              <label>Location:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentUser.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{currentUser.location}</span>
              )}
            </div>

            <div className="info-row">
              <label>Bio:</label>
              {isEditing ? (
                <textarea
                  value={currentUser.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="edit-textarea"
                  rows="3"
                />
              ) : (
                <span>{currentUser.bio}</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{currentUser.jobsPosted}</div>
              <div className="stat-label">Jobs Posted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.activeApplications}</div>
              <div className="stat-label">Active Applications</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.memberSince}</div>
              <div className="stat-label">Member Since</div>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="settings-card">
          <h3>Account Settings</h3>
          <div className="settings-list">
            <button className="setting-item">
              🔔 Notification Preferences
            </button>
            <button className="setting-item">
              🔒 Privacy Settings
            </button>
            <button className="setting-item">
              📊 Application Analytics
            </button>
            <button className="setting-item">
              💳 Billing & Subscription
            </button>
            <button className="setting-item logout">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default Account; 