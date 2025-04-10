import React from 'react';
import { FiX, FiUser, FiCalendar, FiClock, FiPhoneCall, FiMapPin, 
         FiMail, FiActivity, FiAlertCircle } from 'react-icons/fi';
import './AppointmentDetailsModal.css';

const AppointmentDetailsModal = ({ appointment, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="details-modal">
        <div className="modal-header">
          <h3>Appointment Details</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="details-content">
          <section className="detail-section">
            <h4>Patient Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <FiUser className="icon" />
                <div>
                  <label>Name</label>
                  <p>{appointment.patientName}</p>
                </div>
              </div>
              <div className="info-item">
                <FiActivity className="icon" />
                <div>
                  <label>Age & Gender</label>
                  <p>{appointment.age} years, {appointment.gender}</p>
                </div>
              </div>
              <div className="info-item">
                <FiPhoneCall className="icon" />
                <div>
                  <label>Contact</label>
                  <p>{appointment.contactNumber}</p>
                </div>
              </div>
              <div className="info-item">
                <FiMail className="icon" />
                <div>
                  <label>Email</label>
                  <p>{appointment.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FiMapPin className="icon" />
                <div>
                  <label>Address</label>
                  <p>{appointment.address}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h4>Appointment Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <FiCalendar className="icon" />
                <div>
                  <label>Date</label>
                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="info-item">
                <FiClock className="icon" />
                <div>
                  <label>Time</label>
                  <p>{appointment.time} ({appointment.duration} mins)</p>
                </div>
              </div>
              <div className="info-item">
                <FiUser className="icon" />
                <div>
                  <label>Doctor</label>
                  <p>{appointment.doctorName}</p>
                </div>
              </div>
              <div className="info-item">
                <FiAlertCircle className="icon" />
                <div>
                  <label>Status</label>
                  <p className={`status ${appointment.status}`}>{appointment.status}</p>
                </div>
              </div>
            </div>
          </section>

          {appointment.symptoms && (
            <section className="detail-section">
              <h4>Medical Information</h4>
              <div className="medical-details">
                <div>
                  <label>Symptoms</label>
                  <div className="tags">
                    {appointment.symptoms.map((symptom, index) => (
                      <span key={index} className="tag">{symptom}</span>
                    ))}
                  </div>
                </div>
                {appointment.medications && (
                  <div>
                    <label>Current Medications</label>
                    <div className="tags">
                      {appointment.medications.map((med, index) => (
                        <span key={index} className="tag">{med}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal; 