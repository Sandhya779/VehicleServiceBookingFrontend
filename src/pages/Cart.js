import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fetch stored booking details from state or localStorage
  const storedBookingDetails = location.state?.bookingDetails || 
    JSON.parse(localStorage.getItem("bookingDetails")) || {};

  const [cartItems, setCartItems] = useState(storedBookingDetails.serviceBookings || []);

  // Function to remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("bookingDetails", JSON.stringify({ 
      ...storedBookingDetails, 
      serviceBookings: updatedCart 
    }));
  };

  // Function to confirm booking
  const handleConfirmBooking = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.accessToken;

    if (!userData || !token) {
      alert("User is not logged in!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Convert UserId and StoreId to integers
    const userId = parseInt(storedBookingDetails.userId || localStorage.getItem("userId"), 10);
    const storeId = parseInt(storedBookingDetails.storeId, 10);
    const statusId = parseInt(storedBookingDetails.statusId || 1, 10); // Default status = 1 (Pending)

    if (!userId || !storeId || !storedBookingDetails.vehicleDetails) {
      alert("Please provide all required details: Store, Vehicle, and User.");
      return;
    }

    // Creating final booking payload
    const bookingPayload = {
      userId,
      storeId,
      vehicleDetails: storedBookingDetails.vehicleDetails,
      bookingDate: storedBookingDetails.bookingDate || new Date().toISOString().split("T")[0],
      statusId,
      servicesBooked: cartItems.map((service) => ({
        subServiceId: service.subServiceId || service.serviceId || 0,
        subServiceName: service.subServiceName || service.serviceName || "Unknown Service",
        subServicePrice: service.subServicePrice || service.price || 0,
      })),
    };

    console.log("Final Payload:", bookingPayload);

    try {
      const response = await fetch("http://localhost:5002/api/ServiceBookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking confirmed!");
        navigate("/history");
      } else {
        console.error("Server Error:", data);
        alert(`Error: ${data.title || "Bad Request"}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error: " + error.message);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, service) => sum + (service.subServicePrice || service.price || 0), 0);

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((service, index) => (
            <div key={index} className="col-md-4">
              <div className="card p-3 mb-3">
                <h3>{service.subServiceName || service.serviceName}</h3>
                <p>Price: ₹{service.subServicePrice || service.price || 0}</p>
                <button className="btn btn-danger" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div>
          <h4>Total Services: {cartItems.length}</h4>
          <h4>Total Price: ₹{totalPrice}</h4>
          <button className="btn btn-success" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
