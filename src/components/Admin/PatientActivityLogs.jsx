import React, { useState } from 'react';
import { 
  FiCalendar, FiClock, FiAlertCircle, FiFileText, 
  FiActivity, FiHeart, FiThermometer, FiDownload,
  FiShare2, FiFilter, FiPrinter
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PatientActivityLogs.css';

const PatientActivityLogs = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [dateRange, setDateRange] = useState('month');
  const [filterType, setFilterType] = useState('all');

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'medications', label: 'Medications', icon: FiActivity },
    { id: 'labTests', label: 'Lab Tests', icon: FiFileText },
    { id: 'emergency', label: 'Emergency Visits', icon: FiAlertCircle }
  ];

  return (
    <div className="activity-logs">
      <div className="logs-header">
        <h2>Patient Activity Logs</h2>
        <div className="header-actions">
          <div className="filter-group">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="type-select"
            >
              <option value="all">All Activities</option>
              <option value="critical">Critical Only</option>
              <option value="routine">Routine Only</option>
            </select>
          </div>
          <div className="action-buttons">
            <button className="print-btn">
              <FiPrinter /> Print
            </button>
            <button className="download-btn">
              <FiDownload /> Download Report
            </button>
            <button className="share-btn">
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="activity-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="activity-content">
        {activeTab === 'appointments' && <AppointmentsLog patientId={patientId} />}
        {activeTab === 'medications' && <MedicationsLog patientId={patientId} />}
        {activeTab === 'labTests' && <LabTestsLog patientId={patientId} />}
        {activeTab === 'emergency' && <EmergencyVisitsLog patientId={patientId} />}
      </div>
    </div>
  );
};

const AppointmentsLog = ({ patientId }) => {
  // Implementation for appointments log
  return (
    <div className="appointments-log">
      {/* Appointments content */}
    </div>
  );
};

// Add other log components similarly

export default PatientActivityLogs; 