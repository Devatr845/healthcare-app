import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiCheck, 
  FiX, 
  FiAlertCircle, 
  FiRefreshCw, 
  FiMaximize, 
  FiDownload,
  FiInfo,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiFilter
} from 'react-icons/fi';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './MedicationTrackingSection.css';

// Mock data for medications
const mockMedications = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    timeOfDay: 'Morning',
    purpose: 'Blood Pressure',
    refillDate: '2023-06-15',
    refillsRemaining: 2,
    instructions: 'Take with food',
    sideEffects: ['Dizziness', 'Cough', 'Headache'],
    adherence: {
      lastWeek: [
        { day: 'Mon', taken: true, onTime: true },
        { day: 'Tue', taken: true, onTime: true },
        { day: 'Wed', taken: true, onTime: false },
        { day: 'Thu', taken: true, onTime: true },
        { day: 'Fri', taken: true, onTime: true },
        { day: 'Sat', taken: false, onTime: false },
        { day: 'Sun', taken: true, onTime: true }
      ]
    }
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timeOfDay: 'Morning and Evening',
    purpose: 'Diabetes',
    refillDate: '2023-06-05',
    refillsRemaining: 1,
    instructions: 'Take with meals',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain'],
    adherence: {
      lastWeek: [
        { day: 'Mon', taken: true, onTime: true },
        { day: 'Tue', taken: true, onTime: true },
        { day: 'Wed', taken: true, onTime: true },
        { day: 'Thu', taken: true, onTime: false },
        { day: 'Fri', taken: true, onTime: true },
        { day: 'Sat', taken: true, onTime: true },
        { day: 'Sun', taken: true, onTime: true }
      ]
    }
  },
  {
    id: 3,
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    timeOfDay: 'Evening',
    purpose: 'Cholesterol',
    refillDate: '2023-07-10',
    refillsRemaining: 3,
    instructions: 'Take at bedtime',
    sideEffects: ['Muscle pain', 'Joint pain', 'Fatigue'],
    adherence: {
      lastWeek: [
        { day: 'Mon', taken: true, onTime: true },
        { day: 'Tue', taken: true, onTime: true },
        { day: 'Wed', taken: false, onTime: false },
        { day: 'Thu', taken: true, onTime: false },
        { day: 'Fri', taken: true, onTime: true },
        { day: 'Sat', taken: true, onTime: true },
        { day: 'Sun', taken: true, onTime: true }
      ]
    }
  }
];

// Mock data for adherence over time
const mockAdherenceData = [
  { month: 'Jan', adherenceRate: 92 },
  { month: 'Feb', adherenceRate: 88 },
  { month: 'Mar', adherenceRate: 95 },
  { month: 'Apr', adherenceRate: 90 },
  { month: 'May', adherenceRate: 85 }
];

// Mock data for today's schedule
const mockTodaySchedule = [
  { 
    id: 1, 
    time: '8:00 AM', 
    medication: 'Lisinopril', 
    dosage: '10mg', 
    status: 'taken', 
    takenAt: '8:05 AM' 
  },
  { 
    id: 2, 
    time: '8:00 AM', 
    medication: 'Metformin', 
    dosage: '500mg', 
    status: 'taken', 
    takenAt: '8:05 AM' 
  },
  { 
    id: 3, 
    time: '8:00 PM', 
    medication: 'Metformin', 
    dosage: '500mg', 
    status: 'upcoming', 
    takenAt: null 
  },
  { 
    id: 4, 
    time: '10:00 PM', 
    medication: 'Atorvastatin', 
    dosage: '20mg', 
    status: 'upcoming', 
    takenAt: null 
  }
];

// AI insights for medications
const mockMedicationInsights = [
  "Your adherence to Lisinopril has improved by 15% this month.",
  "Consider setting a reminder for your evening medications to improve on-time adherence.",
  "You're due for a refill of Metformin in 5 days. Schedule a pharmacy visit soon."
];

const MedicationTrackingSection = ({ timeFrame }) => {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate adherence statistics
  const calculateAdherenceStats = () => {
    let totalDays = 0;
    let takenDays = 0;
    let onTimeDays = 0;

    mockMedications.forEach(med => {
      med.adherence.lastWeek.forEach(day => {
        totalDays++;
        if (day.taken) takenDays++;
        if (day.onTime) onTimeDays++;
      });
    });

    return {
      adherenceRate: Math.round((takenDays / totalDays) * 100),
      onTimeRate: Math.round((onTimeDays / totalDays) * 100),
      missedRate: Math.round(((totalDays - takenDays) / totalDays) * 100)
    };
  };

  const adherenceStats = calculateAdherenceStats();

  // Prepare data for pie chart
  const adherencePieData = [
    { name: 'On Time', value: adherenceStats.onTimeRate, color: '#4CAF50' },
    { name: 'Taken Late', value: adherenceStats.adherenceRate - adherenceStats.onTimeRate, color: '#FFC107' },
    { name: 'Missed', value: adherenceStats.missedRate, color: '#F44336' }
  ];

  // Handle medication selection
  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    setShowDetails(true);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'taken':
        return <FiCheck className="status-icon taken" />;
      case 'missed':
        return <FiX className="status-icon missed" />;
      case 'upcoming':
        return <FiClock className="status-icon upcoming" />;
      default:
        return null;
    }
  };

  // Get refill urgency class
  const getRefillUrgencyClass = (medication) => {
    const today = new Date();
    const refillDate = new Date(medication.refillDate);
    const daysUntilRefill = Math.ceil((refillDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilRefill <= 5) return 'urgent';
    if (daysUntilRefill <= 14) return 'warning';
    return 'normal';
  };

  return (
    <div className="medication-tracking-section">
      <section className="analytics-section medication-adherence-section">
        <div className="section-header">
          <h2 className="section-title">Medication Adherence</h2>
          <div className="section-actions">
            <button aria-label="Refresh data">
              <FiRefreshCw />
            </button>
            <button aria-label="Expand section">
              <FiMaximize />
            </button>
            <button aria-label="Download data">
              <FiDownload />
            </button>
          </div>
        </div>

        <div className="adherence-overview">
          <div className="adherence-chart">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={adherencePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {adherencePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="adherence-stats">
            <div className="stat-card">
              <h3>Overall Adherence</h3>
              <div className="stat-value">{adherenceStats.adherenceRate}%</div>
              <div className="stat-label">Medications Taken</div>
            </div>
            <div className="stat-card">
              <h3>On-Time Rate</h3>
              <div className="stat-value">{adherenceStats.onTimeRate}%</div>
              <div className="stat-label">Taken as Scheduled</div>
            </div>
            <div className="stat-card">
              <h3>Missed Doses</h3>
              <div className="stat-value">{adherenceStats.missedRate}%</div>
              <div className="stat-label">Not Taken</div>
            </div>
          </div>
        </div>

        <div className="adherence-trend">
          <h3>Adherence Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAdherenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="adherenceRate" name="Adherence Rate (%)" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="ai-insights">
          <h3><FiInfo /> AI-Driven Insights</h3>
          <ul>
            {mockMedicationInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="analytics-section medication-schedule-section">
        <div className="section-header">
          <h2 className="section-title">Today's Medication Schedule</h2>
          <div className="section-actions">
            <button aria-label="Filter schedule">
              <FiFilter />
            </button>
            <button aria-label="Add medication">
              <FiPlusCircle />
            </button>
          </div>
        </div>

        <div className="schedule-list">
          {mockTodaySchedule.map((item) => (
            <div key={item.id} className={`schedule-item ${item.status}`}>
              <div className="schedule-time">
                <FiClock />
                <span>{item.time}</span>
              </div>
              <div className="schedule-details">
                <h3>{item.medication}</h3>
                <p>{item.dosage}</p>
              </div>
              <div className="schedule-status">
                {getStatusIcon(item.status)}
                <span>
                  {item.status === 'taken' ? `Taken at ${item.takenAt}` : 
                   item.status === 'missed' ? 'Missed' : 'Upcoming'}
                </span>
              </div>
              <div className="schedule-actions">
                {item.status === 'upcoming' && (
                  <button className="take-button" aria-label="Mark as taken">
                    Take Now
                  </button>
                )}
                <button className="icon-button" aria-label="Edit medication">
                  <FiEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-section medication-list-section">
        <div className="section-header">
          <h2 className="section-title">Your Medications</h2>
          <div className="section-actions">
            <button aria-label="Add new medication">
              <FiPlusCircle />
            </button>
          </div>
        </div>

        <div className="medications-list">
          {mockMedications.map((medication) => (
            <div 
              key={medication.id} 
              className="medication-card"
              onClick={() => handleMedicationSelect(medication)}
            >
              <div className="medication-header">
                <h3>{medication.name}</h3>
                <span className="medication-dosage">{medication.dosage}</span>
              </div>
              <div className="medication-info">
                <p><strong>Purpose:</strong> {medication.purpose}</p>
                <p><strong>Frequency:</strong> {medication.frequency}</p>
                <p><strong>Time:</strong> {medication.timeOfDay}</p>
              </div>
              <div className={`refill-info ${getRefillUrgencyClass(medication)}`}>
                <FiCalendar />
                <span>Refill: {new Date(medication.refillDate).toLocaleDateString()}</span>
                <span className="refills-remaining">({medication.refillsRemaining} refills left)</span>
              </div>
              <div className="medication-adherence">
                <div className="adherence-days">
                  {medication.adherence.lastWeek.map((day, index) => (
                    <div 
                      key={index} 
                      className={`adherence-day ${day.taken ? (day.onTime ? 'on-time' : 'late') : 'missed'}`}
                      title={`${day.day}: ${day.taken ? (day.onTime ? 'Taken on time' : 'Taken late') : 'Missed'}`}
                    >
                      <div className="day-label">{day.day.charAt(0)}</div>
                    </div>
                  ))}
                </div>
                <div className="adherence-label">
                  Last 7 days: {Math.round((medication.adherence.lastWeek.filter(day => day.taken).length / 7) * 100)}% adherence
                </div>
              </div>
              <div className="medication-actions">
                <button className="icon-button" aria-label="Edit medication">
                  <FiEdit />
                </button>
                <button className="icon-button" aria-label="Request refill">
                  <FiRefreshCw />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showDetails && selectedMedication && (
        <div className="medication-details-overlay">
          <div className="medication-details-modal">
            <div className="modal-header">
              <h2>{selectedMedication.name} Details</h2>
              <button 
                className="close-button" 
                onClick={() => setShowDetails(false)}
                aria-label="Close details"
              >
                <FiX />
              </button>
            </div>
            <div className="modal-content">
              <div className="details-section">
                <h3>Medication Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Dosage</span>
                    <span className="detail-value">{selectedMedication.dosage}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Frequency</span>
                    <span className="detail-value">{selectedMedication.frequency}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Time of Day</span>
                    <span className="detail-value">{selectedMedication.timeOfDay}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Purpose</span>
                    <span className="detail-value">{selectedMedication.purpose}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Next Refill</span>
                    <span className="detail-value">{new Date(selectedMedication.refillDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Refills Remaining</span>
                    <span className="detail-value">{selectedMedication.refillsRemaining}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-section">
                <h3>Instructions</h3>
                <p>{selectedMedication.instructions}</p>
              </div>
              
              <div className="details-section">
                <h3>Possible Side Effects</h3>
                <ul className="side-effects-list">
                  {selectedMedication.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
              
              <div className="details-section">
                <h3>Adherence History</h3>
                <div className="adherence-calendar">
                  <div className="calendar-header">
                    {selectedMedication.adherence.lastWeek.map((day, index) => (
                      <div key={index} className="calendar-day-header">{day.day}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {selectedMedication.adherence.lastWeek.map((day, index) => (
                      <div 
                        key={index} 
                        className={`calendar-day ${day.taken ? (day.onTime ? 'on-time' : 'late') : 'missed'}`}
                      >
                        {day.taken ? (day.onTime ? <FiCheck /> : <FiClock />) : <FiX />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="secondary-button">
                <FiEdit /> Edit Medication
              </button>
              <button className="primary-button">
                <FiRefreshCw /> Request Refill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationTrackingSection; 