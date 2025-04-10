import React from 'react';
import { FiX, FiInfo, FiMessageSquare, FiFileText, FiAlertCircle } from 'react-icons/fi';
import './ResultsPage.css';

const InfoCard = ({ test, onClose }) => {
  if (!test) return null;

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="info-card">
      <div className="info-card-header">
        <h3 className="info-card-title">
          <FiInfo aria-hidden="true" /> {test.name} Information
        </h3>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close information"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="info-card-content">
        <div className="info-section">
          <h4 className="info-section-title">
            <FiFileText aria-hidden="true" /> Test Details
          </h4>
          <div className="info-section-content">
            <p><strong>Test ID:</strong> {test.id}</p>
            <p><strong>Date:</strong> {formatDate(test.date)}</p>
            <p><strong>Doctor:</strong> {test.doctor}</p>
            <p><strong>Status:</strong> {test.status}</p>
            <p><strong>Type:</strong> {test.type}</p>
          </div>
        </div>

        {test.comments && (
          <div className="info-section">
            <h4 className="info-section-title">
              <FiMessageSquare aria-hidden="true" /> Doctor's Comments
            </h4>
            <div className="info-section-content">
              <p>{test.comments}</p>
            </div>
          </div>
        )}

        {test.additionalInfo && (
          <div className="info-section">
            <h4 className="info-section-title">
              <FiAlertCircle aria-hidden="true" /> Additional Information
            </h4>
            <div className="info-section-content">
              {test.additionalInfo.map((info, index) => (
                <p key={index}>{info}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard; 