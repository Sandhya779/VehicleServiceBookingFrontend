import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const ServiceBooking = () => {
  const { id } = useParams(); // Get the booking ID from URL params
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch service booking data from API
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`http://localhost:5136/api/ServiceBookings/${id}`);
        setBookingDetails(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service booking:", error);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="container text-center mt-5">
        <h4 className="text-danger">Service Booking Not Found!</h4>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card shadow-lg w-75 p-4">
          <h2 className="mb-4 text-center text-dark">Service Booking Details</h2>

          {/* Grid Layout for User and Order Details */}
          <div className="row mb-4">
            {/* User Details */}
            <div className="col-md-6 mb-3">
              <h5 className="text-secondary">User Details</h5>
              <p className="mb-1">
                {/* <strong>User Name:</strong> {bookingDetails.user?.FirstName || "N/A"} */}
                <strong>User Name:</strong>{" "}
  {bookingDetails.Users?.FirstName
    ? `${bookingDetails.Users.FirstName} ${bookingDetails.Users.LastName}`
    : "N/A"}
              </p>
              <p className="mb-1">
                <strong>Booking ID:</strong> {bookingDetails.bookingId}
              </p>
              <p className="mb-1">
                <strong>Store ID:</strong> {bookingDetails.storeId}
              </p>
              <p className="mb-1">
                <strong>User ID:</strong> {bookingDetails.userId}
              </p>
              <p className="mb-1">
                {/* <strong>Location:</strong> {bookingDetails.store?.City || "N/A"} */}
                <strong>Location:</strong>{" "}
  {bookingDetails.Stores?.City
    ? `${bookingDetails.Stores.City}, ${bookingDetails.Stores.State}`
    : "N/A"}
              </p>
              <p className="mb-1">
                <strong>Vehicle Details:</strong> {bookingDetails.vehicleDetails}
              </p>
              <p className="mb-1">
                <strong>Service Type ID:</strong> {bookingDetails.serviceTypeId}
              </p>
              <p className="mb-1">
                <strong>Services Booked:</strong> {bookingDetails.servicesBooked}
              </p>
              <p className="mb-1">
                <strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}
              </p>
              <p className="mb-1">
                <strong>Status ID:</strong> {bookingDetails.statusId}
              </p>
            </div>

            {/* Order Info */}
            <div className="col-md-6 mb-3">
              <h5 className="text-secondary">Order Info</h5>
              <p className="mb-1">
                <strong>Order Placed:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}
              </p>

              <div className="mt-3">
                {bookingDetails.servicesBooked.split(", ").map((service, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>{service}</span>
                    <span className="text-muted">N/A</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total Price Section */}
          <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
            <h5 className="text-dark">Total Price</h5>
            <h5 className="text-primary">₹{bookingDetails.totalPrice || "N/A"}</h5>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-dark px-4">Invoice</button>
            <button className="btn btn-primary px-4">Reorder</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceBooking;
