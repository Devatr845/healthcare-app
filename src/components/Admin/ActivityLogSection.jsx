import React, { useState } from 'react';
import { 
  FiCalendar, FiClock, FiAlertCircle, FiFileText, 
  FiActivity, FiHeart, FiThermometer, FiPlusCircle,
  FiFilter, FiDownload, FiPrinter, FiShare2
} from 'react-icons/fi';
import './ActivityLogSection.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ActivityLogPDF from './ActivityLogPDF';
import ShareModal from './ShareModal';

const ActivityLogSection = ({ patientId }) => {
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock data - replace with API call
  const activities = [
    {
      id: 1,
      type: 'appointment',
      title: 'Regular Checkup',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      date: '2024-02-20T10:30:00',
      status: 'completed',
      details: {
        vitals: {
          bloodPressure: '120/80',
          heartRate: '72 bpm',
          temperature: '98.6°F'
        },
        notes: 'Patient showing good progress. Continue current medication.',
        nextAppointment: '2024-03-05T11:00:00',
        prescriptions: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
        ]
      },
      documents: ['checkup_report.pdf', 'prescription.pdf']
    },
    {
      id: 2,
      type: 'test',
      title: 'Blood Work Analysis',
      doctor: 'Dr. Michael Chen',
      department: 'Laboratory',
      date: '2024-02-18T09:15:00',
      status: 'completed',
      details: {
        testType: 'Complete Blood Count',
        results: {
          hemoglobin: '14.2 g/dL',
          wbc: '7.8 K/µL',
          platelets: '250 K/µL'
        },
        interpretation: 'All values within normal range',
        recommendations: 'No immediate action required'
      },
      documents: ['lab_results.pdf']
    },
    {
      id: 3,
      type: 'medication',
      title: 'Prescription Update',
      doctor: 'Dr. Sarah Wilson',
      date: '2024-02-15T14:20:00',
      status: 'active',
      details: {
        changes: [
          {
            medication: 'Metformin',
            oldDosage: '500mg',
            newDosage: '750mg',
            reason: 'Blood sugar levels not adequately controlled'
          }
        ],
        nextReview: '2024-03-15'
      }
    }
  ];

  const filteredActivities = activities
    .filter(activity => {
      if (filterType === 'all') return true;
      return activity.type === filterType;
    })
    .filter(activity => {
      if (!searchTerm) return true;
      return (
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleExport = (format) => {
    switch (format) {
      case 'pdf':
        // PDF download is handled by PDFDownloadLink
        break;
      case 'print':
        window.print();
        break;
      case 'share':
        setShowShareModal(true);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#16A34A',
      active: '#3B82F6',
      pending: '#D97706',
      cancelled: '#DC2626'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className="activity-log-section">
      <div className="log-header">
        <div className="log-title">
          <h2>Activity Logs</h2>
          <span className="log-count">{filteredActivities.length} activities</span>
        </div>
        <div className="log-actions">
          <PDFDownloadLink
            document={<ActivityLogPDF activities={filteredActivities} />}
            fileName={`activity-log-${new Date().toISOString().split('T')[0]}.pdf`}
            className="action-btn"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Generating PDF...'
              ) : (
                <>
                  <FiDownload /> Export PDF
                </>
              )
            }
          </PDFDownloadLink>
          <button className="action-btn" onClick={() => handleExport('print')}>
            <FiPrinter /> Print
          </button>
          <button className="action-btn" onClick={() => handleExport('share')}>
            <FiShare2 /> Share
          </button>
        </div>
      </div>

      <div className="log-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="filter-btn"
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
          >
            <FiFilter /> {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>

        <div className="filter-buttons">
          <button 
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All Activities
          </button>
          <button 
            className={filterType === 'appointment' ? 'active' : ''}
            onClick={() => setFilterType('appointment')}
          >
            Appointments
          </button>
          <button 
            className={filterType === 'medication' ? 'active' : ''}
            onClick={() => setFilterType('medication')}
          >
            Medications
          </button>
          <button 
            className={filterType === 'test' ? 'active' : ''}
            onClick={() => setFilterType('test')}
          >
            Lab Tests
          </button>
        </div>

        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="date-range-select"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="activity-timeline">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className={`timeline-item ${activity.type}`}>
            <div className="timeline-icon">
              {activity.type === 'appointment' && <FiCalendar />}
              {activity.type === 'test' && <FiActivity />}
              {activity.type === 'medication' && <FiHeart />}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <div className="header-main">
                  <h4>{activity.title}</h4>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(activity.status) }}
                  >
                    {activity.status}
                  </span>
                </div>
                <span className="timestamp">
                  <FiClock /> {new Date(activity.date).toLocaleString()}
                </span>
              </div>
              
              <div className="timeline-body">
                <div className="activity-details">
                  <p><strong>Doctor:</strong> {activity.doctor}</p>
                  {activity.department && (
                    <p><strong>Department:</strong> {activity.department}</p>
                  )}
                  
                  {activity.type === 'appointment' && (
                    <div className="vitals-grid">
                      {Object.entries(activity.details.vitals).map(([key, value]) => (
                        <div key={key} className="vital-item">
                          <span className="vital-label">{key}</span>
                          <span className="vital-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activity.type === 'test' && (
                    <div className="test-results">
                      <h5>Test Results:</h5>
                      {Object.entries(activity.details.results).map(([key, value]) => (
                        <div key={key} className="result-item">
                          <span className="result-label">{key}:</span>
                          <span className="result-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activity.type === 'medication' && (
                    <div className="medication-changes">
                      {activity.details.changes.map((change, index) => (
                        <div key={index} className="change-item">
                          <p><strong>{change.medication}</strong></p>
                          <p>Dosage changed from {change.oldDosage} to {change.newDosage}</p>
                          <p>Reason: {change.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {activity.documents && (
                  <div className="document-links">
                    {activity.documents.map((doc, index) => (
                      <a key={index} href="#" className="document-link">
                        <FiFileText /> {doc}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          activityData={{
            id: 'activity-log-1',
            // Add any other data you want to share
          }}
        />
      )}
    </div>
  );
};

export default ActivityLogSection; 