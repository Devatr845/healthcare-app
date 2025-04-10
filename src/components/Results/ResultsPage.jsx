import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiCalendar, FiDownload, FiShare2, FiFileText, 
  FiFilter, FiX, FiChevronDown, FiChevronUp, FiMessageSquare,
  FiAlertCircle, FiCheckCircle, FiClock, FiBarChart2, FiLink,
  FiSliders, FiBookmark, FiPrinter, FiMail, FiSlash, FiUser,
  FiRefreshCw, FiGrid, FiList, FiBell
} from 'react-icons/fi';
import { AiOutlineQrcode } from 'react-icons/ai';
import { RiWhatsappLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import ResultsFilterPanel from './ResultsFilterPanel';
import ResultsTable from './ResultsTable';
import TestResultDetails from './TestResultDetails';
import QRModal from './QRModal';
import ShareModal from './ShareModal';
import TestDetails from './TestDetails';
import { mockTestResults } from './mockData';
import './ResultsPage.css';

const ResultsPage = ({ darkMode }) => {
  const location = useLocation();
  
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [showQRModal, setShowQRModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarkedTests, setBookmarkedTests] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [notifications, setNotifications] = useState(2); // Example notification count
  const [showTestDetails, setShowTestDetails] = useState(false);

  // Handle test data passed from HealthSnapshotSection
  useEffect(() => {
    if (location.state?.selectedTest && location.state?.testData) {
      const { selectedTest, testData } = location.state;
      // Create a test object in the format expected by TestDetails
      const test = {
        id: `TEST-${Date.now()}`,
        name: selectedTest,
        date: testData.testDate,
        doctor: testData.orderedBy,
        type: 'Lab Test',
        status: testData.results[0].status,
        parameters: testData.results.map(result => ({
          name: result.name,
          value: result.value,
          unit: result.unit,
          range: result.range,
          status: result.status
        })),
        comments: testData.doctorNotes,
        additionalInfo: []
      };
      setSelectedTest(test);
      setShowTestDetails(true);
    }
  }, [location.state]);

  // Filter and sort results
  useEffect(() => {
    let results = [...mockTestResults];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        test => test.name.toLowerCase().includes(term) || 
               test.doctor.toLowerCase().includes(term)
      );
    }
    
    // Apply date range filter
    const now = new Date();
    const cutoffDate = new Date();
    
    if (selectedDateRange !== 'all') {
      switch (selectedDateRange) {
        case '7days':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case '6months':
          cutoffDate.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      results = results.filter(test => new Date(test.date) >= cutoffDate);
    }
    
    // Apply test type filter
    if (selectedTypes.length > 0) {
      results = results.filter(test => selectedTypes.includes(test.type));
    }
    
    // Apply status filter
    if (selectedStatuses.length > 0) {
      results = results.filter(test => selectedStatuses.includes(test.status));
    }
    
    // Apply doctor filter
    if (selectedDoctors.length > 0) {
      results = results.filter(test => selectedDoctors.includes(test.doctor));
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortConfig.key === 'status') {
        return sortConfig.direction === 'asc' 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    
    setFilteredResults(results);
  }, [searchTerm, selectedDateRange, selectedTypes, selectedStatuses, selectedDoctors, sortConfig]);

  // Load bookmarked tests from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedTests');
    if (savedBookmarks) {
      try {
        setBookmarkedTests(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarkedTests([]);
      }
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('bookmarkedTests', JSON.stringify(bookmarkedTests));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarkedTests]);

  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectTest = (test) => {
    setSelectedTest(test);
    setShowTestDetails(true);
  };

  const handleCloseTestDetails = () => {
    setShowTestDetails(false);
    setSelectedTest(null);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleToggleBookmark = (testId) => {
    const isBookmarked = bookmarkedTests.includes(testId);
    const test = mockTestResults.find(t => t.id === testId);
    
    if (!test) return;
    
    if (isBookmarked) {
      setBookmarkedTests(prev => prev.filter(id => id !== testId));
      showFeedback(`"${test.name}" has been removed from bookmarks`);
    } else {
      setBookmarkedTests(prev => [...prev, testId]);
      showFeedback(`"${test.name}" has been added to bookmarks`);
    }
  };

  const handleToggleViewMode = () => {
    setViewMode(prev => prev === 'table' ? 'grid' : 'table');
  };

  const handleExportPDF = (test) => {
    if (!test) return;
    showFeedback(`PDF for "${test.name}" has been downloaded successfully`);
  };

  const handlePrint = (test) => {
    if (!test) return;
    showFeedback(`Print job for "${test.name}" has been sent`);
  };

  const handleShowShare = (test) => {
    setSelectedTest(test);
    setShowShareModal(true);
  };

  const handleShowQR = (test) => {
    setSelectedTest(test);
    setShowQRModal(true);
  };

  // Show feedback message
  const showFeedback = (message, type = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    alert(`You have ${notifications} unread notifications`);
    setNotifications(0);
  };

  // Calculate stats
  const totalTests = filteredResults.length;
  const criticalTests = filteredResults.filter(test => test.status === 'critical').length;
  const pendingTests = filteredResults.filter(test => test.status === 'pending').length;
  const normalTests = filteredResults.filter(test => test.status === 'normal').length;

  return (
    <div className={`results-page ${darkMode ? 'dark-mode' : ''}`}>
      {!showTestDetails ? (
        <>
          {/* Page Header */}
          <header className="results-page-header">
            <div className="results-header-content">
              <h1>Test Results</h1>
              <div className="results-header-actions">
                <button className="refresh-btn" aria-label="Refresh Results">
                  <FiRefreshCw />
                  <span>Refresh</span>
                </button>
                <button className="scan-btn" onClick={() => setShowQRModal(true)} aria-label="Scan QR Code">
                  <AiOutlineQrcode />
                  <span>Scan QR</span>
                </button>
                <div className="notification-icon">
                  <FiBell onClick={handleNotificationClick} aria-label={`${notifications} notifications`} />
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Patient Information */}
          <section className="patient-info-section">
            <div className="patient-avatar">
              <FiUser className="default-avatar" />
            </div>
            <div className="patient-details">
              <h2>John Doe</h2>
              <div className="patient-meta">
                <span className="patient-id">Patient ID: P-12345678</span>
                <span className="patient-dob">DOB: 15/08/1985</span>
                <span className="patient-gender">Gender: Male</span>
              </div>
            </div>
          </section>

          {/* Results Summary */}
          <section className="results-summary">
            <div className="summary-card total">
              <div className="summary-icon">
                <FiFileText />
              </div>
              <div className="summary-content">
                <h3>Total Tests</h3>
                <p className="summary-count">{totalTests}</p>
              </div>
            </div>
            <div className="summary-card normal">
              <div className="summary-icon">
                <FiCheckCircle />
              </div>
              <div className="summary-content">
                <h3>Normal</h3>
                <p className="summary-count">{normalTests}</p>
              </div>
            </div>
            <div className="summary-card pending">
              <div className="summary-icon">
                <FiClock />
              </div>
              <div className="summary-content">
                <h3>Pending</h3>
                <p className="summary-count">{pendingTests}</p>
              </div>
            </div>
            <div className="summary-card critical">
              <div className="summary-icon">
                <FiAlertCircle />
              </div>
              <div className="summary-content">
                <h3>Critical</h3>
                <p className="summary-count">{criticalTests}</p>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="search-filter-section">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search by test name, doctor, date, or status..." 
                value={searchTerm} 
                onChange={handleSearch}
                aria-label="Search test results"
              />
              {searchTerm && (
                <button 
                  className="clear-search" 
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="filter-controls">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={handleToggleFilters}
                aria-expanded={showFilters}
                aria-label="Toggle Filters"
              >
                <FiFilter />
                <span>Filters {selectedTypes.length > 0 || selectedStatuses.length > 0 || selectedDoctors.length > 0 || selectedDateRange !== 'all' ? 
                  `(${selectedTypes.length + selectedStatuses.length + selectedDoctors.length + (selectedDateRange !== 'all' ? 1 : 0)})` : ''}</span>
                {showFilters ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              <button 
                className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={handleToggleViewMode}
                aria-label={`Switch to ${viewMode === 'table' ? 'grid' : 'table'} view`}
              >
                {viewMode === 'table' ? 
                  <><FiGrid /><span>Grid View</span></> : 
                  <><FiList /><span>Table View</span></>
                }
              </button>
            </div>
          </section>

          {/* Filter Panel (Expandable) */}
          {showFilters && (
            <ResultsFilterPanel 
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              selectedDoctors={selectedDoctors}
              setSelectedDoctors={setSelectedDoctors}
              availableTypes={[...new Set(mockTestResults.map(test => test.type))]}
              availableDoctors={[...new Set(mockTestResults.map(test => test.doctor))]}
            />
          )}

          {/* Results Table/Grid */}
          <ResultsTable 
            results={filteredResults}
            viewMode={viewMode}
            sortConfig={sortConfig}
            onSort={handleSort}
            onSelectTest={handleSelectTest}
            onExportPDF={handleExportPDF}
            onPrint={handlePrint}
            onShare={handleShowShare}
            onShowQR={handleShowQR}
            bookmarkedTests={bookmarkedTests}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Test Details Modal */}
          {selectedTest && (
            <TestResultDetails 
              test={selectedTest}
              onClose={handleCloseTestDetails}
              onExportPDF={() => handleExportPDF(selectedTest)}
              onPrint={() => handlePrint(selectedTest)}
              onShare={() => handleShowShare(selectedTest)}
              onShowQR={() => handleShowQR(selectedTest)}
              isBookmarked={bookmarkedTests.includes(selectedTest.id)}
              onToggleBookmark={() => handleToggleBookmark(selectedTest.id)}
            />
          )}

          {/* QR Code Modal */}
          {showQRModal && (
            <QRModal 
              test={selectedTest}
              onClose={() => setShowQRModal(false)}
            />
          )}

          {/* Share Modal */}
          {showShareModal && (
            <ShareModal 
              test={selectedTest}
              onClose={() => setShowShareModal(false)}
            />
          )}

          {/* Feedback Message */}
          {feedback && (
            <div className={`action-feedback ${feedback.type}`} role="alert">
              {feedback.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{feedback.message}</span>
            </div>
          )}
        </>
      ) : (
        <TestDetails 
          test={selectedTest} 
          onBack={handleCloseTestDetails} 
        />
      )}
    </div>
  );
};

export default ResultsPage; 