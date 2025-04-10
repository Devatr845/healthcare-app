import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, FiClock, FiUser, FiAlertCircle, FiCheck, FiX, 
  FiEdit2, FiPhoneCall, FiMapPin, FiFileText, FiTag, FiInfo, FiDownload 
} from 'react-icons/fi';
import './AppointmentManagement.css';
import EmergencyAppointmentModal from './EmergencyAppointmentModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AppointmentPDF from './AppointmentPDF';
import TimeSlotAssigner from './TimeSlotAssigner';
import { toast } from 'react-toastify';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const AppointmentManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      patientId: "P1001",
      age: 45,
      gender: "Male",
      doctorName: "Dr. Sarah Wilson",
      department: "Cardiology",
      date: "2024-02-20",
      time: "10:30",
      duration: "30",
      type: "Regular Checkup",
      status: "confirmed",
      priority: "normal",
      contactNumber: "+1234567890",
      email: "john.doe@email.com",
      address: "123 Main St, City",
      notes: "Follow-up appointment for medication review",
      previousVisit: "2024-01-15",
      symptoms: ["Chest pain", "Shortness of breath"],
      medications: ["Lisinopril 10mg", "Aspirin 81mg"],
      allergies: ["Penicillin"],
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6"
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HC123456",
        validThrough: "2024-12-31"
      }
    },
    {
      id: 2,
      patientName: "Emma Smith",
      patientId: "P1002",
      age: 32,
      gender: "Female",
      doctorName: "Dr. Michael Chen",
      department: "Neurology",
      date: "2024-02-20",
      time: "11:45",
      duration: "45",
      type: "Emergency",
      status: "in-progress",
      priority: "high",
      contactNumber: "+1234567891",
      email: "emma.smith@email.com",
      address: "456 Oak Ave, City",
      notes: "Severe migraine, immediate attention required",
      previousVisit: "2024-02-10",
      symptoms: ["Severe headache", "Nausea", "Visual disturbances"],
      medications: ["Sumatriptan", "Propranolol"],
      allergies: ["None"],
      vitalSigns: {
        bloodPressure: "135/85",
        heartRate: "88",
        temperature: "99.1"
      },
      insurance: {
        provider: "MediCare Pro",
        policyNumber: "MP789012",
        validThrough: "2024-12-31"
      }
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      patientId: "P1003",
      age: 58,
      gender: "Male",
      doctorName: "Dr. Emily Brown",
      department: "Endocrinology",
      date: "2024-02-20",
      time: "14:00",
      duration: "30",
      type: "Follow-up",
      status: "cancelled",
      priority: "normal",
      contactNumber: "+1234567892",
      email: "robert.j@email.com",
      address: "789 Pine Rd, City",
      notes: "Patient called to reschedule due to work commitment",
      previousVisit: "2024-01-30",
      symptoms: ["Fatigue", "Increased thirst"],
      medications: ["Metformin 1000mg", "Glipizide 5mg"],
      allergies: ["Sulfa drugs"],
      vitalSigns: {
        bloodPressure: "128/82",
        heartRate: "76",
        temperature: "98.4"
      },
      insurance: {
        provider: "BlueCross",
        policyNumber: "BC345678",
        validThrough: "2024-12-31"
      },
      cancellationReason: "Work commitment",
      rescheduledTo: "2024-02-25"
    },
    {
      id: 4,
      patientName: "Maria Garcia",
      patientId: "P1004",
      age: 28,
      gender: "Female",
      doctorName: "Dr. James Wilson",
      department: "Dermatology",
      date: "2024-02-20",
      time: "15:30",
      duration: "30",
      type: "New Patient",
      status: "in-progress",
      priority: "normal",
      contactNumber: "+1234567893",
      email: "maria.g@email.com",
      address: "321 Elm St, City",
      notes: "First visit for skin condition assessment",
      previousVisit: null,
      symptoms: ["Skin rash", "Itching", "Redness"],
      medications: ["None"],
      allergies: ["Latex"],
      vitalSigns: {
        bloodPressure: "118/75",
        heartRate: "70",
        temperature: "98.2"
      },
      insurance: {
        provider: "HealthFirst",
        policyNumber: "HF901234",
        validThrough: "2024-12-31"
      }
    },
    {
      id: 5,
      patientName: "David Lee",
      patientId: "P1005",
      age: 41,
      gender: "Male",
      doctorName: "Dr. Sarah Wilson",
      department: "Cardiology",
      date: "2024-02-20",
      time: "16:00",
      duration: "45",
      type: "Follow-up",
      status: "cancelled",
      priority: "high",
      contactNumber: "+1234567894",
      email: "david.lee@email.com",
      address: "567 Maple Dr, City",
      notes: "Cancelled due to emergency hospitalization at another facility",
      previousVisit: "2024-02-01",
      symptoms: ["Chest pain", "Dizziness"],
      medications: ["Metoprolol", "Atorvastatin"],
      allergies: ["Iodine"],
      vitalSigns: {
        bloodPressure: "142/88",
        heartRate: "85",
        temperature: "98.8"
      },
      insurance: {
        provider: "MediCare Plus",
        policyNumber: "MP567890",
        validThrough: "2024-12-31"
      },
      cancellationReason: "Emergency hospitalization",
      emergencyContact: {
        name: "Susan Lee",
        relation: "Spouse",
        phone: "+1234567895"
      }
    }
  ]);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            status: newStatus,
            ...(newStatus === 'completed' && { completedAt: new Date().toISOString() }),
            ...(newStatus === 'cancelled' && { 
              cancellationReason: 'Cancelled by administrator',
              cancelledAt: new Date().toISOString()
            })
          };
        }
        return appointment;
      })
    );

    // Show notification
    toast.success(`Appointment ${newStatus} successfully`);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowTimeSlotModal(true);
  };

  const handleTimeSlotAssign = (slotData) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(apt => {
        if (apt.id === selectedAppointment.id) {
          return {
            ...apt,
            date: slotData.date,
            time: slotData.timeSlot,
            doctorId: slotData.doctorId,
            status: 'rescheduled',
            rescheduledFrom: {
              date: apt.date,
              time: apt.time
            }
          };
        }
        return apt;
      })
    );

    toast.success('Appointment rescheduled successfully');
    setShowTimeSlotModal(false);
    setSelectedAppointment(null);
  };

  const handleEmergencyRequest = () => {
    setShowEmergencyModal(true);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "#16A34A",
      pending: "#F59E0B",
      'in-progress': "#3B82F6",
      completed: "#6366F1",
      cancelled: "#DC2626",
      rescheduled: "#8B5CF6"
    };
    return colors[status] || "#6B7280";
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: { bg: "#F3F4F6", text: "#4B5563" },
      normal: { bg: "#EFF6FF", text: "#3B82F6" },
      high: { bg: "#FEF3C7", text: "#D97706" },
      urgent: { bg: "#FEE2E2", text: "#DC2626" }
    };
    return colors[priority] || colors.normal;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTime = selectedTimeSlot === 'all' || appointment.time === selectedTimeSlot;
    return matchesStatus && matchesSearch && matchesTime;
  });

  const renderEmergencyInfo = (appointment) => {
    if (appointment.emergencyContact) {
      return (
        <div className="emergency-contact">
          <h4>Emergency Contact</h4>
          <div className="contact-details">
            <p><strong>Name:</strong> {appointment.emergencyContact.name}</p>
            <p><strong>Relation:</strong> {appointment.emergencyContact.relation}</p>
            <p><strong>Phone:</strong> {appointment.emergencyContact.phone}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="appointment-management">
      <div className="management-header">
        <div className="header-title">
          <h2>Appointment Management</h2>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              Calendar View
            </button>
          </div>
        </div>
        <div className="header-actions">
          <PDFDownloadLink
            document={<AppointmentPDF appointments={filteredAppointments} />}
            fileName={`appointments-${new Date().toISOString().split('T')[0]}.pdf`}
            className="export-btn"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Generating PDF...' : (
                <>
                  <FiDownload /> Export PDF
                </>
              )
            }
          </PDFDownloadLink>
          <button 
            className="emergency-btn"
            onClick={handleEmergencyRequest}
          >
            <FiAlertCircle /> Emergency Appointment
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search patients, doctors, or IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="date-filter">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
          <select 
            value={selectedTimeSlot} 
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="time-slot-picker"
          >
            <option value="all">All Times</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="status-filters">
        {['all', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(status => (
          <button 
            key={status}
            className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="appointments-list">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
            <div className="appointment-header">
              <div className="patient-info">
                <h3>{appointment.patientName}</h3>
                <div className="patient-details">
                  <span className="patient-id">{appointment.patientId}</span>
                  <span className="patient-age">{appointment.age} years</span>
                  <span className="patient-gender">{appointment.gender}</span>
                </div>
              </div>
              <div className="appointment-badges">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
                <span 
                  className="priority-badge"
                  style={{ 
                    backgroundColor: getPriorityBadge(appointment.priority).bg,
                    color: getPriorityBadge(appointment.priority).text
                  }}
                >
                  {appointment.priority}
                </span>
              </div>
            </div>

            <div className="appointment-details">
              <div className="detail-row">
                <FiUser />
                <span>{appointment.doctorName}</span>
                <span className="department">{appointment.department}</span>
              </div>
              <div className="detail-row">
                <FiCalendar />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                <FiClock />
                <span>{appointment.time} ({appointment.duration} mins)</span>
              </div>
              <div className="detail-row">
                <FiPhoneCall />
                <span>{appointment.contactNumber}</span>
                <FiMapPin />
                <span>{appointment.address}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="appointment-notes">
                <div className="notes-header">
                  <FiFileText />
                  <h4>Notes</h4>
                </div>
                <p>{appointment.notes}</p>
              </div>
            )}

            <div className="medical-info">
              <div className="info-section">
                <h4>Symptoms</h4>
                <div className="tags">
                  {appointment.symptoms.map((symptom, index) => (
                    <span key={index} className="tag">
                      <FiTag /> {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <h4>Vital Signs</h4>
                <div className="vital-signs">
                  {Object.entries(appointment.vitalSigns).map(([key, value]) => (
                    <span key={key} className="vital">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="appointment-actions">
              {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                <>
                  <button 
                    className="action-btn complete"
                    onClick={() => handleStatusChange(appointment.id, 'completed')}
                  >
                    <FiCheck /> Complete
                  </button>
                  <button 
                    className="action-btn reschedule"
                    onClick={() => handleReschedule(appointment)}
                  >
                    <FiEdit2 /> Reschedule
                  </button>
                  <button 
                    className="action-btn cancel"
                    onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                  >
                    <FiX /> Cancel
                  </button>
                </>
              )}
              <button 
                className="action-btn view-details"
                onClick={() => handleViewDetails(appointment)}
              >
                <FiInfo /> View Full Details
              </button>
            </div>

            {appointment.status === 'cancelled' && (
              <div className="cancellation-reason">
                <strong>Cancellation Reason:</strong> {appointment.cancellationReason}
                {appointment.rescheduledTo && (
                  <div className="rescheduled-info">
                    <strong>Rescheduled to:</strong> {new Date(appointment.rescheduledTo).toLocaleDateString()}
                  </div>
                )}
              </div>
            )}

            {renderEmergencyInfo(appointment)}
          </div>
        ))}
      </div>

      {showEmergencyModal && (
        <EmergencyAppointmentModal 
          onClose={() => setShowEmergencyModal(false)}
          onSubmit={(data) => {
            console.log('Emergency appointment data:', data);
            setShowEmergencyModal(false);
          }}
        />
      )}

      {showTimeSlotModal && (
        <TimeSlotAssigner
          onClose={() => {
            setShowTimeSlotModal(false);
            setSelectedAppointment(null);
          }}
          onAssign={handleTimeSlotAssign}
        />
      )}

      {showDetailsModal && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default AppointmentManagement; 