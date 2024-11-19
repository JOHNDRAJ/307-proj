import React, { useState } from "react";
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
  const [selectedContact, setSelectedContact] = useState("John");
  /*
  set the default view to home/default once that gets made
  profile and search will have back navigation, home and channel won't
  might need to change previous view to a stack of multiple previous views
  (ex: Home > Search > Profile)
  */
  const [previousView, setPreviousView] = useState(View.HOME);
  const [currentView, setCurrentView] = useState(View.HOME);

  const handleSelectView = (view) => {
    const prev = currentView;
    setPreviousView(prev);
    setCurrentView(view);
  };

  return (
    <div className="home">
      <div
        className="profile-header"
        onClick={() => handleSelectView(View.PROFILE)}
      >
        <img
          className="contact-pic"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
      </div>
      <Sidebar
        onSelectContact={(name) => {
          setSelectedContact(name);
          handleSelectView(View.CHANNEL);
        }}
        onSelectSearch={() => handleSelectView(View.SEARCH)}
      />
      <main>
        {/* Add other conditionally rendered views once they get made */}
        {currentView === View.HOME && (
          <h3>insert hero image here (in the center)</h3>
        )}
        {currentView === View.CHANNEL && (
          <>
            <h2 className="page-header">{selectedContact}</h2>
            <Channel contactName={selectedContact} />
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
            <Search />
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
