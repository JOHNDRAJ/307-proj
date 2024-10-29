import { useState } from "react";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";

const MyApp = () => {

  return (
    <div className="container">
      <Login></Login>
      <SignUp></SignUp>
    </div>
  );
};

export default MyApp;
