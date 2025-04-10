import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, 
  FiUser, FiCalendar, FiPhone, FiMail 
} from 'react-icons/fi';
import './PatientsPage.css';
import PatientDetailsModal from './PatientDetailsModal';
import AddPatientModal from './AddPatientModal';
import ConfirmationDialog from './ConfirmationDialog';

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: "PT-2024-001",
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 234-567-8900",
      email: "sarah.j@email.com",
      lastVisit: "2024-02-15",
      nextAppointment: "2024-03-01",
      status: "active",
      doctor: "Dr. Michael Chen",
      condition: "Hypertension"
    },
    {
      id: "PT-2024-002",
      name: "John Smith",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8901",
      email: "john.s@email.com",
      lastVisit: "2024-02-10",
      nextAppointment: "2024-02-25",
      status: "critical",
      doctor: "Dr. Sarah Wilson",
      condition: "Diabetes Type 2"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Handle adding new patient
  const handleAddPatient = (newPatient) => {
    // Format the patient data
    const formattedPatient = {
      id: newPatient.id,
      name: `${newPatient.firstName} ${newPatient.lastName}`,
      age: calculateAge(newPatient.dateOfBirth),
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      status: 'active',
      lastVisit: 'New Patient',
      nextAppointment: 'Not Scheduled',
      doctor: 'Unassigned',
      condition: newPatient.allergies || 'None reported',
      bloodGroup: newPatient.bloodGroup || 'Not specified',
      address: newPatient.address,
      emergencyContact: newPatient.emergencyContact,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setPatients(prevPatients => [...prevPatients, formattedPatient]);
    setShowAddModal(false);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Filter patients based on search term and status
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Add delete handler
  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteConfirmation(true);
  };

  // Add confirm delete handler
  const handleConfirmDelete = () => {
    setPatients(prevPatients => 
      prevPatients.filter(p => p.id !== patientToDelete.id)
    );
    setShowDeleteConfirmation(false);
    setPatientToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="skeleton-loader" style={{ width: '100%', height: '400px' }} />
      </div>
    );
  }

  return (
    <div className="patients-page">
      <div className="search-filters">
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Patients
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'critical' ? 'active' : ''}`}
            onClick={() => setFilterStatus('critical')}
          >
            Critical
          </button>
        </div>
        <button className="add-patient-btn" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New Patient
        </button>
      </div>

      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age/Gender</th>
              <th>Contact</th>
              <th>Last Visit</th>
              <th>Next Appointment</th>
              <th>Status</th>
              <th>Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>
                  <div className="patient-name">
                    <FiUser />
                    <span>{patient.name}</span>
                  </div>
                </td>
                <td>{`${patient.age} / ${patient.gender}`}</td>
                <td>
                  <div className="contact-info">
                    <div>{patient.phone}</div>
                    <div>{patient.email}</div>
                  </div>
                </td>
                <td>{patient.lastVisit}</td>
                <td>{patient.nextAppointment}</td>
                <td>
                  <span className={`status-badge ${patient.status}`}>
                    {patient.status}
                  </span>
                </td>
                <td>{patient.doctor}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      View Details
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(patient)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPatient}
        />
      )}

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationDialog
          title="Delete Patient"
          message={`Are you sure you want to remove ${patientToDelete.name} from the system?`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowDeleteConfirmation(false);
            setPatientToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientsPage; 