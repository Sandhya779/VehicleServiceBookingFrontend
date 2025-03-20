
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import { CartContext } from "./CartContext";

const BasicServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [addedServices, setAddedServices] = useState({});

  const services = [
    { id: 1, name: "Oil Change", price: 500 },
    { id: 2, name: "Tire Rotation", price: 300 },
  ];

  // ✅ Function to Add to Cart & Change Button Text/Color
  const handleAddToCart = (service) => {
    addToCart(service);
    setAddedServices((prev) => ({ ...prev, [service.id]: true }));
  };

  return (
    <div className="services-container">
      <h2>Basic Services</h2>
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

export default BasicServices;