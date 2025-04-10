import React, { useState } from 'react';
import { FiCalendar, FiMessageCircle, FiMapPin, FiAlertCircle, FiChevronRight, FiCheck } from 'react-icons/fi';
import HospitalLocator from './HospitalLocator';
import MessageModal from './MessageModal';
import './QuickActions.css';

const ActionCard = ({ icon: Icon, title, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    onClick();
    
    // Reset the clicked state after animation completes
    setTimeout(() => {
      setIsClicked(false);
    }, 1500);
  };
  
  return (
    <div 
      className={`action-card ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={title}
    >
      <div className="action-icon">
        {isClicked ? <FiCheck className="success-icon" /> : <Icon />}
      </div>
      <div className="action-content">
        <h3 className="action-title">{title}</h3>
        <p className="action-description">{description}</p>
      </div>
      <div className="action-arrow">
        <FiChevronRight />
      </div>
      
      {isClicked && <div className="action-feedback">Action initiated!</div>}
    </div>
  );
};

const QuickActions = () => {
  const [hospitalLocatorOpen, setHospitalLocatorOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  
  const handleBookAppointment = () => {
    console.log('Navigating to appointment booking');
    // In a real app, this would navigate to the appointment booking page
    // For demo purposes, we'll just show a success message
    alert('Appointment booking page opened!');
  };
  
  const handleRequestConsultation = () => {
    console.log('Opening consultation request form');
    // Open the consultation request modal
    setConsultationModalOpen(true);
  };
  
  const handleLocateHospital = () => {
    console.log('Opening hospital location map');
    // Open the hospital locator modal
    setHospitalLocatorOpen(true);
  };
  
  const handleEmergency = () => {
    console.log('Accessing emergency services');
    // In a real app, this would provide emergency contact information
    // For demo purposes, we'll just show a success message
    alert('Emergency services information displayed!');
  };
  
  const actions = [
    {
      id: 1,
      icon: FiCalendar,
      title: 'Book an Appointment',
      description: 'Find a doctor and specialization',
      onClick: handleBookAppointment
    },
    {
      id: 2,
      icon: FiMessageCircle,
      title: 'Request Consultation',
      description: 'Talk to a specialist',
      onClick: handleRequestConsultation
    },
    {
      id: 3,
      icon: FiMapPin,
      title: 'Locate a hospital near you',
      description: 'Find closest hospitals',
      onClick: handleLocateHospital
    },
    {
      id: 4,
      icon: FiAlertCircle,
      title: 'Emergency',
      description: 'Request immediate help',
      onClick: handleEmergency
    }
  ];
  
  return (
    <div className="quick-actions-container">
      <h2 className="section-title">Quick Actions</h2>
      
      <div className="actions-list">
        {actions.map(action => (
          <ActionCard 
            key={action.id}
            icon={action.icon}
            title={action.title}
            description={action.description}
            onClick={action.onClick}
          />
        ))}
      </div>
      
      <HospitalLocator 
        isOpen={hospitalLocatorOpen}
        onClose={() => setHospitalLocatorOpen(false)}
      />
      
      <MessageModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
};

export default QuickActions; 