import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiHeart, FiActivity, FiThermometer, 
  FiDroplet, FiAlertCircle, FiClock, FiCalendar 
} from 'react-icons/fi';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PatientDashboard.css';
import CurrentMedications from './CurrentMedications';

const PatientDashboard = ({ patientId }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock patient data - replace with API call
  const patientInfo = {
    id: "PT-2024-001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Peanuts"],
    primaryDoctor: "Dr. Michael Chen",
    lastVisit: "2024-02-15",
    status: "Outpatient",
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC-123456789",
      validUntil: "2024-12-31"
    },
    emergency: {
      name: "John Johnson",
      relation: "Spouse",
      phone: "+1 234-567-8901"
    }
  };

  const vitals = {
    heartRate: {
      current: 72,
      unit: "bpm",
      status: "normal",
      range: { min: 60, max: 100 },
      history: [
        { time: '08:00', value: 75 },
        { time: '12:00', value: 72 },
        { time: '16:00', value: 78 },
        // Add more data points
      ]
    },
    oxygenLevel: {
      current: 98,
      unit: "%",
      status: "normal",
      range: { min: 95, max: 100 },
      history: [/* Similar data structure */]
    },
    temperature: {
      current: 37.2,
      unit: "°C",
      status: "normal",
      range: { min: 36.5, max: 37.5 },
      history: [/* Similar data structure */]
    },
    bloodPressure: {
      current: { systolic: 120, diastolic: 80 },
      unit: "mmHg",
      status: "normal",
      range: { 
        systolic: { min: 90, max: 140 },
        diastolic: { min: 60, max: 90 }
      },
      history: [/* Similar data structure */]
    }
  };

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <PatientInfoCard patient={patientInfo} />
        <div className="time-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="vitals-grid">
        {Object.entries(vitals).map(([key, data]) => (
          <VitalCard key={key} name={key} data={data} />
        ))}
      </div>

      <div className="treatment-section">
        <CurrentMedications patientId={patientId} />
        <OngoingTreatments patientId={patientId} />
      </div>
    </div>
  );
};

const VitalCard = ({ name, data }) => {
  return (
    <div className={`vital-card ${data.status}`}>
      <div className="vital-header">
        <h3>{name.replace(/([A-Z])/g, ' $1').trim()}</h3>
        <span className={`status-badge ${data.status}`}>
          {data.status}
        </span>
      </div>

      <div className="vital-value">
        {typeof data.current === 'object' 
          ? `${data.current.systolic}/${data.current.diastolic}`
          : data.current}
        <span className="unit">{data.unit}</span>
      </div>

      <div className="vital-chart">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data.history}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[data.range.min, data.range.max]} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const PatientInfoCard = ({ patient }) => {
  return (
    <div className="patient-info-card">
      <div className="patient-header">
        <div className="patient-avatar">
          <FiUser className="avatar-icon" />
        </div>
        <div className="patient-basics">
          <h2>{patient.name}</h2>
          <div className="patient-tags">
            <span className="tag">ID: {patient.id}</span>
            <span className="tag">{patient.age} yrs</span>
            <span className="tag">{patient.gender}</span>
            <span className="tag blood-group">{patient.bloodGroup}</span>
          </div>
        </div>
      </div>

      <div className="patient-details">
        <div className="detail-item">
          <label>Primary Doctor</label>
          <span>{patient.primaryDoctor}</span>
        </div>
        <div className="detail-item">
          <label>Last Visit</label>
          <span>{patient.lastVisit}</span>
        </div>
        <div className="detail-item">
          <label>Status</label>
          <span className={`status ${patient.status.toLowerCase()}`}>
            {patient.status}
          </span>
        </div>
      </div>
    </div>
  );
};

const OngoingTreatments = ({ patientId }) => {
  // Mock treatments data
  const treatments = [
    { id: 1, name: "Physical Therapy", startDate: "2024-01-15", frequency: "3x weekly", duration: "8 weeks" },
    { id: 2, name: "Dialysis", startDate: "2024-02-01", frequency: "2x weekly", duration: "Ongoing" },
  ];

  return (
    <div className="ongoing-treatments">
      <h3>Ongoing Treatments</h3>
      {treatments.length === 0 ? (
        <p>No active treatments</p>
      ) : (
        <ul className="treatments-list">
          {treatments.map(treatment => (
            <li key={treatment.id} className="treatment-item">
              <div className="treatment-name">{treatment.name}</div>
              <div className="treatment-details">
                <span>Started: {treatment.startDate}</span>
                <span>Frequency: {treatment.frequency}</span>
                <span>Duration: {treatment.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard; 