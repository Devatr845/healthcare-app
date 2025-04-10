import React, { useState } from 'react';
import { 
  FiUsers, FiActivity, FiCalendar, FiClock, FiTrendingUp, 
  FiTrendingDown, FiAlertCircle, FiCheckCircle, FiDownload 
} from 'react-icons/fi';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  Cell 
} from 'recharts';
import './MetricsPage.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MetricsPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for different metrics
  const patientMetrics = {
    totalPatients: 1248,
    activePatients: 892,
    newPatients: 45,
    criticalPatients: 23,
    growth: 12.5
  };

  const appointmentMetrics = {
    total: 325,
    completed: 180,
    scheduled: 125,
    cancelled: 20,
    efficiency: 89
  };

  const patientTrends = [
    { month: 'Jan', patients: 780, appointments: 250 },
    { month: 'Feb', patients: 820, appointments: 280 },
    { month: 'Mar', patients: 890, appointments: 320 },
    { month: 'Apr', patients: 920, appointments: 340 },
    { month: 'May', patients: 980, appointments: 360 },
    { month: 'Jun', patients: 1050, appointments: 380 }
  ];

  const departmentDistribution = [
    { name: 'Cardiology', value: 30 },
    { name: 'Neurology', value: 25 },
    { name: 'Pediatrics', value: 20 },
    { name: 'Orthopedics', value: 15 },
    { name: 'General Medicine', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const ageDistribution = [
    { age: '0-18', count: 150 },
    { age: '19-30', count: 280 },
    { age: '31-50', count: 420 },
    { age: '51-70', count: 310 },
    { age: '70+', count: 88 }
  ];

  const dailyAppointments = [
    { time: '08:00', count: 5 },
    { time: '10:00', count: 8 },
    { time: '12:00', count: 12 },
    { time: '14:00', count: 10 },
    { time: '16:00', count: 7 },
    { time: '18:00', count: 4 }
  ];

  // Add more detailed metrics
  const detailedMetrics = {
    revenue: {
      total: 125000,
      growth: 15.8,
      monthly: [
        { month: 'Jan', amount: 18000 },
        { month: 'Feb', amount: 19500 },
        { month: 'Mar', amount: 21000 },
        { month: 'Apr', amount: 22000 },
        { month: 'May', amount: 22500 },
        { month: 'Jun', amount: 23000 }
      ]
    },
    satisfaction: {
      overall: 4.8,
      total: 892,
      distribution: [
        { rating: 5, count: 500 },
        { rating: 4, count: 300 },
        { rating: 3, count: 70 },
        { rating: 2, count: 15 },
        { rating: 1, count: 7 }
      ]
    },
    waitingTime: {
      average: "18 mins",
      byHour: [
        { hour: '08:00', wait: 12 },
        { hour: '10:00', wait: 15 },
        { hour: '12:00', wait: 25 },
        { hour: '14:00', wait: 20 },
        { hour: '16:00', wait: 18 },
        { hour: '18:00', wait: 10 }
      ]
    },
    topDoctors: [
      { name: 'Dr. Sarah Wilson', patients: 145, rating: 4.9 },
      { name: 'Dr. Michael Chen', patients: 132, rating: 4.8 },
      { name: 'Dr. James Smith', patients: 128, rating: 4.7 },
      { name: 'Dr. Emily Brown', patients: 120, rating: 4.9 }
    ],
    insuranceDistribution: [
      { provider: 'Blue Cross', patients: 450 },
      { provider: 'Aetna', patients: 320 },
      { provider: 'UnitedHealth', patients: 280 },
      { provider: 'Cigna', patients: 198 },
      { provider: 'Other', patients: 150 }
    ]
  };

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPos = 20;
    const margin = 20;

    // Helper functions
    const addTitle = (text, size = 16) => {
      pdf.setFontSize(size);
      pdf.setFont(undefined, 'bold');
      pdf.text(text, margin, yPos);
      yPos += 10;
    };

    const addText = (text, size = 12) => {
      pdf.setFontSize(size);
      pdf.setFont(undefined, 'normal');
      pdf.text(text, margin, yPos);
      yPos += 7;
    };

    const addSpace = (space = 10) => {
      yPos += space;
    };

    // Add report header
    addTitle('Healthcare Analytics Report', 20);
    addText(`Generated on: ${new Date().toLocaleDateString()}`, 10);
    addSpace();

    // Add summary metrics
    addTitle('Summary Metrics');
    addText(`Total Patients: ${patientMetrics.totalPatients}`);
    addText(`Active Patients: ${patientMetrics.activePatients}`);
    addText(`New Patients: ${patientMetrics.newPatients}`);
    addText(`Critical Patients: ${patientMetrics.criticalPatients}`);
    addSpace();

    // Add appointment metrics
    addTitle('Appointment Statistics');
    addText(`Total Appointments: ${appointmentMetrics.total}`);
    addText(`Completed: ${appointmentMetrics.completed}`);
    addText(`Scheduled: ${appointmentMetrics.scheduled}`);
    addText(`Cancelled: ${appointmentMetrics.cancelled}`);
    addText(`Efficiency Rate: ${appointmentMetrics.efficiency}%`);
    addSpace();

    // Add revenue metrics
    addTitle('Revenue Overview');
    addText(`Total Revenue: $${detailedMetrics.revenue.total}`);
    addText(`Growth Rate: ${detailedMetrics.revenue.growth}%`);
    addSpace();

    // Add satisfaction metrics
    addTitle('Patient Satisfaction');
    addText(`Overall Rating: ${detailedMetrics.satisfaction.overall}/5`);
    addText(`Total Reviews: ${detailedMetrics.satisfaction.total}`);
    addSpace();

    // Capture and add charts
    try {
      const chartsContainer = document.querySelector('.charts-grid');
      const charts = chartsContainer.querySelectorAll('.chart-card');

      for (let chart of charts) {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }

        const title = chart.querySelector('h3').textContent;
        addTitle(title, 14);
        
        const canvas = await html2canvas(chart, {
          scale: 2,
          logging: false,
          useCORS: true
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', margin, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 20;
      }

      // Add top doctors
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      addTitle('Top Performing Doctors');
      detailedMetrics.topDoctors.forEach(doctor => {
        addText(`${doctor.name} - ${doctor.patients} patients (Rating: ${doctor.rating})`);
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
    }

    // Save the PDF
    pdf.save('healthcare_analytics_report.pdf');
  };

  return (
    <div className="metrics-page">
      <div className="metrics-header">
        <div className="header-left">
          <h2>Analytics Dashboard</h2>
          <div className="time-filter">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
        <button className="download-report-btn" onClick={generatePDF}>
          <FiDownload /> Download Report
        </button>
      </div>

      <div className="metrics-summary">
        <div className="metric-card">
          <div className="metric-icon patients">
            <FiUsers />
          </div>
          <div className="metric-info">
            <h3>Total Patients</h3>
            <div className="metric-value">
              {patientMetrics.totalPatients}
              <span className="metric-trend positive">
                <FiTrendingUp /> {patientMetrics.growth}%
              </span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon appointments">
            <FiCalendar />
          </div>
          <div className="metric-info">
            <h3>Appointments</h3>
            <div className="metric-value">
              {appointmentMetrics.total}
              <span className="metric-trend positive">
                <FiTrendingUp /> {appointmentMetrics.efficiency}%
              </span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon critical">
            <FiAlertCircle />
          </div>
          <div className="metric-info">
            <h3>Critical Patients</h3>
            <div className="metric-value">
              {patientMetrics.criticalPatients}
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon new">
            <FiActivity />
          </div>
          <div className="metric-info">
            <h3>New Patients</h3>
            <div className="metric-value">
              {patientMetrics.newPatients}
              <span className="metric-trend positive">
                <FiTrendingUp /> New
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-tabs">
        <button className={`tab-btn ${selectedMetric === 'all' ? 'active' : ''}`}>
          Overview
        </button>
        <button className={`tab-btn ${selectedMetric === 'patients' ? 'active' : ''}`}>
          Patient Analytics
        </button>
        <button className={`tab-btn ${selectedMetric === 'appointments' ? 'active' : ''}`}>
          Appointment Metrics
        </button>
        <button className={`tab-btn ${selectedMetric === 'revenue' ? 'active' : ''}`}>
          Revenue
        </button>
      </div>

      <div className="charts-grid">
        <div className="chart-card full-width">
          <h3>Patient Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={patientTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="Total Patients"
              />
              <Area 
                type="monotone" 
                dataKey="appointments" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.3}
                name="Appointments"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {departmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Daily Appointment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyAppointments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={detailedMetrics.revenue.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Patient Satisfaction</h3>
          <div className="satisfaction-summary">
            <div className="rating-big">
              {detailedMetrics.satisfaction.overall}
              <span>/5</span>
            </div>
            <div className="rating-details">
              Based on {detailedMetrics.satisfaction.total} reviews
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={detailedMetrics.satisfaction.distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Average Waiting Time</h3>
          <div className="waiting-time-summary">
            <div className="time-big">
              {detailedMetrics.waitingTime.average}
            </div>
            <span>Average wait time</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={detailedMetrics.waitingTime.byHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="wait" 
                stroke="#ff7300" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top Performing Doctors</h3>
          <div className="doctors-list">
            {detailedMetrics.topDoctors.map((doctor, index) => (
              <div key={index} className="doctor-item">
                <div className="doctor-info">
                  <h4>{doctor.name}</h4>
                  <div className="doctor-stats">
                    <span>{doctor.patients} patients</span>
                    <span className="rating">⭐ {doctor.rating}</span>
                  </div>
                </div>
                <div className="doctor-progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${(doctor.patients / detailedMetrics.topDoctors[0].patients) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Insurance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={detailedMetrics.insuranceDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="patients"
                nameKey="provider"
                label
              >
                {detailedMetrics.insuranceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage; 