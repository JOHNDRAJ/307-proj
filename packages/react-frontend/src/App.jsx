import Home from "./Home";
import SignUp from "./Components/Auth/SignUp";
import Login from "./Components/Auth/Login";
import React, { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("signup");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "signup":
        return <SignUp />;
      case "login":
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <button onClick={() => setCurrentPage("home")}>Home</button>
      <button onClick={() => setCurrentPage("signup")}>SignUp</button>
      <button onClick={() => setCurrentPage("login")}>Login</button>

      {renderPage()}
    </>
  );
}

export default App;
