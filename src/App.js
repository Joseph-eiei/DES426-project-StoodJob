import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import IDScan from './components/IDScan';
import RoleSelection from './components/RoleSelection';
import HireHome from './components/HireHome';
import CreateJob from './components/CreateJob';
import Applicants from './components/Applicants';
import ApplicantDetail from './components/ApplicantDetail';
import Account from './components/Account';
import JobDetail from './components/JobDetail';
import PayEmployees from './components/PayEmployees';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/id-scan" element={<IDScan />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/hire-home" element={<HireHome />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/applicant-detail/:id" element={<ApplicantDetail />} />
          <Route path="/job-detail/:jobId" element={<JobDetail />} />
          <Route path="/pay-employees/:jobId" element={<PayEmployees />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
