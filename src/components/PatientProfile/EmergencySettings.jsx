import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiPhone, FiMail, FiMapPin, FiInfo, FiCheck, FiPlus, FiTrash2, FiAlertCircle, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaHeartbeat, FaHospital, FaUserMd, FaAllergies, FaPills, FaNotesMedical } from 'react-icons/fa';
import { emergencyService } from '../../services/emergencyService';
import './EmergencySettings.css';

const EmergencySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showLocationConsent, setShowLocationConsent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [phoneToVerify, setPhoneToVerify] = useState('');
  const [currentContactIndex, setCurrentContactIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    personalInfo: {
      phone: '',
      isPhoneVerified: false,
      email: '',
      address: '',
      location_tracking: false
    },
    emergencyContacts: [{
      name: '',
      relationship: '',
      phone: '',
      email: '',
      isVerified: false
    }],
    medicalInfo: {
      allergies: '',
      medications: '',
      conditions: '',
      bloodType: '',
      organDonor: false,
      dnr: false
    },
    alertSettings: {
      heartRate: {
        enabled: false,
        min: 60,
        max: 100
      },
      bloodPressure: {
        enabled: true,
        systolicMin: 90,
        systolicMax: 140,
        diastolicMin: 60,
        diastolicMax: 90
      },
      oxygenLevel: {
        enabled: true,
        min: 95
      },
      temperature: {
        enabled: true,
        min: 36.1,
        max: 37.8
      }
    },
    emergencyInstructions: '',
    preferredHospital: '',
    preferredDoctor: '',
    contactMethods: {
      sms: true,
      email: true,
      call: true
    }
  });

  // New state for form validation and progress
  const [validationErrors, setValidationErrors] = useState({});
  const [completionProgress, setCompletionProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    emergency: true,
    medical: true,
    alerts: true
  });

  // Common medical conditions for quick add
  const commonAllergies = [
    'Penicillin', 'Peanuts', 'Shellfish', 'Eggs', 'Soy', 'Wheat', 'Dairy', 'Latex'
  ];
  
  const commonMedications = [
    'Aspirin', 'Ibuprofen', 'Metformin', 'Lisinopril', 'Atorvastatin', 'Levothyroxine', 'Albuterol', 'Insulin'
  ];
  
  const commonConditions = [
    'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Arthritis', 'Depression', 'Anxiety', 'Sleep Apnea'
  ];

  useEffect(() => {
    // Simulate loading saved data
    const loadSavedData = async () => {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example data - replace with actual API call
      const savedData = {
        personalInfo: {
          phone: '+1234567890',
          isPhoneVerified: true,
          email: 'patient@example.com',
          address: '123 Health St',
          location_tracking: true
        },
        // ... rest of the mock data
      };
      
      setFormData(prevData => ({
        ...prevData,
        ...savedData
      }));
      setIsLoading(false);
    };

    loadSavedData();
  }, []);

  // Calculate form completion progress
  useEffect(() => {
    const calculateProgress = () => {
      const requiredFields = {
        personal: ['phone', 'email', 'address'],
        emergency: formData.emergencyContacts.map((_, index) => [
          `contact${index}_name`,
          `contact${index}_phone`
        ]).flat(),
        medical: ['allergies', 'medications', 'conditions', 'bloodType']
      };

      let completedFields = 0;
      let totalFields = 0;

      // Check personal info
      requiredFields.personal.forEach(field => {
        totalFields++;
        if (formData.personalInfo[field]) completedFields++;
      });

      // Check emergency contacts
      requiredFields.emergency.forEach(field => {
        totalFields++;
        const [section, index, key] = field.split('_');
        if (formData.emergencyContacts[index]?.[key]) completedFields++;
      });

      // Check medical info
      requiredFields.medical.forEach(field => {
        totalFields++;
        if (formData.medicalInfo[field]) completedFields++;
      });

      return Math.round((completedFields / totalFields) * 100);
    };

    const progress = calculateProgress();
    setCompletionProgress(progress);
  }, [formData]);

  // Form validation
  const validateField = (value, type) => {
    switch (type) {
      case 'phone':
        return /^\+?[\d\s-]{10,}$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      default:
        return value.length > 0;
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    // Update form data
    setFormData(prevData => {
      let newData = { ...prevData };
      
      if (index !== null && section === 'emergencyContacts') {
        newData.emergencyContacts[index] = {
          ...newData.emergencyContacts[index],
          [field]: value
        };
      } else if (section) {
        newData[section] = {
          ...newData[section],
          [field]: value
        };
      } else {
        newData[field] = value;
      }
      
      return newData;
    });

    // Validate field
    const isValid = validateField(value, field);
    setValidationErrors(prev => ({
      ...prev,
      [`${section}_${field}${index !== null ? '_' + index : ''}`]: !isValid
    }));

    // Auto-save after delay
    if (isEditing) {
      setSaveStatus('typing');
      const timeoutId = setTimeout(() => {
        handleAutoSave();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleAutoSave = async () => {
    setSaveStatus('saving');
    try {
      await emergencyService.updateSettings(formData);
      setSaveStatus('saved');
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleVerifyPhone = (phone, isEmergencyContact = false, index = null) => {
    setPhoneToVerify(phone);
    setCurrentContactIndex(isEmergencyContact ? index : null);
    setShowVerification(true);
  };

  const handleVerificationSubmit = () => {
    // Simulate verification API call
    setTimeout(() => {
      if (currentContactIndex !== null) {
        setFormData(prevData => {
          const updatedContacts = [...prevData.emergencyContacts];
          updatedContacts[currentContactIndex] = {
            ...updatedContacts[currentContactIndex],
            isVerified: true
          };
          return {
            ...prevData,
            emergencyContacts: updatedContacts
          };
        });
      } else {
        setFormData(prevData => ({
          ...prevData,
          personalInfo: {
            ...prevData.personalInfo,
            isPhoneVerified: true
          }
        }));
      }
      
      setShowVerification(false);
      setVerificationCode('');
      setCurrentContactIndex(null);
    }, 1000);
  };

  const handleLocationConsent = () => {
    setShowLocationConsent(true);
  };

  const handleLocationConsentResponse = (accepted) => {
    setFormData(prevData => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        location_tracking: accepted
      }
    }));
    setShowLocationConsent(false);
  };

  const addEmergencyContact = () => {
    setFormData(prevData => ({
      ...prevData,
      emergencyContacts: [
        ...prevData.emergencyContacts,
        {
          name: '',
          relationship: '',
          phone: '',
          email: '',
          isVerified: false
        }
      ]
    }));
  };

  const removeEmergencyContact = (index) => {
    setFormData(prevData => ({
      ...prevData,
      emergencyContacts: prevData.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  // Quick add functions
  const addQuickItem = (type, item) => {
    if (type === 'allergies') {
      const currentAllergies = formData.medicalInfo.allergies.split(',').map(a => a.trim()).filter(a => a);
      if (!currentAllergies.includes(item)) {
        const newAllergies = [...currentAllergies, item].join(', ');
        handleInputChange('medicalInfo', 'allergies', newAllergies);
      }
    } else if (type === 'medications') {
      const currentMeds = formData.medicalInfo.medications.split(',').map(m => m.trim()).filter(m => m);
      if (!currentMeds.includes(item)) {
        const newMeds = [...currentMeds, item].join(', ');
        handleInputChange('medicalInfo', 'medications', newMeds);
      }
    } else if (type === 'conditions') {
      const currentConditions = formData.medicalInfo.conditions.split(',').map(c => c.trim()).filter(c => c);
      if (!currentConditions.includes(item)) {
        const newConditions = [...currentConditions, item].join(', ');
        handleInputChange('medicalInfo', 'conditions', newConditions);
      }
    }
  };

  return (
    <div className="emergency-settings-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionProgress}%` }}
            role="progressbar"
            aria-valuenow={completionProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="progress-label">
          <span>Profile Completion</span>
          <span>{completionProgress}%</span>
        </div>
      </div>

      <div className="emergency-settings-header">
        <h2>Emergency Settings</h2>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FiEdit2 /> Edit
          </button>
        ) : (
          <div className="button-group">
            <button className="save-btn" onClick={handleSave} disabled={isSaving}>
              <FiSave /> {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              <FiX /> Cancel
            </button>
          </div>
        )}
      </div>

      {saveStatus === 'saving' && (
        <div className="save-indicator">
          <FiSave /> Saving changes...
        </div>
      )}
      {saveStatus === 'saved' && (
        <div className="save-indicator success">
          <FiCheck /> Changes saved
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="save-indicator error">
          <FiAlertCircle /> Error saving changes
        </div>
      )}

      <div className="emergency-settings-content">
        {/* Personal Information Section */}
        <section className="settings-section">
          <h3 
            onClick={() => toggleSection('personal')} 
            aria-expanded={expandedSections.personal}
            role="button"
            tabIndex="0"
          >
            {expandedSections.personal ? <FiChevronDown /> : <FiChevronRight />} Personal Information
          </h3>
          
          {expandedSections.personal && (
            <>
              <div className="form-group">
                <label>
                  <FiPhone /> Phone Number
                  <span 
                    className="info-tooltip" 
                    data-tooltip="Used for emergency notifications and alerts"
                    aria-label="Phone number is used for emergency notifications and alerts"
                  >
                    <FiInfo />
                  </span>
                  {formData.personalInfo.isPhoneVerified && (
                    <span className="verified-badge"><FiCheck /> Verified</span>
                  )}
                </label>
                <div className="input-group">
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    disabled={!isEditing}
                    className={validationErrors.personalInfo_phone ? 'is-invalid' : formData.personalInfo.phone ? 'is-valid' : ''}
                    aria-invalid={validationErrors.personalInfo_phone}
                    aria-describedby={validationErrors.personalInfo_phone ? 'phone-error' : undefined}
                  />
                  {isEditing && !formData.personalInfo.isPhoneVerified && (
                    <button 
                      className="verify-btn"
                      onClick={() => handleVerifyPhone(formData.personalInfo.phone)}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {validationErrors.personalInfo_phone && (
                  <div className="invalid-feedback" id="phone-error">
                    Please enter a valid phone number
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FiMail /> Email
                  <span 
                    className="info-tooltip" 
                    data-tooltip="Used for emergency notifications and alerts"
                    aria-label="Email is used for emergency notifications and alerts"
                  >
                    <FiInfo />
                  </span>
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  disabled={!isEditing}
                  className={validationErrors.personalInfo_email ? 'is-invalid' : formData.personalInfo.email ? 'is-valid' : ''}
                  aria-invalid={validationErrors.personalInfo_email}
                  aria-describedby={validationErrors.personalInfo_email ? 'email-error' : undefined}
                />
                {validationErrors.personalInfo_email && (
                  <div className="invalid-feedback" id="email-error">
                    Please enter a valid email address
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FiMapPin /> Address
                  <span 
                    className="info-tooltip" 
                    data-tooltip="Used to help emergency responders locate you"
                    aria-label="Address is used to help emergency responders locate you"
                  >
                    <FiInfo />
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  disabled={!isEditing}
                  className={validationErrors.personalInfo_address ? 'is-invalid' : formData.personalInfo.address ? 'is-valid' : ''}
                  aria-invalid={validationErrors.personalInfo_address}
                  aria-describedby={validationErrors.personalInfo_address ? 'address-error' : undefined}
                />
                {validationErrors.personalInfo_address && (
                  <div className="invalid-feedback" id="address-error">
                    Please enter your address
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.personalInfo.location_tracking}
                    onChange={() => handleLocationConsent()}
                    disabled={!isEditing}
                  />
                  Enable Location Tracking
                  <span 
                    className="info-tooltip" 
                    data-tooltip="Allows emergency responders to locate you in case of emergency"
                    aria-label="Location tracking allows emergency responders to locate you in case of emergency"
                  >
                    <FiInfo />
                  </span>
                </label>
              </div>
            </>
          )}
        </section>

        {/* Emergency Contacts Section */}
        <section className="settings-section">
          <h3 
            onClick={() => toggleSection('emergency')} 
            aria-expanded={expandedSections.emergency}
            role="button"
            tabIndex="0"
          >
            {expandedSections.emergency ? <FiChevronDown /> : <FiChevronRight />} Emergency Contacts
          </h3>
          
          {expandedSections.emergency && (
            <>
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="emergency-contact">
                  <div className="contact-header">
                    <h4>Contact {index + 1}</h4>
                    {isEditing && (
                      <button 
                        className="remove-contact" 
                        onClick={() => removeEmergencyContact(index)}
                        aria-label={`Remove contact ${index + 1}`}
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleInputChange('emergencyContacts', 'name', e.target.value, index)}
                      disabled={!isEditing}
                      className={validationErrors[`emergencyContacts_name_${index}`] ? 'is-invalid' : contact.name ? 'is-valid' : ''}
                      aria-invalid={validationErrors[`emergencyContacts_name_${index}`]}
                      aria-describedby={validationErrors[`emergencyContacts_name_${index}`] ? `name-error-${index}` : undefined}
                    />
                    {validationErrors[`emergencyContacts_name_${index}`] && (
                      <div className="invalid-feedback" id={`name-error-${index}`}>
                        Please enter a name
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      value={contact.relationship}
                      onChange={(e) => handleInputChange('emergencyContacts', 'relationship', e.target.value, index)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Phone
                      {contact.isVerified && (
                        <span className="verified-badge"><FiCheck /> Verified</span>
                      )}
                    </label>
                    <div className="input-group">
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleInputChange('emergencyContacts', 'phone', e.target.value, index)}
                        disabled={!isEditing}
                        className={validationErrors[`emergencyContacts_phone_${index}`] ? 'is-invalid' : contact.phone ? 'is-valid' : ''}
                        aria-invalid={validationErrors[`emergencyContacts_phone_${index}`]}
                        aria-describedby={validationErrors[`emergencyContacts_phone_${index}`] ? `phone-error-${index}` : undefined}
                      />
                      {isEditing && !contact.isVerified && (
                        <button 
                          className="verify-btn"
                          onClick={() => handleVerifyPhone(contact.phone, true, index)}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                    {validationErrors[`emergencyContacts_phone_${index}`] && (
                      <div className="invalid-feedback" id={`phone-error-${index}`}>
                        Please enter a valid phone number
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleInputChange('emergencyContacts', 'email', e.target.value, index)}
                      disabled={!isEditing}
                      className={validationErrors[`emergencyContacts_email_${index}`] ? 'is-invalid' : contact.email ? 'is-valid' : ''}
                      aria-invalid={validationErrors[`emergencyContacts_email_${index}`]}
                      aria-describedby={validationErrors[`emergencyContacts_email_${index}`] ? `email-error-${index}` : undefined}
                    />
                    {validationErrors[`emergencyContacts_email_${index}`] && (
                      <div className="invalid-feedback" id={`email-error-${index}`}>
                        Please enter a valid email address
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button className="add-contact" onClick={addEmergencyContact}>
                  <FiPlus /> Add Emergency Contact
                </button>
              )}
            </>
          )}
        </section>

        {/* Medical Information Section */}
        <section className="settings-section">
          <h3 
            onClick={() => toggleSection('medical')} 
            aria-expanded={expandedSections.medical}
            role="button"
            tabIndex="0"
          >
            {expandedSections.medical ? <FiChevronDown /> : <FiChevronRight />} Medical Information
          </h3>
          
          {expandedSections.medical && (
            <>
              <div className="field-group">
                <div className="field-group-title">
                  <FaAllergies /> Allergies
                  <span 
                    className="info-tooltip" 
                    data-tooltip="List any allergies that emergency responders should be aware of"
                    aria-label="List any allergies that emergency responders should be aware of"
                  >
                    <FiInfo />
                  </span>
                </div>
                
                {isEditing && (
                  <div className="quick-actions">
                    {commonAllergies.map(allergy => (
                      <button 
                        key={allergy} 
                        className="quick-action-btn"
                        onClick={() => addQuickItem('allergies', allergy)}
                      >
                        <FiPlus /> {allergy}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="form-group">
                  <textarea
                    value={formData.medicalInfo.allergies}
                    onChange={(e) => handleInputChange('medicalInfo', 'allergies', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List any allergies..."
                    rows={3}
                    className={validationErrors.medicalInfo_allergies ? 'is-invalid' : formData.medicalInfo.allergies ? 'is-valid' : ''}
                    aria-invalid={validationErrors.medicalInfo_allergies}
                    aria-describedby={validationErrors.medicalInfo_allergies ? 'allergies-error' : undefined}
                  />
                  {validationErrors.medicalInfo_allergies && (
                    <div className="invalid-feedback" id="allergies-error">
                      Please list any allergies or indicate "None"
                    </div>
                  )}
                </div>
              </div>
              
              <div className="field-group">
                <div className="field-group-title">
                  <FaPills /> Medications
                  <span 
                    className="info-tooltip" 
                    data-tooltip="List current medications that emergency responders should be aware of"
                    aria-label="List current medications that emergency responders should be aware of"
                  >
                    <FiInfo />
                  </span>
                </div>
                
                {isEditing && (
                  <div className="quick-actions">
                    {commonMedications.map(medication => (
                      <button 
                        key={medication} 
                        className="quick-action-btn"
                        onClick={() => addQuickItem('medications', medication)}
                      >
                        <FiPlus /> {medication}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="form-group">
                  <textarea
                    value={formData.medicalInfo.medications}
                    onChange={(e) => handleInputChange('medicalInfo', 'medications', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List current medications..."
                    rows={3}
                    className={validationErrors.medicalInfo_medications ? 'is-invalid' : formData.medicalInfo.medications ? 'is-valid' : ''}
                    aria-invalid={validationErrors.medicalInfo_medications}
                    aria-describedby={validationErrors.medicalInfo_medications ? 'medications-error' : undefined}
                  />
                  {validationErrors.medicalInfo_medications && (
                    <div className="invalid-feedback" id="medications-error">
                      Please list any medications or indicate "None"
                    </div>
                  )}
                </div>
              </div>
              
              <div className="field-group">
                <div className="field-group-title">
                  <FaNotesMedical /> Medical Conditions
                  <span 
                    className="info-tooltip" 
                    data-tooltip="List any medical conditions that emergency responders should be aware of"
                    aria-label="List any medical conditions that emergency responders should be aware of"
                  >
                    <FiInfo />
                  </span>
                </div>
                
                {isEditing && (
                  <div className="quick-actions">
                    {commonConditions.map(condition => (
                      <button 
                        key={condition} 
                        className="quick-action-btn"
                        onClick={() => addQuickItem('conditions', condition)}
                      >
                        <FiPlus /> {condition}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="form-group">
                  <textarea
                    value={formData.medicalInfo.conditions}
                    onChange={(e) => handleInputChange('medicalInfo', 'conditions', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List any medical conditions..."
                    rows={3}
                    className={validationErrors.medicalInfo_conditions ? 'is-invalid' : formData.medicalInfo.conditions ? 'is-valid' : ''}
                    aria-invalid={validationErrors.medicalInfo_conditions}
                    aria-describedby={validationErrors.medicalInfo_conditions ? 'conditions-error' : undefined}
                  />
                  {validationErrors.medicalInfo_conditions && (
                    <div className="invalid-feedback" id="conditions-error">
                      Please list any medical conditions or indicate "None"
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Blood Type</label>
                <select
                  value={formData.medicalInfo.bloodType}
                  onChange={(e) => handleInputChange('medicalInfo', 'bloodType', e.target.value)}
                  disabled={!isEditing}
                  className={validationErrors.medicalInfo_bloodType ? 'is-invalid' : formData.medicalInfo.bloodType ? 'is-valid' : ''}
                  aria-invalid={validationErrors.medicalInfo_bloodType}
                  aria-describedby={validationErrors.medicalInfo_bloodType ? 'bloodType-error' : undefined}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {validationErrors.medicalInfo_bloodType && (
                  <div className="invalid-feedback" id="bloodType-error">
                    Please select your blood type
                  </div>
                )}
              </div>
              
              <div className="critical-info">
                <div className="critical-info-label">
                  <FiAlertCircle /> Critical Medical Information
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.medicalInfo.organDonor}
                      onChange={(e) => handleInputChange('medicalInfo', 'organDonor', e.target.checked)}
                      disabled={!isEditing}
                    />
                    Organ Donor
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.medicalInfo.dnr}
                      onChange={(e) => handleInputChange('medicalInfo', 'dnr', e.target.checked)}
                      disabled={!isEditing}
                    />
                    DNR (Do Not Resuscitate)
                  </label>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Modals */}
        {showVerification && (
          <div className="modal">
            <div className="modal-content">
              <h3>Verify Phone Number</h3>
              <p>Enter the verification code sent to {phoneToVerify}</p>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
              <div className="modal-buttons">
                <button onClick={handleVerificationSubmit}>Verify</button>
                <button onClick={() => {
                  setShowVerification(false);
                  setVerificationCode('');
                  setCurrentContactIndex(null);
                }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showLocationConsent && (
          <div className="modal">
            <div className="modal-content">
              <h3>Location Tracking Consent</h3>
              <p>Do you consent to enable location tracking for emergency purposes?</p>
              <div className="modal-buttons">
                <button onClick={() => handleLocationConsentResponse(true)}>Accept</button>
                <button onClick={() => handleLocationConsentResponse(false)}>Decline</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencySettings;