import React, { useState } from 'react';
import { 
  FiDownload, FiPrinter, FiRefreshCw, FiSliders, 
  FiMoon, FiSun, FiX
} from 'react-icons/fi';
import HealthSnapshotSection from './HealthSnapshotSection';
import HealthGraphsSection from './HealthGraphsSection';
import './PatientAnalytics.css';

const PatientAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  const [darkMode, setDarkMode] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  
  // Toggle widgets visibility
  const [widgets, setWidgets] = useState({
    vitals: true,
    activity: true,
    sleep: true,
    medication: true,
    appointments: true
  });

  const toggleWidget = (widget) => {
    setWidgets({
      ...widgets,
      [widget]: !widgets[widget]
    });
  };

  return (
    <div className={`analytics-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="analytics-header">
        <div className="analytics-title">
          <h1>Your Health Analytics</h1>
          <p>Track your health metrics and activities over time</p>
        </div>
        
        <div className="analytics-controls">
          <div className="time-frame-selector">
            <button 
              className={timeFrame === 'week' ? 'active' : ''} 
              onClick={() => setTimeFrame('week')}
            >
              Week
            </button>
            <button 
              className={timeFrame === 'month' ? 'active' : ''} 
              onClick={() => setTimeFrame('month')}
            >
              Month
            </button>
            <button 
              className={timeFrame === 'quarter' ? 'active' : ''} 
              onClick={() => setTimeFrame('quarter')}
            >
              3 Months
            </button>
            <button 
              className={timeFrame === 'year' ? 'active' : ''} 
              onClick={() => setTimeFrame('year')}
            >
              Year
            </button>
          </div>
          
          <div className="header-actions">
            <button className="customize-btn" onClick={() => setShowCustomization(!showCustomization)}>
              <FiSliders />
              Customize
            </button>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="analytics-content">
        {/* Health Snapshot Section */}
        <HealthSnapshotSection darkMode={darkMode} />
        
        {/* Health Graphs Section */}
        <div className="health-graphs-section">
          {widgets.vitals && (
            <HealthGraphsSection 
              title="Vital Signs Trends" 
              type="vitals"
              timeFrame={timeFrame}
              darkMode={darkMode}
            />
          )}
          
          {widgets.activity && (
            <HealthGraphsSection 
              title="Physical Activity" 
              type="activity"
              timeFrame={timeFrame}
              darkMode={darkMode}
            />
          )}
          
          {widgets.sleep && (
            <HealthGraphsSection 
              title="Sleep Insights" 
              type="sleep"
              timeFrame={timeFrame}
              darkMode={darkMode}
            />
          )}
          
          {widgets.medication && (
            <HealthGraphsSection 
              title="Medication Adherence" 
              type="medication"
              timeFrame={timeFrame}
              darkMode={darkMode}
            />
          )}
          
          {widgets.appointments && (
            <HealthGraphsSection 
              title="Appointment History" 
              type="appointments"
              timeFrame={timeFrame}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
      
      {/* Customization Panel */}
      <div className={`customization-panel ${showCustomization ? '' : 'hidden'}`}>
        <div className="customization-header">
          <h2>Customize Dashboard</h2>
          <button className="close-panel-btn" onClick={() => setShowCustomization(false)}>
            <FiX />
          </button>
        </div>
        
        <div className="widget-toggles">
          <div className="widget-toggle">
            <div className="widget-info">
              <div className="widget-icon">
                <FiRefreshCw />
              </div>
              <span className="widget-name">Health Vitals</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={widgets.vitals}
                onChange={() => toggleWidget('vitals')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="widget-toggle">
            <div className="widget-info">
              <div className="widget-icon">
                <FiRefreshCw />
              </div>
              <span className="widget-name">Physical Activity</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={widgets.activity}
                onChange={() => toggleWidget('activity')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="widget-toggle">
            <div className="widget-info">
              <div className="widget-icon">
                <FiRefreshCw />
              </div>
              <span className="widget-name">Sleep Tracking</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={widgets.sleep}
                onChange={() => toggleWidget('sleep')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="widget-toggle">
            <div className="widget-info">
              <div className="widget-icon">
                <FiRefreshCw />
              </div>
              <span className="widget-name">Medication Adherence</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={widgets.medication}
                onChange={() => toggleWidget('medication')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="widget-toggle">
            <div className="widget-info">
              <div className="widget-icon">
                <FiRefreshCw />
              </div>
              <span className="widget-name">Appointment History</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={widgets.appointments}
                onChange={() => toggleWidget('appointments')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAnalytics; 