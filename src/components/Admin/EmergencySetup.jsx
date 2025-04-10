import React, { useState, useEffect } from 'react';
import { 
  FiPhone, FiUser, FiHeart, FiAlertTriangle, 
  FiSettings, FiToggleRight, FiToggleLeft, FiSave
} from 'react-icons/fi';
import './EmergencySetup.css';

const EmergencySetup = ({ patientId, onSave }) => {
  const [formData, setFormData] = useState({
    patientPhone: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    preferredDoctor: '',
    preferredDepartment: '',
    enableAlerts: true,
    thresholds: {
      heartRate: { min: 40, max: 150 },
      oxygenLevel: { min: 85, max: 100 },
      bloodPressure: { 
        systolic: { min: 90, max: 180 },
        diastolic: { min: 60, max: 110 }
      },
      temperature: { min: 35, max: 39 }
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showThresholds, setShowThresholds] = useState(false);

  // Simulate loading patient data
  useEffect(() => {
    // In a real app, this would be an API call
    if (patientId) {
      // Mock data - would come from API
      const mockPatientData = {
        patientPhone: '+1 (555) 123-4567',
        emergencyContact: {
          name: 'Jane Smith',
          relation: 'Spouse',
          phone: '+1 (555) 987-6543'
        },
        preferredDoctor: 'Dr. Michael Chen',
        preferredDepartment: 'Cardiology',
        enableAlerts: true,
        thresholds: {
          heartRate: { min: 45, max: 160 },
          oxygenLevel: { min: 80, max: 100 },
          bloodPressure: { 
            systolic: { min: 90, max: 170 },
            diastolic: { min: 55, max: 100 }
          },
          temperature: { min: 36, max: 38.5 }
        }
      };
      
      setFormData(mockPatientData);
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleToggleAlerts = () => {
    setFormData({
      ...formData,
      enableAlerts: !formData.enableAlerts
    });
  };

  const handleThresholdChange = (metric, type, value) => {
    let newValue = parseFloat(value);
    
    setFormData({
      ...formData,
      thresholds: {
        ...formData.thresholds,
        [metric]: metric === 'bloodPressure' 
          ? {
              ...formData.thresholds[metric],
              [type.split('.')[0]]: {
                ...formData.thresholds[metric][type.split('.')[0]],
                [type.split('.')[1]]: newValue
              }
            }
          : {
              ...formData.thresholds[metric],
              [type]: newValue
            }
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Here you would make an API call to save the data
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      if (onSave) onSave(formData);
    }, 800);
  };

  return (
    <div className="emergency-setup-container">
      <div className="emergency-setup-header">
        <h2><FiAlertTriangle /> Emergency Setup</h2>
        {!isEditing ? (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button 
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <div className="emergency-setup-content">
        <div className="emergency-setup-section">
          <h3><FiPhone /> Patient Contact</h3>
          <div className="form-group">
            <label>Patient Phone Number</label>
            <input 
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="e.g. +1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="emergency-setup-section">
          <h3><FiUser /> Emergency Contact</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Name</label>
              <input 
                type="text"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <label>Relationship</label>
              <input 
                type="text"
                name="emergencyContact.relation"
                value={formData.emergencyContact.relation}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g. Spouse, Parent"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Contact Phone Number</label>
            <input 
              type="tel"
              name="emergencyContact.phone"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="e.g. +1 (555) 987-6543"
            />
          </div>
        </div>

        <div className="emergency-setup-section">
          <h3><FiHeart /> Preferred Medical Team</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Preferred Doctor</label>
              <input 
                type="text"
                name="preferredDoctor"
                value={formData.preferredDoctor}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Doctor's name"
              />
            </div>
            <div className="form-group">
              <label>Preferred Department</label>
              <select
                name="preferredDepartment"
                value={formData.preferredDepartment}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Emergency">Emergency</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Radiology">Radiology</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>
          </div>
        </div>

        <div className="emergency-setup-section">
          <h3><FiSettings /> Alert Settings</h3>
          <div className="toggle-row">
            <span>Enable Smart Emergency Alerts</span>
            <button 
              className={`toggle-btn ${formData.enableAlerts ? 'active' : ''}`}
              onClick={handleToggleAlerts}
              disabled={!isEditing}
            >
              {formData.enableAlerts ? <FiToggleRight /> : <FiToggleLeft />}
            </button>
          </div>

          {formData.enableAlerts && (
            <div className="thresholds-section">
              <button 
                className="threshold-toggle"
                onClick={() => setShowThresholds(!showThresholds)}
              >
                {showThresholds ? 'Hide Alert Thresholds' : 'Show Alert Thresholds'}
              </button>
              
              {showThresholds && (
                <div className="thresholds-container">
                  <div className="threshold-item">
                    <h4>Heart Rate (bpm)</h4>
                    <div className="threshold-inputs">
                      <div className="threshold-input">
                        <label>Min</label>
                        <input 
                          type="number"
                          value={formData.thresholds.heartRate.min}
                          onChange={(e) => handleThresholdChange('heartRate', 'min', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="threshold-input">
                        <label>Max</label>
                        <input 
                          type="number"
                          value={formData.thresholds.heartRate.max}
                          onChange={(e) => handleThresholdChange('heartRate', 'max', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="threshold-item">
                    <h4>Oxygen Level (%)</h4>
                    <div className="threshold-inputs">
                      <div className="threshold-input">
                        <label>Min</label>
                        <input 
                          type="number"
                          value={formData.thresholds.oxygenLevel.min}
                          onChange={(e) => handleThresholdChange('oxygenLevel', 'min', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="threshold-input">
                        <label>Max</label>
                        <input 
                          type="number"
                          value={formData.thresholds.oxygenLevel.max}
                          onChange={(e) => handleThresholdChange('oxygenLevel', 'max', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="threshold-item">
                    <h4>Blood Pressure (mmHg)</h4>
                    <div className="threshold-inputs">
                      <div className="threshold-input">
                        <label>Systolic Min</label>
                        <input 
                          type="number"
                          value={formData.thresholds.bloodPressure.systolic.min}
                          onChange={(e) => handleThresholdChange('bloodPressure', 'systolic.min', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="threshold-input">
                        <label>Systolic Max</label>
                        <input 
                          type="number"
                          value={formData.thresholds.bloodPressure.systolic.max}
                          onChange={(e) => handleThresholdChange('bloodPressure', 'systolic.max', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="threshold-inputs">
                      <div className="threshold-input">
                        <label>Diastolic Min</label>
                        <input 
                          type="number"
                          value={formData.thresholds.bloodPressure.diastolic.min}
                          onChange={(e) => handleThresholdChange('bloodPressure', 'diastolic.min', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="threshold-input">
                        <label>Diastolic Max</label>
                        <input 
                          type="number"
                          value={formData.thresholds.bloodPressure.diastolic.max}
                          onChange={(e) => handleThresholdChange('bloodPressure', 'diastolic.max', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="threshold-item">
                    <h4>Temperature (°C)</h4>
                    <div className="threshold-inputs">
                      <div className="threshold-input">
                        <label>Min</label>
                        <input 
                          type="number"
                          step="0.1"
                          value={formData.thresholds.temperature.min}
                          onChange={(e) => handleThresholdChange('temperature', 'min', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="threshold-input">
                        <label>Max</label>
                        <input 
                          type="number"
                          step="0.1"
                          value={formData.thresholds.temperature.max}
                          onChange={(e) => handleThresholdChange('temperature', 'max', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="emergency-setup-footer">
            <button 
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button 
              className="save-btn"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? <span>Saving...</span> : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencySetup; 