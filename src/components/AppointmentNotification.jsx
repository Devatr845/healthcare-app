import React, { useState, useContext, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import RescheduleModal from './RescheduleModal';
import './AppointmentNotification.css';
import { NotificationContext } from '../contexts/NotificationContext';
import { sendEmail } from '../services/emailService';

const AppointmentNotification = ({ appointment }) => {
  const { notificationSettings } = useContext(NotificationContext);
  const [appointmentStatus, setAppointmentStatus] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState({
    date: 'October 30th, 2023',
    time: '11:30 - 13:00'
  });

  const sendEmailNotification = async (appointmentDetails) => {
    try {
      const emailBody = `
        Dear Administrator,

        This is a notification for an upcoming appointment:
        
        Patient Details:
        ---------------
        Name: ${appointmentDetails.patientName}
        Date: ${new Date(appointmentDetails.date).toLocaleDateString()}
        Time: ${appointmentDetails.time}
        Doctor: Dr. ${appointmentDetails.doctorName || 'Alison Ogoya'}
        Location: ${appointmentDetails.location || 'Mainframe Hospital'}
        Status: ${appointmentStatus}

        Appointment Notes:
        ----------------
        - Patient should arrive 15 minutes before scheduled time
        - Current appointment status: ${appointmentStatus}
        - Last updated: ${new Date().toLocaleString()}

        System Information:
        -----------------
        - Notification sent via Medical Center Admin Panel
        - Email notifications: ${notificationSettings.emailNotifications ? 'Enabled' : 'Disabled'}
        - Reminder time: ${notificationSettings.reminderTime} hours before appointment

        Best regards,
        Medical Center System
      `;

      const result = await sendEmail(
        'devtree741@gmail.com', // Admin email
        'Medical Center - Appointment Notification',
        emailBody,
        'devtree741@gmail.com' // Sender email (same as admin)
      );

      if (result.success) {
        console.log('Email notification sent successfully');
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!appointment) return;

    const checkAndNotify = async () => {
      try {
        const appointmentTime = new Date(appointment.date).getTime();
        const now = new Date().getTime();
        const reminderTime = parseInt(notificationSettings.reminderTime) * 60 * 60 * 1000;
        
        if (appointmentTime - now <= reminderTime && appointmentTime > now) {
          // Send email notification if enabled
          if (notificationSettings.emailNotifications) {
            await sendEmailNotification(appointment);
          }

          // Show desktop notification if enabled
          if (notificationSettings.desktopNotifications) {
            new Notification('Upcoming Appointment', {
              body: `You have an appointment with ${appointment.patientName} in ${notificationSettings.reminderTime} hours`
            });
          }
        }
      } catch (error) {
        console.error('Error in notification check:', error);
      }
    };

    // Check immediately and then every hour
    checkAndNotify();
    const interval = setInterval(checkAndNotify, 3600000);

    return () => clearInterval(interval);
  }, [appointment, notificationSettings, appointmentStatus]);

  const handleReschedule = () => {
    setIsModalOpen(true);
  };

  const handleRescheduleConfirm = (newDateTime) => {
    setAppointmentStatus('rescheduled');
    setAppointmentTime({
      date: new Date(newDateTime.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: newDateTime.time
    });
    console.log('Appointment rescheduled to:', newDateTime);
  };

  const handleConfirm = () => {
    setAppointmentStatus('confirmed');
    console.log('Appointment confirmed');
  };

  return (
    <div className="notification-wrapper">
      <div className="notification-header">
        <h3>Upcoming Appointment</h3>
        <button className="view-all-btn">View all</button>
      </div>
      <div className="appointment-notification">
        <div className="appointment-content">
          <div className="doctor-info">
            <div className="avatar-circle">
              <FaUserCircle className="doctor-avatar" />
            </div>
            <div className="doctor-details">
              <h4>Dr. Alison Ogoya</h4>
              <span>General Practitioner</span>
            </div>
            <IoNotificationsOutline className="notification-icon" />
          </div>
          <div className="appointment-details">
            <div className="time-details">
              <span>{`${appointmentTime.date}, ${appointmentTime.time} (1hr 30min)`}</span>
            </div>
            <div className="location-details">
              <MdLocationOn className="location-icon" />
              <span>Mainframe Hospital, 15 Avenue Rd, Lagos</span>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button 
            className={`reschedule-btn ${appointmentStatus === 'rescheduling' ? 'active' : ''}`}
            onClick={handleReschedule}
            disabled={appointmentStatus === 'confirmed'}
          >
            Reschedule
          </button>
          <button 
            className={`confirm-btn ${appointmentStatus === 'confirmed' ? 'active' : ''}`}
            onClick={handleConfirm}
            disabled={appointmentStatus === 'rescheduling'}
          >
            Confirm appointment
          </button>
        </div>
      </div>
      <RescheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRescheduleConfirm}
      />
    </div>
  );
};

export default AppointmentNotification; 