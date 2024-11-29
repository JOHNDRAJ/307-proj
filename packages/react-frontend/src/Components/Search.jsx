import React, { useState, useEffect } from "react";
import "./Search.css";

function Search({ user }) {

  const [users, setUsers] = useState([]); // State to store users fetched from the database
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/allusers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token from localStorage
          },
        }
      );
        const data = await response.json();
        setUsers(data); // Update state with the list of users
        console.log("Fetched Userss:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId) => {
    setSearchedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Remove user if already selected
        : [...prev, userId] // Add user if not selected
    );
  };

  const handleChannelCreation = async ({searchedUsers}) => {
    
    try {
      const response = await fetch(
        "http://localhost:5001/api/channel/create",
        // 'https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/channel/create',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: "Study Group",
            contents: "Welcome to the Study Group!",
            users: searchedUsers,
          }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Debugging output

      if (response.ok) {
        alert("Channel successfully created");
        setSearchedUsers([]);
        // navigate("/home");
      } else {
        alert(data.message || "An error occurred."); // Corrected error message handling
      }
    } catch (error) {
      console.error("Error during fetch:", error); // More specific error output
      alert("An error occurred during channel creation.");
    }
  }

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
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={`contact-item ${
                searchedUsers.includes(user._id) ? "selected" : ""
              }`}
              onClick={() => toggleUserSelection(user._id)}
            >
              <div className="contact-preview">
                <img
                  className="contact-pic"
                  src="/assets/default-profile-pic.webp"
                  alt={`${user.name}'s profile`}
                />
                <div className="contact-details">
                  <h3>{user.name}</h3>
                  <h3>{user._id}</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </div>
      <button
        className="create-channel-button"
        onClick={() => handleChannelCreation({ searchedUsers })}
        disabled={searchedUsers.length === 0} // Disable button if no users selected
      >
        Create Channel
      </button>
    </>
  );
}

export default Search;
