import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./User.css"; // Assuming you have a CSS file for styling
import CustomNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [view, setView] = useState("buttons");
  const navigate= useNavigate();
  const renderContent = () => {
    switch (view) {
      case "login":
        return (
          <>
            <button className="return-btn" onClick={() => navigate("/Home")}>
              Return
            </button>
            
          </>
        );
      case "signup":
        return (
          <>
            <button className="return-btn" onClick={() => navigate("/SignUp")}>
              Return
            </button>
            
          </>
        );
      default:
        return (
          <div className="button-container">
            <CustomNavbar/>
            <p>Do you already have an account?</p>
            <button className="auth-btn" onClick={() => navigate("/Login")}>
              Login
            </button>
            <p>Don't have an account?</p>
            <button className="auth-btn" onClick={() =>navigate("/SignUp") }>
              Sign Up
            </button>
          </div>
        );
    }
  };

  return <div className="auth-container">{renderContent()}</div>;
};

export default User;