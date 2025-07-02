import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerNavbar from './JobSeekerNavbar';
import './JobSeekerAccount.css';

const JobSeekerAccount = () => {
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "Seattle, WA",
    bio: "Hardworking college student seeking part-time opportunities to gain experience and support my studies. Excellent communication skills and eager to learn new things.",
    profileImage: "👤",
    skills: ["Customer Service", "Communication", "Time Management", "Microsoft Office", "Problem Solving"],
    availability: {
      weekdays: { morning: false, afternoon: true, evening: true },
      weekends: { morning: true, afternoon: true, evening: false }
    },
    // Statistics
    totalApplications: 6,
    pendingApplications: 2,
    acceptedApplications: 2,
    completedJobs: 2,
    memberSince: "Jan 2024",
    rating: 4.8,
    totalEarnings: 850.00
  });

  const handleInputChange = (field, value) => {
    setCurrentUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...currentUser.skills];
    newSkills[index] = value;
    setCurrentUser(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setCurrentUser(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index) => {
    const newSkills = currentUser.skills.filter((_, i) => i !== index);
    setCurrentUser(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const handleAvailabilityChange = (day, period, checked) => {
    setCurrentUser(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [period]: checked
        }
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Saving user data:', currentUser);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication
    navigate('/');
  };

  const getAvailabilityText = (dayAvailability) => {
    const available = Object.entries(dayAvailability)
      .filter(([period, isAvailable]) => isAvailable)
      .map(([period]) => period.charAt(0).toUpperCase() + period.slice(1));
    
    return available.length > 0 ? available.join(', ') : 'Not available';
  };

  return (
    <div className="job-seeker-account-container page-with-navbar">
      <div className="account-header">
        <h1>My Account</h1>
        <button 
          className={`edit-btn ${isEditing ? 'save' : 'edit'}`}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? '💾 Save' : '✏️ Edit Profile'}
        </button>
      </div>

      <div className="account-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-main">
            <div className="profile-image-large">{currentUser.profileImage}</div>
            <div className="profile-info-main">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="edit-input name-input"
                  />
                  <input
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="edit-input email-input"
                  />
                </>
              ) : (
                <>
                  <h2 className="user-name-large">{currentUser.name}</h2>
                  <p className="user-email-large">{currentUser.email}</p>
                </>
              )}
              
              <div className="rating-section">
                <div className="rating">⭐ {currentUser.rating}</div>
                <div className="member-since">Member since {currentUser.memberSince}</div>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
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
          <h3>Job Search Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{currentUser.totalApplications}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.pendingApplications}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.acceptedApplications}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.completedJobs}</div>
              <div className="stat-label">Completed Jobs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">${currentUser.totalEarnings}</div>
              <div className="stat-label">Total Earnings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{currentUser.rating}⭐</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="skills-card">
          <h3>Skills & Abilities</h3>
          <div className="skills-section">
            {currentUser.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {isEditing ? (
                  <div className="skill-edit">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="skill-input"
                      placeholder="Enter skill"
                    />
                    <button 
                      className="remove-skill-btn"
                      onClick={() => removeSkill(index)}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="skill-tag">{skill}</span>
                )}
              </div>
            ))}
            {isEditing && (
              <button className="add-skill-btn" onClick={addSkill}>
                + Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Availability Card */}
        <div className="availability-card">
          <h3>Availability</h3>
          <div className="availability-section">
            <div className="availability-day">
              <h4>Weekdays</h4>
              {isEditing ? (
                <div className="availability-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekdays.morning}
                      onChange={(e) => handleAvailabilityChange('weekdays', 'morning', e.target.checked)}
                    />
                    Morning (6AM-12PM)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekdays.afternoon}
                      onChange={(e) => handleAvailabilityChange('weekdays', 'afternoon', e.target.checked)}
                    />
                    Afternoon (12PM-6PM)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekdays.evening}
                      onChange={(e) => handleAvailabilityChange('weekdays', 'evening', e.target.checked)}
                    />
                    Evening (6PM-12AM)
                  </label>
                </div>
              ) : (
                <p>{getAvailabilityText(currentUser.availability.weekdays)}</p>
              )}
            </div>

            <div className="availability-day">
              <h4>Weekends</h4>
              {isEditing ? (
                <div className="availability-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekends.morning}
                      onChange={(e) => handleAvailabilityChange('weekends', 'morning', e.target.checked)}
                    />
                    Morning (6AM-12PM)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekends.afternoon}
                      onChange={(e) => handleAvailabilityChange('weekends', 'afternoon', e.target.checked)}
                    />
                    Afternoon (12PM-6PM)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={currentUser.availability.weekends.evening}
                      onChange={(e) => handleAvailabilityChange('weekends', 'evening', e.target.checked)}
                    />
                    Evening (6PM-12AM)
                  </label>
                </div>
              ) : (
                <p>{getAvailabilityText(currentUser.availability.weekends)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="settings-card">
          <h3>Account Settings</h3>
          <div className="settings-options">
            <button className="setting-btn">
              🔔 Notification Settings
            </button>
            <button className="setting-btn">
              🔒 Privacy Settings
            </button>
            <button className="setting-btn">
              📄 Download Resume
            </button>
            <button className="setting-btn">
              ❓ Help & Support
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
      
      <JobSeekerNavbar />
    </div>
  );
};

export default JobSeekerAccount; 