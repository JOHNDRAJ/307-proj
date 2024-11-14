import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // add props for which user the profile is for
  // have some way of determining if it is their profile or someone else's
  // return a slightly different UI based on whether or not it's your own profile
  const [isCurrentUser, setIsCurrentUser] = useState(true);

  return (
    <div className="profile">
      <img
        className="profile-pic-large"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
      <div className="user-info">
        <h2>User Name</h2>
        <h3>student@calpoly.edu</h3>
      </div>
      {isCurrentUser ? (
        <button className="profile-action-btn">
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
