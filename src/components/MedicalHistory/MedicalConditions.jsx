import React, { useState } from 'react';
import { 
  FiActivity, 
  FiAlertCircle, 
  FiCalendar, 
  FiFileText, 
  FiPaperclip,
  FiEye,
  FiTrendingUp,
  FiCheck,
  FiX
} from 'react-icons/fi';
import './MedicalConditions.css';

const initialConditions = [
  {
    id: 1,
    name: "Hypertension",
    diagnosisDate: "2023-08-15",
    status: "active",
    severity: "moderate",
    doctor: "Dr. Sarah Wilson",
    notes: "Stage 1 hypertension diagnosed. Regular monitoring required.",
    treatments: [
      {
        type: "medication",
        name: "Lisinopril",
        dosage: "10mg daily",
        duration: "Ongoing"
      },
      {
        type: "lifestyle",
        description: "Reduce sodium intake, regular exercise"
      }
    ],
    reports: [
      {
        id: "bp-001",
        name: "Blood Pressure Report - Aug 2023",
        date: "2023-08-15",
        type: "pdf"
      },
      {
        id: "ecg-001",
        name: "ECG Results - Aug 2023",
        date: "2023-08-15",
        type: "pdf"
      }
    ],
    lastUpdated: "2024-01-10"
  },
  {
    id: 2,
    name: "Type 2 Diabetes",
    diagnosisDate: "2023-06-20",
    status: "controlled",
    severity: "moderate",
    doctor: "Dr. Michael Chen",
    notes: "Blood sugar levels showing improvement with current treatment plan.",
    treatments: [
      {
        type: "medication",
        name: "Metformin",
        dosage: "500mg twice daily",
        duration: "Ongoing"
      },
      {
        type: "lifestyle",
        description: "Low-carb diet, daily exercise, blood sugar monitoring"
      }
    ],
    reports: [
      {
        id: "a1c-001",
        name: "HbA1c Test Results - Dec 2023",
        date: "2023-12-15",
        type: "pdf"
      }
    ],
    lastUpdated: "2024-01-05"
  }
];

const ConditionCard = ({ condition }) => {
  const [showReports, setShowReports] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return '#059669';
      case 'moderate': return '#F59E0B';
      case 'severe': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FiActivity className="status-icon active" />;
      case 'controlled': return <FiCheck className="status-icon controlled" />;
      case 'resolved': return <FiCheck className="status-icon resolved" />;
      default: return null;
    }
  };

  return (
    <div className="condition-card">
      <div className="condition-header">
        <div className="condition-title">
          <h3>{condition.name}</h3>
          <div className={`severity-badge ${condition.severity}`}>
            {condition.severity}
          </div>
        </div>
        <div className="condition-status">
          {getStatusIcon(condition.status)}
          <span>{condition.status}</span>
        </div>
      </div>

      <div className="condition-details">
        <div className="detail-row">
          <FiCalendar />
          <span>Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
          <FiActivity />
          <span>Last Updated: {new Date(condition.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div className="detail-row doctor">
          <span>Treating Doctor: {condition.doctor}</span>
        </div>
      </div>

      <div className="doctor-notes">
        <h4>Doctor's Notes</h4>
        <p>{condition.notes}</p>
      </div>

      <div className="treatments-section">
        <h4>Treatment Plan</h4>
        <div className="treatments-list">
          {condition.treatments.map((treatment, index) => (
            <div key={index} className="treatment-item">
              <div className="treatment-type">
                {treatment.type === 'medication' ? (
                  <>
                    <strong>{treatment.name}</strong>
                    <span>{treatment.dosage}</span>
                  </>
                ) : (
                  <span>{treatment.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-section">
        <div className="reports-header" onClick={() => setShowReports(!showReports)}>
          <h4>
            <FiPaperclip />
            Medical Reports
          </h4>
          <button className="view-reports-btn">
            <FiEye />
            View Reports
          </button>
        </div>
        
        {showReports && (
          <div className="reports-list">
            {condition.reports.map(report => (
              <div key={report.id} className="report-item">
                <FiFileText />
                <div className="report-info">
                  <span className="report-name">{report.name}</span>
                  <span className="report-date">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
                <button className="download-btn">
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MedicalConditions = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredConditions = activeFilter === 'all' 
    ? initialConditions
    : initialConditions.filter(condition => condition.status === activeFilter);

  return (
    <div className="medical-conditions">
      <div className="section-header">
        <h2>Medical Conditions</h2>
        <div className="condition-filters">
          <button 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={activeFilter === 'active' ? 'active' : ''} 
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={activeFilter === 'controlled' ? 'active' : ''} 
            onClick={() => setActiveFilter('controlled')}
          >
            Controlled
          </button>
          <button 
            className={activeFilter === 'resolved' ? 'active' : ''} 
            onClick={() => setActiveFilter('resolved')}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="conditions-grid">
        {filteredConditions.map(condition => (
          <ConditionCard key={condition.id} condition={condition} />
        ))}
      </div>
    </div>
  );
};

export default MedicalConditions; 