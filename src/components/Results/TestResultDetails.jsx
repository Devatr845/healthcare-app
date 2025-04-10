import React, { useState } from 'react';
import { 
  FiX, FiDownload, FiShare2, FiPrinter, FiBookmark, FiBarChart2,
  FiAlertCircle, FiCheckCircle, FiClock, FiCornerUpRight, FiMessageSquare,
  FiArrowUp, FiArrowDown, FiPlusCircle, FiMinusCircle, FiExternalLink,
  FiUser, FiCalendar, FiFileText, FiHelpCircle, FiTrendingUp, FiTrendingDown
} from 'react-icons/fi';
import { AiOutlineQrcode } from 'react-icons/ai';
import './ResultsPage.css';

const TestResultDetails = ({ 
  test, 
  onClose, 
  onExportPDF, 
  onPrint, 
  onShare,
  onShowQR,
  isBookmarked,
  onToggleBookmark
}) => {
  const [activeTab, setActiveTab] = useState('details'); // details, history, insights
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return <FiCheckCircle className="status-icon normal" />;
      case 'critical':
        return <FiAlertCircle className="status-icon critical" />;
      case 'pending':
        return <FiClock className="status-icon pending" />;
      default:
        return null;
    }
  };
  
  // Get change icon and text
  const getChangeIndicator = (value, prevValue) => {
    if (!prevValue) return null;
    
    const percentChange = ((value - prevValue) / prevValue) * 100;
    const isImproved = percentChange > 0;
    
    return (
      <div className={`change-indicator ${isImproved ? 'improved' : 'worsened'}`}>
        {isImproved ? <FiTrendingUp /> : <FiTrendingDown />}
        <span>{Math.abs(percentChange).toFixed(1)}% {isImproved ? 'increase' : 'decrease'}</span>
      </div>
    );
  };
  
  // Mock parameter data
  const parameters = test.parameters || [
    { 
      name: 'Hemoglobin', 
      value: 14.2, 
      unit: 'g/dL', 
      reference: '13.5-17.5', 
      status: 'normal',
      prevValue: 13.8,
      trend: [13.8, 13.9, 14.0, 14.2]
    },
    { 
      name: 'White Blood Cell Count', 
      value: 6.8, 
      unit: 'x10^9/L', 
      reference: '4.5-11.0', 
      status: 'normal',
      prevValue: 7.1,
      trend: [7.5, 7.2, 7.1, 6.8]
    },
    { 
      name: 'Platelet Count', 
      value: 350, 
      unit: 'x10^9/L', 
      reference: '150-450', 
      status: 'normal',
      prevValue: 330,
      trend: [290, 310, 330, 350]
    },
    { 
      name: 'Glucose (Fasting)', 
      value: 105, 
      unit: 'mg/dL', 
      reference: '70-99', 
      status: 'critical',
      prevValue: 98,
      trend: [92, 95, 98, 105]
    }
  ];
  
  // Mock historical data
  const historicalData = test.history || [
    { date: '2023-10-15', value: 13.8, status: 'normal' },
    { date: '2023-07-22', value: 13.9, status: 'normal' },
    { date: '2023-04-10', value: 14.0, status: 'normal' },
    { date: '2023-01-05', value: 13.5, status: 'normal' }
  ];
  
  // Mock AI insights
  const aiInsights = test.insights || [
    {
      type: 'observation',
      message: 'Your glucose level is slightly elevated compared to the reference range.',
      severity: 'moderate'
    },
    {
      type: 'trend',
      message: 'Your hemoglobin levels have shown consistent improvement over the past 6 months.',
      severity: 'positive'
    },
    {
      type: 'recommendation',
      message: 'Consider reducing refined carbohydrate intake and increasing physical activity to help manage glucose levels.',
      severity: 'informational'
    },
    {
      type: 'action',
      message: 'Schedule a follow-up test in 3 months to monitor blood glucose levels.',
      severity: 'moderate'
    }
  ];
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="test-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="test-detail-header">
          <div className="test-detail-title">
            <h2>{test.name}</h2>
            <div className={`status-badge ${test.status.toLowerCase()}`}>
              {getStatusIcon(test.status)}
              {test.status}
            </div>
          </div>
          
          <div className="test-detail-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={onToggleBookmark}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <FiBookmark />
            </button>
            <button className="action-btn download" onClick={onExportPDF} aria-label="Download PDF">
              <FiDownload />
            </button>
            <button className="action-btn print" onClick={onPrint} aria-label="Print">
              <FiPrinter />
            </button>
            <button className="action-btn share" onClick={onShare} aria-label="Share">
              <FiShare2 />
            </button>
            <button className="action-btn qr" onClick={onShowQR} aria-label="QR Code">
              <AiOutlineQrcode />
            </button>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <FiX />
            </button>
          </div>
        </div>
        
        <div className="test-detail-meta">
          <div className="meta-item">
            <div className="meta-icon"><FiCalendar /></div>
            <div className="meta-content">
              <span className="meta-label">Test Date</span>
              <span className="meta-value">{formatDate(test.date)}</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon"><FiUser /></div>
            <div className="meta-content">
              <span className="meta-label">Doctor</span>
              <span className="meta-value">{test.doctor}</span>
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-icon"><FiFileText /></div>
            <div className="meta-content">
              <span className="meta-label">Type</span>
              <span className="meta-value">{test.type}</span>
            </div>
          </div>
        </div>
        
        <div className="test-detail-tabs">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Test Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History & Trends
          </button>
          <button 
            className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            AI Insights
          </button>
        </div>
        
        <div className="test-detail-content">
          {activeTab === 'details' && (
            <div className="test-parameters">
              <table className="parameters-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Unit</th>
                    <th>Reference Range</th>
                    <th>Status</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param, index) => (
                    <tr key={index} className={`parameter-row ${param.status.toLowerCase()}`}>
                      <td className="parameter-name">{param.name}</td>
                      <td className="parameter-value">{param.value}</td>
                      <td className="parameter-unit">{param.unit}</td>
                      <td className="parameter-range">{param.reference}</td>
                      <td className="parameter-status">
                        <span className={`status-indicator ${param.status.toLowerCase()}`}>
                          {getStatusIcon(param.status)}
                          {param.status}
                        </span>
                      </td>
                      <td className="parameter-change">
                        {getChangeIndicator(param.value, param.prevValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {test.comments && (
                <div className="doctor-comments">
                  <h3>
                    <FiMessageSquare />
                    Doctor's Comments
                  </h3>
                  <p>{test.comments}</p>
                </div>
              )}
              
              <div className="additional-info">
                <h3>
                  <FiHelpCircle />
                  Additional Information
                </h3>
                <p>
                  This test was conducted at {test.location || 'Main Laboratory'}.
                  {test.fasting ? ' Patient was fasting before the test.' : ''}
                  {test.preparation && ` ${test.preparation}`}
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="test-history">
              <div className="trend-visualization">
                <h3>
                  <FiBarChart2 />
                  Trend Analysis
                </h3>
                <div className="chart-container">
                  {/* In a real app, this would be a real chart component */}
                  <div className="mock-chart">
                    <div className="chart-header">
                      <span className="chart-title">Parameter Trends Over Time</span>
                      <div className="chart-legend">
                        <span className="legend-item normal">
                          <span className="legend-dot"></span>
                          Normal Range
                        </span>
                        <span className="legend-item critical">
                          <span className="legend-dot"></span>
                          Outside Range
                        </span>
                      </div>
                    </div>
                    <div className="chart-grid">
                      {parameters.map((param, index) => (
                        <div key={index} className="trend-line">
                          <div className="trend-label">{param.name}</div>
                          <div className="trend-graph">
                            <div className={`trend-bar ${param.status}`} style={{ width: `${(param.value / (parseFloat(param.reference.split('-')[1]) * 1.2)) * 100}%` }}>
                              <span className="trend-value">{param.value}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="historical-records">
                  <h3>Previous Test Results</h3>
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Status</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalData.map((record, index) => (
                        <tr key={index}>
                          <td>{formatDate(record.date)}</td>
                          <td>{record.value}</td>
                          <td>
                            <span className={`status-indicator ${record.status.toLowerCase()}`}>
                              {getStatusIcon(record.status)}
                              {record.status}
                            </span>
                          </td>
                          <td>
                            {index < historicalData.length - 1 ? (
                              <div className={`change-indicator ${record.value > historicalData[index + 1].value ? 'improved' : 'worsened'}`}>
                                {record.value > historicalData[index + 1].value ? <FiArrowUp /> : <FiArrowDown />}
                                <span>{Math.abs(((record.value - historicalData[index + 1].value) / historicalData[index + 1].value) * 100).toFixed(1)}%</span>
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'insights' && (
            <div className="ai-insights">
              <div className="insights-header">
                <FiBarChart2 className="insights-icon" />
                <h3>AI-Generated Health Insights</h3>
              </div>
              
              <div className="insights-disclaimer">
                <FiAlertCircle />
                <p>These insights are generated by AI and should not replace professional medical advice. Always consult with your healthcare provider.</p>
              </div>
              
              <div className="insights-list">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`insight-card ${insight.severity}`}>
                    <div className="insight-icon">
                      {insight.type === 'observation' && <FiFileText />}
                      {insight.type === 'trend' && <FiTrendingUp />}
                      {insight.type === 'recommendation' && <FiHelpCircle />}
                      {insight.type === 'action' && <FiPlusCircle />}
                    </div>
                    <div className="insight-content">
                      <span className="insight-type">{insight.type}</span>
                      <p className="insight-message">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="insights-actions">
                <button className="insight-action-btn">
                  <FiCornerUpRight />
                  <span>Discuss with Doctor</span>
                </button>
                <button className="insight-action-btn">
                  <FiExternalLink />
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultDetails; 