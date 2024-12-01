import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Profile from "./Components/Prof/Profile";
import Channel from "./Components/Channel";
import Search from "./Components/Search";

// Enum for the different page views on the app
const View = Object.freeze({
  HOME: "home",
  CHANNEL: "channel",
  SEARCH: "search",
  PROFILE: "profile",
});

function Home() {
  const [selectedChannel, setSelectedChannel] = useState({});
  /*
  set the default view to home/default once that gets made
  profile and search will have back navigation, home and channel won't
  might need to change previous view to a stack of multiple previous views
  (ex: Home > Search > Profile)
  */
  const [previousView, setPreviousView] = useState(View.HOME);
  const [currentView, setCurrentView] = useState(View.HOME);
  const [user, setUser] = useState({});

  const handleSelectView = (view) => {
    const prev = currentView;
    setPreviousView(prev);
    setCurrentView(view);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/user/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        const data = await response.json();
        setUser(data);
        console.log("Fetched User:", data);
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
        user={user}
      />
      <main>
        {/* Add other conditionally rendered views once they get made */}
        {currentView === View.HOME && (
          <h3>insert hero image here (in the center)</h3>
        )}
        {currentView === View.CHANNEL && (
          <>
            <h2 className="page-header">{selectedChannel.name}</h2>
            <Channel channel={selectedChannel} user = {user}/>
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
            <Search user = {user} />
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
            <Profile />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
