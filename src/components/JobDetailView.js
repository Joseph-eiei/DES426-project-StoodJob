import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobSeekerNavbar from './JobSeekerNavbar';
import './JobDetailView.css';

const JobDetailView = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  // Sample job data - in a real app this would come from a backend
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Part-time Barista",
      company: "Sunrise Coffee Co.",
      description: "Looking for a friendly barista to work weekends at our coffee shop. Perfect for students!",
      fullDescription: "We are seeking an enthusiastic and reliable part-time barista to join our team at Sunrise Coffee Co. This position is perfect for students looking for flexible weekend work. You'll be responsible for preparing quality coffee drinks, providing excellent customer service, and maintaining a clean work environment. Previous barista experience is preferred but not required - we provide comprehensive training. Must be available weekends and have excellent communication skills.",
      wagePerHour: 15,
      jobType: "Part-time",
      location: "Downtown Seattle",
      address: "123 Pike Street, Seattle, WA 98101",
      distance: 2.3,
      date: "2024-01-15",
      image: "☕",
      contact: {
        phone: "(206) 555-0123",
        email: "hiring@sunrisecoffee.com"
      },
      requirements: [
        "Must be 18 years or older",
        "Weekend availability required",
        "Excellent customer service skills",
        "Ability to work in fast-paced environment",
        "Basic math skills for handling transactions"
      ],
      benefits: [
        "Free coffee and meal discounts",
        "Flexible scheduling",
        "Training provided",
        "Friendly work environment"
      ],
      reviews: [
        {
          rating: 5,
          text: "Great place to work! Management is very understanding about school schedules.",
          author: "Sarah M."
        },
        {
          rating: 4,
          text: "Good entry-level job with nice coworkers. Tips are decent on weekends.",
          author: "Mike R."
        },
        {
          rating: 5,
          text: "Love the coffee discounts and the team is like a family!",
          author: "Emma L."
        }
      ]
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "QuickEats Delivery",
      description: "Need reliable driver for food delivery service. Flexible hours, use your own vehicle.",
      fullDescription: "QuickEats Delivery is looking for reliable drivers to join our growing team. This position offers ultimate flexibility - work when you want, as much as you want. You'll use your own vehicle to deliver food from restaurants to customers throughout the city. Earn competitive pay plus tips, with the potential to make $18-25/hour during peak times. Perfect for students, part-time workers, or anyone looking for supplemental income.",
      wagePerHour: 18,
      jobType: "Flexible",
      location: "Capitol Hill",
      address: "456 Broadway Ave, Seattle, WA 98102",
      distance: 1.8,
      date: "2024-01-20",
      image: "🚗",
      contact: {
        phone: "(206) 555-0456",
        email: "drivers@quickeats.com"
      },
      requirements: [
        "Valid driver's license",
        "Own vehicle with insurance",
        "Smartphone for app usage",
        "18+ years old",
        "Background check required"
      ],
      benefits: [
        "Flexible hours",
        "Earn tips on top of hourly wage",
        "Weekly pay",
        "Gas mileage reimbursement"
      ],
      reviews: [
        {
          rating: 4,
          text: "Really flexible schedule and decent pay. Gas costs add up though.",
          author: "David K."
        },
        {
          rating: 5,
          text: "Perfect side gig! Made $150 in tips last weekend alone.",
          author: "Lisa P."
        }
      ]
    },
    {
      id: 3,
      title: "Tutoring Assistant",
      company: "Learning Center",
      description: "Help students with math and science homework. Great for education majors.",
      fullDescription: "The Learning Center is seeking dedicated tutoring assistants to help students succeed in mathematics and science subjects. This position is ideal for education majors or anyone passionate about helping students learn. You'll work with students in grades 6-12, providing one-on-one and small group tutoring sessions. Strong knowledge in algebra, geometry, biology, chemistry, or physics is required. This is a rewarding opportunity to make a real difference in students' academic lives.",
      wagePerHour: 22,
      jobType: "Part-time",
      location: "University District",
      address: "789 University Way, Seattle, WA 98105",
      distance: 4.1,
      date: "2024-01-25",
      image: "📚",
      contact: {
        phone: "(206) 555-0789",
        email: "tutors@learningcenter.edu"
      },
      requirements: [
        "Strong knowledge in math and/or science",
        "Currently enrolled in college or recent graduate",
        "Excellent communication skills",
        "Patient and encouraging teaching style",
        "Background check required"
      ],
      benefits: [
        "High hourly wage",
        "Flexible evening and weekend hours",
        "Valuable teaching experience",
        "Professional development opportunities"
      ],
      reviews: [
        {
          rating: 5,
          text: "Love helping students succeed! Very rewarding work and good pay.",
          author: "Jessica T."
        },
        {
          rating: 5,
          text: "Great experience for my education degree. Flexible with my class schedule.",
          author: "Ryan W."
        }
      ]
    },
    // Add more jobs with similar structure...
    {
      id: 4,
      title: "Retail Associate",
      company: "Fashion Plus",
      description: "Customer service and sales position at trendy clothing store. Weekend availability required.",
      fullDescription: "Fashion Plus is looking for enthusiastic retail associates to join our dynamic team. You'll assist customers with their shopping needs, maintain store appearance, process transactions, and help achieve sales goals. This is a great opportunity to gain retail experience while working with the latest fashion trends. We offer employee discounts and opportunities for advancement.",
      wagePerHour: 16,
      jobType: "Part-time",
      location: "Westfield Mall",
      address: "900 Westfield Mall, Seattle, WA 98109",
      distance: 5.2,
      date: "2024-01-28",
      image: "👔",
      contact: {
        phone: "(206) 555-0900",
        email: "careers@fashionplus.com"
      },
      requirements: [
        "Weekend and evening availability",
        "Strong customer service skills",
        "Interest in fashion and trends",
        "Ability to stand for extended periods",
        "Cash handling experience preferred"
      ],
      benefits: [
        "Employee discount on merchandise",
        "Flexible scheduling",
        "Sales commission opportunities",
        "Career advancement potential"
      ],
      reviews: [
        {
          rating: 4,
          text: "Fun environment and great employee discounts. Can get busy during sales.",
          author: "Ashley C."
        },
        {
          rating: 4,
          text: "Good first retail job. Management is supportive and understanding.",
          author: "Jordan M."
        }
      ]
    },
    {
      id: 5,
      title: "Dog Walker",
      company: "Happy Paws",
      description: "Walk dogs for busy pet owners. Perfect for animal lovers with flexible schedule.",
      fullDescription: "Happy Paws is seeking reliable and caring dog walkers to provide exercise and companionship for our clients' beloved pets. This position is perfect for animal lovers who want to earn money while spending time outdoors with dogs. You'll be responsible for picking up dogs from their homes, providing 30-60 minute walks, and ensuring their safety and well-being. Flexible scheduling allows you to work around your other commitments.",
      wagePerHour: 20,
      jobType: "Flexible",
      location: "Green Lake",
      address: "1200 Green Lake Dr, Seattle, WA 98103",
      distance: 3.7,
      date: "2024-02-01",
      image: "🐕",
      contact: {
        phone: "(206) 555-1200",
        email: "walkers@happypaws.pet"
      },
      requirements: [
        "Love for animals and dogs",
        "Physical fitness for walking",
        "Reliable transportation",
        "Available for flexible hours",
        "Background check and references required"
      ],
      benefits: [
        "Work with adorable dogs",
        "Flexible scheduling",
        "Outdoor exercise",
        "Competitive hourly rate"
      ],
      reviews: [
        {
          rating: 5,
          text: "Best job ever! Getting paid to hang out with dogs. So much fun!",
          author: "Taylor B."
        },
        {
          rating: 5,
          text: "Perfect for dog lovers. Flexible hours and the dogs are all sweethearts.",
          author: "Morgan S."
        }
      ]
    },
    {
      id: 6,
      title: "Event Assistant",
      company: "Premier Events",
      description: "Help with event setup, registration, and coordination. Weekend and evening work.",
      fullDescription: "Premier Events is seeking enthusiastic event assistants to help create memorable experiences for our clients. You'll assist with event setup, guest registration, coordinate with vendors, and ensure events run smoothly. This role offers exposure to the event planning industry and opportunities to work on diverse events from corporate meetings to weddings. Evening and weekend availability is required as most events occur during these times.",
      wagePerHour: 17,
      jobType: "Contract",
      location: "Convention Center",
      address: "800 Convention Place, Seattle, WA 98101",
      distance: 6.8,
      date: "2024-02-03",
      image: "🎉",
      contact: {
        phone: "(206) 555-0800",
        email: "staff@premierevents.com"
      },
      requirements: [
        "Evening and weekend availability",
        "Strong organizational skills",
        "Professional appearance",
        "Ability to lift 25+ pounds",
        "Excellent communication skills"
      ],
      benefits: [
        "Gain event planning experience",
        "Work on diverse events",
        "Networking opportunities",
        "Flexible contract work"
      ],
      reviews: [
        {
          rating: 4,
          text: "Great way to learn about event planning. Work can be physically demanding.",
          author: "Alex R."
        },
        {
          rating: 5,
          text: "Love the variety of events! Every day is different and exciting.",
          author: "Casey L."
        }
      ]
    }
  ];

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === parseInt(jobId));
    setJob(foundJob);
  }, [jobId]);

  const handleBack = () => {
    navigate('/find-job-home');
  };

  const handleSubmitResume = () => {
    setShowResumeDialog(true);
  };

  const handleConfirmApplication = () => {
    setIsApplied(true);
    setShowResumeDialog(false);
    // In a real app, this would submit the application to the backend
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (!job) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="job-detail-view-container page-with-navbar">
      <div className="job-detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Jobs
        </button>
      </div>

      <div className="job-detail-content">
        {/* Job Header */}
        <div className="job-header-card">
          <div className="job-header-main">
            <div className="company-logo-large">{job.image}</div>
            <div className="job-header-info">
              <h1 className="job-title-large">{job.title}</h1>
              <h2 className="company-name-large">{job.company}</h2>
              <div className="job-meta">
                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <span>{job.location} ({job.distance} km away)</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💰</span>
                  <span>${job.wagePerHour}/hour</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🏷️</span>
                  <span>{job.jobType}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Posted {formatDate(job.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="job-section">
          <h3>Job Description</h3>
          <p className="job-full-description">{job.fullDescription}</p>
        </div>

        {/* Requirements */}
        <div className="job-section">
          <h3>Requirements</h3>
          <ul className="requirements-list">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="job-section">
          <h3>Benefits</h3>
          <ul className="benefits-list">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="job-section">
          <h3>Contact Information</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>{job.contact.phone}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>{job.contact.email}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{job.address}</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="job-section">
          <h3>Employee Reviews</h3>
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{calculateAverageRating(job.reviews)}</span>
              <div className="rating-stars">
                {'⭐'.repeat(Math.round(calculateAverageRating(job.reviews)))}
              </div>
              <span className="review-count">({job.reviews.length} reviews)</span>
            </div>
          </div>
          <div className="reviews-list">
            {job.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <div className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </div>
                  <span className="review-author">{review.author}</span>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          {isApplied ? (
            <div className="application-status">
              <div className="status-icon">✅</div>
              <div>
                <h3>Application Submitted!</h3>
                <p>Thank you for your interest. The employer will review your application and contact you if selected.</p>
              </div>
            </div>
          ) : (
            <div className="action-buttons">
              <button className="back-to-jobs-btn" onClick={handleBack}>
                Back to Jobs
              </button>
              <button className="apply-btn" onClick={handleSubmitResume}>
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Resume Submission Dialog */}
      {showResumeDialog && (
        <div className="resume-dialog-overlay">
          <div className="resume-dialog">
            <h3>Submit Your Application</h3>
            <p>Are you sure you want to apply for this position? Your profile and resume will be sent to the employer.</p>
            <div className="dialog-buttons">
              <button 
                className="cancel-btn" 
                onClick={() => setShowResumeDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn" 
                onClick={handleConfirmApplication}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
      
      <JobSeekerNavbar />
    </div>
  );
};

export default JobDetailView; 