import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState("All");
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/ServiceBookings?user_id=${userId}`);
        setHistory(response.data);
        setFilteredHistory(response.data);
      } catch (error) {
        console.error("Error fetching service history:", error);
      }
    };

    if (userId) {
      fetchServiceHistory();
    }
  }, [userId]);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(history.filter((item) => item.status === status));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Service History</h2>
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      {filteredHistory.length === 0 ? (
        <p className="text-gray-600">No service history available.</p>
      ) : (
        filteredHistory.map((service) => (
          <div key={service.booking_id} className="border p-4 mb-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{service.service_type}</h3>
            <p className="text-sm text-gray-600">Vehicle: {service.vehicle_details}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(service.booking_date).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-semibold ${
                service.status === "Completed" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {service.status}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => navigate(`/service-details/${service.booking_id}`)}
              >
                View Details
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/book-service/${service.service_type_id}`)}
              >
                Rebook
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceHistory;
