import React from "react";
import "./Search.css";

function Search() {
  return (
    <>
      <div className="search-bar">
        <h3>To: </h3>
        <input
          className="search-input"
          type="text"
          placeholder="Name or email..."
        />
      </div>
      <div className="search-results">
        {/* for each contact in database... */}
        <div className="contact-item">
          <div className="contact-preview">
            <img
              className="contact-pic"
              src="/assets/default-profile-pic.webp"
            />
            <div className="contact-details">
              <h3>User Name</h3>
              <p>student@calpoly.edu</p>
            </div>
            {/* 
          Add buttons for send message and view profile
          Maybe add some button for adding user to group chat?
          Have clicking the contact-item add them as a user when creating a group chat
          */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
