import React, { useState } from 'react';
import { FiCalendar, FiFilter, FiCheckSquare, FiSquare, FiCheck, FiSearch } from 'react-icons/fi';
import './ResultsPage.css';

const ResultsFilterPanel = ({
  selectedDateRange,
  setSelectedDateRange,
  selectedTypes,
  setSelectedTypes,
  selectedStatuses,
  setSelectedStatuses,
  selectedDoctors,
  setSelectedDoctors,
  availableTypes,
  availableDoctors
}) => {
  // State for custom date range
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [typeSearchTerm, setTypeSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  
  // Available status options
  const statusOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'critical', label: 'Critical' },
    { value: 'pending', label: 'Pending' }
  ];
  
  // Date range options
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];
  
  // Handler for date range selection
  const handleDateRangeChange = (e) => {
    setSelectedDateRange(e.target.value);
  };
  
  // Handler for custom date range
  const handleCustomDateRangeApply = () => {
    if (customStartDate && customEndDate) {
      // In a real app, you would process these dates and update the filter
      console.log('Custom date range:', customStartDate, 'to', customEndDate);
      // For now, we'll just set the dateRange to 'custom'
      setSelectedDateRange('custom');
    }
  };
  
  // Handlers for multi-select filters
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  const handleStatusToggle = (status) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };
  
  const handleDoctorToggle = (doctor) => {
    setSelectedDoctors(prev => {
      if (prev.includes(doctor)) {
        return prev.filter(d => d !== doctor);
      } else {
        return [...prev, doctor];
      }
    });
  };
  
  // Handler for clearing all filters
  const handleClearAllFilters = () => {
    setSelectedDateRange('all');
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSelectedDoctors([]);
    setCustomStartDate('');
    setCustomEndDate('');
    setTypeSearchTerm('');
    setDoctorSearchTerm('');
  };
  
  // Filter available types and doctors by search term
  const filteredTypes = availableTypes.filter(type => 
    type.toLowerCase().includes(typeSearchTerm.toLowerCase())
  );
  
  const filteredDoctors = availableDoctors.filter(doctor => 
    doctor.toLowerCase().includes(doctorSearchTerm.toLowerCase())
  );
  
  return (
    <div className="results-filter-panel">
      <div className="filter-panel-header">
        <h3><FiFilter /> Advanced Filters</h3>
        <button className="clear-filters-btn" onClick={handleClearAllFilters}>
          Clear All
        </button>
      </div>
      
      <div className="filter-panel-content">
        {/* Date Range Filter */}
        <div className="filter-section">
          <h4><FiCalendar /> Date Range</h4>
          <div className="date-range-options">
            {dateRangeOptions.map(option => (
              <label key={option.value} className="date-range-option">
                <input
                  type="radio"
                  name="dateRange"
                  value={option.value}
                  checked={selectedDateRange === option.value}
                  onChange={handleDateRangeChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          
          {/* Custom Date Range */}
          {selectedDateRange === 'custom' && (
            <div className="custom-date-range">
              <div className="date-input-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                />
              </div>
              <div className="date-input-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                />
              </div>
              <button className="apply-date-btn" onClick={handleCustomDateRangeApply}>
                Apply
              </button>
            </div>
          )}
        </div>
        
        {/* Test Type Filter */}
        <div className="filter-section">
          <h4>Test Type</h4>
          <div className="filter-search">
            <FiSearch className="filter-search-icon" />
            <input
              type="text"
              placeholder="Search test types..."
              value={typeSearchTerm}
              onChange={(e) => setTypeSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            {filteredTypes.map(type => (
              <label key={type} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="checkbox-hidden"
                />
                <span className="custom-checkbox">
                  {selectedTypes.includes(type) ? <FiCheckSquare /> : <FiSquare />}
                </span>
                <span className="option-label">{type}</span>
              </label>
            ))}
            {filteredTypes.length === 0 && (
              <div className="no-options">No matching test types</div>
            )}
          </div>
        </div>
        
        {/* Status Filter */}
        <div className="filter-section">
          <h4>Status</h4>
          <div className="filter-options status-options">
            {statusOptions.map(status => (
              <label key={status.value} className="filter-option status-option">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status.value)}
                  onChange={() => handleStatusToggle(status.value)}
                  className="checkbox-hidden"
                />
                <span className={`custom-checkbox status-${status.value}`}>
                  {selectedStatuses.includes(status.value) ? <FiCheck /> : null}
                </span>
                <span className="option-label">{status.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Doctor Filter */}
        <div className="filter-section">
          <h4>Doctor</h4>
          <div className="filter-search">
            <FiSearch className="filter-search-icon" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={doctorSearchTerm}
              onChange={(e) => setDoctorSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-options">
            {filteredDoctors.map(doctor => (
              <label key={doctor} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedDoctors.includes(doctor)}
                  onChange={() => handleDoctorToggle(doctor)}
                  className="checkbox-hidden"
                />
                <span className="custom-checkbox">
                  {selectedDoctors.includes(doctor) ? <FiCheckSquare /> : <FiSquare />}
                </span>
                <span className="option-label">{doctor}</span>
              </label>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="no-options">No matching doctors</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsFilterPanel; 