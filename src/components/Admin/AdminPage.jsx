import React, { useState } from 'react';
import './AdminPage.css';
import { 
  FiUsers, FiSettings, FiDatabase, FiShield, 
  FiActivity, FiHeart, FiDownload, FiShare2,
  FiCalendar, FiClock, FiAlertTriangle, FiEdit2, FiTrash2, FiSearch,
  FiFilter, FiPlus, FiFileText, FiBell
} from 'react-icons/fi';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PatientMetrics from './PatientMetrics';
import AppointmentManagement from './AppointmentManagement';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PatientPDF from './PatientPDF';
import AddPatientModal from './AddPatientModal';
import ConfirmationDialog from './ConfirmationDialog';
import PatientActivityLogs from './PatientActivityLogs';
import HealthSummaryReport from './HealthSummaryReport';
import PatientsPage from './PatientsPage';
import MetricsPage from './MetricsPage';
import PrescriptionManagement from './PrescriptionManagement';
import Settings from './Settings';
import PatientDashboard from './PatientDashboard';
import EmergencySetup from './EmergencySetup';
import EmergencyAlerts from './EmergencyAlerts';

const AdminPage = () => {
  const [selectedView, setSelectedView] = useState('appointments'); // Set default to appointments
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeRange, setTimeRange] = useState('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [patientsData, setPatientsData] = useState([]);

  const handleEditPatient = (patient) => {
    // Implementation
  };

  const handleDeletePatient = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    // Implementation
    setShowDeleteConfirmation(false);
    setPatientToDelete(null);
  };

  const handleAddPatient = (newPatient) => {
    // Here you would typically make an API call to add the patient
    // For now, we'll just update the local state
    setPatientsData(prevPatients => [...prevPatients, newPatient]);
    setShowAddModal(false);
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <PatientDashboard patientId={selectedPatientId} />;
      case 'patients':
        return <PatientsPage />;
      case 'prescriptions':
        return <PrescriptionManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'emergency-setup':
        return <EmergencySetup patientId={selectedPatientId} />;
      case 'emergency-alerts':
        return <EmergencyAlerts />;
      case 'settings':
        return <Settings />;
      case 'patient-logs':
        return (
          <div className="patient-logs-section">
            <PatientActivityLogs patientId={selectedPatientId} />
            <HealthSummaryReport patientId={selectedPatientId} />
          </div>
        );
      case 'metrics':
        return <MetricsPage />;
      default:
        return <PatientDashboard patientId={selectedPatientId} />;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <div className="sidebar-menu">
          <button 
            className={`sidebar-btn ${selectedView === 'appointments' ? 'active' : ''}`}
            onClick={() => setSelectedView('appointments')}
          >
            <FiCalendar /> Appointments
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'patients' ? 'active' : ''}`}
            onClick={() => setSelectedView('patients')}
          >
            <FiUsers /> Patients
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'metrics' ? 'active' : ''}`}
            onClick={() => setSelectedView('metrics')}
          >
            <FiActivity /> Metrics
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'emergency-alerts' ? 'active' : ''}`}
            onClick={() => setSelectedView('emergency-alerts')}
          >
            <FiBell /> Emergency Alerts
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'emergency-setup' ? 'active' : ''}`}
            onClick={() => setSelectedView('emergency-setup')}
          >
            <FiAlertTriangle /> Emergency Setup
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'prescriptions' ? 'active' : ''}`}
            onClick={() => setSelectedView('prescriptions')}
          >
            <FiFileText /> Prescriptions
          </button>
          <button 
            className={`sidebar-btn ${selectedView === 'settings' ? 'active' : ''}`}
            onClick={() => setSelectedView('settings')}
          >
            <FiSettings /> Settings
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h1>{selectedView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
          {selectedView === 'patients' && (
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <FiPlus /> Add Patient
            </button>
          )}
        </div>

        <div className="content-body">
          {renderContent()}
        </div>
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPatient}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to remove this patient?"
          onConfirm={() => {
            // Handle delete confirmation
            setShowDeleteConfirmation(false);
            setPatientToDelete(null);
          }}
          onCancel={() => {
            setShowDeleteConfirmation(false);
            setPatientToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminPage; 