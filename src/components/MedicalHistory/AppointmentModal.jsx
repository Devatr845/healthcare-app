import React, { useState } from 'react';
import { FiX, FiClock, FiCalendar } from 'react-icons/fi';

const AppointmentModal = ({ doctor, onClose, onBook }) => {
  const [appointment, setAppointment] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    reason: '',
    type: 'consultation'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({
      ...appointment,
      doctorId: doctor.id,
      doctorName: doctor.name,
      status: 'pending'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="appointment-modal">
        <div className="modal-header">
          <h3>Book Appointment with {doctor.name}</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FiCalendar />
              Date
            </label>
            <input
              type="date"
              value={appointment.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FiClock />
              Time
            </label>
            <select
              value={appointment.time}
              onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
              required
            >
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Appointment Type</label>
            <select
              value={appointment.type}
              onChange={(e) => setAppointment({ ...appointment, type: e.target.value })}
              required
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="check-up">Regular Check-up</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label>Reason for Visit</label>
            <textarea
              value={appointment.reason}
              onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
              rows={3}
              required
              placeholder="Please describe your symptoms or reason for the appointment"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal; 