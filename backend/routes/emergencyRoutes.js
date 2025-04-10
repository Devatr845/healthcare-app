const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Mock database for development
const emergencySettingsDB = {};
const alertsDB = [];
let alertIdCounter = 1;

/**
 * @route   GET /api/emergency/settings/:patientId
 * @desc    Get emergency settings for a patient
 * @access  Private
 */
router.get('/settings/:patientId', (req, res) => {
  const { patientId } = req.params;
  
  // Check if settings exist for this patient
  if (!emergencySettingsDB[patientId]) {
    // Return default settings if none exist
    return res.json({
      patientId,
      patientPhone: '',
      emergencyContact: {
        name: '',
        relation: '',
        phone: ''
      },
      preferredDoctor: '',
      preferredDepartment: '',
      enableAlerts: false,
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
  }
  
  res.json(emergencySettingsDB[patientId]);
});

/**
 * @route   POST /api/emergency/settings/:patientId
 * @desc    Save emergency settings for a patient
 * @access  Private
 */
router.post('/settings/:patientId', [
  check('patientPhone', 'Patient phone is required').not().isEmpty(),
  check('emergencyContact.name', 'Emergency contact name is required').not().isEmpty(),
  check('emergencyContact.phone', 'Emergency contact phone is required').not().isEmpty(),
  check('enableAlerts', 'enableAlerts must be a boolean').isBoolean()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { patientId } = req.params;
  const settings = req.body;
  
  // In a real app, would validate all the threshold values here
  
  // Save to our mock database
  emergencySettingsDB[patientId] = {
    ...settings,
    patientId
  };
  
  res.json({
    success: true,
    message: `Emergency settings saved for patient ${patientId}`,
    patientId
  });
});

/**
 * @route   GET /api/emergency/alerts
 * @desc    Get all emergency alerts with optional filtering
 * @access  Private
 */
router.get('/alerts', (req, res) => {
  const { status, patientId, dateFrom, dateTo } = req.query;
  
  // Apply filters
  let filtered = [...alertsDB];
  
  if (status) {
    filtered = filtered.filter(alert => alert.status === status);
  }
  
  if (patientId) {
    filtered = filtered.filter(alert => alert.patientId === patientId);
  }
  
  if (dateFrom) {
    const fromDate = new Date(dateFrom);
    filtered = filtered.filter(alert => new Date(alert.timestamp) >= fromDate);
  }
  
  if (dateTo) {
    const toDate = new Date(dateTo);
    filtered = filtered.filter(alert => new Date(alert.timestamp) <= toDate);
  }
  
  res.json(filtered);
});

/**
 * @route   GET /api/emergency/alerts/:alertId
 * @desc    Get alert details by ID
 * @access  Private
 */
router.get('/alerts/:alertId', (req, res) => {
  const { alertId } = req.params;
  const alert = alertsDB.find(a => a.id === parseInt(alertId));
  
  if (!alert) {
    return res.status(404).json({ message: `Alert with ID ${alertId} not found` });
  }
  
  res.json(alert);
});

/**
 * @route   POST /api/emergency/alerts
 * @desc    Create a new emergency alert
 * @access  Private
 */
router.post('/alerts', [
  check('patientId', 'Patient ID is required').not().isEmpty(),
  check('patientName', 'Patient name is required').not().isEmpty(),
  check('vitals', 'Vitals data is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { patientId, patientName, vitals, location } = req.body;
  
  // In a real app, we would check if these vitals actually exceed thresholds
  
  // Create a new alert
  const newAlert = {
    id: alertIdCounter++,
    patientId,
    patientName,
    timestamp: new Date().toISOString(),
    status: 'active',
    vitals,
    location,
    responseLog: [
      { 
        action: 'Alert Triggered', 
        timestamp: new Date().toISOString(),
        details: determineAlertReason(vitals)
      }
    ]
  };
  
  // Add to our mock database
  alertsDB.push(newAlert);
  
  // In a real app, this would trigger the SMS/call/paging pipeline
  // We'd then add more entries to the responseLog
  
  res.json({
    success: true,
    message: 'Emergency alert created',
    alertId: newAlert.id
  });
});

/**
 * @route   PUT /api/emergency/alerts/:alertId/status
 * @desc    Update an alert's status
 * @access  Private
 */
router.put('/alerts/:alertId/status', [
  check('status', 'Status is required').isIn(['active', 'resolved']),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { alertId } = req.params;
  const { status, comment } = req.body;
  
  const alertIndex = alertsDB.findIndex(a => a.id === parseInt(alertId));
  
  if (alertIndex === -1) {
    return res.status(404).json({ message: `Alert with ID ${alertId} not found` });
  }
  
  // Update the alert
  alertsDB[alertIndex] = {
    ...alertsDB[alertIndex],
    status,
    responseLog: [
      ...alertsDB[alertIndex].responseLog,
      {
        action: `Alert ${status === 'resolved' ? 'Resolved' : 'Updated'}`,
        timestamp: new Date().toISOString(),
        details: comment || `Status changed to ${status}`
      }
    ]
  };
  
  res.json({
    success: true,
    message: `Alert ${alertId} status updated to ${status}`,
    alertId
  });
});

/**
 * @route   POST /api/emergency/notify
 * @desc    Send emergency notifications
 * @access  Private
 */
router.post('/notify', [
  check('patientId', 'Patient ID is required').not().isEmpty(),
  check('alertId', 'Alert ID is required').not().isEmpty(),
  check('recipients', 'Recipients are required').isArray(),
  check('message', 'Message is required').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { patientId, alertId, recipients, message, notificationTypes } = req.body;
  
  // In a real app, this would integrate with Twilio or similar service to send actual notifications
  
  // Find the alert to update its responseLog
  const alertIndex = alertsDB.findIndex(a => a.id === parseInt(alertId));
  
  if (alertIndex !== -1) {
    // For each notification type, add a log entry
    if (notificationTypes?.includes('sms')) {
      alertsDB[alertIndex].responseLog.push({
        action: 'SMS Sent',
        timestamp: new Date().toISOString(),
        details: `SMS notification sent to emergency contacts`
      });
    }
    
    if (notificationTypes?.includes('call')) {
      alertsDB[alertIndex].responseLog.push({
        action: 'Call Initiated',
        timestamp: new Date().toISOString(),
        details: `Emergency call initiated to emergency contacts`
      });
    }
    
    if (notificationTypes?.includes('page')) {
      alertsDB[alertIndex].responseLog.push({
        action: 'Doctor Paged',
        timestamp: new Date().toISOString(),
        details: `Paging notification sent to medical staff`
      });
    }
  }
  
  res.json({
    success: true,
    message: 'Emergency notifications sent successfully',
    notifications: [
      { type: 'sms', recipient: recipients[0], status: 'delivered' },
      { type: 'call', recipient: recipients[0], status: 'initiated' },
      { type: 'page', recipient: 'doctor', status: 'delivered' }
    ]
  });
});

/**
 * Helper function to determine alert reason based on vitals
 */
function determineAlertReason(vitals) {
  const reasons = [];
  
  if (vitals.heartRate > 160 || vitals.heartRate < 40) {
    reasons.push(`Heart rate ${vitals.heartRate > 160 ? 'high' : 'low'} (${vitals.heartRate} bpm)`);
  }
  
  if (vitals.oxygenLevel < 85) {
    reasons.push(`Oxygen level low (${vitals.oxygenLevel}%)`);
  }
  
  if (vitals.bloodPressure?.systolic > 180 || vitals.bloodPressure?.diastolic > 110) {
    reasons.push(`Blood pressure high (${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg)`);
  }
  
  if (vitals.bloodPressure?.systolic < 90 || vitals.bloodPressure?.diastolic < 60) {
    reasons.push(`Blood pressure low (${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg)`);
  }
  
  if (vitals.temperature > 39 || vitals.temperature < 35) {
    reasons.push(`Temperature ${vitals.temperature > 39 ? 'high' : 'low'} (${vitals.temperature}°C)`);
  }
  
  if (reasons.length === 0) {
    return 'Alert triggered by system';
  }
  
  return reasons.join(', ');
}

// Seed some sample data
function seedSampleData() {
  // Sample settings
  emergencySettingsDB['PT-2024-001'] = {
    patientId: 'PT-2024-001',
    patientPhone: '+1 (555) 123-4567',
    emergencyContact: {
      name: 'Jane Johnson',
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
  
  // Sample alerts
  alertsDB.push({
    id: alertIdCounter++,
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
        details: 'Heart rate high (172 bpm), Oxygen level low (75%)'
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
  });
  
  alertsDB.push({
    id: alertIdCounter++,
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
        details: 'Heart rate low (45 bpm)'
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
  });
}

// Seed the data when the module is loaded
seedSampleData();

module.exports = router; 