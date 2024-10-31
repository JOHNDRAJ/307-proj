import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();  // useNavigate hook for navigation

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    console.log(input);
    // navigate('/profile-setup')

    if (input.email !== "" && input.password !== "") {
      try {
        const response = await fetch("http://localhost:5001/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        const data = await response.json();

        if (response.ok) {
          // Handle successful login
          console.log("Sign up successful", data);
          alert("Sign up Successful");
          navigate('/profile-setup');
          // You can store the JWT token or redirect the user here
        } else {
          // Handle errors (e.g., invalid credentials)
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert(`An error occurred during sign up. ${error}`);
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

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-email">Name:</label>
        <input
          type="name"
          id="user-name"
          name="name"
          placeholder="First Last"
          aria-describedby="user-name"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a your full name.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
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
        <label htmlFor="password">Password:</label>
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
      <button className="btn-submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
