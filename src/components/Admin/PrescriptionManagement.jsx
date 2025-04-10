import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiEdit2, FiTrash2, FiPlus, FiCalendar, 
  FiClock, FiAlertCircle, FiCheckCircle, FiDownload, FiPrinter,
  FiRefreshCw, FiArchive, FiAlertTriangle, FiFileText, FiEye, FiActivity,
  FiUser, FiClipboard, FiChevronDown, FiChevronUp, FiCheck, FiX, FiPackage, FiInfo,
  FiSliders, FiHome, FiSettings, FiBarChart2
} from 'react-icons/fi';
import { FaHospital } from 'react-icons/fa';
import './PrescriptionManagement.css';
import MedicalRecordsView from './MedicalRecordsView';
import AddPrescriptionModal from './AddPrescriptionModal';
import './AddPrescriptionModal.css';
import { saveAs } from 'file-saver';
import { useNavigate, useLocation } from 'react-router-dom';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const generateExportData = (prescriptions, patientName) => {
  const header = [
    'Medication',
    'Dosage',
    'Frequency',
    'Start Date',
    'End Date',
    'Status',
    'Doctor',
    'Pharmacy',
    'Refills',
    'Notes'
  ].join(',');

  const rows = prescriptions.map(prescription => [
    prescription.medication,
    prescription.dosage,
    prescription.frequency,
    formatDate(prescription.startDate),
    formatDate(prescription.endDate),
    prescription.status,
    prescription.doctor,
    prescription.pharmacy.name,
    prescription.refills,
    `"${prescription.notes.replace(/"/g, '""')}"`
  ].join(','));

  return [header, ...rows].join('\n');
};

const generatePrintContent = (prescriptions, patient) => {
  return `
    <html>
      <head>
        <title>Prescriptions - ${patient.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
          }
          .patient-info {
            margin-bottom: 30px;
          }
          .prescription {
            padding: 20px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          .prescription h3 {
            margin-top: 0;
            color: #2563EB;
          }
          .details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 16px;
          }
          .detail-item {
            margin-bottom: 8px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .pharmacy-info {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
          }
          @media print {
            .prescription {
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Prescription Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="patient-info">
          <h2>Patient Information</h2>
          <p><span class="label">Name:</span> ${patient.name}</p>
          <p><span class="label">ID:</span> ${patient.id}</p>
          <p><span class="label">Age:</span> ${patient.age} years</p>
          <p><span class="label">Blood Group:</span> ${patient.bloodGroup}</p>
        </div>

        <h2>Prescriptions</h2>
        ${prescriptions.map(prescription => `
          <div class="prescription">
            <h3>${prescription.medication}</h3>
            <div class="details">
              <div class="detail-item">
                <div class="label">Dosage</div>
                <div>${prescription.dosage}</div>
              </div>
              <div class="detail-item">
                <div class="label">Frequency</div>
                <div>${prescription.frequency}</div>
              </div>
              <div class="detail-item">
                <div class="label">Start Date</div>
                <div>${formatDate(prescription.startDate)}</div>
              </div>
              <div class="detail-item">
                <div class="label">End Date</div>
                <div>${formatDate(prescription.endDate)}</div>
              </div>
              <div class="detail-item">
                <div class="label">Status</div>
                <div>${prescription.status}</div>
              </div>
              <div class="detail-item">
                <div class="label">Refills</div>
                <div>${prescription.refills}</div>
              </div>
            </div>
            
            <div class="detail-item">
              <div class="label">Notes</div>
              <div>${prescription.notes}</div>
            </div>

            <div class="pharmacy-info">
              <div class="label">Pharmacy Information</div>
              <p>${prescription.pharmacy.name}</p>
              <p>${prescription.pharmacy.phone}</p>
              <p>${prescription.pharmacy.address}</p>
            </div>
          </div>
        `).join('')}
      </body>
    </html>
  `;
};

// Enhanced mock data with more patients - moved before component
const patients = [
  {
    id: "PT-2024-001",
    name: "Sarah Johnson",
    age: 32,
    lastPrescription: "2024-02-15",
    conditions: ["Hypertension", "Diabetes"],
    allergies: ["Penicillin"],
    bloodGroup: "O+",
    weight: "68 kg",
    height: "170 cm",
    active: true,
    prescriptions: [
      {
        id: "RX-001",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2024-02-15",
        endDate: "2024-08-15",
        status: "active",
        doctor: "Dr. Michael Chen",
        notes: "Take with food",
        refills: 3,
        interactions: ["Avoid potassium supplements"],
        sideEffects: ["Dry cough", "Dizziness"],
        pharmacy: {
          name: "Central Pharmacy",
          phone: "123-456-7890",
          address: "123 Health St"
        },
        lastRefill: "2024-02-15",
        nextRefillDate: "2024-03-15",
        adherence: 95,
        cost: 45.99,
        insurance: "Covered under plan ABC"
      },
      {
        id: "RX-002",
        medication: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-02-15",
        endDate: "2024-08-15",
        status: "active",
        doctor: "Dr. Michael Chen",
        notes: "Take with meals",
        refills: 2,
        interactions: ["Avoid alcohol"],
        sideEffects: ["Nausea", "Stomach upset"],
        pharmacy: {
          name: "Central Pharmacy",
          phone: "123-456-7890",
          address: "123 Health St"
        },
        lastRefill: "2024-02-15",
        nextRefillDate: "2024-03-15",
        adherence: 88,
        cost: 32.50,
        insurance: "Covered under plan ABC"
      }
    ],
    prescriptionHistory: [
      {
        id: "RX-H001",
        medication: "Metformin",
        status: "completed",
        startDate: "2023-08-15",
        endDate: "2024-01-15",
        doctor: "Dr. Sarah Wilson",
        notes: "Treatment completed successfully"
      }
    ]
  },
  {
    id: "PT-2024-002",
    name: "John Smith",
    age: 45,
    lastPrescription: "2024-02-10",
    conditions: ["Asthma", "High Cholesterol"],
    allergies: ["Aspirin", "Sulfa drugs"],
    bloodGroup: "A-",
    weight: "82 kg",
    height: "180 cm",
    active: true,
    prescriptions: [
      {
        id: "RX-003",
        medication: "Albuterol Inhaler",
        dosage: "90mcg",
        frequency: "As needed",
        startDate: "2024-02-10",
        endDate: "2024-08-10",
        status: "active",
        doctor: "Dr. Emily Brown",
        notes: "Use before exercise if needed",
        refills: 5,
        interactions: ["Beta blockers may reduce effectiveness"],
        sideEffects: ["Tremors", "Rapid heartbeat"],
        pharmacy: {
          name: "MedPlus Pharmacy",
          phone: "123-456-7891",
          address: "456 Care Ave"
        },
        lastRefill: "2024-02-10",
        nextRefillDate: "2024-03-10",
        adherence: 92,
        cost: 65.00,
        insurance: "Covered under plan XYZ"
      }
    ],
    prescriptionHistory: []
  },
  {
    id: "PT-2024-003",
    name: "Maria Garcia",
    age: 28,
    lastPrescription: "2024-02-18",
    conditions: ["Anxiety", "Migraine"],
    allergies: ["Latex"],
    bloodGroup: "B+",
    weight: "58 kg",
    height: "165 cm",
    prescriptions: [
      {
        id: "RX-004",
        medication: "Sertraline",
        dosage: "50mg",
        frequency: "Once daily",
        startDate: "2024-02-18",
        endDate: "2024-08-18",
        status: "active",
        doctor: "Dr. Lisa Wong",
        notes: "Take in the morning",
        refills: 4,
        interactions: ["Avoid alcohol", "Do not take with MAOIs"],
        sideEffects: ["Drowsiness", "Nausea"],
        pharmacy: {
          name: "HealthWise Pharmacy",
          phone: "123-456-7892",
          address: "789 Wellness Rd"
        },
        lastRefill: "2024-02-18",
        nextRefillDate: "2024-03-18",
        adherence: 98,
        cost: 28.75,
        insurance: "Covered under plan DEF"
      },
      {
        id: "RX-005",
        medication: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraines",
        startDate: "2024-02-18",
        endDate: "2024-08-18",
        status: "active",
        doctor: "Dr. Lisa Wong",
        notes: "Take at first sign of migraine",
        refills: 3,
        interactions: ["Do not take with MAOIs"],
        sideEffects: ["Dizziness", "Chest tightness"],
        pharmacy: {
          name: "HealthWise Pharmacy",
          phone: "123-456-7892",
          address: "789 Wellness Rd"
        },
        lastRefill: "2024-02-18",
        nextRefillDate: "2024-03-18",
        adherence: 100,
        cost: 45.00,
        insurance: "Covered under plan DEF"
      }
    ],
    prescriptionHistory: [
      {
        id: "RX-H002",
        medication: "Propranolol",
        status: "discontinued",
        startDate: "2023-06-15",
        endDate: "2023-12-15",
        doctor: "Dr. Lisa Wong",
        notes: "Switched to alternative treatment"
      }
    ]
  },
  {
    id: "PT-2024-004",
    name: "Robert Wilson",
    age: 62,
    lastPrescription: "2024-02-12",
    conditions: ["Arthritis", "Hypertension", "GERD"],
    allergies: ["NSAIDs"],
    bloodGroup: "AB+",
    weight: "78 kg",
    height: "175 cm",
    prescriptions: [
      {
        id: "RX-006",
        medication: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2024-02-12",
        endDate: "2024-08-12",
        status: "active",
        doctor: "Dr. James Miller",
        notes: "Take before breakfast",
        refills: 5,
        interactions: ["May decrease absorption of certain medications"],
        sideEffects: ["Headache", "Stomach pain"],
        pharmacy: {
          name: "Senior Care Pharmacy",
          phone: "123-456-7893",
          address: "321 Elder St"
        },
        lastRefill: "2024-02-12",
        nextRefillDate: "2024-03-12",
        adherence: 90,
        cost: 25.99,
        insurance: "Covered under Medicare Plan G"
      }
    ],
    prescriptionHistory: [
      {
        id: "RX-H003",
        medication: "Naproxen",
        status: "discontinued",
        startDate: "2023-05-10",
        endDate: "2023-11-10",
        doctor: "Dr. James Miller",
        notes: "Discontinued due to allergic reaction"
      }
    ]
  }
];

const PrescriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(patients[0]); // Default to first patient
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [filterOption, setFilterOption] = useState('All Prescriptions');
  const [activeTab, setActiveTab] = useState('active');
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowPatientSelector(false);
  };

  const handlePrescriptionSelect = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleAddPrescription = (newPrescription) => {
    if (selectedPatient) {
      // Update the patient's prescriptions
      const updatedPatients = patients.map(patient => {
        if (patient.id === selectedPatient.id) {
          return {
            ...patient,
            prescriptions: [...patient.prescriptions, newPrescription]
          };
        }
        return patient;
      });
      
      // Update your state/data management here
      console.log('New prescription added:', newPrescription);
    }
  };

  const handlePrintPrescription = () => {
    if (!selectedPatient) {
      alert('Please select a patient to print prescriptions');
      return;
    }

    const prescriptions = showHistory ? 
      selectedPatient.prescriptionHistory : 
      selectedPatient.prescriptions;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generatePrintContent(prescriptions, selectedPatient));
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      // Optional: Close the window after printing
      // printWindow.onafterprint = function() {
      //   printWindow.close();
      // };
    };
  };

  const handleExportPDF = () => {
    if (!selectedPatient) {
      alert('Please select a patient to export prescriptions');
      return;
    }

    const prescriptions = showHistory ? 
      selectedPatient.prescriptionHistory : 
      selectedPatient.prescriptions;

    const csvData = generateExportData(prescriptions, selectedPatient.name);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const fileName = `${selectedPatient.name.replace(/\s+/g, '_')}_prescriptions_${new Date().toISOString().split('T')[0]}.csv`;
    
    saveAs(blob, fileName);
  };

  const calculateRefillStatus = (prescription) => {
    const today = new Date();
    const nextRefill = new Date(prescription.nextRefillDate);
    const daysUntilRefill = Math.floor((nextRefill - today) / (1000 * 60 * 60 * 24));
    return {
      daysLeft: daysUntilRefill,
      status: daysUntilRefill <= 7 ? 'warning' : 'normal'
    };
  };

  // Update the formatPrescriptionsAsRecords function
  const formatPrescriptionsAsRecords = (prescriptions) => {
    return prescriptions.map(prescription => ({
      ...prescription, // Keep all original prescription data
      type: 'Prescription',
      date: prescription.startDate,
      title: prescription.medication,
      doctor: prescription.doctor,
      facility: prescription.pharmacy?.name || '',
      notes: prescription.notes,
      priority: prescription.status === 'critical',
      status: prescription.status,
      // Add any missing fields that history cards need
      duration: `${new Date(prescription.startDate).toLocaleDateString()} - ${new Date(prescription.endDate).toLocaleDateString()}`,
      pharmacy: prescription.pharmacy || {
        name: 'Not specified',
        phone: 'Not specified',
        address: 'Not specified'
      },
      sideEffects: prescription.sideEffects || []
    }));
  };

  // Update the handleHistoryToggle function
  const handleHistoryToggle = (showHistoryView) => {
    setShowHistory(showHistoryView);
    setSelectedPrescription(null);
  };

  // Add this function to format the history status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'discontinued':
        return 'status-discontinued';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  };

  // Add this function to handle re-prescribing
  const handleReprescribe = (oldPrescription) => {
    // Create a new prescription based on the historical one
    const newPrescription = {
      ...oldPrescription,
      id: `RX-${Date.now()}`,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '', // Will be set in the modal
      lastRefill: new Date().toISOString().split('T')[0],
      nextRefillDate: '', // Will be calculated based on new dates
      adherence: 100,
    };

    // Open the add prescription modal with prefilled data
    setSelectedPrescription(newPrescription);
    setShowAddModal(true);
  };

  // Get filtered prescriptions based on selected patient and active tab
  const filteredPrescriptions = React.useMemo(() => {
    if (!selectedPatient) return [];
    
    return activeTab === 'active'
      ? selectedPatient.prescriptions.filter(p => p.status === 'active') 
      : selectedPatient.prescriptionHistory || [];
  }, [selectedPatient, activeTab]);

  return (
    <div className="prescription-management">
      {/* Main Content */}
      <div className="prescription-content">
        {/* Header */}
        <header className="prescription-header">
          <h1 className="prescription-title">Prescription Management</h1>
          <div className="prescription-actions">
            <button className="btn btn-secondary" onClick={handleExportPDF} disabled={!selectedPatient}>
              <FiDownload />
              <span>Export</span>
            </button>
            <button className="btn btn-secondary" onClick={handlePrintPrescription} disabled={!selectedPatient}>
              <FiPrinter />
              <span>Print</span>
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => setShowAddModal(true)}>
              <FiPlus />
              <span>New Prescription</span>
            </button>
          </div>
        </header>

        {/* Patient Selector */}
        <div className="patient-selector">
          <div className="selector-header" onClick={() => setShowPatientSelector(!showPatientSelector)}>
            <span>Selected Patient</span>
            <FiChevronDown className={showPatientSelector ? 'rotate' : ''} />
          </div>
          {showPatientSelector && (
            <div className="patient-dropdown">
              {patients.map(patient => (
                <div 
                  key={patient.id} 
                  className={`patient-option ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="option-avatar">{patient.name.charAt(0)}</div>
                  <div className="option-info">
                    <div className="option-name">{patient.name}</div>
                    <div className="option-id">{patient.id}</div>
                  </div>
                  {patient.active && <div className="option-status">Active</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="search-input">
            <input 
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <select 
            className="filter-dropdown"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="All Prescriptions">All Prescriptions</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Discontinued">Discontinued</option>
          </select>
          <select 
            className="filter-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Date">Date</option>
            <option value="Patient Name">Patient Name</option>
            <option value="Medication">Medication</option>
          </select>
        </div>

        {/* Patient Card */}
        {selectedPatient && (
          <div className="patient-card">
            <div className="patient-avatar">
              {selectedPatient.name.charAt(0)}
            </div>
            <div className="patient-info">
              <div className="patient-header">
                <h2 className="patient-name">{selectedPatient.name}</h2>
                {selectedPatient.active && (
                  <span className="patient-status">
                    <FiCheck />
                    Active
                  </span>
                )}
                <span className="patient-id">{selectedPatient.id}</span>
              </div>
              <div className="patient-details">
                <div className="patient-detail">
                  <div className="detail-label">Age</div>
                  <div className="detail-value">{selectedPatient.age} yrs</div>
                </div>
                <div className="patient-detail">
                  <div className="detail-label">Blood Group</div>
                  <div className="detail-value">{selectedPatient.bloodGroup}</div>
                </div>
                <div className="patient-detail">
                  <div className="detail-label">Weight</div>
                  <div className="detail-value">{selectedPatient.weight}</div>
                </div>
                <div className="patient-detail">
                  <div className="detail-label">Height</div>
                  <div className="detail-value">{selectedPatient.height}</div>
                </div>
                <div className="patient-detail">
                  <div className="detail-label">Conditions</div>
                  <div className="detail-value conditions-list">
                    {selectedPatient.conditions.map((condition, index) => (
                      <span key={index} className="condition-tag">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="patient-detail">
                  <div className="detail-label">Allergies</div>
                  <div className="detail-value allergies-list">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <span key={index} className="allergy-tag">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions for Selected Patient */}
        {selectedPatient && (
          <div className="prescriptions-section">
            <div className="prescription-tabs">
              <button 
                className={`tab ${activeTab === 'active' ? 'active' : ''}`} 
                onClick={() => setActiveTab('active')}
              >
                <FiActivity />
                Active Prescriptions
                <span className="tab-count">
                  {selectedPatient.prescriptions.filter(p => p.status === 'active').length}
                </span>
              </button>
              <button 
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <FiClock />
                History
                <span className="tab-count">
                  {selectedPatient.prescriptionHistory ? selectedPatient.prescriptionHistory.length : 0}
                </span>
              </button>
              <button className="add-prescription-btn" onClick={() => setShowAddModal(true)}>
                <FiPlus />
                Add Prescription
              </button>
            </div>

            {/* Prescription List */}
            <div className="prescription-list">
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <div className="prescription-card" key={prescription.id}>
                    <span className="prescription-date">
                      {formatDate(prescription.startDate)}
                    </span>
                    <h3 className="prescription-name">{prescription.medication} {prescription.dosage}</h3>

                    <div className="prescription-meta">
                      <div className="meta-group">
                        <span className="meta-label">DOCTOR</span>
                        <span className="meta-value">
                          <FiUser className="icon-doctor" />
                          {prescription.doctor}
                        </span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">FACILITY</span>
                        <span className="meta-value">
                          <FaHospital className="icon-facility" />
                          {prescription.pharmacy?.name || "Not specified"}
                        </span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">FREQUENCY</span>
                        <span className="meta-value">
                          <FiClock className="icon-frequency" />
                          {prescription.frequency}
                        </span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">REFILLS</span>
                        <span className="meta-value">
                          <FiRefreshCw className="icon-refills" />
                          {prescription.refills || 0}
                        </span>
                      </div>
                    </div>

                    <div className="prescription-instructions">
                      <FiInfo className="icon-instructions" />
                      {prescription.notes}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-prescriptions">
                  <FiClipboard />
                  <p>No {activeTab} prescriptions found for this patient.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddPrescriptionModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedPrescription(null);
          }}
          onSubmit={handleAddPrescription}
          patient={selectedPatient}
          prefillData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default PrescriptionManagement; 