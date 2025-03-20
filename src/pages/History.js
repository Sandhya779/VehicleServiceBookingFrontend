import React, { useEffect, useState } from "react";
import axios from "axios";
import "./history.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId"); // Ensure userId is stored when logging in


  useEffect(() => {
    const fetchServiceHistory = async () => {
      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5136/api/StoreBookings/user/${userId}`);
        console.log("API Response:", response.data);  // ✅ Debugging Step
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching service history:", err);
        setError("Failed to fetch service history.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, [userId]);

  return (
    <div>
      <h2>My Service History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : history.length === 0 ? (
        <p>No service history available.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vehicle Details</th>
              <th>Store Id</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {history.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.vehicleDetails || "N/A"}</td>
                <td>{booking.storeId}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.status?.statusName || "Yet to Start"}</td>
                <td>--</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
