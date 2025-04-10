import React from 'react';
import { FiCalendar, FiClock, FiUser, FiMapPin, FiMoreVertical } from 'react-icons/fi';

const AppointmentsLog = ({ patientId }) => {
  // Mock data - replace with API call
  const appointments = [
    {
      id: 1,
      date: '2024-02-20',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      status: 'completed',
      notes: 'Regular checkup, BP normal, prescribed routine medications',
      followUp: '2024-03-20'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '2:00 PM',
      doctor: 'Dr. Michael Chen',
      department: 'Internal Medicine',
      status: 'cancelled',
      notes: 'Patient requested reschedule',
      followUp: null
    }
  ];

  return (
    <div className="appointments-log">
      <div className="log-entries">
        {appointments.map(appointment => (
          <div key={appointment.id} className={`log-entry ${appointment.status}`}>
            <div className="entry-header">
              <div className="date-time">
                <FiCalendar />
                <span>{appointment.date}</span>
                <FiClock />
                <span>{appointment.time}</span>
              </div>
              <span className={`status-badge ${appointment.status}`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="entry-details">
              <div className="doctor-info">
                <FiUser />
                <div>
                  <h4>{appointment.doctor}</h4>
                  <span>{appointment.department}</span>
                </div>
              </div>
              
              <div className="appointment-notes">
                <p>{appointment.notes}</p>
              </div>
              
              {appointment.followUp && (
                <div className="follow-up">
                  <FiCalendar />
                  <span>Follow-up scheduled: {appointment.followUp}</span>
                </div>
              )}
            </div>
            
            <button className="more-actions">
              <FiMoreVertical />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsLog; 