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
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            />
            <div className="contact-details">
              <h3>User Name</h3>
              <p>student@calpoly.edu</p>
            </div>
            {/* 
          Add buttons for send message and view profile 
          (or have clicking the contact-item default to opening the channel) 
          */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
