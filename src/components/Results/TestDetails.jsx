import React, { useState, useRef } from 'react';
import { 
  FiBarChart2, FiCalendar, FiUser, FiFileText, 
  FiTrendingUp, FiTrendingDown, FiActivity,
  FiArrowUp, FiArrowDown, FiInfo, FiClock, FiCheck,
  FiAlertCircle, FiDownload, FiPrinter, FiShare2, FiChevronLeft,
  FiMessageSquare, FiAlertTriangle, FiChevronRight
} from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResultsPage.css';

const TestDetails = ({ test, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const contentRef = useRef(null);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Mock test data for demonstration
  const mockTest = test || {
    id: 'TEST-1234',
    name: 'Urinalysis',
    date: '2023-10-29',
    doctor: 'Dr. Robert Johnson',
    type: 'Urine Test',
    status: 'Pending',
    parameters: [
      { name: 'pH', value: '6.0', unit: '', range: '4.5-8.0', status: 'Normal' },
      { name: 'Protein', value: 'Trace', unit: '', range: 'Negative', status: 'Abnormal' },
      { name: 'Glucose', value: 'Negative', unit: '', range: 'Negative', status: 'Normal' },
      { name: 'Ketones', value: 'Negative', unit: '', range: 'Negative', status: 'Normal' },
      { name: 'Blood', value: 'Moderate', unit: '', range: 'Negative', status: 'Critical' },
      { name: 'Bilirubin', value: 'Negative', unit: '', range: 'Negative', status: 'Normal' },
      { name: 'Urobilinogen', value: '0.2', unit: 'mg/dL', range: '0.1-1.0', status: 'Normal' }
    ],
    comments: "Results pending laboratory analysis.",
    additionalInfo: [
      "This test was conducted at Central Laboratory. Mid-stream collection recommended."
    ]
  };

  /**
   * Generates and downloads a PDF of the current test details
   * Uses html2canvas to capture the component as an image
   * Then uses jsPDF to create a PDF document with the captured image
   */
  const handleDownloadPDF = async () => {
    // Set state to show loading indicator if needed
    setIsGeneratingPdf(true);
    
    try {
      // Get the element to be captured
      const element = contentRef.current;
      if (!element) {
        console.error("Could not find element to capture");
        setIsGeneratingPdf(false);
        return;
      }

      // Create a feedback message for user
      const feedbackEl = document.createElement('div');
      feedbackEl.className = 'action-feedback success';
      feedbackEl.innerHTML = '<span>Generating PDF...</span>';
      document.body.appendChild(feedbackEl);
      
      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false, // Disable logging
        backgroundColor: '#ffffff' // White background
      });
      
      // Get dimensions for the PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Create PDF document
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Generate a filename based on test details
      const filename = `${mockTest.name.replace(/\s+/g, '_')}_${mockTest.id}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
      // Update feedback message
      feedbackEl.innerHTML = '<span>PDF downloaded successfully!</span>';
      
      // Remove feedback message after a delay
      setTimeout(() => {
        if (document.body.contains(feedbackEl)) {
          document.body.removeChild(feedbackEl);
        }
      }, 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Show error message
      const errorEl = document.createElement('div');
      errorEl.className = 'action-feedback error';
      errorEl.innerHTML = '<span>Error generating PDF. Please try again.</span>';
      document.body.appendChild(errorEl);
      
      // Remove error message after a delay
      setTimeout(() => {
        if (document.body.contains(errorEl)) {
          document.body.removeChild(errorEl);
        }
      }, 3000);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="test-details">
      {/* Back Button and Header */}
      <div className="test-details-header">
        <button 
          className="back-button" 
          onClick={onBack}
          aria-label="Back to results"
        >
          <FiChevronLeft /> Back to Results
        </button>
        
        <div className="test-title-status">
          <h1>{mockTest.name}</h1>
          <span className={`status-badge status-${mockTest.status.toLowerCase()}`}>
            {mockTest.status === 'Normal' ? <FiCheck /> : 
             mockTest.status === 'Pending' ? <FiClock /> : <FiAlertCircle />}
            {mockTest.status}
          </span>
        </div>
        
        <div className="test-detail-actions">
          <button 
            className={`action-btn ${isGeneratingPdf ? 'loading' : ''}`} 
            aria-label="Download PDF"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
          >
            <FiDownload />
          </button>
          <button className="action-btn" aria-label="Print">
            <FiPrinter />
          </button>
          <button className="action-btn" aria-label="Share">
            <FiShare2 />
          </button>
        </div>
      </div>
      
      {/* Main content - This div will be captured for PDF */}
      <div ref={contentRef} id="pdf-content">
        {/* Test Info Cards - Enhanced styling */}
        <div className="test-info-card-container">
          <div className="test-info-card">
            <div className="test-info-icon">
              <FiCalendar />
            </div>
            <div className="test-info-content">
              <h3 className="test-info-label">Test Date</h3>
              <p className="test-info-value">{formatDate(mockTest.date)}</p>
            </div>
          </div>
          
          <div className="test-info-card">
            <div className="test-info-icon">
              <FiUser />
            </div>
            <div className="test-info-content">
              <h3 className="test-info-label">Doctor</h3>
              <p className="test-info-value">{mockTest.doctor}</p>
            </div>
          </div>
          
          <div className="test-info-card">
            <div className="test-info-icon">
              <FiFileText />
            </div>
            <div className="test-info-content">
              <h3 className="test-info-label">Type</h3>
              <p className="test-info-value">{mockTest.type}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="test-details-tabs">
          <button 
            className={`test-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Test Details
          </button>
          <button 
            className={`test-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History & Trends
          </button>
          <button 
            className={`test-tab ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            AI Insights
          </button>
        </div>
        
        {/* Test Details Content */}
        {activeTab === 'details' && (
          <div className="test-details-content">
            <div className="parameters-table-container">
              <table className="parameters-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Unit/Level</th>
                    <th>Reference Range</th>
                    <th>Status</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTest.parameters.map((param, index) => (
                    <tr key={index} className="parameter-row">
                      <td className="parameter-name">{param.name}</td>
                      <td className="parameter-value">{param.value}</td>
                      <td>{param.unit}</td>
                      <td>{param.range}</td>
                      <td>
                        <span className={`status-badge status-${param.status.toLowerCase()}`}>
                          {param.status === 'Normal' ? <FiCheck /> : 
                           param.status === 'Pending' ? <FiClock /> : 
                           param.status === 'Abnormal' ? <FiAlertCircle /> : 
                           <FiAlertTriangle />}
                          {param.status}
                        </span>
                      </td>
                      <td className="parameter-change">
                        {/* Change information would go here */}
                        <span className="no-change">—</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Doctor's Comments - Enhanced styling */}
            <div className="doctors-comments-section">
              <h3 className="comments-title">
                <FiMessageSquare className="section-icon" /> Doctor's Comments
              </h3>
              <div className="comments-content">
                <p>{mockTest.comments || "No comments provided."}</p>
              </div>
            </div>
            
            {/* Additional Information - Enhanced styling */}
            <div className="additional-info-section">
              <h3 className="additional-info-title">
                <FiInfo className="section-icon" /> Additional Information
              </h3>
              <div className="additional-info-content">
                {mockTest.additionalInfo && mockTest.additionalInfo.length > 0 ? (
                  mockTest.additionalInfo.map((info, index) => (
                    <p key={index}>{info}</p>
                  ))
                ) : (
                  <p>No additional information provided.</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* History & Trends Content */}
        {activeTab === 'history' && (
          <div className="test-details-content">
            <div className="graph-section">
              <h3 className="graph-section-title">
                <FiBarChart2 className="section-icon" /> Parameter Trends Over Time
              </h3>
              <div className="graph-container improved-graph">
                <div className="graph-legend">
                  <div className="legend-item">
                    <div className="legend-color normal"></div>
                    <span>Normal Range</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color outside"></div>
                    <span>Outside Range</span>
                  </div>
                </div>
                
                {/* Enhanced mock chart with visual elements */}
                <div className="chart-container">
                  <div className="chart-y-axis">
                    <span className="y-axis-label">8.0</span>
                    <span className="y-axis-label">7.0</span>
                    <span className="y-axis-label">6.0</span>
                    <span className="y-axis-label">5.0</span>
                    <span className="y-axis-label">4.0</span>
                  </div>
                  
                  <div className="mock-chart">
                    {/* Horizontal grid lines */}
                    <div className="chart-line chart-line-1"></div>
                    <div className="chart-line chart-line-2"></div>
                    <div className="chart-line chart-line-3"></div>
                    <div className="chart-line chart-line-4"></div>
                    <div className="chart-line chart-line-5"></div>
                    
                    {/* Normal range area */}
                    <div className="normal-range-area"></div>
                    
                    {/* Data points */}
                    <div className="chart-point chart-point-1"></div>
                    <div className="chart-point chart-point-2"></div>
                    <div className="chart-point chart-point-3"></div>
                    
                    {/* Line connectors */}
                    <div className="chart-connector" style={{
                      left: 'calc(20% - 5px)',
                      top: 'calc(40% - 5px)',
                      width: 'calc(30% - 5px)',
                      transform: 'rotate(15deg)'
                    }}></div>
                    <div className="chart-connector" style={{
                      left: 'calc(50% - 5px)',
                      top: 'calc(30% - 5px)',
                      width: 'calc(30% - 5px)',
                      transform: 'rotate(-10deg)'
                    }}></div>
                  </div>
                </div>
                
                <div className="chart-x-axis">
                  <span className="x-axis-label">Aug</span>
                  <span className="x-axis-label">Sep</span>
                  <span className="x-axis-label">Oct</span>
                  <span className="x-axis-label">Nov</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* AI Insights Content */}
        {activeTab === 'insights' && (
          <div className="test-details-content">
            <div className="ai-insights-section">
              <div className="ai-insights-card">
                <div className="ai-insights-header">
                  <div className="ai-insights-icon">
                    <AiOutlineRobot />
                  </div>
                  <h3 className="ai-insights-title">Health Analysis Based on Test Results</h3>
                </div>
                
                <div className="insights-content">
                  <div className="insight-group">
                    <h4 className="insight-heading">
                      <FiTrendingUp /> Key Observations
                    </h4>
                    <p className="insight-text">
                      Test results are currently pending laboratory analysis.
                      <span className="trend-indicator pending">
                        <FiClock /> Pending
                      </span>
                    </p>
                    <p className="insight-text">
                      Once results are available, we'll provide detailed insights and recommendations.
                    </p>
                  </div>
                  
                  <div className="insight-group">
                    <h4 className="insight-heading">
                      <FiInfo /> Next Steps
                    </h4>
                    <p className="insight-text">Check back in 24-48 hours for complete test results and analysis</p>
                    <p className="insight-text">Contact your healthcare provider if you have immediate concerns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDetails; 