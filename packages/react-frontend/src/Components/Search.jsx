import React, { useState, useEffect } from "react";
import "./Search.css";

function Search({ user }) {

  const [users, setUsers] = useState([]); // State to store users fetched from the database
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserNames, setSelectedUsernames] = useState([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [channelName, setChannelName] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const togglePopup = () => {
    console.log(selectedUsers.length);
    if (!isPopupVisible) {
      if (selectedUsers.length === 1) {
        handleChannelCreation({ searchedUsers: selectedUsers });
        setChannelName("");
        setSelectedUsernames([]);
      } else {
        setIsPopupVisible(!isPopupVisible);
      }
    } else {
      setIsPopupVisible(!isPopupVisible);
      setChannelName("");
    }
  };

  const handleChangeChannelName = (e) => {
    setChannelName(e.target.value);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    // Filter users based on the input
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.major.toLowerCase().includes(value) ||
        user.grade.toLowerCase().includes(value) ||
        user.classes.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered); // Update the filtered users state
  };

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
        setFilteredUsers(data);
        console.log("Fetched Userss:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId, userName) => {
    setSelectedUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Remove user if already selected
          : [...prev, userId] // Add user if not selected
    );
    setSelectedUsernames(
      (prev) =>
        prev.includes(userName)
          ? prev.filter((name) => name !== userName) // Remove username if already selected
          : [...prev, userName] // Add username if not selected
    );
  };

  const handleChannelCreation = async ({ searchedUsers }) => {
    console.log(selectedUserNames);
    let name = channelName
    if(selectedUserNames.length === 1 || channelName == ""){
      name = user.name
      selectedUserNames.forEach(username => {
        name = name + ", " + username
      });
    }
    try {
      console.log(selectedUserNames);
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
            name: name,
            contents: "",
            users: searchedUsers,
          }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Debugging output

      if (response.ok) {
        //alert("Channel successfully created");
        setSelectedUsers([]);
        // navigate("/home");
      } else {
        alert(data.message || "An error occurred."); // Corrected error message handling
      }
    } catch (error) {
      console.error("Error during fetch:", error); // More specific error output
      alert("An error occurred during channel creation.");
    }
  };

  return (
    <>
      <div className="search-bar">
        <h3>To: </h3>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, email, grade, major, or class..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="search-results">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`contact-item ${
                selectedUsers.includes(user._id) ? "selected" : ""
              }`}
              onClick={() => toggleUserSelection(user._id, user.name)}
            >
              <div className="contact-preview">
                <img
                  className="contact-pic"
                  src="/assets/default-profile-pic.webp"
                  alt={`${user.name}'s profile`}
                />
                <div className="contact-details">
                  <h3>
                    {user.name} <span className="major-info">{user.major}</span>
                  </h3>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="not-found-message">No Users Found</p>
        )}
      </div>
      <button
        className="create-channel-button"
        onClick={togglePopup}
        disabled={selectedUsers.length === 0} // Disable button if no users selected
      >
        Create Channel
      </button>

      {/* Popup Logic */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-box">
            <h2 className="popup-header">Group Chat Name</h2>
            <input
              className="popup-input"
              type="text"
              value={channelName}
              onChange={handleChangeChannelName}
              placeholder="Group Chat Name"
            />
            <div className="popup-buttons">
              <button
                className="popup-button submit"
                onClick={() => {
                  handleChannelCreation({ searchedUsers: selectedUsers });
                  togglePopup();
                }}
              >
                Create
              </button>
              <button className="popup-button close" onClick={togglePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
