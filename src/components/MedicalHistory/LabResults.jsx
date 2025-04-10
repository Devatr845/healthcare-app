import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiDownload, 
  FiTrendingUp,
  FiFilter,
  FiPlusCircle,
  FiFileText,
  FiAlertCircle
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import './LabResults.css';

const initialLabResults = [
  {
    id: 1,
    category: "Blood Sugar",
    tests: [
      {
        id: "bs-001",
        name: "Fasting Blood Sugar",
        date: "2024-01-15",
        value: 95,
        unit: "mg/dL",
        referenceRange: { min: 70, max: 100 },
        status: "normal",
        doctor: "Dr. Sarah Wilson",
        notes: "Within normal range. Continue current diet plan.",
        report: "/reports/bs-001.pdf"
      },
      {
        id: "bs-002",
        name: "HbA1c",
        date: "2024-01-15",
        value: 5.6,
        unit: "%",
        referenceRange: { min: 4.0, max: 5.7 },
        status: "normal",
        doctor: "Dr. Sarah Wilson",
        notes: "Good glycemic control maintained.",
        report: "/reports/bs-002.pdf"
      }
    ],
    history: [
      { date: "2023-07-15", value: 98 },
      { date: "2023-09-15", value: 92 },
      { date: "2023-11-15", value: 88 },
      { date: "2024-01-15", value: 95 }
    ]
  },
  {
    id: 2,
    category: "Lipid Profile",
    tests: [
      {
        id: "lp-001",
        name: "Total Cholesterol",
        date: "2024-01-10",
        value: 185,
        unit: "mg/dL",
        referenceRange: { min: 125, max: 200 },
        status: "normal",
        doctor: "Dr. Michael Chen",
        notes: "Maintain current lifestyle modifications.",
        report: "/reports/lp-001.pdf"
      },
      {
        id: "lp-002",
        name: "HDL Cholesterol",
        date: "2024-01-10",
        value: 62,
        unit: "mg/dL",
        referenceRange: { min: 40, max: 60 },
        status: "high",
        doctor: "Dr. Michael Chen",
        notes: "Excellent HDL levels. Continue regular exercise.",
        report: "/reports/lp-002.pdf"
      }
    ],
    history: [
      { date: "2023-07-10", value: 195 },
      { date: "2023-09-10", value: 190 },
      { date: "2023-11-10", value: 188 },
      { date: "2024-01-10", value: 185 }
    ]
  }
];

const TestResultCard = ({ test }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#059669';
      case 'high': return '#DC2626';
      case 'low': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <div className="test-result-card">
      <div className="test-header">
        <div className="test-info">
          <h4>{test.name}</h4>
          <span className="test-date">
            <FiCalendar />
            {new Date(test.date).toLocaleDateString()}
          </span>
        </div>
        <div 
          className={`status-badge ${test.status}`}
          style={{ color: getStatusColor(test.status) }}
        >
          {test.status}
        </div>
      </div>

      <div className="test-value">
        <span className="value">{test.value}</span>
        <span className="unit">{test.unit}</span>
      </div>

      <div className="reference-range">
        <label>Reference Range:</label>
        <span>{test.referenceRange.min} - {test.referenceRange.max} {test.unit}</span>
      </div>

      <div className="doctor-notes">
        <label>Doctor's Notes:</label>
        <p>{test.notes}</p>
      </div>

      <div className="test-actions">
        <button className="download-report">
          <FiDownload />
          Download Report
        </button>
      </div>
    </div>
  );
};

const TrendChart = ({ data, referenceRange }) => {
  return (
    <div className="trend-chart">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis domain={[
            Math.min(referenceRange.min - 10, Math.min(...data.map(d => d.value))),
            Math.max(referenceRange.max + 10, Math.max(...data.map(d => d.value)))
          ]} />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
            formatter={(value) => [`${value}`, 'Value']}
          />
          <ReferenceLine y={referenceRange.max} stroke="#DC2626" strokeDasharray="3 3" />
          <ReferenceLine y={referenceRange.min} stroke="#059669" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const LabResults = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showTrends, setShowTrends] = useState(false);

  const filteredResults = activeCategory === 'all'
    ? initialLabResults
    : initialLabResults.filter(result => result.category === activeCategory);

  return (
    <div className="lab-results-section">
      <div className="section-header">
        <div className="title-area">
          <h2>Lab Test Results</h2>
          <button className="add-test-btn">
            <FiPlusCircle />
            Add New Test
          </button>
        </div>

        <div className="view-controls">
          <div className="category-filters">
            <button 
              className={activeCategory === 'all' ? 'active' : ''} 
              onClick={() => setActiveCategory('all')}
            >
              All Tests
            </button>
            {initialLabResults.map(category => (
              <button
                key={category.id}
                className={activeCategory === category.category ? 'active' : ''}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <button 
            className={`trend-toggle ${showTrends ? 'active' : ''}`}
            onClick={() => setShowTrends(!showTrends)}
          >
            <FiTrendingUp />
            {showTrends ? 'Hide Trends' : 'Show Trends'}
          </button>
        </div>
      </div>

      <div className="results-grid">
        {filteredResults.map(category => (
          <div key={category.id} className="category-section">
            <h3>{category.category}</h3>
            
            {showTrends && category.history.length > 0 && (
              <TrendChart 
                data={category.history}
                referenceRange={category.tests[0].referenceRange}
              />
            )}

            <div className="tests-grid">
              {category.tests.map(test => (
                <TestResultCard key={test.id} test={test} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults; 