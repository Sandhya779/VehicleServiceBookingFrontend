import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import CustomNavbar from "../components/Navbar";

const MajorServices = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  const [addedServices, setAddedServices] = useState({});

  const services = [
    { id: 3, name: "Engine Repair", price: 3000 },
    { id: 4, name: "Transmission Fix", price: 5000 },
  ];

  const handleAddToCart = (service) => {
    addToCart(service);
    setAddedServices({ ...addedServices, [service.id]: true });
  };

  return (
    <div className="services-container">
      <CustomNavbar/>
      <h2>Major Services</h2>
      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>Price: ₹{service.price}</p>
            <button 
              className={`add-to-cart-btn ${addedServices[service.id] ? "added" : ""}`}
              onClick={() => handleAddToCart(service)}
            >
              {addedServices[service.id] ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      <button className="cart-button" onClick={() => navigate("/cart")}>
         Go to Cart
      </button>
    </div>
  );
};

export default MajorServices;
