import React, { useState } from 'react';
import { 
  FiDownload, FiShare2, FiPrinter, FiAlertCircle,
  FiTrendingUp, FiTrendingDown, FiActivity
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './HealthSummaryReport.css';

const HealthSummaryReport = ({ patientId }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['bp', 'heartRate', 'glucose']);
  const [timeRange, setTimeRange] = useState('month');

  const healthMetrics = {
    bp: {
      current: "120/80",
      trend: "stable",
      risk: "low",
      history: [
        { date: '2024-01', value: 120 },
        { date: '2024-02', value: 118 },
        // Add more data points
      ]
    },
    heartRate: {
      current: "72 bpm",
      trend: "improving",
      risk: "low",
      history: [
        { date: '2024-01', value: 75 },
        { date: '2024-02', value: 72 },
        // Add more data points
      ]
    },
    glucose: {
      current: "95 mg/dL",
      trend: "warning",
      risk: "moderate",
      history: [
        { date: '2024-01', value: 90 },
        { date: '2024-02', value: 95 },
        // Add more data points
      ]
    }
  };

  return (
    <div className="health-summary">
      <div className="summary-header">
        <h2>Health Summary Report</h2>
        <div className="header-actions">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <div className="action-buttons">
            <button className="print-btn">
              <FiPrinter /> Print Report
            </button>
            <button className="download-btn">
              <FiDownload /> Download PDF
            </button>
            <button className="share-btn">
              <FiShare2 /> Share Report
            </button>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        {Object.entries(healthMetrics).map(([key, metric]) => (
          <div key={key} className="metric-card">
            <div className="metric-header">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <span className={`trend-badge ${metric.trend}`}>
                {metric.trend === 'improving' && <FiTrendingUp />}
                {metric.trend === 'warning' && <FiTrendingDown />}
                {metric.trend}
              </span>
            </div>
            <div className="metric-value">{metric.current}</div>
            <div className="metric-chart">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={metric.history}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {metric.risk !== 'low' && (
              <div className={`risk-alert ${metric.risk}`}>
                <FiAlertCircle />
                {metric.risk.charAt(0).toUpperCase() + metric.risk.slice(1)} Risk
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="insights-section">
        <h3>AI-Powered Insights</h3>
        {/* Add AI insights implementation */}
      </div>
    </div>
  );
};

export default HealthSummaryReport; 