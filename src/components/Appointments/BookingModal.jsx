import React, { useState } from 'react';
import { 
  FiX, 
  FiSearch, 
  FiFilter, 
  FiCalendar, 
  FiClock,
  FiVideo,
  FiUser,
  FiStar,
  FiDollarSign,
  FiMapPin,
  FiAlertCircle
} from 'react-icons/fi';
import './BookingModal.css';

const SPECIALIZATIONS = [
  'All',
  'Cardiologist',
  'Dermatologist',
  'General Physician',
  'Neurologist',
  'Pediatrician',
  'Surgeon'
];

const APPOINTMENT_TYPES = [
  {
    id: 'in-person',
    label: 'In-person Consultation',
    icon: <FiUser />,
    description: 'Visit the doctor at their clinic/hospital',
    requirements: ['Arrive 15 minutes before appointment', 'Bring previous medical records']
  },
  {
    id: 'video',
    label: 'Video Consultation',
    icon: <FiVideo />,
    description: 'Consult with doctor through video call',
    requirements: ['Stable internet connection', 'Quiet environment', 'Working camera and microphone']
  },
  {
    id: 'follow-up',
    label: 'Follow-up Visit',
    icon: <FiClock />,
    description: 'Short follow-up consultation',
    requirements: ['Previous consultation within 30 days', 'Updated health records']
  }
];

const BookingModal = ({ doctors, onClose, onBook }) => {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [notes, setNotes] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All' || 
                                 doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create appointment object and book directly
      const appointment = {
        doctor: selectedDoctor.name,
        specialization: selectedDoctor.specialization,
        date: selectedDate,
        time: selectedTime,
        type: selectedType,
        notes: notes,
        location: selectedType === 'video' ? 'Video Consultation' : `${selectedDoctor.name}'s Office`
      };
      
      // Pass directly to the parent's onBook handler and close this modal
      onBook(appointment);
      // No need to manually close - parent component will handle this
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return selectedType !== null;
      default:
        return false;
    }
  };

  const getAvailableSlots = (date) => {
    if (!selectedDoctor || !date) return [];
    
    const dayOfWeek = new Date(date)
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
      
    return selectedDoctor.availability[dayOfWeek] || [];
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <div className="modal-header">
          <div className="steps-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              1. Select Doctor
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              2. Choose Time
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              3. Appointment Type
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close booking form">
            <FiX />
          </button>
        </div>

        {step === 1 && (
          <div className="doctor-selection">
            <div className="search-filters">
              <div className="search-bar">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="specialization-filters">
                {SPECIALIZATIONS.map(spec => (
                  <button
                    key={spec}
                    className={selectedSpecialization === spec ? 'active' : ''}
                    onClick={() => setSelectedSpecialization(spec)}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div className="doctors-list">
              {filteredDoctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialization">{doctor.specialization}</p>
                    <div className="doctor-details">
                      <span className="rating">
                        <FiStar />
                        {doctor.rating}
                      </span>
                      <span className="next-available">
                        <FiCalendar />
                        Next Available: {new Date(doctor.nextAvailable).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="time-selection">
            <div className="calendar-section">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(''); // Reset time when date changes
                }}
              />
              
              {selectedDate && (
                <div className="time-slots">
                  {getAvailableSlots(selectedDate).map(time => (
                    <button
                      key={time}
                      className={selectedTime === time ? 'active' : ''}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="type-selection">
            <div className="appointment-types">
              {APPOINTMENT_TYPES.map(type => (
                <div
                  key={type.id}
                  className={`type-card ${selectedType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="type-header">
                    {type.icon}
                    <h3>{type.label}</h3>
                  </div>
                  <p>{type.description}</p>
                  <div className="requirements">
                    <h4>Requirements:</h4>
                    <ul>
                      {type.requirements.map((req, index) => (
                        <li key={index}>
                          <FiAlertCircle />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="notes-section">
              <label>Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific concerns or information for the doctor?"
              />
            </div>
          </div>
        )}

        <div className="modal-footer">
          {step > 1 && (
            <button 
              className="back-btn"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          <button
            className="next-btn"
            disabled={!isStepValid()}
            onClick={handleNext}
          >
            {step === 3 ? 'Confirm Booking' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 