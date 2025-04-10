import React, { useState } from 'react';
import { 
  FiChevronDown, FiChevronUp, FiPrinter, FiDownload, 
  FiRefreshCw, FiTrash2, FiClock, FiUser, FiMapPin 
} from 'react-icons/fi';

const PrescriptionHistoryCard = ({ prescription, onReprescribe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'discontinued':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'expired':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="prescription-history-card">
      <div className="history-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="history-basic-info">
          <div className="history-date">
            <FiClock />
            <span>{new Date(prescription.startDate).toLocaleDateString()}</span>
          </div>
          <h4>{prescription.medication}</h4>
          <div className="history-doctor">
            <FiUser />
            <span>{prescription.doctor}</span>
          </div>
          <div className="history-facility">
            <FiMapPin />
            <span>{prescription.facility}</span>
          </div>
        </div>
        
        <div className="history-card-actions">
          <span className={`status-badge ${getStatusColor(prescription.status)}`}>
            {prescription.status}
          </span>
          <button className="icon-btn" onClick={(e) => {
            e.stopPropagation();
            onReprescribe(prescription);
          }}>
            <FiRefreshCw /> Re-prescribe
          </button>
          <button className="expand-btn">
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="history-card-details">
          <div className="details-grid">
            <div className="detail-item">
              <label>Dosage & Instructions</label>
              <span>{prescription.dosage}, {prescription.frequency}</span>
            </div>
            <div className="detail-item">
              <label>Duration</label>
              <span>{prescription.duration || 'Not specified'}</span>
            </div>
            {prescription.notes && (
              <div className="detail-item full-width">
                <label>Doctor's Notes</label>
                <p className="notes">{prescription.notes}</p>
              </div>
            )}
            {prescription.sideEffects && (
              <div className="detail-item">
                <label>Side Effects</label>
                <ul className="warnings-list">
                  {prescription.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="detail-item full-width">
              <label>Pharmacy Information</label>
              <div className="pharmacy-info">
                <p>{prescription.pharmacy.name}</p>
                <p>{prescription.pharmacy.phone}</p>
                <p>{prescription.pharmacy.address}</p>
              </div>
            </div>
          </div>

          <div className="history-card-footer">
            <button className="action-btn">
              <FiPrinter /> Print
            </button>
            <button className="action-btn">
              <FiDownload /> Download
            </button>
            <button className="action-btn warning">
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistoryCard; 