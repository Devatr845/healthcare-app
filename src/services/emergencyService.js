// Emergency API service with mock implementations
// In a real application, these would make actual API calls to the backend

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/emergency';

const TWILIO_ENDPOINT = '/api/emergency/notify';
const VITALS_ENDPOINT = '/api/vitals/monitor';
const EMERGENCY_SETTINGS_ENDPOINT = '/api/emergency/settings';
const EMERGENCY_ALERTS_ENDPOINT = '/api/emergency/alerts';

// Simulate delay like a real API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Monitor patient vitals against thresholds
 * @param {string} patientId - The ID of the patient to monitor
 * @param {Object} thresholds - The threshold settings for the patient
 * @returns {Promise<Object>} - The monitoring status
 */
export const monitorVitals = async (patientId, thresholds) => {
  // This would normally be a real API call to start monitoring
  await delay(800);
  
  return {
    success: true,
    message: `Monitoring started for patient ${patientId}`,
    monitoringId: `mon_${Math.random().toString(36).substring(2, 10)}`
  };
};

/**
 * Stop monitoring patient vitals
 * @param {string} monitoringId - The ID of the active monitoring session
 * @returns {Promise<Object>} - The status of the operation
 */
export const stopVitalsMonitoring = async (monitoringId) => {
  await delay(500);
  
  return {
    success: true,
    message: `Monitoring stopped for session ${monitoringId}`
  };
};

/**
 * Send emergency alert notifications
 * @param {string} patientId - The ID of the patient
 * @param {Object} alertData - Data about the alert, including vitals
 * @returns {Promise<Object>} - The notification status
 */
export const sendEmergencyAlert = async (patientId, alertData) => {
  // This would make API calls to trigger SMS/calls via Twilio
  await delay(1200);
  
  return {
    success: true,
    message: 'Emergency notifications sent successfully',
    notifications: [
      { type: 'sms', recipient: 'emergency_contact', status: 'delivered' },
      { type: 'call', recipient: 'emergency_contact', status: 'initiated' },
      { type: 'page', recipient: 'doctor', status: 'delivered' }
    ]
  };
};

/**
 * Get all emergency alerts, with optional filtering
 * @param {Object} filters - Optional filters like status, date range, etc.
 * @returns {Promise<Array>} - The list of alerts
 */
export const getEmergencyAlerts = async (filters = {}) => {
  await delay(1000);
  
  // Mock data - in a real app, this would come from an API
  const mockAlerts = [
    {
      id: 1,
      patientId: 'PT-2024-001',
      patientName: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      status: 'active',
      vitals: {
        heartRate: 172,
        oxygenLevel: 75,
        bloodPressure: { systolic: 190, diastolic: 110 },
        temperature: 37.2
      },
      location: 'Room 302',
      responseLog: [
        { 
          action: 'Alert Triggered', 
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          details: 'Heart rate exceeded threshold (172 bpm)'
        },
        { 
          action: 'SMS Sent', 
          timestamp: new Date(Date.now() - 14 * 60000).toISOString(),
          details: 'Emergency contact notified'
        },
        { 
          action: 'Doctor Paged', 
          timestamp: new Date(Date.now() - 13 * 60000).toISOString(),
          details: 'Dr. Michael Chen notified via pager system'
        }
      ]
    },
    {
      id: 2,
      patientId: 'PT-2024-003',
      patientName: 'Robert Williams',
      timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
      status: 'resolved',
      vitals: {
        heartRate: 45,
        oxygenLevel: 88,
        bloodPressure: { systolic: 90, diastolic: 60 },
        temperature: 36.5
      },
      location: 'Room 110',
      responseLog: [
        { 
          action: 'Alert Triggered', 
          timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
          details: 'Heart rate below threshold (45 bpm)'
        },
        { 
          action: 'SMS Sent', 
          timestamp: new Date(Date.now() - 3 * 3600000 + 60000).toISOString(),
          details: 'Emergency contact notified'
        },
        { 
          action: 'Doctor Paged', 
          timestamp: new Date(Date.now() - 3 * 3600000 + 120000).toISOString(),
          details: 'Dr. Emma Roberts notified via pager system'
        },
        { 
          action: 'Doctor Response', 
          timestamp: new Date(Date.now() - 3 * 3600000 + 600000).toISOString(),
          details: 'Dr. Emma Roberts acknowledged alert'
        },
        { 
          action: 'Alert Resolved', 
          timestamp: new Date(Date.now() - 3 * 3600000 + 1500000).toISOString(),
          details: 'Patient stabilized, medication administered'
        }
      ]
    },
    // Add more mock alerts here
  ];
  
  // Apply filters if provided
  let filteredAlerts = [...mockAlerts];
  
  if (filters.status) {
    filteredAlerts = filteredAlerts.filter(alert => alert.status === filters.status);
  }
  
  if (filters.patientId) {
    filteredAlerts = filteredAlerts.filter(alert => alert.patientId === filters.patientId);
  }
  
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filteredAlerts = filteredAlerts.filter(alert => new Date(alert.timestamp) >= fromDate);
  }
  
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    filteredAlerts = filteredAlerts.filter(alert => new Date(alert.timestamp) <= toDate);
  }
  
  return filteredAlerts;
};

/**
 * Get alert details by ID
 * @param {string|number} alertId - The ID of the alert
 * @returns {Promise<Object>} - The alert details
 */
export const getAlertById = async (alertId) => {
  await delay(600);
  
  // In a real app, this would be an API call
  const mockAlerts = await getEmergencyAlerts();
  const alert = mockAlerts.find(a => a.id === parseInt(alertId));
  
  if (!alert) {
    throw new Error(`Alert with ID ${alertId} not found`);
  }
  
  return alert;
};

/**
 * Update an alert's status
 * @param {string|number} alertId - The ID of the alert
 * @param {string} status - The new status
 * @param {string} [comment] - Optional comment about the status change
 * @returns {Promise<Object>} - The updated alert
 */
export const updateAlertStatus = async (alertId, status, comment = '') => {
  await delay(800);
  
  // In a real app, this would be an API call to update the alert
  return {
    success: true,
    message: `Alert ${alertId} status updated to ${status}`,
    alertId
  };
};

/**
 * Get emergency settings for a patient
 * @param {string} patientId - The ID of the patient
 * @returns {Promise<Object>} - The patient's emergency settings
 */
export const getEmergencySettings = async (patientId) => {
  await delay(700);
  
  // Mock emergency settings - would come from an API in a real app
  return {
    patientId,
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
};

/**
 * Update emergency settings for a patient
 * @param {string} patientId - The ID of the patient
 * @param {Object} settings - The new settings
 * @returns {Promise<Object>} - The result of the update operation
 */
export const updateEmergencySettings = async (patientId, settings) => {
  await delay(1000);
  
  // In a real app, this would be an API call to update the settings
  return {
    success: true,
    message: `Emergency settings updated for patient ${patientId}`,
    patientId
  };
};

export const emergencyService = {
  // Get emergency settings for a patient
  async getSettings() {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch emergency settings');
    }
  },

  // Update emergency settings
  async updateSettings(settings) {
    try {
      const response = await axios.put(`${API_BASE_URL}/settings`, settings);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update emergency settings');
    }
  },

  // Verify phone number
  async verifyPhone(phoneNumber) {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-phone`, { phoneNumber });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send verification code');
    }
  },

  // Confirm phone verification code
  async confirmVerification(phoneNumber, code) {
    try {
      const response = await axios.post(`${API_BASE_URL}/confirm-verification`, {
        phoneNumber,
        code
      });
      return response.data;
    } catch (error) {
      throw new Error('Invalid verification code');
    }
  },

  // Update location consent
  async updateLocationConsent(consent) {
    try {
      const response = await axios.put(`${API_BASE_URL}/location-consent`, { consent });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update location consent');
    }
  },

  // Send an emergency alert
  async sendEmergencyAlert(alertData) {
    try {
      const response = await fetch('/api/emergency/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        throw new Error('Failed to send emergency alert');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      throw error;
    }
  },

  // Cancel an emergency alert
  async cancelEmergencyAlert(userId) {
    try {
      const response = await fetch(`/api/emergency/alerts/${userId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel emergency alert');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling emergency alert:', error);
      throw error;
    }
  }
};

export default emergencyService; 