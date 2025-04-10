import React, { useState } from 'react';
import { 
  FiEdit2, 
  FiX, 
  FiPlus, 
  FiAlertCircle,
  FiCheck,
  FiUser
} from 'react-icons/fi';
import './NutritionTracker.css';

const initialNutrients = [
  {
    id: 1,
    name: 'Protein',
    recommended: 75,
    current: 65,
    unit: 'g',
    doctor: 'Dr. Sarah Wilson',
    category: 'macronutrient',
    lastUpdated: '2024-01-15',
    notes: 'Increase intake through lean meats and legumes'
  },
  {
    id: 2,
    name: 'Iron',
    recommended: 18,
    current: 12,
    unit: 'mg',
    doctor: 'Dr. Michael Chen',
    category: 'mineral',
    lastUpdated: '2024-01-15',
    notes: 'Consider iron supplements if levels remain low'
  },
  {
    id: 3,
    name: 'Vitamin D',
    recommended: 800,
    current: 600,
    unit: 'IU',
    doctor: 'Dr. Sarah Wilson',
    category: 'vitamin',
    lastUpdated: '2024-01-15',
    notes: 'Increase sun exposure and fatty fish intake'
  }
];

const NutrientCard = ({ nutrient, onEdit }) => {
  const percentage = (nutrient.current / nutrient.recommended) * 100;
  const getStatusColor = () => {
    if (percentage >= 90) return '#059669'; // Good
    if (percentage >= 60) return '#F59E0B'; // Warning
    return '#DC2626'; // Alert
  };

  return (
    <div className="nutrient-card">
      <div className="nutrient-header">
        <div className="nutrient-title">
          <h3>{nutrient.name}</h3>
          <span className="category-badge">{nutrient.category}</span>
        </div>
        <button className="edit-button" onClick={() => onEdit(nutrient)}>
          <FiEdit2 />
        </button>
      </div>

      <div className="nutrient-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: getStatusColor()
            }}
          />
        </div>
        <div className="progress-labels">
          <span className="current">{nutrient.current}{nutrient.unit}</span>
          <span className="target">Target: {nutrient.recommended}{nutrient.unit}</span>
        </div>
      </div>

      <div className="doctor-info">
        <FiUser />
        <span>{nutrient.doctor}</span>
      </div>

      {percentage < 90 && (
        <div className="alert-message" style={{ color: getStatusColor() }}>
          <FiAlertCircle />
          <span>
            {percentage < 60 ? 'Deficiency Alert' : 'Below Recommended'}
          </span>
        </div>
      )}

      <div className="nutrient-notes">
        <p>{nutrient.notes}</p>
      </div>

      <div className="last-updated">
        Last updated: {new Date(nutrient.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
};

const NutrientEditModal = ({ nutrient, onSave, onClose }) => {
  const [editedNutrient, setEditedNutrient] = useState(nutrient);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editedNutrient,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Update {nutrient.name} Intake</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Intake ({nutrient.unit})</label>
            <input
              type="number"
              value={editedNutrient.current}
              onChange={(e) => setEditedNutrient({ 
                ...editedNutrient, 
                current: Number(e.target.value)
              })}
              required
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={editedNutrient.notes}
              onChange={(e) => setEditedNutrient({
                ...editedNutrient,
                notes: e.target.value
              })}
              rows={3}
            />
          </div>
          <div className="edit-modal-actions">
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

const NutritionTracker = () => {
  const [nutrients, setNutrients] = useState(initialNutrients);
  const [editingNutrient, setEditingNutrient] = useState(null);

  const handleEdit = (nutrient) => {
    setEditingNutrient(nutrient);
  };

  const handleSave = (updatedNutrient) => {
    setNutrients(nutrients.map(nutrient =>
      nutrient.id === updatedNutrient.id ? updatedNutrient : nutrient
    ));
    setEditingNutrient(null);
  };

  const calculateOverallStatus = () => {
    const average = nutrients.reduce((sum, nutrient) => {
      return sum + (nutrient.current / nutrient.recommended) * 100;
    }, 0) / nutrients.length;

    return {
      percentage: Math.round(average),
      status: average >= 90 ? 'Optimal' : average >= 60 ? 'Adequate' : 'Needs Attention'
    };
  };

  const status = calculateOverallStatus();

  return (
    <div className="nutrition-tracker">
      <div className="tracker-header">
        <div className="title-section">
          <h2>Nutrition Tracker</h2>
          <p>Monitor your daily nutrient intake</p>
        </div>
        <div className={`overall-status ${status.status.toLowerCase().replace(' ', '-')}`}>
          <span>{status.status}</span>
          <div className="status-percentage">{status.percentage}%</div>
        </div>
      </div>

      <div className="nutrients-grid">
        {nutrients.map(nutrient => (
          <NutrientCard
            key={nutrient.id}
            nutrient={nutrient}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {editingNutrient && (
        <NutrientEditModal
          nutrient={editingNutrient}
          onSave={handleSave}
          onClose={() => setEditingNutrient(null)}
        />
      )}
    </div>
  );
};

export default NutritionTracker; 