import React, { useState, useEffect } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { Bell } from "react-feather";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Fetch service statuses where status = "Completed"
    try {
      const response = await fetch(`/api/service-bookings?userId=${userId}&status=Completed`);
      const data = await response.json();
      setNotifications(data.map(service => ({
        id: service.booking_id,
        message: `Your service for ${service.vehicle_details} is completed.`,
        read: service.read || false
      })));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link">
        <Bell size={24} />
        {notifications.some(n => !n.read) && <Badge bg="danger">{notifications.filter(n => !n.read).length}</Badge>}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {notifications.length > 0 ? (
          notifications.map(n => (
            <Dropdown.Item key={n.id} className={n.read ? "text-muted" : ""} onClick={() => markAsRead(n.id)}>
              {n.message}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>No new notifications</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;
