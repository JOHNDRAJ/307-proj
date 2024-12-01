import React, { useState, useEffect } from "react";
import "./Search.css";

function Search({ user }) {

  console.log(user);

  const [users, setUsers] = useState([]); // State to store users fetched from the database
  const [searchedUsers, setSearchedUsers] = useState([]);

  /////////////////
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputValue, setInputValue] = useState(""); // To store the entered information
  const [searchedUserNames, setSearchedUsernames] = useState([]);

  const togglePopup = () => {
    console.log(searchedUsers.length);
    if (!isPopupVisible) {
      if (searchedUsers.length === 1) {
        handleChannelCreation({searchedUsers});
        setInputValue("");
        setSearchedUsernames([]);
      }
      else {
        setIsPopupVisible(!isPopupVisible);
      }
    }
    else {
      setIsPopupVisible(!isPopupVisible);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  ///////////////

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

  const toggleUserSelection = (userId, userName) => {
    setSearchedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Remove user if already selected
        : [...prev, userId] // Add user if not selected
    );
    setSearchedUsernames((prev) =>
      prev.includes(userName)
        ? prev.filter((name) => name !== userName) // Remove username if already selected
        : [...prev, userName] // Add username if not selected
    );
  };

  const handleChannelCreation = async ({searchedUsers}) => {
    console.log(searchedUserNames)
    try {
      console.log(searchedUserNames);
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
            name: searchedUserNames.length === 1 ? searchedUserNames[0] : inputValue,
            contents: "",
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
              onClick={() => toggleUserSelection(user._id, user.name)}
            >
              <div className="contact-preview">
                <img
                  className="contact-pic"
                  src="/assets/default-profile-pic.webp"
                  alt={`${user.name}'s profile`}
                />
                <div className="contact-details">
                  <h3>{user.name}</h3>
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
        onClick={togglePopup}
        disabled={searchedUsers.length === 0} // Disable button if no users selected
      >
        Create Channel
      </button>

      {/* Popup Logic */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-box">
            <h2 className="popup-header">Channel Name</h2>
            <input
              className="popup-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Channel Name"
            />
            <div className="popup-buttons">
              <button className="popup-button submit" onClick={() => {handleChannelCreation({searchedUsers}); togglePopup();}}>
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
