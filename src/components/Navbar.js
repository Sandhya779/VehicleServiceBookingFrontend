import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import NotificationBell from "../pages/Notification";
import "./Navbar.css";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User Role in Navbar:", user?.role);


  useEffect(() => {
    const sectionId = new URLSearchParams(location.search).get("scrollTo");
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    localStorage.removeItem("userId"); // Remove userId (if stored separately)
    localStorage.removeItem("accessToken"); // Remove token
    navigate("/"); // Redirect to homepage
    window.location.reload(); // Refresh page to update navbar
  };

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    navigate(`/?scrollTo=${sectionId}`);
  };

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Navbar.Brand href="/" className="navbar-logo">
        <img src={logo} alt="Logo" width="50" height="50" />
        <span className="navbar-project-name">FixMyRide</span>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto navbar-links">
          <Nav.Link href="/" className="nav-item" onClick={(e) => handleScroll(e, 'about-us')}>About Us</Nav.Link>
          <Dropdown className="nav-dropdown">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/" onClick={(e) => handleScroll(e, 'faqs')}>FAQs</Dropdown.Item>
              <Dropdown.Item href="/" onClick={(e) => handleScroll(e, 'contact-us')}>Contact Us</Dropdown.Item>
              <Dropdown.Item href="/" onClick={(e) => handleScroll(e, 'privacy-policy')}>Privacy Policy</Dropdown.Item>
              <Dropdown.Item href="/" onClick={(e) => handleScroll(e, 'reviews')}>Reviews</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* {user && user.role === "customer" && <NotificationBell userId={user.id} />} */}
          

          {user?.role === "customer" && <NotificationBell userId={user.id} />}
          {user ? (
            <> {/* React Fragment to wrap multiple elements */}
          <Nav.Link onClick={() => navigate("/history")} className="nav-item">History</Nav.Link>
          <Nav.Link onClick={handleLogout} className="nav-item">Logout</Nav.Link>
           </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-item">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" className="signup-link">Sign Up</Nav.Link>
            </>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;