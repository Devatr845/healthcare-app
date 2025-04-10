import React from 'react';
import { 
  FiCheck, 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiDownload, 
  FiEdit2, 
  FiX,
  FiUser,
  FiVideo,
  FiBell,
  FiInfo,
  FiAlertCircle,
  FiPrinter
} from 'react-icons/fi';
import './AppointmentConfirmation.css';

const AppointmentConfirmation = ({ 
  appointment, 
  onClose, 
  onAddToCalendar, 
  onDownloadPdf, 
  onReschedule 
}) => {
  // Format date in a readable way
  const formattedDate = new Date(appointment.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format time in 12-hour format
  const formattedTime = new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div 
      className="confirmation-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="confirmation-container"
        aria-labelledby="confirmation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close confirmation"
        >
          <FiX />
        </button>

        <div className="confirmation-header">
          <div className="success-icon">
            <FiCheck aria-hidden="true" />
          </div>
          <h2 id="confirmation-title">Appointment Confirmed!</h2>
          <p className="confirmation-subtitle">
            Your appointment has been successfully scheduled.
          </p>
        </div>

        <div className="divider"></div>

        <div className="appointment-info">
          <h3>Appointment Details</h3>
          
          <div className="info-row doctor-info">
            <div className="info-icon">
              <FiUser aria-hidden="true" />
            </div>
            <div className="info-label">Doctor</div>
            <div className="info-value">
              <strong>{appointment.doctor}</strong>
              <span className="info-subtext">{appointment.specialization}</span>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">
              <FiCalendar aria-hidden="true" />
            </div>
            <div className="info-label">Date</div>
            <div className="info-value">
              <strong>{formattedDate}</strong>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">
              <FiClock aria-hidden="true" />
            </div>
            <div className="info-label">Time</div>
            <div className="info-value">
              <strong>{formattedTime}</strong>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">
              {appointment.type === 'video' ? 
                <FiVideo aria-hidden="true" /> : 
                <FiUser aria-hidden="true" />
              }
            </div>
            <div className="info-label">Type</div>
            <div className="info-value">
              <strong>{appointment.type === 'video' ? 'Video Call' : 'In-person'}</strong>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon">
              <FiMapPin aria-hidden="true" />
            </div>
            <div className="info-label">Location</div>
            <div className="info-value">
              <strong>{appointment.location}</strong>
            </div>
          </div>

          {appointment.notes && (
            <div className="info-note">
              <h4><FiInfo aria-hidden="true" /> Notes</h4>
              <p>{appointment.notes}</p>
            </div>
          )}

          <div className="preparation-instructions">
            <h4><FiAlertCircle aria-hidden="true" /> Preparation Instructions</h4>
            <ul>
              <li>Please arrive 15 minutes before your scheduled time.</li>
              <li>Bring your insurance card and ID.</li>
              <li>List any medications you are currently taking.</li>
              {appointment.type === 'video' && (
                <li>Ensure you have a stable internet connection and a quiet space for your video call.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="divider"></div>

        <div className="reminders-section">
          <h3><FiBell aria-hidden="true" /> Reminders</h3>
          <p>You'll receive reminders:</p>
          <div className="reminder-options">
            <label className="reminder-checkbox">
              <input 
                type="checkbox" 
                checked={appointment.reminders?.timing?.includes('1day')}
                readOnly
              />
              <span className="checkbox-label">1 day before</span>
            </label>
            <label className="reminder-checkbox">
              <input 
                type="checkbox" 
                checked={appointment.reminders?.timing?.includes('1hour')}
                readOnly
              />
              <span className="checkbox-label">1 hour before</span>
            </label>
          </div>
        </div>

        <div className="confirmation-actions">
          <button 
            className="action-button primary"
            onClick={onAddToCalendar}
            aria-label="Add appointment to your calendar"
          >
            <FiCalendar aria-hidden="true" />
            Add to Calendar
          </button>
          <button 
            className="action-button secondary"
            onClick={onDownloadPdf}
            aria-label="Download appointment details as PDF"
          >
            <FiDownload aria-hidden="true" />
            Download PDF
          </button>
          <button 
            className="action-button tertiary"
            onClick={() => {
              window.print();
            }}
            aria-label="Print appointment details"
          >
            <FiPrinter aria-hidden="true" />
            Print
          </button>
          <button 
            className="action-button tertiary"
            onClick={onReschedule}
            aria-label="Reschedule this appointment"
          >
            <FiEdit2 aria-hidden="true" />
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 