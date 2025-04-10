import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ActivityGrowthEdit from './ActivityGrowthEdit';
import './ActivityGrowth.css';

const ActivityGrowth = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState('2023-10-28');
  const [chartData, setChartData] = useState([
    { date: '10/10', weight: 75, bmi: 22 },
    { date: '10/20', weight: 74, bmi: 21.8 },
    { date: '10/30', weight: 73.5, bmi: 21.5 },
    { date: '11/10', weight: 72, bmi: 21.2 },
    { date: '11/20', weight: 71.5, bmi: 21 },
    { date: '11/30', weight: 71, bmi: 20.8 },
    { date: '12/10', weight: 70, bmi: 20.5 },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = ({ date, data }) => {
    setCurrentDate(date);
    setChartData(data);
    setIsEditing(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="date">{label}</p>
          <p className="weight">Weight: {payload[0].value}kg</p>
          <p className="bmi">BMI: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="activity-growth-card">
      <div className="card-header">
        <div className="title-section">
          <h2>Activity Growth</h2>
          <div className="legend">
            <div className="legend-item">
              <span className="legend-dot weight"></span>
              <span>My Weight</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot bmi"></span>
              <span>My BMI Record</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <div className="date-badge">
            {new Date(currentDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <button className="edit-button" onClick={handleEdit}>
            <FiEdit2 />
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB923C" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="bmiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 180]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#FB923C"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#FB923C" }}
              fillOpacity={1}
              fill="url(#weightGradient)"
            />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#60A5FA" }}
              fillOpacity={1}
              fill="url(#bmiGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ActivityGrowthEdit
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        currentDate={currentDate}
        data={chartData}
      />
    </div>
  );
};

export default ActivityGrowth; 