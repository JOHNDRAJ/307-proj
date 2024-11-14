import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';  // For making HTTP requests
import { useNavigate } from 'react-router-dom';  // For navigation
import './ProfileSetup.css'

const ProfileSetup = () => {
  // State to store the form input values
  const [token, setToken] = useState(null);
  const [input, setInput] = useState({
    bio: "",
    grade: "",
    major: "",
    classes: "",
  });

  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5001/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({input}),
      });
  
      const data = await response.json();
      console.log("Response data:", data);  // Debugging output
  
      if (response.ok) {
        alert('Profile updated successfully');
        navigate('/home');
      } else {
        alert(data.message || "An error occurred.");  // Corrected error message handling
      }
    } catch (error) {
      console.error("Error during fetch:", error);  // More specific error output
      alert("An error occurred during profile setup.");
    }
  };
  
  // Handle input changes for the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,  // Spread the previous state to maintain other fields
      [name]: value,  // Update the field that is being changed (based on input name)
    }));
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmitEvent}>
        {/* Bio */}
        <div className="form_control">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself (optional)"
            value={input.bio}
            onChange={handleInput}
          />
        </div>
        {/* Grade */}
        <div className="form_control">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            placeholder="Your grade"
            value={input.grade}
            onChange={handleInput}
          />
        </div>
        {/* Major */}
        <div className="form_control">
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            name="major"
            placeholder="Your major"
            value={input.major}
            onChange={handleInput}
          />
        </div>
        {/* Classes */}
        <div className="form_control">
          <label htmlFor="classes">Classes:</label>
          <textarea
            id="classes"
            name="classes"
            placeholder="List your classes"
            value={input.classes}
            onChange={handleInput}
          />
        </div>
        {/* Save Button */}
        <button type="submit" className="btn-submit">
          Save
        </button>{" "}
        {/* Changed label to "Save" */}
      </form>
    </div>
  );
};

export default ProfileSetup;
