import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Auth/Login';  // Correct path for Login component
import ProfileSetup from './Prof/ProfileSetup';  // Correct path for ProfileSetup component
import SignUp from './Components/Auth/SignUp';

const MyApp = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        {/* Route for the profile setup page */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
};

export default MyApp;