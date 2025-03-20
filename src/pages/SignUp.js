import React, { useState } from "react";
import "../pages/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/Navbar";

const SignUp = () => {
  const [user, setUser] = useState({
    roleId: "2", // Default role for customer signup
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { firstName, lastName, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get("http://localhost:5002/api/Users/check-email?email=${email}");
      return response.data.exists;
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        alert("User already exists! Please log in.");
        navigate("/login");
        return;
      }

      const response = await axios.post("http://localhost:5002/api/Users", user);
      console.log(response.data);
      alert("SignUp successful!!");
      setUser({
        roleId: "2",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/Home");
    } catch (error) {
      alert("SignUp failed!!");
    }
  };

  return (
    <><CustomNavbar/>
    <div className="signup-container">
      
      <h2>Are you a new user? Sign up here:</h2>
      <form className="signup-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Enter first name"
          required
          value={firstName}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter last name"
          required
          value={lastName}
          onChange={onInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onInputChange}
        />
        <button>Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;