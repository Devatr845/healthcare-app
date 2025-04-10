import React, { useState, useEffect } from 'react';
import { 
  FiClock, FiEdit2, FiTrash2, FiPlus, FiCheck, FiX, 
  FiAlertCircle, FiInfo, FiCalendar, FiChevronDown, FiChevronUp 
} from 'react-icons/fi';
import './MedicationReminder.css';

// Define priority colors
const PRIORITY_COLORS = {
  high: 'rgba(254, 226, 226, 0.7)', // Light red with transparency
  medium: 'rgba(254, 243, 199, 0.7)', // Light yellow with transparency
  low: 'rgba(220, 252, 231, 0.7)', // Light green with transparency
};

// Define priority text colors
const PRIORITY_TEXT_COLORS = {
  high: '#DC2626', // Red
  medium: '#D97706', // Amber
  low: '#059669', // Green
};

const initialMedications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    time: "08:00",
    frequency: "Daily",
    priority: "high",
    description: "For blood pressure control",
    sideEffects: "Dizziness, headache, dry cough",
    doctorNote: "Take with food to reduce stomach upset",
    status: "upcoming",
    history: [
      { date: "2023-06-01", status: "taken" },
      { date: "2023-06-02", status: "taken" },
      { date: "2023-06-03", status: "missed" },
      { date: "2023-06-04", status: "taken" },
    ]
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    time: "12:30",
    frequency: "Twice daily",
    priority: "medium",
    description: "For blood sugar management",
    sideEffects: "Nausea, diarrhea, stomach pain",
    doctorNote: "Take with meals to minimize side effects",
    status: "taken",
    history: [
      { date: "2023-06-01", status: "taken" },
      { date: "2023-06-02", status: "taken" },
      { date: "2023-06-03", status: "taken" },
      { date: "2023-06-04", status: "taken" },
    ]
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: "1000 IU",
    time: "09:00",
    frequency: "Daily",
    priority: "low",
    description: "For bone health and immune support",
    sideEffects: "Rarely causes side effects at recommended doses",
    doctorNote: "Take with a meal containing fat for better absorption",
    status: "missed",
    history: [
      { date: "2023-06-01", status: "taken" },
      { date: "2023-06-02", status: "missed" },
      { date: "2023-06-03", status: "taken" },
      { date: "2023-06-04", status: "missed" },
    ]
  }
];

const MedicationCard = ({ medication, onToggle, onEdit }) => {
  const formattedTime = medication.takenAt 
    ? new Date(medication.takenAt).toLocaleTimeString()
    : null;

  return (
    <div 
      className="medication-card"
      style={{ backgroundColor: PRIORITY_COLORS[medication.priority] }}
    >
      <div className="medication-info">
        <div className="medication-header">
          <h3>{medication.name}</h3>
          <button className="edit-button" onClick={() => onEdit(medication)}>
            <FiEdit2 />
          </button>
        </div>
        <p className="dosage">{medication.dosage}</p>
        <div className="scheduled-time">
          <FiClock />
          <span>{medication.time}</span>
        </div>
        <div 
          className="priority-badge"
          style={{ color: PRIORITY_TEXT_COLORS[medication.priority] }}
        >
          {medication.priority} priority
        </div>
      </div>
      <div className="medication-status">
        <button 
          className={`status-toggle ${medication.taken ? 'taken' : ''}`}
          onClick={() => onToggle(medication.id)}
        >
          {medication.taken ? <FiCheck /> : <FiX />}
          {medication.taken ? 'Taken' : 'Not Taken'}
        </button>
        {medication.takenAt && (
          <p className="taken-time">Taken at {formattedTime}</p>
        )}
      </div>
    </div>
  );
};

const MedicationForm = ({ medication, onSave, onClose, isNew = false }) => {
  const [editedMed, setEditedMed] = useState(
    medication || {
      id: Date.now(), // Generate new ID for new medications
      name: '',
      dosage: '',
      time: '08:00',
      priority: 'low',
      taken: false,
      takenAt: null,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedMed);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>{isNew ? 'Add New Medication' : 'Edit Medication'}</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Medication Name</label>
            <input
              type="text"
              value={editedMed.name}
              onChange={(e) => setEditedMed({ ...editedMed, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Dosage</label>
            <input
              type="text"
              value={editedMed.dosage}
              onChange={(e) => setEditedMed({ ...editedMed, dosage: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={editedMed.time}
              onChange={(e) => setEditedMed({ ...editedMed, time: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={editedMed.priority}
              onChange={(e) => setEditedMed({ ...editedMed, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="edit-modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {isNew ? 'Add Medication' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MedicationReminder = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState(null);

  // Form state for adding/editing medication
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    time: '',
    frequency: 'Daily',
    priority: 'medium',
    description: '',
    sideEffects: '',
    doctorNote: ''
  });

  // Reset form data when modal closes
  useEffect(() => {
    if (!isAddModalOpen && !isEditModalOpen) {
      setFormData({
        name: '',
        dosage: '',
        time: '',
        frequency: 'Daily',
        priority: 'medium',
        description: '',
        sideEffects: '',
        doctorNote: ''
      });
    }
  }, [isAddModalOpen, isEditModalOpen]);

  // Load form data when editing
  useEffect(() => {
    if (currentMedication && isEditModalOpen) {
      setFormData({
        name: currentMedication.name,
        dosage: currentMedication.dosage,
        time: currentMedication.time,
        frequency: currentMedication.frequency,
        priority: currentMedication.priority,
        description: currentMedication.description || '',
        sideEffects: currentMedication.sideEffects || '',
        doctorNote: currentMedication.doctorNote || ''
      });
    }
  }, [currentMedication, isEditModalOpen]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for adding new medication
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const newMedication = {
      id: Date.now(),
      ...formData,
      status: 'upcoming',
      history: []
    };
    
    setMedications([...medications, newMedication]);
    setIsAddModalOpen(false);
    showNotification('Medication added successfully!');
  };

  // Handle form submission for editing medication
  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const updatedMedications = medications.map(med => 
      med.id === currentMedication.id ? { ...med, ...formData } : med
    );
    
    setMedications(updatedMedications);
    setIsEditModalOpen(false);
    setCurrentMedication(null);
    showNotification('Medication updated successfully!');
  };

  // Handle medication deletion
  const handleDelete = (id) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    showNotification('Medication deleted successfully!');
  };

  // Handle medication status change
  const handleStatusChange = (id, newStatus) => {
    const updatedMedications = medications.map(med => {
      if (med.id === id) {
        // Add to history
        const today = new Date().toISOString().split('T')[0];
        const updatedHistory = [...med.history, { date: today, status: newStatus }];
        
        return {
          ...med,
          status: newStatus,
          history: updatedHistory
        };
      }
      return med;
    });
    
    setMedications(updatedMedications);
    showNotification(`Medication marked as ${newStatus}!`);
  };

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filter medications based on status
  const filteredMedications = filter === 'all' 
    ? medications 
    : medications.filter(med => med.status === filter);

  // Toggle card expansion
  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="medication-reminder-container">
      <div className="medication-header">
        <h2 className="section-title">Medication Reminder</h2>
        <div className="filter-controls">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-button ${filter === 'taken' ? 'active' : ''}`}
            onClick={() => setFilter('taken')}
          >
            Taken
          </button>
          <button 
            className={`filter-button ${filter === 'missed' ? 'active' : ''}`}
            onClick={() => setFilter('missed')}
          >
            Missed
          </button>
        </div>
      </div>

      <div className="medications-list">
        {filteredMedications.length === 0 ? (
          <div className="no-medications">
            <p>No medications found. Add a new medication to get started.</p>
          </div>
        ) : (
          filteredMedications.map(medication => (
            <div 
            key={medication.id}
              className={`medication-card ${medication.status} ${expandedCard === medication.id ? 'expanded' : ''}`}
              style={{ 
                backgroundColor: PRIORITY_COLORS[medication.priority],
                borderLeft: `4px solid ${PRIORITY_TEXT_COLORS[medication.priority]}`
              }}
            >
              <div className="medication-card-header" onClick={() => toggleCardExpansion(medication.id)}>
                <div className="medication-info">
                  <h3 className="medication-name">{medication.name}</h3>
                  <p className="medication-dosage">{medication.dosage}</p>
                  <span 
                    className="priority-indicator"
                    style={{ color: PRIORITY_TEXT_COLORS[medication.priority] }}
                  >
                    {medication.priority} priority
                  </span>
                </div>
                <div className="medication-time">
                  <FiClock className="time-icon" />
                  <span>{medication.time}</span>
                </div>
                <div className="card-actions">
                  <button 
                    className="expand-button"
                    aria-label={expandedCard === medication.id ? "Collapse details" : "Expand details"}
                  >
                    {expandedCard === medication.id ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              </div>

              <div className="medication-status-indicator">
                <div className="status-label">
                  {medication.status === 'taken' && <span className="status taken"><FiCheck /> Taken</span>}
                  {medication.status === 'missed' && <span className="status missed"><FiX /> Missed</span>}
                  {medication.status === 'upcoming' && <span className="status upcoming"><FiClock /> Upcoming</span>}
                </div>
                <div className="status-progress">
                  <div 
                    className={`progress-bar ${medication.status}`}
                    style={{ width: medication.status === 'taken' ? '100%' : (medication.status === 'missed' ? '100%' : '0%') }}
                  ></div>
                </div>
              </div>

              {expandedCard === medication.id && (
                <div className="medication-details">
                  <div className="detail-item">
                    <span className="detail-label"><FiCalendar /> Frequency:</span>
                    <span className="detail-value">{medication.frequency}</span>
                  </div>
                  
                  {medication.description && (
                    <div className="detail-item">
                      <span className="detail-label"><FiInfo /> Description:</span>
                      <span className="detail-value">{medication.description}</span>
                    </div>
                  )}
                  
                  {medication.sideEffects && (
                    <div className="detail-item">
                      <span className="detail-label"><FiAlertCircle /> Side Effects:</span>
                      <span className="detail-value">{medication.sideEffects}</span>
                    </div>
                  )}
                  
                  {medication.doctorNote && (
                    <div className="detail-item">
                      <span className="detail-label"><FiInfo /> Doctor's Note:</span>
                      <span className="detail-value">{medication.doctorNote}</span>
                    </div>
                  )}
                  
                  <div className="medication-actions">
                    {medication.status !== 'taken' && (
                      <button 
                        className="action-button take-now"
                        onClick={() => handleStatusChange(medication.id, 'taken')}
                      >
                        <FiCheck /> Take Now
                      </button>
                    )}
                    
                    {medication.status !== 'missed' && (
                      <button 
                        className="action-button mark-missed"
                        onClick={() => handleStatusChange(medication.id, 'missed')}
                      >
                        <FiX /> Mark Missed
                      </button>
                    )}
                    
                    <button 
                      className="action-button edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentMedication(medication);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit2 /> Edit
                    </button>
                    
                    <button 
                      className="action-button delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(medication.id);
                      }}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button 
        className="add-medication-button"
        onClick={() => setIsAddModalOpen(true)}
        aria-label="Add new medication"
      >
        <FiPlus />
        <span>Add Medication</span>
      </button>

      {/* Add Medication Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Medication</h3>
              <button 
                className="close-button" 
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="medication-form">
              <div className="form-group">
                <label htmlFor="name">Medication Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter medication name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dosage">Dosage</label>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 10mg"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="frequency">Frequency</label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of medication"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sideEffects">Side Effects</label>
                <input
                  type="text"
                  id="sideEffects"
                  name="sideEffects"
                  value={formData.sideEffects}
                  onChange={handleInputChange}
                  placeholder="Potential side effects"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="doctorNote">Doctor's Note</label>
                <textarea
                  id="doctorNote"
                  name="doctorNote"
                  value={formData.doctorNote}
                  onChange={handleInputChange}
                  placeholder="Additional notes from your doctor"
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Medication Modal */}
      {isEditModalOpen && currentMedication && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Medication</h3>
              <button 
                className="close-button" 
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="medication-form">
              <div className="form-group">
                <label htmlFor="edit-name">Medication Name*</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter medication name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-dosage">Dosage*</label>
                  <input
                    type="text"
                    id="edit-dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 10mg"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-time">Time*</label>
                  <input
                    type="time"
                    id="edit-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-frequency">Frequency*</label>
                  <select
                    id="edit-frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-priority">Priority*</label>
                  <select
                    id="edit-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <input
                  type="text"
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of medication"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-sideEffects">Side Effects</label>
                <input
                  type="text"
                  id="edit-sideEffects"
                  name="sideEffects"
                  value={formData.sideEffects}
                  onChange={handleInputChange}
                  placeholder="Potential side effects"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-doctorNote">Doctor's Note</label>
                <textarea
                  id="edit-doctorNote"
                  name="doctorNote"
                  value={formData.doctorNote}
                  onChange={handleInputChange}
                  placeholder="Additional notes from your doctor"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Update Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default MedicationReminder; 