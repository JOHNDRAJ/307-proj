import React, { useState } from 'react';
import axios from 'axios';  // For making HTTP requests
import { useNavigate } from 'react-router-dom';  // For navigation
import './ProfileSetup.css'

const ProfileSetup = () => {
  // State to store the form input values
  const [input, setInput] = useState({
    bio: '',
    grade: '',
    major: '',
    classes: '',
  });

  const navigate = useNavigate();  // To redirect the user after submitting the profile

  // Handle input changes for the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,  // Spread the previous state to maintain other fields
      [name]: value,  // Update the field that is being changed (based on input name)
    }));
  };

  // Handle form submission
  const handleSubmitEvent = async (e) => {
    e.preventDefault();  // Prevent the default form submission (which would reload the page)

    // Proceed with form submission regardless of whether fields are filled
    try {
      const token = localStorage.getItem('token');  // Get the JWT token from localStorage

      // Send a POST request to the backend to submit the profile data
      const response = await axios.post("http://localhost:5001/api/profile/setup", input, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Send the token for authenticated requests
        },
      });

      if (response.status === 200) {
        // Profile setup was successful
        alert('Profile updated successfully');
        navigate('/dashboard');  // Redirect the user to the dashboard after success
      } else {
        alert(response.data.message);  // Display any error message from the server
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during profile setup.");
    }
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
        <button type="submit" className="btn-submit">Save</button>  {/* Changed label to "Save" */}
      </form>
    </div>
  );
};

export default ProfileSetup;
