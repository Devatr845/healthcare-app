import React, { useState } from 'react';
import { 
  FiUser, FiPhone, FiMapPin, FiHeart, FiActivity,
  FiAlertCircle, FiCalendar, FiFileText, FiDownload,
  FiMail, FiThermometer, FiTrendingUp, FiArrowLeft
} from 'react-icons/fi';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PatientMetrics.css';

const PatientMetrics = ({ patientId, onBack }) => {
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeRange, setTimeRange] = useState('weekly');

  // Mock patient data
  const patient = {
    id: "PT-2024-001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+1 234-567-8900",
    email: "sarah.j@email.com",
    address: "123 Health Street, Medical City",
    primaryDoctor: "Dr. Michael Chen",
    lastVisit: "2024-02-15",
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC-123456789",
      validUntil: "2024-12-31"
    },
    emergencyContact: {
      name: "John Johnson",
      relation: "Spouse",
      phone: "+1 234-567-8901"
    }
  };

  // Mock health metrics data
  const healthMetrics = {
    heartRate: [
      { date: '2024-02-01', value: 72, min: 65, max: 75 },
      { date: '2024-02-02', value: 75, min: 68, max: 78 },
      { date: '2024-02-03', value: 68, min: 65, max: 72 }
    ],
    bloodPressure: [
      { date: '2024-02-01', systolic: 120, diastolic: 80 },
      { date: '2024-02-02', systolic: 118, diastolic: 79 },
      { date: '2024-02-03', systolic: 122, diastolic: 82 }
    ],
    oxygenLevels: [
      { date: '2024-02-01', value: 98 },
      { date: '2024-02-02', value: 97 },
      { date: '2024-02-03', value: 99 }
    ],
    temperature: [
      { date: '2024-02-01', value: 98.6 },
      { date: '2024-02-02', value: 98.4 },
      { date: '2024-02-03', value: 98.7 }
    ],
    bmi: [
      { date: '2024-02-01', value: 23.5 },
      { date: '2024-02-02', value: 23.4 },
      { date: '2024-02-03', value: 23.6 }
    ]
  };

  return (
    <div className="patient-metrics">
      <button className="back-to-dashboard" onClick={onBack}>
        <FiArrowLeft /> Back to Dashboard
      </button>
      <header className="metrics-header">
        <div className="patient-info">
          <div className="patient-basic">
            <h1>{patient.name}</h1>
            <div className="patient-tags">
              <span className="id-tag">ID: {patient.id}</span>
              <span className="blood-tag">{patient.bloodGroup}</span>
              <span className="age-tag">{patient.age} yrs, {patient.gender}</span>
            </div>
          </div>
          <div className="patient-contact">
            <div className="contact-item">
              <FiPhone />
              <span>{patient.phone}</span>
            </div>
            <div className="contact-item">
              <FiMail />
              <span>{patient.email}</span>
            </div>
            <div className="contact-item">
              <FiMapPin />
              <span>{patient.address}</span>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="primary-btn">
            <FiDownload /> Download Report
          </button>
          <button className="secondary-btn">
            <FiFileText /> View Full History
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="vital-card">
          <div className="vital-header">
            <FiHeart className="vital-icon" />
            <h3>Heart Rate</h3>
          </div>
          <div className="vital-value">72 <span>BPM</span></div>
          <div className="vital-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={healthMetrics.heartRate}>
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <FiActivity className="vital-icon" />
            <h3>Blood Pressure</h3>
          </div>
          <div className="vital-value">120/80 <span>mmHg</span></div>
          <div className="vital-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={healthMetrics.bloodPressure}>
                <Line type="monotone" dataKey="systolic" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <FiThermometer className="vital-icon" />
            <h3>Temperature</h3>
          </div>
          <div className="vital-value">98.6 <span>°F</span></div>
          <div className="vital-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={healthMetrics.temperature}>
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <FiTrendingUp className="vital-icon" />
            <h3>BMI</h3>
          </div>
          <div className="vital-value">23.5</div>
          <div className="vital-chart">
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={healthMetrics.bmi}>
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="detailed-metrics">
        <div className="metrics-controls">
          <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
            <option value="heartRate">Heart Rate</option>
            <option value="bloodPressure">Blood Pressure</option>
            <option value="oxygenLevels">Oxygen Levels</option>
            <option value="temperature">Temperature</option>
            <option value="bmi">BMI</option>
          </select>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="metrics-chart">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={healthMetrics[selectedMetric]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PatientMetrics; 