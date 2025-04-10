import React, { useState } from 'react';
import { 
  FiAlertTriangle, 
  FiCalendar, 
  FiShield, 
  FiInfo,
  FiAlertCircle,
  FiPlusCircle
} from 'react-icons/fi';
import './AllergiesSection.css';

const initialAllergies = [
  {
    id: 1,
    allergen: "Penicillin",
    type: "medication",
    reactionType: "Anaphylaxis",
    severity: "severe",
    diagnosedDate: "2023-05-15",
    doctor: "Dr. Sarah Wilson",
    notes: "Complete avoidance of penicillin and related antibiotics required.",
    emergency: [
      "Stop medication immediately",
      "Use EpiPen if symptoms of anaphylaxis appear",
      "Seek immediate emergency care",
      "Contact allergist"
    ],
    treatments: [
      {
        name: "EpiPen",
        instructions: "Inject into outer thigh if severe reaction occurs"
      },
      {
        name: "Alternative Antibiotics",
        instructions: "Use only prescribed alternatives when needed"
      }
    ]
  },
  {
    id: 2,
    allergen: "Peanuts",
    type: "food",
    reactionType: "Severe allergic reaction",
    severity: "severe",
    diagnosedDate: "2023-03-10",
    doctor: "Dr. Michael Chen",
    notes: "Strict avoidance of all peanut products. Cross-contamination risk.",
    emergency: [
      "Use EpiPen immediately for severe reactions",
      "Call emergency services",
      "Use antihistamine for mild reactions"
    ],
    treatments: [
      {
        name: "EpiPen",
        instructions: "Carry at all times, inject if exposed"
      },
      {
        name: "Benadryl",
        instructions: "Take for mild reactions only"
      }
    ]
  },
  {
    id: 3,
    allergen: "Pollen",
    type: "environmental",
    reactionType: "Seasonal allergic rhinitis",
    severity: "moderate",
    diagnosedDate: "2023-08-20",
    doctor: "Dr. Sarah Wilson",
    notes: "Seasonal allergy with peak symptoms during spring.",
    emergency: [
      "Take prescribed antihistamine",
      "Avoid outdoor exposure during peak pollen times",
      "Use air purifier indoors"
    ],
    treatments: [
      {
        name: "Cetirizine",
        instructions: "Take daily during allergy season"
      },
      {
        name: "Nasal Spray",
        instructions: "Use as needed for congestion"
      }
    ]
  }
];

const AllergyCard = ({ allergy }) => {
  const [showEmergency, setShowEmergency] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return '#059669';
      case 'moderate': return '#F59E0B';
      case 'severe': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <div className={`allergy-card severity-${allergy.severity}`}>
      <div className="allergy-header">
        <div className="allergy-title">
          <h3>{allergy.allergen}</h3>
          <span className="allergy-type">{allergy.type}</span>
        </div>
        <div className="severity-indicator">
          <FiAlertTriangle />
          <span>{allergy.severity}</span>
        </div>
      </div>

      <div className="allergy-details">
        <div className="detail-row">
          <FiAlertCircle />
          <span>Reaction: {allergy.reactionType}</span>
        </div>
        <div className="detail-row">
          <FiCalendar />
          <span>Diagnosed: {new Date(allergy.diagnosedDate).toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
          <FiInfo />
          <span>Doctor: {allergy.doctor}</span>
        </div>
      </div>

      <div className="doctor-notes">
        <h4>Medical Notes</h4>
        <p>{allergy.notes}</p>
      </div>

      <div className="treatments-section">
        <h4>Prescribed Treatments</h4>
        <div className="treatments-list">
          {allergy.treatments.map((treatment, index) => (
            <div key={index} className="treatment-item">
              <strong>{treatment.name}</strong>
              <p>{treatment.instructions}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="emergency-section">
        <button 
          className="emergency-toggle"
          onClick={() => setShowEmergency(!showEmergency)}
        >
          <FiShield />
          Emergency Instructions
        </button>
        
        {showEmergency && (
          <div className="emergency-instructions">
            <ul>
              {allergy.emergency.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const AllergiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredAllergies = activeFilter === 'all' 
    ? initialAllergies
    : initialAllergies.filter(allergy => allergy.type === activeFilter);

  return (
    <div className="allergies-section">
      <div className="section-header">
        <div className="title-area">
          <h2>Allergies & Sensitivities</h2>
          <button className="add-allergy-btn">
            <FiPlusCircle />
            Add New Allergy
          </button>
        </div>
        <div className="allergy-filters">
          <button 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={activeFilter === 'medication' ? 'active' : ''} 
            onClick={() => setActiveFilter('medication')}
          >
            Medication
          </button>
          <button 
            className={activeFilter === 'food' ? 'active' : ''} 
            onClick={() => setActiveFilter('food')}
          >
            Food
          </button>
          <button 
            className={activeFilter === 'environmental' ? 'active' : ''} 
            onClick={() => setActiveFilter('environmental')}
          >
            Environmental
          </button>
        </div>
      </div>

      <div className="allergies-grid">
        {filteredAllergies.map(allergy => (
          <AllergyCard key={allergy.id} allergy={allergy} />
        ))}
      </div>
    </div>
  );
};

export default AllergiesSection; 