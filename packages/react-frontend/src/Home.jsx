import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import ChatWindow from "./Components/ChatWindow";

function Home() {
  const [selectedContact, setSelectedContact] = useState("John");

  return (
    <div className="home">
      <Sidebar onSelectContact={setSelectedContact} />
      <ChatWindow contactName={selectedContact} />
    </div>
  );
}

export default Home;
