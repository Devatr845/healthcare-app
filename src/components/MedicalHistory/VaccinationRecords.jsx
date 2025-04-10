import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiDownload, 
  FiUpload,
  FiPlusCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiBell,
  FiFileText
} from 'react-icons/fi';
import './VaccinationRecords.css';

const initialVaccinations = [
  {
    id: 1,
    name: "COVID-19",
    type: "mRNA",
    manufacturer: "Pfizer-BioNTech",
    doses: [
      {
        doseNumber: 1,
        date: "2023-01-15",
        location: "Central Hospital",
        administrator: "Dr. Sarah Wilson",
        batchNumber: "PFZ123456",
        notes: "No immediate adverse reactions",
        certificate: "/certificates/covid-1.pdf",
        status: "completed"
      },
      {
        doseNumber: 2,
        date: "2023-02-05",
        location: "Central Hospital",
        administrator: "Dr. Sarah Wilson",
        batchNumber: "PFZ789012",
        notes: "Mild soreness at injection site",
        certificate: "/certificates/covid-2.pdf",
        status: "completed"
      },
      {
        doseNumber: 3,
        date: "2024-02-25",
        status: "upcoming",
        notes: "Booster shot recommended"
      }
    ],
    nextDue: "2024-02-25",
    reminders: true
  },
  {
    id: 2,
    name: "Tetanus",
    type: "Td/Tdap",
    manufacturer: "GlaxoSmithKline",
    doses: [
      {
        doseNumber: 1,
        date: "2019-06-10",
        location: "Memorial Hospital",
        administrator: "Dr. Michael Chen",
        batchNumber: "GSK456789",
        notes: "Regular booster shot",
        certificate: "/certificates/tetanus-1.pdf",
        status: "completed"
      }
    ],
    nextDue: "2029-06-10",
    reminders: true
  }
];

const VaccinationCard = ({ vaccine }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      case 'upcoming':
        return <FiClock className="status-icon upcoming" />;
      case 'missed':
        return <FiAlertCircle className="status-icon missed" />;
      default:
        return null;
    }
  };

  const handleFileUpload = (e) => {
    // Handle certificate upload
    console.log('Certificate upload:', e.target.files[0]);
  };

  return (
    <div className="vaccination-card">
      <div className="vaccine-header" onClick={() => setShowDetails(!showDetails)}>
        <div className="vaccine-info">
          <h3>{vaccine.name}</h3>
          <span className="vaccine-type">{vaccine.type}</span>
        </div>
        <div className="next-due">
          {vaccine.nextDue && (
            <>
              <FiCalendar />
              <span>Next due: {new Date(vaccine.nextDue).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="vaccine-details">
          <div className="manufacturer-info">
            <label>Manufacturer:</label>
            <span>{vaccine.manufacturer}</span>
          </div>

          <div className="doses-section">
            <h4>Vaccination History</h4>
            {vaccine.doses.map((dose, index) => (
              <div key={index} className={`dose-item ${dose.status}`}>
                <div className="dose-header">
                  <div className="dose-title">
                    <span className="dose-number">Dose {dose.doseNumber}</span>
                    {getStatusIcon(dose.status)}
                  </div>
                  {dose.date && (
                    <span className="dose-date">
                      {new Date(dose.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {dose.status === 'completed' && (
                  <>
                    <div className="dose-details">
                      <div className="detail-row">
                        <label>Location:</label>
                        <span>{dose.location}</span>
                      </div>
                      <div className="detail-row">
                        <label>Administrator:</label>
                        <span>{dose.administrator}</span>
                      </div>
                      <div className="detail-row">
                        <label>Batch Number:</label>
                        <span>{dose.batchNumber}</span>
                      </div>
                    </div>

                    <div className="dose-actions">
                      <button className="download-cert">
                        <FiDownload />
                        Download Certificate
                      </button>
                      <label className="upload-cert">
                        <FiUpload />
                        Upload Certificate
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          hidden
                        />
                      </label>
                    </div>
                  </>
                )}

                {dose.notes && (
                  <div className="dose-notes">
                    <FiFileText />
                    <p>{dose.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="reminder-toggle">
            <label className="toggle">
              <input
                type="checkbox"
                checked={vaccine.reminders}
                onChange={() => {}}
              />
              <span className="toggle-slider"></span>
            </label>
            <span>Receive reminders for upcoming doses</span>
          </div>
        </div>
      )}
    </div>
  );
};

const VaccinationRecords = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredVaccinations = activeFilter === 'all'
    ? initialVaccinations
    : initialVaccinations.filter(vaccine => {
        const latestDose = vaccine.doses[vaccine.doses.length - 1];
        return latestDose.status === activeFilter;
      });

  return (
    <div className="vaccination-records">
      <div className="section-header">
        <div className="title-area">
          <h2>Vaccination Records</h2>
          <button className="add-vaccine-btn">
            <FiPlusCircle />
            Add New Vaccine
          </button>
        </div>

        <div className="vaccine-filters">
          <button 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All Records
          </button>
          <button 
            className={activeFilter === 'completed' ? 'active' : ''} 
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={activeFilter === 'upcoming' ? 'active' : ''} 
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={activeFilter === 'missed' ? 'active' : ''} 
            onClick={() => setActiveFilter('missed')}
          >
            Missed
          </button>
        </div>
      </div>

      <div className="vaccinations-grid">
        {filteredVaccinations.map(vaccine => (
          <VaccinationCard key={vaccine.id} vaccine={vaccine} />
        ))}
      </div>
    </div>
  );
};

export default VaccinationRecords; 