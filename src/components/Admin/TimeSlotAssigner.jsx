import React, { useState } from 'react';
import { FiClock, FiCalendar, FiUser } from 'react-icons/fi';
import './TimeSlotAssigner.css';

const TimeSlotAssigner = ({ onClose, onAssign }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  // Mock doctors data - replace with your actual doctors data
  const doctors = [
    { id: 1, name: "Dr. Sarah Wilson", department: "Cardiology" },
    { id: 2, name: "Dr. Michael Chen", department: "Neurology" },
    { id: 3, name: "Dr. Emily Brown", department: "Endocrinology" },
    { id: 4, name: "Dr. James Wilson", department: "Dermatology" }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({
      date: selectedDate,
      timeSlot: selectedSlot,
      doctorId: selectedDoctor
    });
  };

  return (
    <div className="modal-overlay">
      <div className="time-slot-modal">
        <div className="modal-header">
          <h3>Assign Time Slot</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FiCalendar /> Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FiUser /> Select Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.department}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FiClock /> Available Time Slots
            </label>
            <div className="time-slots-grid">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={!selectedSlot}>
              Assign Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeSlotAssigner; 