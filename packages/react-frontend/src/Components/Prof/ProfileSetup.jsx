import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // For making HTTP requests
import { useLocation, useNavigate } from "react-router-dom"; // For navigation
import "./ProfileSetup.css";

const ProfileSetup = () => {
  // State to store the form input values
  const [input, setInput] = useState({
    bio: "",
    grade: "",
    major: "",
    classes: "",
  });
  const [pageFrom, setPageFrom] = useState("/signup");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPageFrom(location.state?.from || "");

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/user/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          // Update the state with fetched data
          console.log("test");
          console.log("input before:", input);
          setInput({
            bio: data.user.bio,
            grade: data.user.grade,
            major: data.user.major,
            classes: data.user.classes,
          });
          console.log("input after:", input);
        }
        console.log("Fetched current user:", data);
      } catch (error) {
        console.error("Error during fetch:", error); // More specific error output
      }
    };

    fetchUser();
  }, []);

  const handleProfileData = (user) => {
    const newInput = {
      bio: user.bio,
      grade: user.grade,
      major: user.major,
      classes: user.classes,
    };
    setInput(newInput);
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (input.grade === "" || input.major === "") {
      alert("Enter your grade and major!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      console.log("Response data:", data); // Debugging output

      if (response.ok) {
        //alert("Profile updated successfully");
        navigate("/home");
      } else {
        alert(data.message || "An error occurred."); // Corrected error message handling
      }
    } catch (error) {
      console.error("Error during fetch:", error); // More specific error output
      alert("An error occurred during profile setup.");
    }
  };

  // Handle input changes for the form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev, // Spread the previous state to maintain other fields
      [name]: value, // Update the field that is being changed (based on input name)
    }));
  };

  return (
    <div className="profile-setup-wrapper">
      <h1>
        {pageFrom === "/signup" ? "Complete Your Profile" : "Edit Your Profile"}
      </h1>
      <form onSubmit={handleSubmitEvent}>
        {/* Bio */}
        <div className="form_control">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself!"
            value={input.bio}
            onChange={handleInput}
          />
        </div>
        {/* Grade */}
        <div className="form_control">
          <label htmlFor="grade">Grade</label>
          <input
            type="text"
            id="grade"
            name="grade"
            placeholder="Freshman"
            value={input.grade}
            onChange={handleInput}
          />
        </div>
        {/* Major */}
        <div className="form_control">
          <label htmlFor="major">Major</label>
          <input
            type="text"
            id="major"
            name="major"
            placeholder="Computer Science"
            value={input.major}
            onChange={handleInput}
          />
        </div>
        {/* Classes */}
        <div className="form_control">
          <label htmlFor="classes">Classes</label>
          <textarea
            id="classes"
            name="classes"
            placeholder="CSC 101, MATH 142, ENGL 134"
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
