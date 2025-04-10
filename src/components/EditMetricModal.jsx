import React, { useState, useEffect } from 'react';
import './EditMetricModal.css';

const EditMetricModal = ({ isOpen, onClose, metric, onSave }) => {
  const [editedValue, setEditedValue] = useState('');
  const [editedSecondaryValue, setEditedSecondaryValue] = useState('');

  // Reset values when modal opens with new metric
  useEffect(() => {
    if (metric) {
      setEditedValue(metric.value);
      setEditedSecondaryValue(metric.secondaryValue || '');
    }
  }, [metric]);

  if (!isOpen || !metric) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...metric,
      value: editedValue,
      secondaryValue: editedSecondaryValue,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit {metric.title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="primaryValue">Primary Value ({metric.unit})</label>
            <input
              type="number"
              id="primaryValue"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              required
            />
          </div>
          {metric.secondaryValue && (
            <div className="form-group">
              <label htmlFor="secondaryValue">Secondary Value ({metric.unit})</label>
              <input
                type="number"
                id="secondaryValue"
                value={editedSecondaryValue}
                onChange={(e) => setEditedSecondaryValue(e.target.value)}
              />
            </div>
          )}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMetricModal; 