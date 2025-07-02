import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateJob.css';

const CreateJob = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobType: '',
    date: '',
    hiringPeriod: '',
    wagePerHour: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    if (!formData.jobType) {
      newErrors.jobType = 'Job type is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.hiringPeriod || formData.hiringPeriod <= 0) {
      newErrors.hiringPeriod = 'Valid hiring period is required';
    }
    
    if (!formData.wagePerHour || formData.wagePerHour <= 0) {
      newErrors.wagePerHour = 'Valid wage per hour is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // In a real app, this would save to backend
      console.log('Job created:', formData);
      alert('Job created successfully!');
      navigate('/hire-home');
    } else {
      setErrors(formErrors);
    }
  };

  const handleCancel = () => {
    navigate('/hire-home');
  };

  return (
    <div className="create-job-container">
      <div className="create-job-content">
        <h2>Create New Job</h2>
        
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Part-time Barista"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the job responsibilities and requirements..."
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobType">Job Type *</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className={errors.jobType ? 'error' : ''}
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Flexible">Flexible</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.jobType && <span className="error-message">{errors.jobType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Start Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hiringPeriod">Hiring Period (hours) *</label>
              <input
                type="number"
                id="hiringPeriod"
                name="hiringPeriod"
                value={formData.hiringPeriod}
                onChange={handleInputChange}
                placeholder="e.g., 20"
                min="1"
                className={errors.hiringPeriod ? 'error' : ''}
              />
              {errors.hiringPeriod && <span className="error-message">{errors.hiringPeriod}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="wagePerHour">Wage per Hour ($) *</label>
              <input
                type="number"
                id="wagePerHour"
                name="wagePerHour"
                value={formData.wagePerHour}
                onChange={handleInputChange}
                placeholder="e.g., 15"
                min="0.01"
                step="0.01"
                className={errors.wagePerHour ? 'error' : ''}
              />
              {errors.wagePerHour && <span className="error-message">{errors.wagePerHour}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob; 