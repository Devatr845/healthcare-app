import React, { useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import './EmergencyAppointmentModal.css';

const EmergencyAppointmentModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    reason: '',
    priority: 'high',
    preferredDoctor: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="emergency-modal">
        <div className="modal-header">
          <div className="header-title">
            <FiAlertCircle className="emergency-icon" />
            <h3>Emergency Appointment Request</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Contact Number *</label>
            <input
              type="tel"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Reason for Emergency *</label>
            <textarea
              required
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Priority Level</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Doctor (if any)</label>
            <input
              type="text"
              value={formData.preferredDoctor}
              onChange={(e) => setFormData({...formData, preferredDoctor: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Emergency Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyAppointmentModal; 