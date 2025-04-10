import React, { useState } from 'react';
import { 
  FiFileText, FiDownload, FiShare2, FiBookmark, FiChevronUp, 
  FiChevronDown, FiPrinter, FiMessageSquare, FiBarChart2,
  FiAlertCircle, FiCheckCircle, FiClock, FiInfo, FiCalendar
} from 'react-icons/fi';
import { AiOutlineQrcode } from 'react-icons/ai';
import InfoCard from './InfoCard';
import './ResultsPage.css';

const ResultsTable = ({ 
  results, 
  viewMode, 
  sortConfig, 
  onSort, 
  onSelectTest, 
  onExportPDF, 
  onPrint, 
  onShare, 
  onShowQR,
  bookmarkedTests,
  onToggleBookmark
}) => {
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [selectedInfoTest, setSelectedInfoTest] = useState(null);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return <FiCheckCircle className="status-icon normal" aria-hidden="true" />;
      case 'critical':
      case 'abnormal':
        return <FiAlertCircle className="status-icon critical" aria-hidden="true" />;
      case 'pending':
        return <FiClock className="status-icon pending" aria-hidden="true" />;
      default:
        return null;
    }
  };
  
  // Status class mapping
  const getStatusClass = (status) => {
    return `status-${status.toLowerCase()}`;
  };
  
  // Sort indicator
  const renderSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? 
        <FiChevronUp className="sort-icon" aria-hidden="true" /> : 
        <FiChevronDown className="sort-icon" aria-hidden="true" />;
    }
    return null;
  };

  // Handle showing info card
  const handleShowInfo = (test, e) => {
    e.stopPropagation();
    setSelectedInfoTest(test);
    setShowInfoCard(true);
  };

  // Handle closing info card
  const handleCloseInfo = () => {
    setShowInfoCard(false);
    setSelectedInfoTest(null);
  };

  // Render Table View
  if (viewMode === 'table') {
    return (
      <div className="results-table-container">
        {results.length === 0 ? (
          <div className="no-results">
            <FiFileText className="no-results-icon" aria-hidden="true" />
            <h3>No results found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <table className="results-table" aria-label="Test Results">
              <thead>
                <tr>
                  <th className="bookmark-column" aria-label="Bookmark"></th>
                  <th 
                    className={`sortable ${sortConfig.key === 'name' ? 'sorted' : ''}`}
                    onClick={() => onSort('name')}
                    aria-sort={sortConfig.key === 'name' ? sortConfig.direction : 'none'}
                  >
                    <button className="sort-button">
                      Test Name {renderSortIndicator('name')}
                      <span className="screen-reader-only">
                        {sortConfig.key === 'name' ? 
                          `sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}` : 
                          'not sorted'}
                      </span>
                    </button>
                  </th>
                  <th 
                    className={`sortable ${sortConfig.key === 'date' ? 'sorted' : ''}`}
                    onClick={() => onSort('date')}
                    aria-sort={sortConfig.key === 'date' ? sortConfig.direction : 'none'}
                  >
                    <button className="sort-button">
                      Date {renderSortIndicator('date')}
                      <span className="screen-reader-only">
                        {sortConfig.key === 'date' ? 
                          `sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}` : 
                          'not sorted'}
                      </span>
                    </button>
                  </th>
                  <th>Doctor</th>
                  <th 
                    className={`sortable ${sortConfig.key === 'status' ? 'sorted' : ''}`}
                    onClick={() => onSort('status')}
                    aria-sort={sortConfig.key === 'status' ? sortConfig.direction : 'none'}
                  >
                    <button className="sort-button">
                      Status {renderSortIndicator('status')}
                      <span className="screen-reader-only">
                        {sortConfig.key === 'status' ? 
                          `sorted ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}` : 
                          'not sorted'}
                      </span>
                    </button>
                  </th>
                  <th className="actions-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map(test => (
                  <tr key={test.id} className={bookmarkedTests.includes(test.id) ? 'bookmarked' : ''}>
                    <td className="bookmark-column">
                      <button 
                        className={`bookmark-btn ${bookmarkedTests.includes(test.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(test.id);
                        }}
                        aria-label={bookmarkedTests.includes(test.id) ? 'Remove bookmark' : 'Add bookmark'}
                        aria-pressed={bookmarkedTests.includes(test.id)}
                      >
                        <FiBookmark aria-hidden="true" />
                      </button>
                    </td>
                    <td onClick={() => onSelectTest(test)} className="test-name-cell">
                      <div className="test-icon">
                        <FiFileText aria-hidden="true" />
                      </div>
                      {test.name}
                    </td>
                    <td onClick={() => onSelectTest(test)}>{formatDate(test.date)}</td>
                    <td onClick={() => onSelectTest(test)}>{test.doctor}</td>
                    <td onClick={() => onSelectTest(test)}>
                      <span 
                        className={`status-badge ${getStatusClass(test.status)}`}
                        role="status"
                      >
                        {getStatusIcon(test.status)}
                        {test.status}
                      </span>
                    </td>
                    <td className="actions-column">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view" 
                          onClick={(e) => handleShowInfo(test, e)}
                          aria-label="View Information"
                        >
                          <FiInfo aria-hidden="true" />
                        </button>
                        <button 
                          className="action-btn download" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onExportPDF(test);
                          }}
                          aria-label="Download PDF"
                        >
                          <FiDownload aria-hidden="true" />
                        </button>
                        <button 
                          className="action-btn print" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onPrint(test);
                          }}
                          aria-label="Print"
                        >
                          <FiPrinter aria-hidden="true" />
                        </button>
                        <button 
                          className="action-btn share" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onShare(test);
                          }}
                          aria-label="Share"
                        >
                          <FiShare2 aria-hidden="true" />
                        </button>
                        <button 
                          className="action-btn qr" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowQR(test);
                          }}
                          aria-label="Generate QR Code"
                        >
                          <AiOutlineQrcode aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showInfoCard && selectedInfoTest && (
              <InfoCard 
                test={selectedInfoTest} 
                onClose={handleCloseInfo} 
              />
            )}
          </>
        )}
      </div>
    );
  }
  
  // Render Grid View
  return (
    <div className="results-grid-container">
      {results.length === 0 ? (
        <div className="no-results">
          <FiFileText className="no-results-icon" aria-hidden="true" />
          <h3>No results found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          <div className="results-grid" role="grid">
            {results.map(test => (
              <div 
                key={test.id} 
                className={`result-card ${getStatusClass(test.status)} ${bookmarkedTests.includes(test.id) ? 'bookmarked' : ''}`}
                onClick={() => onSelectTest(test)}
                role="gridcell"
                tabIndex="0"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectTest(test);
                  }
                }}
              >
                <div className="result-card-header">
                  <div className="test-type-badge">{test.type}</div>
                  <button 
                    className={`bookmark-btn ${bookmarkedTests.includes(test.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(test.id);
                    }}
                    aria-label={bookmarkedTests.includes(test.id) ? 'Remove bookmark' : 'Add bookmark'}
                    aria-pressed={bookmarkedTests.includes(test.id)}
                  >
                    <FiBookmark aria-hidden="true" />
                  </button>
                </div>
                
                <h3 className="result-card-title">{test.name}</h3>
                
                <div className="result-card-meta">
                  <div className="result-meta-item">
                    <FiCalendar className="meta-icon" aria-hidden="true" />
                    <span>{formatDate(test.date)}</span>
                  </div>
                  <div className="result-meta-item">
                    <FiMessageSquare className="meta-icon" aria-hidden="true" />
                    <span>{test.doctor}</span>
                  </div>
                </div>
                
                <div className="result-card-footer">
                  <span 
                    className={`status-badge ${getStatusClass(test.status)}`}
                    role="status"
                  >
                    {getStatusIcon(test.status)}
                    {test.status}
                  </span>
                  
                  <div className="result-actions">
                    <button 
                      className="action-btn info" 
                      onClick={(e) => handleShowInfo(test, e)}
                      aria-label="View Information"
                    >
                      <FiInfo aria-hidden="true" />
                    </button>
                    <button 
                      className="action-btn download" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportPDF(test);
                      }}
                      aria-label="Download PDF"
                    >
                      <FiDownload aria-hidden="true" />
                    </button>
                    <button 
                      className="action-btn share" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onShare(test);
                      }}
                      aria-label="Share"
                    >
                      <FiShare2 aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showInfoCard && selectedInfoTest && (
            <InfoCard 
              test={selectedInfoTest} 
              onClose={handleCloseInfo} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ResultsTable; 