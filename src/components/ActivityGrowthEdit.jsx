import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import './ActivityGrowthEdit.css';

const ActivityGrowthEdit = ({ isOpen, onClose, onSave, currentDate, data }) => {
  const [editedDate, setEditedDate] = useState(currentDate);
  const [editedData, setEditedData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      date: editedDate,
      data: editedData
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Edit Activity Data</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </div>
          <div className="data-table">
            {editedData.map((item, index) => (
              <div key={index} className="data-row">
                <div className="data-cell">
                  <label>Date</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => {
                      const newData = [...editedData];
                      newData[index] = { ...item, date: e.target.value };
                      setEditedData(newData);
                    }}
                  />
                </div>
                <div className="data-cell">
                  <label>Weight</label>
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) => {
                      const newData = [...editedData];
                      newData[index] = { ...item, weight: Number(e.target.value) };
                      setEditedData(newData);
                    }}
                  />
                </div>
                <div className="data-cell">
                  <label>BMI</label>
                  <input
                    type="number"
                    value={item.bmi}
                    onChange={(e) => {
                      const newData = [...editedData];
                      newData[index] = { ...item, bmi: Number(e.target.value) };
                      setEditedData(newData);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="edit-modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              <FiX /> Cancel
            </button>
            <button type="submit" className="save-btn">
              <FiCheck /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityGrowthEdit; 