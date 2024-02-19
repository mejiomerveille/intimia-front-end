"use client";
import { useEffect, useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Appel à l'API Django pour récupérer les notifications de l'utilisateur
    fetch('http://localhost:8000/api/v1/notifications/')
      .then(response => response.json())
      .then(data => setNotifications(data.notifications))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <strong>{notification.date_created}</strong>: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;