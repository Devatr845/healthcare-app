import React, { useState } from 'react';
import { 
  FiDownload, 
  FiShare2, 
  FiMail, 
  FiLock,
  FiCheck,
  FiCopy,
  FiCalendar
} from 'react-icons/fi';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink,
  Font 
} from '@react-pdf/renderer';
import { QRCodeSVG } from 'qrcode.react';
import './DownloadShare.css';

// Register a font for PDF
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf'
});

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans'
  },
  section: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    padding: 5
  },
  tableCell: {
    flex: 1,
    fontSize: 10
  }
});

const MedicalReportPDF = ({ selectedSections, data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Medical History Report</Text>
        <Text style={pdfStyles.text}>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      {selectedSections.includes('personal') && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subtitle}>Personal Information</Text>
          <Text style={pdfStyles.text}>Name: {data.patientInfo.name}</Text>
          <Text style={pdfStyles.text}>Age: {data.patientInfo.age}</Text>
          <Text style={pdfStyles.text}>Blood Type: {data.patientInfo.bloodType}</Text>
        </View>
      )}

      {selectedSections.includes('conditions') && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subtitle}>Medical Conditions</Text>
          {data.conditions.map((condition, index) => (
            <View key={index} style={pdfStyles.table}>
              <View style={pdfStyles.tableRow}>
                <Text style={pdfStyles.tableCell}>{condition.name}</Text>
                <Text style={pdfStyles.tableCell}>{condition.status}</Text>
                <Text style={pdfStyles.tableCell}>{condition.diagnosisDate}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Add more sections based on selectedSections */}
    </Page>
  </Document>
);

const DownloadShare = ({ data }) => {
  const [selectedSections, setSelectedSections] = useState([
    'personal',
    'conditions',
    'allergies',
    'vaccinations',
    'labResults'
  ]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareSettings, setShareSettings] = useState({
    expiryDate: '',
    password: '',
    email: ''
  });
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const sections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'conditions', label: 'Medical Conditions' },
    { id: 'allergies', label: 'Allergies' },
    { id: 'vaccinations', label: 'Vaccinations' },
    { id: 'labResults', label: 'Lab Results' }
  ];

  const toggleSection = (sectionId) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleShare = () => {
    // Generate a secure sharing link (implement your secure sharing logic here)
    const secureLink = `https://your-domain.com/share/${Date.now()}`;
    setShareLink(secureLink);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="download-share-section">
      <div className="section-header">
        <h2>Download & Share Report</h2>
      </div>

      <div className="section-content">
        <div className="section-selector">
          <h3>Select Sections to Include</h3>
          <div className="section-checkboxes">
            {sections.map(section => (
              <label key={section.id} className="section-checkbox">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.id)}
                  onChange={() => toggleSection(section.id)}
                />
                <span>{section.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <PDFDownloadLink
            document={<MedicalReportPDF selectedSections={selectedSections} data={data} />}
            fileName="medical-history.pdf"
            className="download-btn"
          >
            {({ loading }) => (
              <>
                <FiDownload />
                {loading ? 'Generating PDF...' : 'Download Report'}
              </>
            )}
          </PDFDownloadLink>

          <button className="share-btn" onClick={handleShare}>
            <FiShare2 />
            Share Report
          </button>
        </div>
      </div>

      {showShareModal && (
        <div className="modal-overlay">
          <div className="share-modal">
            <h3>Share Medical Report</h3>
            
            <div className="share-options">
              <div className="share-option">
                <label>
                  <FiMail />
                  Share via Email
                </label>
                <input
                  type="email"
                  placeholder="Enter recipient's email"
                  value={shareSettings.email}
                  onChange={(e) => setShareSettings({
                    ...shareSettings,
                    email: e.target.value
                  })}
                />
              </div>

              <div className="share-option">
                <label>
                  <FiLock />
                  Set Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password for access"
                  value={shareSettings.password}
                  onChange={(e) => setShareSettings({
                    ...shareSettings,
                    password: e.target.value
                  })}
                />
              </div>

              <div className="share-option">
                <label>
                  <FiCalendar />
                  Set Expiry Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={shareSettings.expiryDate}
                  onChange={(e) => setShareSettings({
                    ...shareSettings,
                    expiryDate: e.target.value
                  })}
                />
              </div>

              <div className="share-link">
                <div className="qr-code">
                  <QRCodeSVG value={shareLink} size={120} />
                </div>
                
                <div className="link-copy">
                  <input type="text" value={shareLink} readOnly />
                  <button onClick={copyToClipboard}>
                    {copied ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </button>
              <button className="share-confirm-btn">
                Share Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadShare; 