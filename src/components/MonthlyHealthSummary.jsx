import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { FiArrowUp, FiArrowDown, FiActivity, FiEdit2, FiX, FiCheck } from 'react-icons/fi';
import { FaArrowUp, FaArrowDown, FaEdit, FaTimes, FaHeartbeat } from 'react-icons/fa';
import './MonthlyHealthSummary.css';

const monthlyData = [
  { day: '1', bloodPressure: 120, heartRate: 75, bloodSugar: 95 },
  { day: '5', bloodPressure: 118, heartRate: 72, bloodSugar: 92 },
  { day: '10', bloodPressure: 122, heartRate: 78, bloodSugar: 98 },
  { day: '15', bloodPressure: 119, heartRate: 73, bloodSugar: 94 },
  { day: '20', bloodPressure: 121, heartRate: 76, bloodSugar: 96 },
  { day: '25', bloodPressure: 117, heartRate: 71, bloodSugar: 91 },
  { day: '30', bloodPressure: 120, heartRate: 74, bloodSugar: 93 }
];

const MetricEditModal = ({ metric, onSave, onClose }) => {
  const [editedMetric, setEditedMetric] = useState(metric);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedMetric);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Edit {metric.title}</h3>
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Value</label>
            <input
              type="number"
              value={editedMetric.value}
              onChange={(e) => setEditedMetric({ ...editedMetric, value: Number(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label>Change Percentage</label>
            <input
              type="number"
              step="0.1"
              value={editedMetric.change}
              onChange={(e) => setEditedMetric({ 
                ...editedMetric, 
                change: Number(e.target.value),
                trend: Number(e.target.value) > 0 ? 'up' : 'down'
              })}
              required
            />
          </div>
          <div className="edit-modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="date">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="metric-value" style={{ color: item.color }}>
            {item.name}: {item.value} {item.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MetricCard = ({ title, value, unit, trend, trendValue, data, color, onEdit }) => {
  const trendClass = trend === 'up' ? 'up' : 'down';
  const trendIcon = trend === 'up' ? <FaArrowUp /> : <FaArrowDown />;

  return (
    <div className="metric-summary-card">
      <div className="metric-header">
        <h3>{title}</h3>
        <div className="metric-actions">
          <div className={`trend-indicator ${trendClass}`}>
            {trendIcon}
            {trendValue}%
          </div>
          <button className="edit-button" onClick={onEdit} aria-label={`Edit ${title}`}>
            <FaEdit />
          </button>
        </div>
      </div>
      <div className="metric-value">
        <span className="value">{value}</span>
        <span className="unit">{unit}</span>
      </div>
      <div className="metric-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MonthlyHealthSummary = () => {
  const [selectedRange, setSelectedRange] = useState('1M');
  const [editingMetric, setEditingMetric] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [healthScore, setHealthScore] = useState(85);

  const monthlyData = [
    { date: '2024-01-01', bloodPressure: 120, heartRate: 72, bloodSugar: 95 },
    { date: '2024-01-08', bloodPressure: 118, heartRate: 70, bloodSugar: 92 },
    { date: '2024-01-15', bloodPressure: 122, heartRate: 74, bloodSugar: 98 },
    { date: '2024-01-22', bloodPressure: 119, heartRate: 71, bloodSugar: 94 },
    { date: '2024-01-29', bloodPressure: 121, heartRate: 73, bloodSugar: 96 },
  ];

  const metrics = [
    {
      id: 'bloodPressure',
      title: 'Blood Pressure',
      value: 120,
      unit: 'mmHg',
      trend: 'down',
      trendValue: 2.5,
      color: '#3b82f6',
      data: monthlyData.map(d => ({ date: d.date, value: d.bloodPressure }))
    },
    {
      id: 'heartRate',
      title: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      trend: 'up',
      trendValue: 1.8,
      color: '#ef4444',
      data: monthlyData.map(d => ({ date: d.date, value: d.heartRate }))
    },
    {
      id: 'bloodSugar',
      title: 'Blood Sugar',
      value: 95,
      unit: 'mg/dL',
      trend: 'down',
      trendValue: 3.2,
      color: '#10b981',
      data: monthlyData.map(d => ({ date: d.date, value: d.bloodSugar }))
    }
  ];

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
    // Here you would typically fetch new data based on the selected range
  };

  const handleEdit = (metric) => {
    setEditingMetric(metric);
    setEditValue(metric.value.toString());
  };

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setEditingMetric(null);
    setEditValue('');
  };

  return (
    <div className="monthly-summary">
      <div className="summary-header">
        <div className="title-section">
          <h2>Monthly Health Summary</h2>
          <p>Track your health metrics and trends</p>
        </div>
        <button className="health-score" onClick={() => setHealthScore(prev => prev + 1)}>
          <FaHeartbeat />
          Health Score: {healthScore}
        </button>
      </div>

      <div className="date-range-selector">
        <label htmlFor="dateRange">Time Range:</label>
        <select
          id="dateRange"
          value={selectedRange}
          onChange={handleRangeChange}
        >
          <option value="1W">1 Week</option>
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>
      </div>

      <div className="metrics-grid">
        {metrics.map(metric => (
          <MetricCard
            key={metric.id}
            {...metric}
            onEdit={() => handleEdit(metric)}
          />
        ))}
      </div>

      <div className="trend-chart">
        <h3>Health Metrics Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                stroke="#64748b"
              />
              <YAxis stroke="#64748b" />
              <Tooltip content={<CustomTooltip />} />
              {metrics.map(metric => (
                <Line
                  key={metric.id}
                  type="monotone"
                  dataKey={metric.id}
                  name={metric.title}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  unit={metric.unit}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {editingMetric && (
        <div className="edit-modal-overlay" onClick={() => setEditingMetric(null)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit {editingMetric.title}</h3>
              <button
                className="close-button"
                onClick={() => setEditingMetric(null)}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="metricValue">
                {editingMetric.title} ({editingMetric.unit})
              </label>
              <input
                id="metricValue"
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={`Enter new ${editingMetric.title.toLowerCase()}`}
              />
            </div>
            <div className="edit-modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setEditingMetric(null)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyHealthSummary; 