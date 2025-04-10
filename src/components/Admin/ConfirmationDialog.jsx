import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ 
  title, 
  message, 
  confirmLabel = 'Confirm',
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-dialog">
        <div className="dialog-icon">
          <FiAlertTriangle />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 