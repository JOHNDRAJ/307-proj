import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  // add props for which user the profile is for
  // have some way of determining if it is their profile or someone else's
  // return a slightly different UI based on whether or not it's your own profile
  const [isCurrentUser, setIsCurrentUser] = useState(true);

  const navigate = useNavigate();

  const handleEditNavigate = () => {
    navigate("/profile-setup", { state: { from: "/home" } });
  };

  return (
    <div className="profile">
      <img
        className="profile-pic-large"
        src="/assets/default-profile-pic.webp"
      />
      <div className="user-info">
        <h2>User Name</h2>
        <h3>student@calpoly.edu</h3>
      </div>
      {isCurrentUser ? (
        <button className="profile-action-btn" onClick={handleEditNavigate}>
          <i className="fa-solid fa-pencil"></i>Edit Profile
        </button>
      ) : (
        <button className="profile-action-btn">
          <i className="fa-solid fa-message"></i>Send Message
        </button>
      )}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="profile-tags">
        <p className="profile-tag info-tag">
          <i className="fa-solid fa-graduation-cap"></i>Sophomore
        </p>
        <p className="profile-tag info-tag">
          <i className="fa-solid fa-book"></i>Computer Science
        </p>
        <p className="profile-tag class-tag">CSC 307</p>
        <p className="profile-tag class-tag">CSC 349</p>
        <p className="profile-tag class-tag">CSC 365</p>
      </div>
    </div>
  );
}

export default Profile;
