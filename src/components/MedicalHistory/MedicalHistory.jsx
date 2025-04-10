import React, { useState } from 'react';
import { 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiCalendar, 
  FiMapPin,
  FiActivity,
  FiAlertCircle,
  FiClock,
  FiBookmark,
  FiBriefcase,
  FiHeart,
  FiPlus
} from 'react-icons/fi';
import './MedicalHistory.css';
import AppointmentModal from './AppointmentModal';
import MedicalConditions from './MedicalConditions';
import AllergiesSection from './AllergiesSection';
import LabResults from './LabResults';
import VaccinationRecords from './VaccinationRecords';
import DownloadShare from './DownloadShare';

const patientInfo = {
  name: "John Doe",
  age: 35,
  gender: "Male",
  phone: "+1 (555) 123-4567",
  email: "john.doe@email.com",
  address: "123 Health St, Medical City, MC 12345",
  bloodType: "A+",
  height: "175 cm",
  weight: "75 kg",
  emergencyContact: {
    name: "Jane Doe",
    relation: "Spouse",
    phone: "+1 (555) 987-6543"
  }
};

const medicalHistory = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Diagnosis",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson",
    facility: "Central Hospital",
    details: "Diagnosed with stage 1 hypertension. Prescribed medication and lifestyle changes.",
    severity: "moderate"
  },
  {
    id: 2,
    date: "2023-11-20",
    type: "Surgery",
    condition: "Appendectomy",
    doctor: "Dr. Michael Chen",
    facility: "Memorial Hospital",
    details: "Laparoscopic appendectomy performed. Recovery normal.",
    severity: "high"
  },
  // Add more history items...
];

const doctorsInfo = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    image: "/images/doctor-1.jpg",
    hospital: "Central Hospital",
    phone: "+1 (555) 234-5678",
    email: "dr.wilson@centralhospital.com",
    consultationHours: {
      weekdays: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    nextAvailable: "2024-02-20T09:00:00",
    notes: "Regular check-ups required for blood pressure monitoring. Continue with prescribed medication and lifestyle changes.",
    rating: 4.8,
    experience: "15+ years"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Dermatologist",
    image: "/images/doctor-2.jpg",
    hospital: "Memorial Hospital",
    phone: "+1 (555) 876-5432",
    email: "dr.chen@memorialhospital.com",
    consultationHours: {
      weekdays: "8:00 AM - 4:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    nextAvailable: "2024-02-22T10:00:00",
    notes: "Post-surgery recovery progressing well. Follow-up appointment scheduled for wound check.",
    rating: 4.9,
    experience: "20+ years"
  }
];

const PersonalInfo = ({ info }) => (
  <div className="personal-info-card">
    <h2>Personal Information</h2>
    <div className="info-grid">
      <div className="info-item">
        <FiUser />
        <div>
          <label>Name</label>
          <span>{info.name}</span>
        </div>
      </div>
      <div className="info-item">
        <FiCalendar />
        <div>
          <label>Age</label>
          <span>{info.age} years</span>
        </div>
      </div>
      <div className="info-item">
        <FiPhone />
        <div>
          <label>Phone</label>
          <span>{info.phone}</span>
        </div>
      </div>
      <div className="info-item">
        <FiMail />
        <div>
          <label>Email</label>
          <span>{info.email}</span>
        </div>
      </div>
      <div className="info-item">
        <FiMapPin />
        <div>
          <label>Address</label>
          <span>{info.address}</span>
        </div>
      </div>
    </div>
    
    <div className="vitals-section">
      <h3>Vital Information</h3>
      <div className="vitals-grid">
        <div className="vital-item">
          <label>Blood Type</label>
          <span>{info.bloodType}</span>
        </div>
        <div className="vital-item">
          <label>Height</label>
          <span>{info.height}</span>
        </div>
        <div className="vital-item">
          <label>Weight</label>
          <span>{info.weight}</span>
        </div>
      </div>
    </div>

    <div className="emergency-contact">
      <h3>Emergency Contact</h3>
      <div className="emergency-info">
        <div>
          <label>Name</label>
          <span>{info.emergencyContact.name}</span>
        </div>
        <div>
          <label>Relation</label>
          <span>{info.emergencyContact.relation}</span>
        </div>
        <div>
          <label>Phone</label>
          <span>{info.emergencyContact.phone}</span>
        </div>
      </div>
    </div>
  </div>
);

const DoctorCard = ({ doctor, onBookAppointment }) => (
  <div className="doctor-info-card">
    <div className="doctor-header">
      <div className="doctor-primary-info">
        <div className="doctor-avatar">
          <img src={doctor.image} alt={doctor.name} />
        </div>
        <div>
          <h3>{doctor.name}</h3>
          <div className="specialization">
            <FiBriefcase />
            <span>{doctor.specialization}</span>
          </div>
        </div>
      </div>
      <div className="experience-badge">
        <FiHeart />
        <span>{doctor.experience}</span>
      </div>
    </div>

    <div className="doctor-details">
      <div className="detail-row">
        <FiMapPin />
        <span>{doctor.hospital}</span>
      </div>
      <div className="detail-row">
        <FiPhone />
        <span>{doctor.phone}</span>
      </div>
      <div className="detail-row">
        <FiMail />
        <span>{doctor.email}</span>
      </div>
    </div>

    <div className="consultation-hours">
      <h4>
        <FiClock />
        Consultation Hours
      </h4>
      <div className="hours-grid">
        <div>
          <label>Weekdays</label>
          <span>{doctor.consultationHours.weekdays}</span>
        </div>
        <div>
          <label>Saturday</label>
          <span>{doctor.consultationHours.saturday}</span>
        </div>
        <div>
          <label>Sunday</label>
          <span>{doctor.consultationHours.sunday}</span>
        </div>
      </div>
    </div>

    <div className="doctor-notes">
      <h4>
        <FiBookmark />
        Medical Notes
      </h4>
      <p>{doctor.notes}</p>
    </div>

    <div className="doctor-actions">
      <button className="book-appointment" onClick={() => onBookAppointment(doctor)}>
        <FiPlus />
        Book Appointment
      </button>
      <div className="next-available">
        Next available: {new Date(doctor.nextAvailable).toLocaleDateString()}
      </div>
    </div>
  </div>
);

const HistoryItem = ({ item }) => (
  <div className={`history-item ${item.severity}`}>
    <div className="history-header">
      <div className="history-type">
        <FiActivity />
        <span>{item.type}</span>
      </div>
      <div className="history-date">
        {new Date(item.date).toLocaleDateString()}
      </div>
    </div>
    
    <h3>{item.condition}</h3>
    
    <div className="history-details">
      <div className="detail-item">
        <label>Doctor</label>
        <span>{item.doctor}</span>
      </div>
      <div className="detail-item">
        <label>Facility</label>
        <span>{item.facility}</span>
      </div>
    </div>
    
    <p className="history-notes">{item.details}</p>
    
    {item.severity === 'high' && (
      <div className="alert-badge">
        <FiAlertCircle />
        <span>High Priority Condition</span>
      </div>
    )}
  </div>
);

const MedicalHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  const filteredHistory = activeTab === 'all' 
    ? medicalHistory 
    : medicalHistory.filter(item => item.type.toLowerCase() === activeTab);

  const handleBookAppointment = (doctor) => {
    setBookingDoctor(doctor);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    setAppointments([...appointments, { id: Date.now(), ...appointmentData }]);
    setBookingDoctor(null);
    // You would typically make an API call here to save the appointment
  };

  return (
    <div className="medical-history-page">
      <div className="page-header">
        <h1>Medical History</h1>
        <p>Complete medical records and history</p>
      </div>

      <PersonalInfo info={patientInfo} />

      <MedicalConditions />

      <AllergiesSection />

      <LabResults />

      <VaccinationRecords />

      <DownloadShare data={{
        patientInfo,
        conditions: medicalHistory,
        // Add other data as needed
      }} />

      <div className="doctors-section">
        <h2>Treating Physicians</h2>
        <div className="doctors-grid">
          {doctorsInfo.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      </div>

      <div className="history-section">
        <div className="history-filters">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => setActiveTab('all')}
          >
            All Records
          </button>
          <button 
            className={activeTab === 'diagnosis' ? 'active' : ''} 
            onClick={() => setActiveTab('diagnosis')}
          >
            Diagnoses
          </button>
          <button 
            className={activeTab === 'surgery' ? 'active' : ''} 
            onClick={() => setActiveTab('surgery')}
          >
            Surgeries
          </button>
        </div>

        <div className="history-grid">
          {filteredHistory.map(item => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {bookingDoctor && (
        <AppointmentModal
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
          onBook={handleAppointmentSubmit}
        />
      )}
    </div>
  );
};

export default MedicalHistory; 