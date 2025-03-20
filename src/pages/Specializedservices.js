
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Services.css";
import CustomNavbar from "../components/Navbar";

const SpecializedServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [addedServices, setAddedServices] = useState({});

  const services = [
    { id: 5, name: "Car Detailing", price: 1500 },
    { id: 6, name: "Ceramic Coating", price: 4000 },
  ];

  const handleAddToCart = (service) => {
    addToCart(service);
    setAddedServices({ ...addedServices, [service.id]: true });
  };

  return (
    <div className="services-container">
      <CustomNavbar/>
      <h2>Specialized Services</h2>
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

export default SpecializedServices;
