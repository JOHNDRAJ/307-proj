import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Profile from "./Components/Prof/Profile";
import Channel from "./Components/Channel";
import Search from "./Components/Search";
import { removeName } from "./utils/utils";
import { useNavigate } from "react-router-dom";

// Enum for the different page views on the app
const View = Object.freeze({
  HOME: "home",
  CHANNEL: "channel",
  SEARCH: "search",
  PROFILE: "profile",
});

function Home() {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState({});
  /*
  set the default view to home/default once that gets made
  profile and search will have back navigation, home and channel won't
  might need to change previous view to a stack of multiple previous views
  (ex: Home > Search > Profile)
  */
  const [previousView, setPreviousView] = useState(View.HOME);
  const [currentView, setCurrentView] = useState(View.HOME);
  const [currentUser, setCurrentUser] = useState({
    name: "User Name",
    email: "student@calpoly.edu",
    bio: "bio",
    grade: "grade",
    major: "major",
    classes: "classes",
  });
  // The selected user for profile view
  const [user, setUser] = useState({
    name: "User Name",
    email: "student@calpoly.edu",
    bio: "bio",
    grade: "grade",
    major: "major",
    classes: "classes",
  });

  const handleSelectView = (view) => {
    const prev = currentView;
    setPreviousView(prev);
    setCurrentView(view);
  };

  useEffect(() => {
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
        if (data.message == "Invalid token.") {
          navigate("/");
        }
        setCurrentUser(data.user);
        setUser(data.user);
        //console.log("Fetched User:", data);
        //console.log("User state:", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="home">
      <div
        className="profile-header"
        onClick={() => handleSelectView(View.PROFILE)}
      >
        <img className="contact-pic" src="/assets/default-profile-pic.webp" />
      </div>
      <Sidebar
        onSelectContact={(name) => {
          setSelectedChannel(name);
          handleSelectView(View.CHANNEL);
        }}
        onSelectSearch={() => handleSelectView(View.SEARCH)}
        user={currentUser}
      />
      <main>
        {/* Add other conditionally rendered views once they get made */}
        {currentView === View.HOME && (
          <div className="hero">
            {/* Insert hero image here */}
            <h1>Welcome!</h1>
            <br></br>
            <h3>Open a chat from the sidebar</h3>
            <h3>Click search to find other students</h3>
            <h3>View your profile at the top right</h3>
          </div>
        )}
        {currentView === View.CHANNEL && (
          <>
            <h2 className="page-header">
              {removeName(selectedChannel.name, currentUser?.name)}
            </h2>
            <Channel channel={selectedChannel} user={currentUser} />
          </>
        )}
        {currentView === View.SEARCH && (
          <>
            <h2 className="page-header">
              <button
                className="back-btn"
                onClick={() => handleSelectView(previousView)}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              Search
            </h2>
            <Search
              user={currentUser}
              onSelectContact={(name) => {
                setSelectedChannel(name);
                handleSelectView(View.CHANNEL);
              }}
              onSelectProfile={(user) => {
                setUser(user);
                handleSelectView(View.PROFILE);
              }}
            />
          </>
        )}
        {currentView === View.PROFILE && (
          <>
            <h2 className="page-header">
              <button
                className="back-btn"
                onClick={() => handleSelectView(previousView)}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              Profile
            </h2>
            <Profile user={user} currentUser={currentUser} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
