import React, { useState } from 'react';
import { 
  FiHeart, 
  FiActivity, 
  FiDroplet, 
  FiThermometer, 
  FiMoon, 
  FiBarChart2, 
  FiPieChart, 
  FiInfo,
  FiRefreshCw,
  FiMaximize,
  FiDownload,
  FiFilter,
  FiClock
} from 'react-icons/fi';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import './HealthGraphsSection.css';

// Mock data for vital signs
const mockVitalSignsData = {
  daily: [
    { time: '6:00 AM', heartRate: 68, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, oxygenLevel: 98, temperature: 98.2 },
    { time: '9:00 AM', heartRate: 72, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, oxygenLevel: 97, temperature: 98.4 },
    { time: '12:00 PM', heartRate: 75, bloodPressureSystolic: 125, bloodPressureDiastolic: 85, oxygenLevel: 98, temperature: 98.6 },
    { time: '3:00 PM', heartRate: 73, bloodPressureSystolic: 123, bloodPressureDiastolic: 83, oxygenLevel: 98, temperature: 98.8 },
    { time: '6:00 PM', heartRate: 70, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, oxygenLevel: 99, temperature: 98.6 },
    { time: '9:00 PM', heartRate: 65, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, oxygenLevel: 98, temperature: 98.4 }
  ],
  weekly: [
    { day: 'Mon', heartRate: 70, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, oxygenLevel: 98, temperature: 98.4 },
    { day: 'Tue', heartRate: 72, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, oxygenLevel: 97, temperature: 98.6 },
    { day: 'Wed', heartRate: 71, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, oxygenLevel: 98, temperature: 98.5 },
    { day: 'Thu', heartRate: 73, bloodPressureSystolic: 123, bloodPressureDiastolic: 83, oxygenLevel: 98, temperature: 98.4 },
    { day: 'Fri', heartRate: 75, bloodPressureSystolic: 125, bloodPressureDiastolic: 85, oxygenLevel: 97, temperature: 98.6 },
    { day: 'Sat', heartRate: 68, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, oxygenLevel: 99, temperature: 98.2 },
    { day: 'Sun', heartRate: 67, bloodPressureSystolic: 117, bloodPressureDiastolic: 77, oxygenLevel: 98, temperature: 98.3 }
  ],
  monthly: [
    { week: 'Week 1', heartRate: 70, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, oxygenLevel: 98, temperature: 98.4 },
    { week: 'Week 2', heartRate: 71, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, oxygenLevel: 98, temperature: 98.5 },
    { week: 'Week 3', heartRate: 72, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, oxygenLevel: 97, temperature: 98.6 },
    { week: 'Week 4', heartRate: 69, bloodPressureSystolic: 119, bloodPressureDiastolic: 79, oxygenLevel: 98, temperature: 98.3 }
  ]
};

// Mock data for physical activity
const mockPhysicalActivityData = {
  daily: [
    { hour: '6-8 AM', steps: 1200, caloriesBurned: 150, activeMinutes: 15 },
    { hour: '8-10 AM', steps: 2500, caloriesBurned: 220, activeMinutes: 25 },
    { hour: '10-12 PM', steps: 1800, caloriesBurned: 180, activeMinutes: 20 },
    { hour: '12-2 PM', steps: 1000, caloriesBurned: 120, activeMinutes: 10 },
    { hour: '2-4 PM', steps: 1500, caloriesBurned: 160, activeMinutes: 18 },
    { hour: '4-6 PM', steps: 2200, caloriesBurned: 210, activeMinutes: 22 },
    { hour: '6-8 PM', steps: 1700, caloriesBurned: 170, activeMinutes: 19 },
    { hour: '8-10 PM', steps: 800, caloriesBurned: 90, activeMinutes: 8 }
  ],
  weekly: [
    { day: 'Mon', steps: 8500, caloriesBurned: 420, activeMinutes: 45 },
    { day: 'Tue', steps: 10200, caloriesBurned: 510, activeMinutes: 55 },
    { day: 'Wed', steps: 7800, caloriesBurned: 380, activeMinutes: 40 },
    { day: 'Thu', steps: 9500, caloriesBurned: 470, activeMinutes: 50 },
    { day: 'Fri', steps: 11000, caloriesBurned: 550, activeMinutes: 60 },
    { day: 'Sat', steps: 12500, caloriesBurned: 620, activeMinutes: 70 },
    { day: 'Sun', steps: 6500, caloriesBurned: 320, activeMinutes: 35 }
  ],
  monthly: [
    { week: 'Week 1', steps: 65000, caloriesBurned: 3200, activeMinutes: 350 },
    { week: 'Week 2', steps: 72000, caloriesBurned: 3600, activeMinutes: 380 },
    { week: 'Week 3', steps: 68000, caloriesBurned: 3400, activeMinutes: 360 },
    { week: 'Week 4', steps: 70000, caloriesBurned: 3500, activeMinutes: 370 }
  ]
};

// Mock data for sleep insights
const mockSleepData = {
  daily: [
    { date: 'May 1', sleepDuration: 7.2, deepSleep: 2.1, lightSleep: 4.1, rem: 1.0, stressLevel: 35 },
    { date: 'May 2', sleepDuration: 6.8, deepSleep: 1.8, lightSleep: 4.0, rem: 1.0, stressLevel: 42 },
    { date: 'May 3', sleepDuration: 7.5, deepSleep: 2.3, lightSleep: 4.2, rem: 1.0, stressLevel: 30 },
    { date: 'May 4', sleepDuration: 8.0, deepSleep: 2.5, lightSleep: 4.5, rem: 1.0, stressLevel: 25 },
    { date: 'May 5', sleepDuration: 7.0, deepSleep: 2.0, lightSleep: 4.0, rem: 1.0, stressLevel: 38 },
    { date: 'May 6', sleepDuration: 6.5, deepSleep: 1.7, lightSleep: 3.8, rem: 1.0, stressLevel: 45 },
    { date: 'May 7', sleepDuration: 7.8, deepSleep: 2.4, lightSleep: 4.4, rem: 1.0, stressLevel: 28 }
  ],
  weekly: [
    { week: 'Week 1', sleepDuration: 7.2, deepSleep: 2.1, lightSleep: 4.1, rem: 1.0, stressLevel: 35 },
    { week: 'Week 2', sleepDuration: 7.5, deepSleep: 2.3, lightSleep: 4.2, rem: 1.0, stressLevel: 32 },
    { week: 'Week 3', sleepDuration: 6.8, deepSleep: 1.9, lightSleep: 3.9, rem: 1.0, stressLevel: 40 },
    { week: 'Week 4', sleepDuration: 7.3, deepSleep: 2.2, lightSleep: 4.1, rem: 1.0, stressLevel: 34 }
  ],
  monthly: [
    { month: 'Jan', sleepDuration: 7.0, deepSleep: 2.0, lightSleep: 4.0, rem: 1.0, stressLevel: 38 },
    { month: 'Feb', sleepDuration: 7.2, deepSleep: 2.1, lightSleep: 4.1, rem: 1.0, stressLevel: 36 },
    { month: 'Mar', sleepDuration: 7.4, deepSleep: 2.2, lightSleep: 4.2, rem: 1.0, stressLevel: 33 },
    { month: 'Apr', sleepDuration: 7.1, deepSleep: 2.0, lightSleep: 4.1, rem: 1.0, stressLevel: 37 },
    { month: 'May', sleepDuration: 7.3, deepSleep: 2.2, lightSleep: 4.1, rem: 1.0, stressLevel: 34 }
  ]
};

// AI insights based on data
const mockAIInsights = {
  vitalSigns: [
    "Your average blood pressure has decreased by 5% this week, showing improvement.",
    "Your heart rate variability has increased, indicating better cardiovascular health.",
    "Your oxygen levels have been consistently optimal over the past month."
  ],
  physicalActivity: [
    "You've exceeded your step goal 5 out of 7 days this week. Great job!",
    "Your active minutes have increased by 15% compared to last week.",
    "Try to increase your activity between 2-4 PM, which is your least active period."
  ],
  sleepHealth: [
    "Your deep sleep has improved by 12% this week, contributing to better recovery.",
    "Your stress levels tend to be higher on days following less than 7 hours of sleep.",
    "Consider going to bed 30 minutes earlier to reach the optimal 7.5 hours of sleep."
  ]
};

const HealthGraphsSection = ({ 
  title,
  type,
  timeFrame,
  darkMode
}) => {
  const [selectedVital, setSelectedVital] = useState('heartRate');
  const [selectedActivity, setSelectedActivity] = useState('steps');
  const [selectedSleepMetric, setSelectedSleepMetric] = useState('sleepDuration');
  const [selectedMedicationView, setSelectedMedicationView] = useState('adherence');
  const [selectedAppointmentView, setSelectedAppointmentView] = useState('history');

  // Get data based on time frame and type
  const getData = () => {
    switch (type) {
      case 'vitals':
        return mockVitalSignsData[timeFrame] || mockVitalSignsData.monthly;
      case 'activity':
        return mockPhysicalActivityData[timeFrame] || mockPhysicalActivityData.monthly;
      case 'sleep':
        return mockSleepData[timeFrame] || mockSleepData.monthly;
      case 'medication':
        // Would use real medication data
        return mockPhysicalActivityData[timeFrame] || mockPhysicalActivityData.monthly;
      case 'appointments':
        // Would use real appointment data
        return mockPhysicalActivityData[timeFrame] || mockPhysicalActivityData.monthly;
      default:
        return [];
    }
  };

  // Get appropriate insights based on section type
  const getInsights = () => {
    switch (type) {
      case 'vitals':
        return mockAIInsights.vitalSigns;
      case 'activity':
        return mockAIInsights.physicalActivity;
      case 'sleep':
        return mockAIInsights.sleepHealth;
      case 'medication':
        return mockAIInsights.physicalActivity; // Placeholder
      case 'appointments':
        return mockAIInsights.physicalActivity; // Placeholder
      default:
        return [];
    }
  };

  // Get x-axis key based on time frame
  const getXAxisKey = () => {
    switch (timeFrame) {
      case 'week':
        return 'day';
      case 'month':
        return 'week';
      case 'quarter':
        return 'week';
      case 'year':
        return 'month';
      default:
        return 'day';
    }
  };

  // Get chart colors based on dark mode
  const getChartColors = () => {
    if (darkMode) {
      return {
        primary: '#38bdf8',
        secondary: '#818cf8',
        tertiary: '#f472b6',
        grid: '#475569',
        text: '#e2e8f0'
      };
    }
    return {
      primary: '#0ea5e9',
      secondary: '#4f46e5',
      tertiary: '#ec4899',
      grid: '#e2e8f0',
      text: '#334155'
    };
  };

  const chartColors = getChartColors();

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`custom-tooltip ${darkMode ? 'dark' : ''}`}>
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${entry.unit || ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Determine what chart to render based on type
  const renderChart = () => {
    const data = getData();
    const xAxisKey = getXAxisKey();

    switch (type) {
      case 'vitals':
        return renderVitalsChart(data, xAxisKey);
      case 'activity':
        return renderActivityChart(data, xAxisKey);
      case 'sleep':
        return renderSleepChart(data, xAxisKey);
      case 'medication':
        return renderMedicationChart(data, xAxisKey);
      case 'appointments':
        return renderAppointmentsChart(data, xAxisKey);
      default:
        return <div>No chart data available</div>;
    }
  };

  // Vitals chart
  const renderVitalsChart = (data, xAxisKey) => {
    if (selectedVital === 'bloodPressure') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
          <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
          <YAxis tick={{ fill: chartColors.text }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: chartColors.text }} />
          <Line 
            type="monotone" 
            dataKey="bloodPressureSystolic" 
            name="Systolic" 
            stroke={chartColors.primary} 
            activeDot={{ r: 8 }} 
            unit="mmHg"
          />
          <Line 
            type="monotone" 
            dataKey="bloodPressureDiastolic" 
            name="Diastolic" 
            stroke={chartColors.secondary} 
            unit="mmHg"
          />
        </LineChart>
      );
    }

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
        <YAxis tick={{ fill: chartColors.text }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Line 
          type="monotone" 
          dataKey={selectedVital} 
          name={
            selectedVital === 'heartRate' ? 'Heart Rate' : 
            selectedVital === 'oxygenLevel' ? 'Oxygen Level' : 
            'Temperature'
          } 
          stroke={chartColors.primary} 
          activeDot={{ r: 8 }} 
          unit={
            selectedVital === 'heartRate' ? 'bpm' : 
            selectedVital === 'oxygenLevel' ? '%' : 
            '°F'
          }
        />
      </LineChart>
    );
  };

  // Activity chart
  const renderActivityChart = (data, xAxisKey) => {
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
        <YAxis tick={{ fill: chartColors.text }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Bar 
          dataKey={selectedActivity} 
          name={
            selectedActivity === 'steps' ? 'Steps' : 
            selectedActivity === 'caloriesBurned' ? 'Calories Burned' : 
            'Active Minutes'
          } 
          fill={chartColors.primary} 
          unit={
            selectedActivity === 'steps' ? '' : 
            selectedActivity === 'caloriesBurned' ? 'cal' : 
            'min'
          }
        />
      </BarChart>
    );
  };

  // Sleep chart
  const renderSleepChart = (data, xAxisKey) => {
    return (
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
        <YAxis tick={{ fill: chartColors.text }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Area 
          type="monotone" 
          dataKey={selectedSleepMetric} 
          name={
            selectedSleepMetric === 'sleepDuration' ? 'Sleep Duration' : 
            selectedSleepMetric === 'deepSleep' ? 'Deep Sleep' : 
            selectedSleepMetric === 'lightSleep' ? 'Light Sleep' : 
            selectedSleepMetric === 'rem' ? 'REM Sleep' : 
            'Stress Level'
          } 
          stroke={chartColors.primary} 
          fill={chartColors.primary} 
          fillOpacity={0.3}
          unit={
            selectedSleepMetric === 'stressLevel' ? '' : 'hr'
          }
        />
      </AreaChart>
    );
  };

  // Medication chart (placeholder)
  const renderMedicationChart = (data, xAxisKey) => {
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
        <YAxis tick={{ fill: chartColors.text }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Bar dataKey="caloriesBurned" name="Adherence Rate" fill={chartColors.primary} />
      </BarChart>
    );
  };

  // Appointments chart (placeholder)
  const renderAppointmentsChart = (data, xAxisKey) => {
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis dataKey={xAxisKey} tick={{ fill: chartColors.text }} />
        <YAxis tick={{ fill: chartColors.text }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: chartColors.text }} />
        <Line type="monotone" dataKey="activeMinutes" name="Appointments" stroke={chartColors.primary} />
      </LineChart>
    );
  };

  // Render selector buttons based on section type
  const renderSelector = () => {
    switch (type) {
      case 'vitals':
        return (
          <div className="chart-selector">
            <button 
              className={selectedVital === 'heartRate' ? 'active' : ''} 
              onClick={() => setSelectedVital('heartRate')}
            >
              <FiHeart />
              <span>Heart Rate</span>
            </button>
            <button 
              className={selectedVital === 'bloodPressure' ? 'active' : ''} 
              onClick={() => setSelectedVital('bloodPressure')}
            >
              <FiActivity />
              <span>Blood Pressure</span>
            </button>
            <button 
              className={selectedVital === 'oxygenLevel' ? 'active' : ''} 
              onClick={() => setSelectedVital('oxygenLevel')}
            >
              <FiDroplet />
              <span>Oxygen Level</span>
            </button>
            <button 
              className={selectedVital === 'temperature' ? 'active' : ''} 
              onClick={() => setSelectedVital('temperature')}
            >
              <FiThermometer />
              <span>Temperature</span>
            </button>
          </div>
        );
      case 'activity':
        return (
          <div className="chart-selector">
            <button 
              className={selectedActivity === 'steps' ? 'active' : ''} 
              onClick={() => setSelectedActivity('steps')}
            >
              <FiActivity />
              <span>Steps</span>
            </button>
            <button 
              className={selectedActivity === 'caloriesBurned' ? 'active' : ''} 
              onClick={() => setSelectedActivity('caloriesBurned')}
            >
              <FiActivity />
              <span>Calories</span>
            </button>
            <button 
              className={selectedActivity === 'activeMinutes' ? 'active' : ''} 
              onClick={() => setSelectedActivity('activeMinutes')}
            >
              <FiClock />
              <span>Active Minutes</span>
            </button>
          </div>
        );
      case 'sleep':
        return (
          <div className="chart-selector">
            <button 
              className={selectedSleepMetric === 'sleepDuration' ? 'active' : ''} 
              onClick={() => setSelectedSleepMetric('sleepDuration')}
            >
              <FiMoon />
              <span>Duration</span>
            </button>
            <button 
              className={selectedSleepMetric === 'deepSleep' ? 'active' : ''} 
              onClick={() => setSelectedSleepMetric('deepSleep')}
            >
              <FiMoon />
              <span>Deep Sleep</span>
            </button>
            <button 
              className={selectedSleepMetric === 'stressLevel' ? 'active' : ''} 
              onClick={() => setSelectedSleepMetric('stressLevel')}
            >
              <FiActivity />
              <span>Stress Level</span>
            </button>
          </div>
        );
      case 'medication':
        return (
          <div className="chart-selector">
            <button 
              className={selectedMedicationView === 'adherence' ? 'active' : ''} 
              onClick={() => setSelectedMedicationView('adherence')}
            >
              <FiBarChart2 />
              <span>Adherence</span>
            </button>
            <button 
              className={selectedMedicationView === 'schedule' ? 'active' : ''} 
              onClick={() => setSelectedMedicationView('schedule')}
            >
              <FiClock />
              <span>Schedule</span>
            </button>
          </div>
        );
      case 'appointments':
        return (
          <div className="chart-selector">
            <button 
              className={selectedAppointmentView === 'history' ? 'active' : ''} 
              onClick={() => setSelectedAppointmentView('history')}
            >
              <FiBarChart2 />
              <span>History</span>
            </button>
            <button 
              className={selectedAppointmentView === 'upcoming' ? 'active' : ''} 
              onClick={() => setSelectedAppointmentView('upcoming')}
            >
              <FiClock />
              <span>Upcoming</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`analytics-section ${darkMode ? 'dark-mode' : ''}`}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <div className="section-actions">
          <button aria-label="Refresh data">
            <FiRefreshCw />
          </button>
          <button aria-label="Download data">
            <FiDownload />
          </button>
          <button aria-label="Filter data">
            <FiFilter />
          </button>
        </div>
      </div>

      {renderSelector()}

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="insights-container">
        <h3>
          <FiInfo /> AI Health Insights
        </h3>
        <ul>
          {getInsights().map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HealthGraphsSection; 