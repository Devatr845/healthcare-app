import React from 'react';
import { FiActivity } from 'react-icons/fi';
import './MedicalRecordCard.css';

const MedicalRecordCard = ({ record }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Diagnosis':
        return 'orange';
      case 'Surgery':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className={`medical-record-card ${getTypeColor(record.type)}`}>
      <div className="record-header">
        <div className="record-type">
          <FiActivity />
          <span>{record.type}</span>
        </div>
        <div className="record-date">
          {record.date}
        </div>
      </div>

      <h3 className="record-title">{record.title}</h3>

      <div className="record-details">
        <div className="detail-row">
          <span className="detail-label">DOCTOR</span>
          <span className="detail-value">{record.doctor}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">FACILITY</span>
          <span className="detail-value">{record.facility}</span>
        </div>
      </div>

      <p className="record-notes">{record.notes}</p>

      {record.priority && (
        <div className="priority-tag">
          <span>⚠️ High Priority Condition</span>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordCard; 