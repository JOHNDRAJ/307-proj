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
  const [refresh, setRefresh] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [viewStack, setViewStack] = useState([View.HOME]);
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

  const handleNextView = (view) => {
    setViewStack([...viewStack, view]);
    setCurrentView(view);
  };

  const handlePrevView = () => {
    if (viewStack.length > 1) {
      setCurrentView(viewStack[viewStack.length - 2]);
      setViewStack(viewStack.slice(0, viewStack.length - 1));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/user/user`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/user/user/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
      {currentView === View.PROFILE || (
        <div
          className="profile-header"
          onClick={() => handleNextView(View.PROFILE)}
        >
          <img className="contact-pic" src="/assets/default-profile-pic.webp" />
        </div>
      )}
      <Sidebar
        onSelectContact={(name) => {
          setSelectedChannel(name);
          handleNextView(View.CHANNEL);
        }}
        onSelectSearch={() => handleNextView(View.SEARCH)}
        user={currentUser}
        refresh={refresh}
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
            <Channel
              channel={selectedChannel}
              user={currentUser}
              onSelectProfile={(user) => {
                setUser(user);
                handleNextView(View.PROFILE);
              }}
            />
          </>
        )}
        {currentView === View.SEARCH && (
          <>
            <h2 className="page-header">
              <button className="back-btn" onClick={() => handlePrevView()}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              Search
            </h2>
            <Search
              user={currentUser}
              onSelectContact={(name) => {
                setSelectedChannel(name);
                handleNextView(View.CHANNEL);
              }}
              onSelectProfile={(user) => {
                setUser(user);
                handleNextView(View.PROFILE);
              }}
              setRefresh={setRefresh}
            />
          </>
        )}
        {currentView === View.PROFILE && (
          <>
            <h2 className="page-header">
              <button
                className="back-btn"
                onClick={() => {
                  setUser(currentUser);
                  handlePrevView();
                }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              Profile
            </h2>
            <Profile user={user} currentUser={currentUser} setUser={setUser} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
