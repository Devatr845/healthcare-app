import React, { useState } from 'react';
import { 
  FiHeart, FiActivity, FiThermometer, FiDroplet, 
  FiTrendingUp, FiTrendingDown, FiMinus, FiAlertCircle 
} from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './HealthSummarySection.css';

const HealthSummarySection = ({ patientId }) => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - replace with API calls
  const healthMetrics = {
    vitals: {
      bloodPressure: {
        current: "120/80",
        trend: "up",
        change: "+5/+2",
        status: "normal",
        history: [
          { date: '2024-02-14', systolic: 115, diastolic: 78 },
          { date: '2024-02-15', systolic: 118, diastolic: 79 },
          { date: '2024-02-16', systolic: 120, diastolic: 80 },
          { date: '2024-02-17', systolic: 117, diastolic: 78 },
          { date: '2024-02-18', systolic: 120, diastolic: 80 }
        ]
      },
      heartRate: {
        current: "72 bpm",
        trend: "stable",
        change: "0",
        status: "normal",
        history: [
          { date: '2024-02-14', value: 70 },
          { date: '2024-02-15', value: 71 },
          { date: '2024-02-16', value: 72 },
          { date: '2024-02-17', value: 72 },
          { date: '2024-02-18', value: 72 }
        ]
      },
      temperature: {
        current: "98.6°F",
        trend: "down",
        change: "-0.5",
        status: "normal",
        history: [
          { date: '2024-02-14', value: 99.1 },
          { date: '2024-02-15', value: 98.9 },
          { date: '2024-02-16', value: 98.7 },
          { date: '2024-02-17', value: 98.6 },
          { date: '2024-02-18', value: 98.6 }
        ]
      }
    },
    bloodWork: {
      glucose: {
        current: "95 mg/dL",
        trend: "down",
        change: "-5",
        status: "normal",
        lastTested: "2024-02-18",
        reference: "70-100 mg/dL"
      },
      cholesterol: {
        current: "180 mg/dL",
        trend: "stable",
        change: "0",
        status: "normal",
        lastTested: "2024-02-18",
        reference: "<200 mg/dL"
      },
      hemoglobin: {
        current: "14.2 g/dL",
        trend: "up",
        change: "+0.3",
        status: "normal",
        lastTested: "2024-02-18",
        reference: "13.5-17.5 g/dL"
      }
    },
    riskFactors: [
      {
        name: "Cardiovascular Risk",
        level: "low",
        details: "Based on blood pressure and cholesterol levels"
      },
      {
        name: "Diabetes Risk",
        level: "moderate",
        details: "Family history, but normal glucose levels"
      }
    ],
    recommendations: [
      {
        type: "lifestyle",
        title: "Increase Physical Activity",
        description: "Recommend 30 minutes of moderate exercise, 5 days per week"
      },
      {
        type: "diet",
        title: "Reduce Sodium Intake",
        description: "Current intake slightly elevated, aim for <2300mg daily"
      }
    ]
  };

  const renderTrendIcon = (trend) => {
    if (trend === "up") return <FiTrendingUp className="trend-up" />;
    if (trend === "down") return <FiTrendingDown className="trend-down" />;
    return <FiMinus className="trend-stable" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      normal: "#16A34A",
      elevated: "#F59E0B",
      high: "#DC2626",
      low: "#3B82F6"
    };
    return colors[status] || "#6B7280";
  };

  return (
    <div className="health-summary-section">
      <div className="summary-header">
        <h2>Health Summary</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last 3 Months</option>
        </select>
      </div>

      <div className="summary-grid">
        <div className="vital-signs-section">
          <h3>Vital Signs</h3>
          <div className="vitals-grid">
            {Object.entries(healthMetrics.vitals).map(([key, data]) => (
              <div key={key} className="vital-card">
                <div className="vital-header">
                  <div className="vital-icon">
                    {key === 'bloodPressure' && <FiHeart />}
                    {key === 'heartRate' && <FiActivity />}
                    {key === 'temperature' && <FiThermometer />}
                  </div>
                  <div className="vital-title">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
                <div className="vital-value">
                  {data.current}
                  <span 
                    className="vital-status"
                    style={{ backgroundColor: getStatusColor(data.status) }}
                  >
                    {data.status}
                  </span>
                </div>
                <div className="vital-trend">
                  {renderTrendIcon(data.trend)}
                  <span>{data.change}</span>
                </div>
                <div className="vital-chart">
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={data.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={false}
                      />
                      <YAxis hide />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey={key === 'bloodPressure' ? 'systolic' : 'value'}
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={false}
                      />
                      {key === 'bloodPressure' && (
                        <Line 
                          type="monotone" 
                          dataKey="diastolic"
                          stroke="#93C5FD" 
                          strokeWidth={2}
                          dot={false}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="blood-work-section">
          <h3>Blood Work</h3>
          <div className="blood-work-grid">
            {Object.entries(healthMetrics.bloodWork).map(([key, data]) => (
              <div key={key} className="blood-work-card">
                <div className="blood-work-header">
                  <h4>{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <span className="last-tested">
                    Tested: {new Date(data.lastTested).toLocaleDateString()}
                  </span>
                </div>
                <div className="blood-work-value">
                  {data.current}
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(data.status) }}
                  >
                    {data.status}
                  </span>
                </div>
                <div className="reference-range">
                  Reference: {data.reference}
                </div>
                <div className="trend-indicator">
                  {renderTrendIcon(data.trend)}
                  <span>{data.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="risk-factors-section">
          <h3>Risk Factors</h3>
          <div className="risk-factors-grid">
            {healthMetrics.riskFactors.map((risk, index) => (
              <div key={index} className="risk-card">
                <div className="risk-header">
                  <FiAlertCircle />
                  <h4>{risk.name}</h4>
                </div>
                <div className={`risk-level ${risk.level}`}>
                  {risk.level.toUpperCase()}
                </div>
                <p>{risk.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendations-section">
          <h3>Recommendations</h3>
          <div className="recommendations-list">
            {healthMetrics.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-header">
                  <h4>{rec.title}</h4>
                  <span className="recommendation-type">{rec.type}</span>
                </div>
                <p>{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSummarySection; 