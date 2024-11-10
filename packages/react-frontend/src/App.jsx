import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp"; // Import the SignUp component
import ProfileSetup from "./Components/Prof/ProfileSetup";
import Home from "./Home";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />{" "}
        {/* Add the SignUp route */}
        <Route path="/profile-setup" element={<ProfileSetup />} />{" "}
        {/* Add the SignUp route */}
      </Routes>
    </Router>
  );
};

export default App;
