import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';

const AddPrescriptionModal = ({ isOpen, onClose, onSubmit, patient, prefillData }) => {
  const [prescriptionData, setPrescriptionData] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: '',
    pharmacy: {
      name: '',
      phone: '',
      address: ''
    },
    refills: 0
  });

  useEffect(() => {
    if (prefillData) {
      setPrescriptionData({
        medication: prefillData.medication || '',
        dosage: prefillData.dosage || '',
        frequency: prefillData.frequency || '',
        startDate: prefillData.startDate || '',
        endDate: prefillData.endDate || '',
        notes: prefillData.notes || '',
        pharmacy: prefillData.pharmacy || {
          name: '',
          phone: '',
          address: ''
        },
        refills: prefillData.refills || 0,
        sideEffects: prefillData.sideEffects || [],
        interactions: prefillData.interactions || []
      });
    }
  }, [prefillData]);

  const resetForm = () => {
    setPrescriptionData({
      medication: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      notes: '',
      pharmacy: {
        name: '',
        phone: '',
        address: ''
      },
      refills: 0
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('pharmacy.')) {
      const pharmacyField = name.split('.')[1];
      setPrescriptionData(prev => ({
        ...prev,
        pharmacy: {
          ...prev.pharmacy,
          [pharmacyField]: value
        }
      }));
    } else {
      setPrescriptionData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...prescriptionData,
      id: `RX-${Date.now()}`,
      status: 'active',
      doctor: "Dr. Current User", // Replace with actual logged-in doctor
      adherence: 100,
      lastRefill: prescriptionData.startDate,
      nextRefillDate: calculateNextRefillDate(prescriptionData.startDate)
    });
    onClose();
  };

  const calculateNextRefillDate = (startDate) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Prescription</h3>
          <button className="close-btn" onClick={handleClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Medication</label>
              <input
                type="text"
                name="medication"
                value={prescriptionData.medication}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                name="dosage"
                value={prescriptionData.dosage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                value={prescriptionData.frequency}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <div className="date-input">
                <FiCalendar />
                <input
                  type="date"
                  name="startDate"
                  value={prescriptionData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>End Date</label>
              <div className="date-input">
                <FiCalendar />
                <input
                  type="date"
                  name="endDate"
                  value={prescriptionData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Refills</label>
              <input
                type="number"
                name="refills"
                value={prescriptionData.refills}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={prescriptionData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="pharmacy-section">
            <h4>Pharmacy Details</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Pharmacy Name</label>
                <input
                  type="text"
                  name="pharmacy.name"
                  value={prescriptionData.pharmacy.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="pharmacy.phone"
                  value={prescriptionData.pharmacy.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="pharmacy.address"
                  value={prescriptionData.pharmacy.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrescriptionModal; 