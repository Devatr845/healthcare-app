import React, { useState } from 'react';
import { 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiHeart, 
  FiActivity,
  FiAlertCircle,
  FiCalendar,
  FiFileText,
  FiDownload
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PatientProfile.css';

const PatientProfile = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock patient data (replace with API call)
  const patient = {
    id: "PT-2024-001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+1 234-567-8900",
    email: "sarah.j@email.com",
    address: "123 Health Street, Medical City, MC 12345",
    image: "/patient-avatar.jpg",
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
    },
    medicalConditions: [
      {
        condition: "Type 2 Diabetes",
        diagnosedDate: "2022-03-15",
        status: "Active",
        treatingDoctor: "Dr. Sarah Wilson"
      },
      {
        condition: "Hypertension",
        diagnosedDate: "2021-06-10",
        status: "Controlled",
        treatingDoctor: "Dr. Michael Chen"
      }
    ],
    allergies: [
      { type: "Medication", name: "Penicillin", severity: "Severe" },
      { type: "Food", name: "Peanuts", severity: "Moderate" }
    ],
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedBy: "Dr. Sarah Wilson",
        startDate: "2022-03-15",
        adherence: 0.95
      }
    ],
    vitals: {
      history: [
        { date: "2024-02-15", bp: "120/80", heartRate: 72, temp: 98.6, oxygen: 98 },
        { date: "2024-02-01", bp: "118/78", heartRate: 70, temp: 98.4, oxygen: 99 },
        // ... more history
      ]
    }
  };

  return (
    <div className="patient-profile">
      <header className="profile-header">
        <div className="patient-basic-info">
          <img src={patient.image} alt={patient.name} className="patient-avatar" />
          <div className="info-text">
            <h1>{patient.name}</h1>
            <div className="patient-tags">
              <span className="patient-id">ID: {patient.id}</span>
              <span className="blood-group">{patient.bloodGroup}</span>
              <span className="age-gender">{patient.age} yrs, {patient.gender}</span>
            </div>
          </div>
        </div>
        <div className="quick-actions">
          <button className="download-report">
            <FiDownload />
            Download Report
          </button>
        </div>
      </header>

      <nav className="profile-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          Medical History
        </button>
        <button 
          className={activeTab === 'vitals' ? 'active' : ''}
          onClick={() => setActiveTab('vitals')}
        >
          Health Metrics
        </button>
        <button 
          className={activeTab === 'activity' ? 'active' : ''}
          onClick={() => setActiveTab('activity')}
        >
          Activity Log
        </button>
      </nav>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="info-card contact-info">
              <h3>Contact Information</h3>
              <div className="info-row">
                <FiPhone />
                <span>{patient.phone}</span>
              </div>
              <div className="info-row">
                <FiMapPin />
                <span>{patient.address}</span>
              </div>
            </div>

            <div className="info-card emergency-contact">
              <h3>Emergency Contact</h3>
              <div className="info-row">
                <FiUser />
                <span>{patient.emergencyContact.name} ({patient.emergencyContact.relation})</span>
              </div>
              <div className="info-row">
                <FiPhone />
                <span>{patient.emergencyContact.phone}</span>
              </div>
            </div>

            <div className="info-card current-medications">
              <h3>Current Medications</h3>
              {patient.medications.map((med, index) => (
                <div key={index} className="medication-item">
                  <h4>{med.name}</h4>
                  <p>{med.dosage} - {med.frequency}</p>
                  <div className="adherence-bar">
                    <div 
                      className="adherence-fill"
                      style={{ width: `${med.adherence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="info-card allergies">
              <h3>Allergies & Sensitivities</h3>
              {patient.allergies.map((allergy, index) => (
                <div key={index} className="allergy-item">
                  <FiAlertCircle className={`severity-${allergy.severity.toLowerCase()}`} />
                  <span>{allergy.name}</span>
                  <span className="allergy-type">{allergy.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="vitals-section">
            <div className="vitals-chart">
              <h3>Blood Pressure Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patient.vitals.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bp" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Add more vital charts here */}
          </div>
        )}

        {/* Add other tab content */}
      </div>
    </div>
  );
};

export default PatientProfile; 