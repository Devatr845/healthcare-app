import React, { useState } from 'react';
import { 
  FiX, FiUser, FiPhone, FiMail, FiCalendar, FiClock, FiMapPin,
  FiHeart, FiActivity, FiThermometer, FiDroplet, FiFileText,
  FiAlertCircle, FiCheckCircle, FiDownload
} from 'react-icons/fi';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import html2pdf from 'html2pdf.js';
import './PatientDetailsModal.css';

const PatientDetailsModal = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) return null;

  // Mock additional data - replace with API data
  const vitals = {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    oxygenSaturation: "98%",
    weight: "68 kg",
    height: "170 cm",
    bmi: "23.5"
  };

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      status: "active"
    }
  ];

  const medicalHistory = {
    conditions: [
      {
        condition: "Hypertension",
        diagnosedDate: "2023-05-15",
        status: "Ongoing",
        severity: "Moderate",
        notes: "Well controlled with medication",
        treatments: [
          {
            type: "Medication",
            name: "Lisinopril",
            startDate: "2023-05-15",
            endDate: "Ongoing",
            dosage: "10mg daily",
            effectiveness: "Good response"
          }
        ],
        progressNotes: [
          {
            date: "2024-02-15",
            bp: "120/80",
            notes: "Blood pressure well controlled"
          },
          {
            date: "2024-01-15",
            bp: "128/84",
            notes: "Slight elevation, monitoring required"
          }
        ]
      },
      {
        condition: "Type 2 Diabetes",
        diagnosedDate: "2023-06-20",
        status: "Ongoing",
        severity: "Mild",
        notes: "Diet controlled, regular monitoring",
        treatments: [
          {
            type: "Diet",
            name: "Low carb diet",
            startDate: "2023-06-20",
            endDate: "Ongoing",
            details: "1800 cal/day, low glycemic index"
          },
          {
            type: "Exercise",
            name: "Regular physical activity",
            startDate: "2023-06-20",
            frequency: "30 mins, 5 times/week"
          }
        ],
        progressNotes: [
          {
            date: "2024-02-15",
            hba1c: "6.2%",
            notes: "Good glycemic control"
          }
        ]
      }
    ],
    allergies: [
      {
        allergen: "Penicillin",
        severity: "Severe",
        reaction: "Anaphylaxis",
        diagnosed: "2020-03-15"
      },
      {
        allergen: "Peanuts",
        severity: "Moderate",
        reaction: "Hives",
        diagnosed: "2018-06-10"
      }
    ],
    labResults: [
      {
        date: "2024-02-15",
        type: "Complete Blood Count",
        results: [
          { name: "WBC", value: "7.5", unit: "K/µL", range: "4.5-11.0" },
          { name: "RBC", value: "4.8", unit: "M/µL", range: "4.2-5.8" },
          { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5" }
        ]
      },
      {
        date: "2024-02-15",
        type: "Lipid Panel",
        results: [
          { name: "Total Cholesterol", value: "185", unit: "mg/dL", range: "<200" },
          { name: "HDL", value: "55", unit: "mg/dL", range: ">40" },
          { name: "LDL", value: "110", unit: "mg/dL", range: "<130" }
        ]
      }
    ],
    surgeries: [
      {
        procedure: "Appendectomy",
        date: "2015-08-12",
        surgeon: "Dr. James Wilson",
        hospital: "Central Hospital",
        notes: "No complications"
      }
    ]
  };

  const appointments = [
    {
      id: 1,
      date: "2024-02-15",
      time: "10:30 AM",
      type: "Regular Checkup",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      status: "completed",
      duration: "30 mins",
      location: "Main Clinic - Room 204",
      notes: "Blood pressure normal, medication continued",
      vitalsRecorded: {
        bp: "120/80",
        heartRate: "72 bpm",
        temperature: "98.6°F"
      },
      followUp: {
        recommended: true,
        date: "2024-03-15",
        reason: "Regular monitoring"
      },
      prescriptions: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days"
        }
      ]
    },
    {
      id: 2,
      date: "2024-03-15",
      time: "2:00 PM",
      type: "Follow-up",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      status: "scheduled",
      duration: "30 mins",
      location: "Main Clinic - Room 204",
      notes: "Regular follow-up for blood pressure monitoring",
      preparationInstructions: [
        "Bring current medication list",
        "Fast for 8 hours before appointment",
        "Bring blood pressure readings from home monitoring"
      ]
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "11:00 AM",
      type: "Lab Work",
      doctor: "Dr. Sarah Wilson",
      department: "Laboratory",
      status: "completed",
      duration: "15 mins",
      location: "Clinical Laboratory - 1st Floor",
      notes: "Regular blood work completed",
      labResults: {
        status: "completed",
        reportDate: "2024-01-12",
        reportAvailable: true
      }
    }
  ];

  // Add historical vital data
  const vitalHistory = {
    bloodPressure: [
      { date: '2024-02-01', systolic: 120, diastolic: 80 },
      { date: '2024-02-08', systolic: 118, diastolic: 78 },
      { date: '2024-02-15', systolic: 122, diastolic: 82 },
      { date: '2024-02-22', systolic: 120, diastolic: 80 },
    ],
    heartRate: [
      { date: '2024-02-01', value: 72 },
      { date: '2024-02-08', value: 75 },
      { date: '2024-02-15', value: 70 },
      { date: '2024-02-22', value: 72 },
    ],
    temperature: [
      { date: '2024-02-01', value: 98.6 },
      { date: '2024-02-08', value: 98.4 },
      { date: '2024-02-15', value: 98.8 },
      { date: '2024-02-22', value: 98.6 },
    ],
    oxygenSaturation: [
      { date: '2024-02-01', value: 98 },
      { date: '2024-02-08', value: 97 },
      { date: '2024-02-15', value: 99 },
      { date: '2024-02-22', value: 98 },
    ],
  };

  const generatePDF = () => {
    // Create a temporary div for the PDF content
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="color: #111827;">Patient Report - ${patient.name}</h1>
        
        <h2 style="color: #374151; margin-top: 20px;">Personal Information</h2>
        <p><strong>Patient ID:</strong> ${patient.id}</p>
        <p><strong>Name:</strong> ${patient.name}</p>
        <p><strong>Age/Gender:</strong> ${patient.age} / ${patient.gender}</p>
        <p><strong>Status:</strong> ${patient.status.toUpperCase()}</p>
        
        <h2 style="color: #374151; margin-top: 20px;">Contact Information</h2>
        <p><strong>Phone:</strong> ${patient.phone}</p>
        <p><strong>Email:</strong> ${patient.email}</p>
        
        <h2 style="color: #374151; margin-top: 20px;">Medical Conditions</h2>
        ${medicalHistory.conditions.map(condition => `
          <div style="margin-bottom: 15px;">
            <p><strong>Condition:</strong> ${condition.condition}</p>
            <p><strong>Severity:</strong> ${condition.severity}</p>
            <p><strong>Diagnosed:</strong> ${condition.diagnosedDate}</p>
            <p><strong>Notes:</strong> ${condition.notes}</p>
          </div>
        `).join('')}
        
        <h2 style="color: #374151; margin-top: 20px;">Allergies</h2>
        ${medicalHistory.allergies.map(allergy => `
          <div style="margin-bottom: 15px;">
            <p><strong>Allergen:</strong> ${allergy.allergen}</p>
            <p><strong>Severity:</strong> ${allergy.severity}</p>
            <p><strong>Reaction:</strong> ${allergy.reaction}</p>
          </div>
        `).join('')}
        
        <h2 style="color: #374151; margin-top: 20px;">Vital Signs</h2>
        <p><strong>Blood Pressure:</strong> ${vitals.bloodPressure}</p>
        <p><strong>Heart Rate:</strong> ${vitals.heartRate}</p>
        <p><strong>Temperature:</strong> ${vitals.temperature}</p>
        <p><strong>Oxygen Saturation:</strong> ${vitals.oxygenSaturation}</p>
        
        <h2 style="color: #374151; margin-top: 20px;">Lab Results</h2>
        ${medicalHistory.labResults.map(lab => `
          <div style="margin-bottom: 15px;">
            <h3 style="color: #4B5563;">${lab.type} - ${lab.date}</h3>
            ${lab.results.map(result => `
              <p><strong>${result.name}:</strong> ${result.value} ${result.unit} (Range: ${result.range})</p>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `${patient.name.replace(/\s+/g, '_')}_medical_report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="patient-header-info">
            <h2>Patient Details</h2>
            <span className={`status-badge ${patient.status}`}>
              {patient.status}
            </span>
          </div>
          <div className="modal-actions">
            <button className="download-btn" onClick={generatePDF}>
              <FiDownload />
              Download Report
            </button>
            <button className="close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('vitals')}
          >
            Vital Signs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Medical History
          </button>
          <button 
            className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>

        <div className="patient-info">
          {activeTab === 'overview' && (
            <>
              <div className="info-section">
                <div className="info-header">
                  <FiUser />
                  <h3>Personal Information</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Patient ID</label>
                    <span>{patient.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Full Name</label>
                    <span>{patient.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Age</label>
                    <span>{patient.age}</span>
                  </div>
                  <div className="info-item">
                    <label>Gender</label>
                    <span>{patient.gender}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-header">
                  <FiPhone />
                  <h3>Contact Information</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Phone</label>
                    <span>{patient.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <span>{patient.email}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-header">
                  <FiFileText />
                  <h3>Current Medications</h3>
                </div>
                <div className="medications-list">
                  {medications.map((med, index) => (
                    <div key={index} className="medication-item">
                      <div className="med-header">
                        <h4>{med.name}</h4>
                        <span className={`med-status ${med.status}`}>
                          {med.status}
                        </span>
                      </div>
                      <div className="med-details">
                        <span>{med.dosage} - {med.frequency}</span>
                        <span>{med.startDate} to {med.endDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'vitals' && (
            <div className="vitals-section">
              <div className="vital-card">
                <div className="vital-header">
                  <FiHeart className="vital-icon" />
                  <div>
                    <h3>Blood Pressure</h3>
                    <span className="current-value">{vitals.bloodPressure}</span>
                  </div>
                </div>
                <div className="vital-graph">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={vitalHistory.bloodPressure}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="systolic" 
                        stroke="#3B82F6" 
                        name="Systolic"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="diastolic" 
                        stroke="#60A5FA" 
                        name="Diastolic"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <FiActivity className="vital-icon" />
                  <div>
                    <h3>Heart Rate</h3>
                    <span className="current-value">{vitals.heartRate}</span>
                  </div>
                </div>
                <div className="vital-graph">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={vitalHistory.heartRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#DC2626" 
                        fill="#FEE2E2" 
                        name="BPM"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <FiThermometer className="vital-icon" />
                  <div>
                    <h3>Temperature</h3>
                    <span className="current-value">{vitals.temperature}</span>
                  </div>
                </div>
                <div className="vital-graph">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={vitalHistory.temperature}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#059669" 
                        name="Temperature"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <FiDroplet className="vital-icon" />
                  <div>
                    <h3>Oxygen Saturation</h3>
                    <span className="current-value">{vitals.oxygenSaturation}</span>
                  </div>
                </div>
                <div className="vital-graph">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={vitalHistory.oxygenSaturation}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6366F1" 
                        fill="#EEF2FF" 
                        name="SpO2"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="medical-history">
              <div className="history-section">
                <h3>Current Conditions</h3>
                {medicalHistory.conditions.map((condition, index) => (
                  <div key={index} className="condition-card">
                    <div className="condition-header">
                      <div className="condition-title">
                        <h4>{condition.condition}</h4>
                        <span className={`severity-badge ${condition.severity.toLowerCase()}`}>
                          {condition.severity}
                        </span>
                      </div>
                      <span className="condition-date">
                        Diagnosed: {condition.diagnosedDate}
                      </span>
                    </div>
                    
                    <div className="condition-details">
                      <p>{condition.notes}</p>
                      
                      <div className="treatments-section">
                        <h5>Treatments</h5>
                        {condition.treatments.map((treatment, idx) => (
                          <div key={idx} className="treatment-item">
                            <span className="treatment-type">{treatment.type}</span>
                            <div className="treatment-details">
                              <strong>{treatment.name}</strong>
                              {treatment.dosage && <span>{treatment.dosage}</span>}
                              <span>{treatment.startDate} - {treatment.endDate || 'Present'}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="progress-section">
                        <h5>Progress Notes</h5>
                        {condition.progressNotes.map((note, idx) => (
                          <div key={idx} className="progress-note">
                            <span className="note-date">{note.date}</span>
                            <p>{note.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="history-section">
                <h3>Allergies</h3>
                <div className="allergies-grid">
                  {medicalHistory.allergies.map((allergy, index) => (
                    <div key={index} className="allergy-card">
                      <div className="allergy-header">
                        <span className={`severity-badge ${allergy.severity.toLowerCase()}`}>
                          {allergy.severity}
                        </span>
                      </div>
                      <h4>{allergy.allergen}</h4>
                      <p>Reaction: {allergy.reaction}</p>
                      <span className="diagnosis-date">Diagnosed: {allergy.diagnosed}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="history-section">
                <h3>Recent Lab Results</h3>
                {medicalHistory.labResults.map((lab, index) => (
                  <div key={index} className="lab-results-card">
                    <div className="lab-header">
                      <h4>{lab.type}</h4>
                      <span>{lab.date}</span>
                    </div>
                    <div className="lab-results-grid">
                      {lab.results.map((result, idx) => (
                        <div key={idx} className="lab-result-item">
                          <span className="result-name">{result.name}</span>
                          <div className="result-value">
                            <strong>{result.value}</strong>
                            <span className="result-unit">{result.unit}</span>
                          </div>
                          <span className="result-range">Range: {result.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="history-section">
                <h3>Surgical History</h3>
                {medicalHistory.surgeries.map((surgery, index) => (
                  <div key={index} className="surgery-card">
                    <div className="surgery-header">
                      <h4>{surgery.procedure}</h4>
                      <span>{surgery.date}</span>
                    </div>
                    <div className="surgery-details">
                      <p><strong>Surgeon:</strong> {surgery.surgeon}</p>
                      <p><strong>Hospital:</strong> {surgery.hospital}</p>
                      <p>{surgery.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="appointments-section">
              <div className="appointments-header">
                <h3>Appointment History</h3>
                <div className="appointment-filters">
                  <select defaultValue="all" className="appointment-filter">
                    <option value="all">All Appointments</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="appointments-list">
                {appointments.map((apt) => (
                  <div key={apt.id} className={`appointment-card ${apt.status}`}>
                    <div className="appointment-header">
                      <div className="appointment-type">
                        <span className={`type-badge ${apt.type.toLowerCase().replace(/\s+/g, '-')}`}>
                          {apt.type}
                        </span>
                        <span className={`status-badge ${apt.status}`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="appointment-datetime">
                        <FiCalendar />
                        <span>{apt.date}</span>
                        <FiClock />
                        <span>{apt.time}</span>
                      </div>
                    </div>

                    <div className="appointment-body">
                      <div className="appointment-details">
                        <div className="detail-item">
                          <label>Doctor</label>
                          <span>{apt.doctor}</span>
                          <small>{apt.department}</small>
                        </div>
                        <div className="detail-item">
                          <label>Location</label>
                          <span>{apt.location}</span>
                          <small>Duration: {apt.duration}</small>
                        </div>
                      </div>

                      {apt.notes && (
                        <div className="appointment-notes">
                          <label>Notes</label>
                          <p>{apt.notes}</p>
                        </div>
                      )}

                      {apt.vitalsRecorded && (
                        <div className="vitals-recorded">
                          <label>Vitals Recorded</label>
                          <div className="vitals-grid">
                            {Object.entries(apt.vitalsRecorded).map(([key, value]) => (
                              <div key={key} className="vital-item">
                                <span className="vital-label">{key}</span>
                                <span className="vital-value">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {apt.followUp && apt.followUp.recommended && (
                        <div className="follow-up-info">
                          <label>Follow-up</label>
                          <p>Scheduled for {apt.followUp.date}</p>
                          <small>{apt.followUp.reason}</small>
                        </div>
                      )}

                      {apt.preparationInstructions && (
                        <div className="preparation-instructions">
                          <label>Preparation Instructions</label>
                          <ul>
                            {apt.preparationInstructions.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {apt.prescriptions && (
                        <div className="prescriptions">
                          <label>Prescriptions</label>
                          <div className="prescriptions-list">
                            {apt.prescriptions.map((prescription, index) => (
                              <div key={index} className="prescription-item">
                                <span className="med-name">{prescription.name}</span>
                                <span className="med-details">
                                  {prescription.dosage} - {prescription.frequency}
                                </span>
                                <span className="med-duration">{prescription.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal; 