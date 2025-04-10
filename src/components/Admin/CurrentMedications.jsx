import React, { useState } from 'react';
import { FiClock, FiAlertCircle, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import './CurrentMedications.css';

const CurrentMedications = ({ patientId }) => {
  const [selectedFilter, setSelectedFilter] = useState('active');

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      prescribedBy: "Dr. Sarah Wilson",
      status: "active",
      adherence: 0.95,
      instructions: "Take with food in the morning",
      sideEffects: ["Dizziness", "Dry cough"],
      lastTaken: "2024-02-20 08:00",
      nextDose: "2024-02-21 08:00",
      refillsRemaining: 3,
      pharmacy: {
        name: "Central Pharmacy",
        phone: "+1 234-567-8900",
        address: "123 Health St"
      }
    },
    // Add more medications...
  ];

  return (
    <div className="medications-section">
      <div className="section-header">
        <h3>Current Medications</h3>
        <div className="medication-filters">
          <button 
            className={`filter-btn ${selectedFilter === 'active' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${selectedFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="medications-list">
        {medications.map(med => (
          <div key={med.id} className="medication-card">
            <div className="med-header">
              <div className="med-name-section">
                <h4>{med.name}</h4>
                <span className="dosage">{med.dosage}</span>
              </div>
              <div className="med-status">
                <span className={`adherence-badge ${getAdherenceLevel(med.adherence)}`}>
                  {(med.adherence * 100).toFixed(0)}% Adherence
                </span>
              </div>
            </div>

            <div className="med-details">
              <div className="detail-row">
                <FiClock />
                <span>{med.frequency}</span>
              </div>
              <div className="detail-row">
                <FiCalendar />
                <span>{formatDateRange(med.startDate, med.endDate)}</span>
              </div>
            </div>

            <div className="med-schedule">
              <div className="next-dose">
                <h5>Next Dose</h5>
                <time>{formatNextDose(med.nextDose)}</time>
              </div>
              <div className="refills">
                <h5>Refills Remaining</h5>
                <span>{med.refillsRemaining}</span>
              </div>
            </div>

            <div className="med-instructions">
              <p>{med.instructions}</p>
              {med.sideEffects.length > 0 && (
                <div className="side-effects">
                  <FiAlertCircle />
                  <span>Potential side effects: {med.sideEffects.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="med-actions">
              <button className="take-dose-btn">
                <FiCheck /> Take Dose
              </button>
              <button className="refill-btn">
                Request Refill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getAdherenceLevel = (adherence) => {
  if (adherence >= 0.9) return 'high';
  if (adherence >= 0.7) return 'medium';
  return 'low';
};

const formatDateRange = (start, end) => {
  return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
};

const formatNextDose = (nextDose) => {
  return new Date(nextDose).toLocaleString();
};

export default CurrentMedications; 