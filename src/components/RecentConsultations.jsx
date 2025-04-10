import React, { useState } from 'react';
import { FiMessageSquare, FiChevronRight, FiCalendar } from 'react-icons/fi';
import MessageModal from './MessageModal';
import './RecentConsultations.css';

const DoctorCard = ({ doctor, specialty, image, onMessageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMessageClick = (e) => {
    e.stopPropagation();
    onMessageClick(doctor);
  };
  
  const handleCardClick = () => {
    // Redirect to doctor profile or consultation details
    console.log(`Viewing details for ${doctor}`);
    // This would typically navigate to the doctor's profile page
  };
  
  return (
    <div 
      className={`doctor-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${doctor}, ${specialty}`}
    >
      <div className="doctor-info">
        <div className="doctor-avatar">
          <img src={image} alt={doctor} />
        </div>
        <div className="doctor-details">
          <h3 className="doctor-name">{doctor}</h3>
          <p className="doctor-specialty">{specialty}</p>
        </div>
      </div>
      <button 
        className="message-button" 
        onClick={handleMessageClick}
        aria-label={`Message ${doctor}`}
      >
        <FiMessageSquare />
        <span>Message</span>
      </button>
    </div>
  );
};

const RecentConsultations = () => {
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const doctors = [
    {
      id: 1,
      name: 'Dr. Albert',
      specialty: 'Cardiologist',
      image: 'https://randomuser.me/api/portraits/men/1.jpg' // Using randomuser.me for placeholder images
    },
    {
      id: 2,
      name: 'Dr. Paul',
      specialty: 'Neurologist',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Sarah',
      specialty: 'Pediatrician',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 4,
      name: 'Dr. Chen',
      specialty: 'Dermatologist',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];
  
  const handleMessageClick = (doctorName) => {
    setSelectedDoctor(doctorName);
    setMessageModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setMessageModalOpen(false);
    // Reset selected doctor after a short delay to allow for animation
    setTimeout(() => {
      setSelectedDoctor(null);
    }, 300);
  };
  
  const handleSeeAll = () => {
    // Redirect to all consultations page
    console.log('Navigating to all consultations');
    // This would typically navigate to a page listing all consultations
  };
  
  return (
    <div className="consultations-container">
      <div className="consultations-header">
        <h2 className="section-title">Recent Consultations</h2>
        <button 
          className="see-all-button" 
          onClick={handleSeeAll}
          aria-label="See all consultations"
        >
          <span>See all</span>
          <FiChevronRight />
        </button>
      </div>
      
      <div className="doctors-grid">
        {doctors.map(doctor => (
          <DoctorCard 
            key={doctor.id}
            doctor={doctor.name}
            specialty={doctor.specialty}
            image={doctor.image}
            onMessageClick={handleMessageClick}
          />
        ))}
      </div>
      
      <MessageModal 
        isOpen={messageModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default RecentConsultations; 