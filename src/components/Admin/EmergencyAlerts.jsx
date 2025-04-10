import React, { useState, useEffect } from 'react';
import { 
  FiAlertTriangle, FiBell, FiCheck, FiEye, 
  FiFilter, FiCalendar, FiSearch, FiX, FiClock,
  FiPhoneCall, FiMessageSquare, FiUser, FiActivity
} from 'react-icons/fi';
import './EmergencyAlerts.css';

// Helper functions moved outside of components
const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleDateString();
};

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const alertTime = new Date(timestamp);
  const diffMs = now - alertTime;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  
  if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else {
    return formatDate(timestamp);
  }
};

const getStatusClass = (status) => {
  return status === 'active' ? 'status-active' : 'status-resolved';
};

const getVitalStatusClass = (vitalName, value) => {
  // These thresholds would come from patient settings in a real app
  if (vitalName === 'heartRate') {
    if (value > 160 || value < 40) return 'critical';
    if (value > 120 || value < 50) return 'warning';
    return 'normal';
  } else if (vitalName === 'oxygenLevel') {
    if (value < 80) return 'critical';
    if (value < 90) return 'warning';
    return 'normal';
  } else if (vitalName === 'bloodPressure') {
    const { systolic, diastolic } = value;
    if (systolic > 180 || diastolic > 110 || systolic < 90 || diastolic < 60) {
      return 'critical';
    }
    if (systolic > 140 || diastolic > 90 || systolic < 100 || diastolic < 65) {
      return 'warning';
    }
    return 'normal';
  } else if (vitalName === 'temperature') {
    if (value > 39 || value < 35) return 'critical';
    if (value > 38 || value < 36) return 'warning';
    return 'normal';
  }
  return 'normal';
};

// AlertDetailModal component moved outside of EmergencyAlerts
const AlertDetailModal = ({ alert, onClose, onResolveAlert }) => {
  if (!alert) return null;
  
  return (
    <div className="alert-modal-overlay">
      <div className="alert-modal-content">
        <div className="alert-modal-header">
          <div className="alert-modal-title">
            <FiAlertTriangle className="alert-icon" />
            <h2>Emergency Alert Details</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <div className="alert-modal-body">
          <div className="patient-info-section">
            <h3><FiUser /> Patient Information</h3>
            <div className="patient-details">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{alert.patientName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Patient ID:</span>
                <span className="info-value">{alert.patientId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Location:</span>
                <span className="info-value">{alert.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Alert Time:</span>
                <span className="info-value">
                  {formatDate(alert.timestamp)} at {formatTime(alert.timestamp)}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-badge ${getStatusClass(alert.status)}`}>
                  {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="vitals-section">
            <h3><FiActivity /> Critical Vitals</h3>
            <div className="vitals-grid-modal">
              <div className={`vital-card ${getVitalStatusClass('heartRate', alert.vitals.heartRate)}`}>
                <h4>Heart Rate</h4>
                <div className="vital-value">{alert.vitals.heartRate} <span>bpm</span></div>
              </div>
              <div className={`vital-card ${getVitalStatusClass('oxygenLevel', alert.vitals.oxygenLevel)}`}>
                <h4>SpO2</h4>
                <div className="vital-value">{alert.vitals.oxygenLevel}<span>%</span></div>
              </div>
              <div className={`vital-card ${getVitalStatusClass('bloodPressure', alert.vitals.bloodPressure)}`}>
                <h4>Blood Pressure</h4>
                <div className="vital-value">
                  {alert.vitals.bloodPressure.systolic}/{alert.vitals.bloodPressure.diastolic} <span>mmHg</span>
                </div>
              </div>
              <div className={`vital-card ${getVitalStatusClass('temperature', alert.vitals.temperature)}`}>
                <h4>Temperature</h4>
                <div className="vital-value">{alert.vitals.temperature}<span>°C</span></div>
              </div>
            </div>
          </div>
          
          <div className="response-log-section">
            <h3><FiClock /> Response Timeline</h3>
            <div className="response-timeline">
              {alert.responseLog.map((log, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-icon">
                    {log.action.includes('Alert Triggered') && <FiAlertTriangle />}
                    {log.action.includes('SMS') && <FiMessageSquare />}
                    {log.action.includes('Doctor Paged') && <FiPhoneCall />}
                    {log.action.includes('Doctor Response') && <FiEye />}
                    {log.action.includes('Alert Resolved') && <FiCheck />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{log.action}</h4>
                      <span className="timeline-time">{formatTime(log.timestamp)}</span>
                    </div>
                    <p>{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="alert-modal-footer">
          {alert.status === 'active' && (
            <button 
              className="resolve-btn"
              onClick={() => {
                onResolveAlert(alert.id);
                onClose();
              }}
            >
              <FiCheck /> Mark as Resolved
            </button>
          )}
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - would come from API in a real application
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
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
        {
          id: 3,
          patientId: 'PT-2024-008',
          patientName: 'David Chen',
          timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
          status: 'active',
          vitals: {
            heartRate: 135,
            oxygenLevel: 82,
            bloodPressure: { systolic: 165, diastolic: 95 },
            temperature: 38.9
          },
          location: 'Room 215',
          responseLog: [
            { 
              action: 'Alert Triggered', 
              timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
              details: 'Multiple vitals outside threshold ranges'
            },
            { 
              action: 'SMS Sent', 
              timestamp: new Date(Date.now() - 19 * 60000).toISOString(),
              details: 'Emergency contact notified'
            },
            { 
              action: 'Doctor Paged', 
              timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
              details: 'Dr. Sarah Patel notified via pager system'
            },
            { 
              action: 'Doctor Response', 
              timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
              details: 'Dr. Sarah Patel acknowledged alert'
            }
          ]
        }
      ];
      
      setAlerts(mockAlerts);
      setFilteredAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...alerts];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(alert => alert.status === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(alert => 
        alert.patientName.toLowerCase().includes(query) || 
        alert.patientId.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter
    if (selectedDate) {
      const filterDate = new Date(selectedDate).toDateString();
      filtered = filtered.filter(alert => {
        const alertDate = new Date(alert.timestamp).toDateString();
        return alertDate === filterDate;
      });
    }
    
    setFilteredAlerts(filtered);
  }, [alerts, filter, searchQuery, selectedDate]);

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleResolveAlert = (id) => {
    // In a real app, make an API call to resolve the alert
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { 
            ...alert, 
            status: 'resolved',
            responseLog: [
              ...alert.responseLog,
              {
                action: 'Alert Resolved',
                timestamp: new Date().toISOString(),
                details: 'Resolved by administrator'
              }
            ]
          } 
        : alert
    ));
  };

  return (
    <div className="emergency-alerts-container">
      <div className="alerts-header">
        <h2><FiBell /> Emergency Alerts</h2>
        <div className="alerts-controls">
          <div className="search-box">
            <FiSearch />
            <input 
              type="text"
              placeholder="Search patient or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                <FiX />
              </button>
            )}
          </div>
          
          <div className="filter-controls">
            <div className="filter-dropdown">
              <FiFilter />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Alerts</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div className="date-filter">
              <FiCalendar />
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <button 
                  className="clear-date"
                  onClick={() => setSelectedDate('')}
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="alerts-content">
        {loading ? (
          <div className="loading-state">Loading alerts...</div>
        ) : filteredAlerts.length === 0 ? (
          <div className="empty-state">
            <p>No alerts match your current filters</p>
            <button onClick={() => {
              setFilter('all');
              setSearchQuery('');
              setSelectedDate('');
            }}>Clear Filters</button>
          </div>
        ) : (
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Alert Time</th>
                <th>Vitals Summary</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map(alert => (
                <tr key={alert.id} className={`alert-row ${alert.status}`}>
                  <td className="patient-cell">
                    <div>{alert.patientName}</div>
                    <span className="patient-id">{alert.patientId}</span>
                  </td>
                  <td className="time-cell">
                    {getRelativeTime(alert.timestamp)}
                  </td>
                  <td className="vitals-cell">
                    <span className={getVitalStatusClass('heartRate', alert.vitals.heartRate)}>
                      HR: {alert.vitals.heartRate} bpm
                    </span>
                    <span className={getVitalStatusClass('oxygenLevel', alert.vitals.oxygenLevel)}>
                      SpO2: {alert.vitals.oxygenLevel}%
                    </span>
                  </td>
                  <td>{alert.location}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewAlert(alert)}
                    >
                      <FiEye /> View
                    </button>
                    {alert.status === 'active' && (
                      <button 
                        className="resolve-btn small"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        <FiCheck />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <AlertDetailModal 
          alert={selectedAlert} 
          onClose={() => {
            setShowModal(false);
            setSelectedAlert(null);
          }}
          onResolveAlert={handleResolveAlert}
        />
      )}
    </div>
  );
};

export default EmergencyAlerts; 