import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import './PayEmployees.css';

const PayEmployees = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [checkedOutEmployees, setCheckedOutEmployees] = useState([]);

  const jobs = [
    {
      id: 1,
      title: "Part-time Barista",
      wagePerHour: 15
    },
    {
      id: 2,
      title: "Delivery Driver",
      wagePerHour: 18
    },
    {
      id: 3,
      title: "Tutoring Assistant",
      wagePerHour: 22
    }
  ];

  // Sample data for employees who have checked out
  const employeesData = [
    {
      id: 1,
      name: "Alice Johnson",
      checkIn: "2024-01-15 09:00",
      checkOut: "2024-01-15 17:00",
      status: "checked-out",
      paid: false
    },
    {
      id: 4,
      name: "David Wilson",
      checkIn: "2024-01-15 10:00",
      checkOut: "2024-01-15 16:30",
      status: "checked-out",
      paid: false
    },
    {
      id: 5,
      name: "Emily Brown",
      checkIn: "2024-01-14 14:00",
      checkOut: "2024-01-14 18:00",
      status: "checked-out",
      paid: true
    }
  ];

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === parseInt(jobId));
    setJob(foundJob);
    
    // Filter employees who have checked out
    const checkedOut = employeesData.filter(emp => emp.status === 'checked-out');
    setCheckedOutEmployees(checkedOut);
  }, [jobId]);

  const calculateWorkingHours = (checkIn, checkOut) => {
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date(checkOut);
    const diffInMs = checkOutTime - checkInTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return Math.round(diffInHours * 100) / 100; // Round to 2 decimal places
  };

  const calculateTotalPay = (checkIn, checkOut, hourlyWage) => {
    const hours = calculateWorkingHours(checkIn, checkOut);
    return Math.round(hours * hourlyWage * 100) / 100;
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePayEmployee = (employeeId) => {
    setCheckedOutEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, paid: true }
          : emp
      )
    );
    // In a real app, this would make an API call to process payment
    alert('Payment processed successfully!');
  };

  const getTotalAmount = () => {
    return checkedOutEmployees
      .filter(emp => !emp.paid)
      .reduce((total, emp) => {
        return total + calculateTotalPay(emp.checkIn, emp.checkOut, job?.wagePerHour || 0);
      }, 0);
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pay-employees-container page-with-navbar">
      <div className="pay-employees-header">
        <button className="back-btn" onClick={() => navigate(`/job-detail/${jobId}`)}>
          ← Back
        </button>
        <h1>Pay Employees</h1>
        <p className="job-title">{job.title}</p>
      </div>

      <div className="payment-summary">
        <div className="summary-card">
          <h3>Payment Summary</h3>
          <div className="summary-details">
            <div className="summary-item">
              <span>Total Employees:</span>
              <span>{checkedOutEmployees.length}</span>
            </div>
            <div className="summary-item">
              <span>Pending Payment:</span>
              <span>{checkedOutEmployees.filter(emp => !emp.paid).length}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>${getTotalAmount().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="employees-list">
        {checkedOutEmployees.length === 0 ? (
          <div className="no-employees">
            <p>No employees have checked out yet.</p>
          </div>
        ) : (
          checkedOutEmployees.map(employee => {
            const workingHours = calculateWorkingHours(employee.checkIn, employee.checkOut);
            const totalPay = calculateTotalPay(employee.checkIn, employee.checkOut, job.wagePerHour);
            
            return (
              <div key={employee.id} className={`employee-pay-card ${employee.paid ? 'paid' : ''}`}>
                <div className="employee-header">
                  <h4 className="employee-name">{employee.name}</h4>
                  {employee.paid && <span className="paid-badge">Paid</span>}
                </div>
                
                <div className="work-details">
                  <div className="work-detail">
                    <span className="detail-label">Working Hours:</span>
                    <span className="detail-value">{workingHours}h</span>
                  </div>
                  
                  <div className="work-detail">
                    <span className="detail-label">Check In:</span>
                    <span className="detail-value">{formatTime(employee.checkIn)}</span>
                  </div>
                  
                  <div className="work-detail">
                    <span className="detail-label">Check Out:</span>
                    <span className="detail-value">{formatTime(employee.checkOut)}</span>
                  </div>
                  
                  <div className="work-detail total-pay">
                    <span className="detail-label">Total Pay:</span>
                    <span className="detail-value">${totalPay.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pay-actions">
                  {!employee.paid ? (
                    <button 
                      className="pay-employee-btn"
                      onClick={() => handlePayEmployee(employee.id)}
                    >
                      Pay ${totalPay.toFixed(2)}
                    </button>
                  ) : (
                    <div className="paid-status">Payment Completed</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <BottomNavbar />
    </div>
  );
};

export default PayEmployees; 