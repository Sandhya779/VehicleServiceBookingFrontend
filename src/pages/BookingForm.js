import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ServiceBookingForm = () => {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = parseInt(localStorage.getItem("userId"), 10);

  console.log(userId);
  const [message, setMessage] = useState("");
  const [subServices, setSubServices] = useState([]); // Store fetched sub-services
  const [selectedServices, setSelectedServices] = useState([]); // Store selected services

  // Form state
  const [formData, setFormData] = useState({
    userId,
    StoreId: "",
    VehicleDetails: "",
    BookingDate: new Date().toISOString().split("T")[0], 
    StatusId: 1,
  });

  // Fetch subservices from API
  useEffect(() => {
    fetch("http://localhost:5002/api/SubServices")
      .then((res) => res.json())
      .then((data) => setSubServices(data))
      .catch((err) => console.error("Error fetching sub-services:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle service selection
  const handleServiceChange = (service) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.find((s) => s.subServiceId === service.subServiceId);
      if (isSelected) {
        return prevSelected.filter((s) => s.subServiceId !== service.subServiceId);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  // Calculate total price
  const totalPrice = selectedServices.reduce((acc, service) => acc + service.subServicePrice, 0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing! Please log in again.");
      return;
    }

    if (!formData.StoreId || !formData.VehicleDetails.trim()) {
      alert("Please select a store and enter vehicle details.");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const bookingDetails = {
      userId,
      ...formData,
      serviceBookings: selectedServices.map((service) => ({
        subServiceId: service.subServiceId,
        serviceName: service.subServiceName,
        servicePrice: service.subServicePrice,
      })), 
      totalPrice,
    };
    

    console.log("Booking Details:", bookingDetails); // Debugging

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

    // Navigate to cart page with booking details
    navigate("/cart", { state: { bookingDetails } });
  };

  return (
    <div className="container mt-4">
      <h2 style={{ color: "white" }}>Book a Service</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>User ID</label>
          <input type="text" className="form-control" value={userId} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>Select Store</label>
          <select className="form-control" name="StoreId" value={formData.StoreId} onChange={(e)=>setFormData({...formData,StoreId:parseInt(e.target.value,10)})} required>
            <option value="">Choose Store</option>
            <option value="1"> 1 Vijayawada</option>
            <option value="2"> 2 Vizag </option>
            <option value="3"> 3 Tirupati</option>
            <option value="4"> 4 Guntur </option>
            <option value="5"> 5 Kakinada</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label"style={{ color: "white" }}>Vehicle Details</label>
          <input
            type="text"
            className="form-control"
            name="VehicleDetails"
            value={formData.VehicleDetails}
            onChange={handleChange}
            required
            placeholder="Enter Vehicle Name & Number (e.g., Honda City - MH12AB1234)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>Booking Date</label>
          <input type="date" className="form-control" name="BookingDate" value={formData.BookingDate} readOnly />
        </div>

        {/* Sub-Service Selection */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "white" }}>Select Services</label>
          {subServices.length > 0 ? (
            <div>
              {subServices.map((service) => (
                <div key={service.subServiceId} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`service-${service.subServiceId}`}
                    onChange={() => handleServiceChange(service)}
                    checked={selectedServices.some((s) => s.subServiceId === service.subServiceId)}
                  />
                  <label className="form-check-label" htmlFor={`service-${service.subServiceId}`} style={{ color: "white" }}>
  {service.subServiceName} - ₹{service.subServicePrice}
</label>

                </div>
              ))}
            </div>
          ) : (
            <p>Loading services...</p>
          )}
        </div>

        {/* Total Price Display */}
        <div className="mb-3">
          <h5>Total Price: ₹{totalPrice}</h5>
        </div>

        <button type="submit" className="btn btn-primary">Proceed to Cart</button>
        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
};

export default ServiceBookingForm;
