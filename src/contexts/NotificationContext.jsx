import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    desktopNotifications: false,
    reminderTime: '24'
  });

  const updateNotificationSettings = (newSettings) => {
    setNotificationSettings(newSettings);
    // Save to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationSettings, updateNotificationSettings }}>
      {children}
    </NotificationContext.Provider>
  );
}; 