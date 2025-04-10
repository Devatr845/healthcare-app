import React from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiVideo,
  FiDownload,
  FiShare2,
  FiMail,
  FiBell
} from 'react-icons/fi';
import './ConfirmationModal.css';

const ConfirmationModal = ({ appointment, onClose, onSetReminder }) => {
  const [reminderSettings, setReminderSettings] = React.useState({
    email: true,
    sms: false,
    app: true,
    timing: ['1day', '1hour']
  });

  const handleAddToCalendar = () => {
    const event = {
      title: `Appointment with ${appointment.doctor}`,
      description: appointment.notes,
      location: 'Hospital Address',
      startTime: `${appointment.date}T${appointment.time}`,
      endTime: `${appointment.date}T${appointment.time.split(':')[0]}:${parseInt(appointment.time.split(':')[1]) + 30}:00`
    };

    // Generate Google Calendar URL
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${event.startTime}/${event.endTime}`;
    window.open(googleUrl);
  };

  const handleDownloadPDF = () => {
    // Implementation for PDF download
  };

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-header">
          <h2>Appointment Confirmed!</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="confirmation-content">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>

          <div className="appointment-summary">
            <h3>Appointment Details</h3>
            
            <div className="detail-row">
              <FiUser />
              <span>Doctor:</span>
              <strong>{appointment.doctor}</strong>
            </div>

            <div className="detail-row">
              <FiCalendar />
              <span>Date:</span>
              <strong>{new Date(appointment.date).toLocaleDateString()}</strong>
            </div>

            <div className="detail-row">
              <FiClock />
              <span>Time:</span>
              <strong>{appointment.time}</strong>
            </div>

            <div className="detail-row">
              {appointment.type === 'video' ? <FiVideo /> : <FiUser />}
              <span>Type:</span>
              <strong>{appointment.type === 'video' ? 'Video Consultation' : 'In-person Visit'}</strong>
            </div>
          </div>

          <div className="reminder-settings">
            <h3>Set Reminders</h3>
            
            <div className="reminder-options">
              <label className="reminder-option">
                <input
                  type="checkbox"
                  checked={reminderSettings.email}
                  onChange={(e) => setReminderSettings({
                    ...reminderSettings,
                    email: e.target.checked
                  })}
                />
                <FiMail />
                Email Notifications
              </label>

              <label className="reminder-option">
                <input
                  type="checkbox"
                  checked={reminderSettings.sms}
                  onChange={(e) => setReminderSettings({
                    ...reminderSettings,
                    sms: e.target.checked
                  })}
                />
                <FiUser />
                SMS Notifications
              </label>

              <label className="reminder-option">
                <input
                  type="checkbox"
                  checked={reminderSettings.app}
                  onChange={(e) => setReminderSettings({
                    ...reminderSettings,
                    app: e.target.checked
                  })}
                />
                <FiBell />
                App Notifications
              </label>
            </div>

            <div className="reminder-timing">
              <h4>Remind me:</h4>
              <div className="timing-options">
                {['1day', '1hour', '30min'].map(timing => (
                  <label key={timing} className="timing-option">
                    <input
                      type="checkbox"
                      checked={reminderSettings.timing.includes(timing)}
                      onChange={(e) => {
                        const newTiming = e.target.checked
                          ? [...reminderSettings.timing, timing]
                          : reminderSettings.timing.filter(t => t !== timing);
                        setReminderSettings({
                          ...reminderSettings,
                          timing: newTiming
                        });
                      }}
                    />
                    {timing === '1day' ? '1 day before' :
                     timing === '1hour' ? '1 hour before' : '30 minutes before'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="calendar-btn" onClick={handleAddToCalendar}>
              <FiCalendar />
              Add to Calendar
            </button>
            
            <button className="download-btn" onClick={handleDownloadPDF}>
              <FiDownload />
              Download PDF
            </button>

            <button className="share-btn">
              <FiShare2 />
              Share
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="save-reminder-btn"
            onClick={() => {
              onSetReminder(reminderSettings);
              onClose();
            }}
          >
            Save Reminder Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 