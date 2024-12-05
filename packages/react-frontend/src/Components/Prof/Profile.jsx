import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile({ user, currentUser }) {
  // add props for which user the profile is for
  // have some way of determining if it is their profile or someone else's
  // return a slightly different UI based on whether or not it's your own profile
  const [isCurrentUser, setIsCurrentUser] = useState(user === currentUser);
  const [profileData, setProfileData] = useState({
    name: "User Name",
    email: "student@calpoly.edu",
    bio: "bio",
    grade: "grade",
    major: "major",
    classes: ["classes"],
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("User:", currentUser);
    setProfileData({
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio,
      grade: currentUser.grade,
      major: currentUser.major,
      classes: currentUser.classes.trim().split(","),
    });
  }, []);

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
        <h2>{profileData.name}</h2>
        <h3>{profileData.email}</h3>
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
      <p>{profileData.bio}</p>
      <div className="profile-tags">
        <p className="profile-tag info-tag">
          <i className="fa-solid fa-graduation-cap"></i>
          {profileData.grade}
        </p>
        <p className="profile-tag info-tag">
          <i className="fa-solid fa-book"></i>
          {profileData.major}
        </p>
        {profileData.classes.map((classItem) => (
          <p className="profile-tag class-tag">{classItem}</p>
        ))}
      </div>
    </div>
  );
}

export default Profile;
