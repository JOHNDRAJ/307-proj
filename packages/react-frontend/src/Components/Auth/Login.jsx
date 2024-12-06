import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      try {
        const response = await fetch(
          // "http://localhost:5001/api/auth/signin",
          "https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert(`An error occurred during login. ${error}`);
      }
    } else {
      alert("Please provide valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmitEvent}>
        <h1>PolyMessages</h1>
        <div className="form_control">
          <label htmlFor="user-email">Email</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-email" className="sr-only">
            Please enter a valid email.
          </div>
        </div>
        <div className="form_control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-password" className="sr-only">
            your password should be more than 8 character
          </div>
        </div>
        <button>Log In</button>
        <p>
          Don't have an account?{" "}
          <button className="auth-nav-btn" onClick={handleSignUpNavigate}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
