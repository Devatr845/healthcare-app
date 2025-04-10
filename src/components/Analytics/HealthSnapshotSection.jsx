import React, { useState } from 'react';
import { FiActivity, FiClock, FiCalendar, FiAlertCircle, FiCheckCircle, 
         FiArrowUp, FiArrowDown, FiTrendingUp, FiTrendingDown, FiMoreVertical,
         FiMessageSquare, FiVideo, FiRefreshCw, FiChevronRight, FiX, FiCheck, 
         FiPhone, FiFileText, FiAlertTriangle, FiInfo, FiDownload, 
         FiExternalLink, FiMail, FiPackage, FiSend, FiPrinter, FiShare2,
         FiUser, FiMessageCircle, FiCornerUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './HealthSnapshotSection.css';

const HealthSnapshotSection = ({ darkMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vitals'); // 'vitals' or 'activities'
  const [actionFeedback, setActionFeedback] = useState({ visible: false, message: '', type: '' });
  const [showPrepModal, setShowPrepModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showContactDoctorModal, setShowContactDoctorModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactPriority, setContactPriority] = useState('normal');
  const [modalMessage, setModalMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Mock test results data
  const testResultsData = {
    'Blood Test Results': {
      patientName: 'John Doe',
      testDate: '2023-11-10',
      orderedBy: 'Dr. Sarah Miller',
      reportDate: '2023-11-10',
      results: [
        {
          name: 'Total Cholesterol',
          value: '180',
          unit: 'mg/dL',
          range: '125-200',
          status: 'normal',
          previousValue: '210',
          change: 'improved'
        },
        {
          name: 'HDL Cholesterol',
          value: '65',
          unit: 'mg/dL',
          range: '≥ 40',
          status: 'good',
          previousValue: '55',
          change: 'improved'
        },
        {
          name: 'LDL Cholesterol',
          value: '100',
          unit: 'mg/dL',
          range: '< 100',
          status: 'normal',
          previousValue: '130',
          change: 'improved'
        },
        {
          name: 'Triglycerides',
          value: '120',
          unit: 'mg/dL',
          range: '< 150',
          status: 'normal',
          previousValue: '145',
          change: 'improved'
        },
        {
          name: 'Glucose (Fasting)',
          value: '95',
          unit: 'mg/dL',
          range: '70-99',
          status: 'normal',
          previousValue: '98',
          change: 'stable'
        }
      ],
      doctorNotes: 'Significant improvement in cholesterol levels. Continue with current medication and lifestyle changes. Follow up in 6 months.',
      pdfUrl: '#',
    }
  };
  
  // Mock doctors data
  const doctorsData = {
    'Dr. Sarah Miller': {
      specialty: 'Cardiology',
      hospitalAffiliation: 'Heart & Vascular Center',
      availability: 'Mon-Fri: 9AM-5PM',
      responseTime: 'Usually responds within 24 hours',
      imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      contactMethods: [
        { type: 'message', label: 'Send Message', icon: <FiMessageSquare /> },
        { type: 'phone', label: 'Schedule Call', icon: <FiPhone />, number: '+1-555-123-4567' },
        { type: 'video', label: 'Video Consult', icon: <FiVideo /> }
      ]
    }
  };
  
  // Mock preparation data by appointment type
  const prepDataByType = {
    'cardiology': {
      title: 'Cardiology Appointment Preparation',
      instructions: [
        'Do not eat or drink anything except water for 12 hours before your appointment',
        'Take all your regular medications unless specifically instructed otherwise',
        'Wear comfortable clothing that allows easy access to your chest',
        'Bring a list of all current medications including over-the-counter drugs',
        'Arrive 15 minutes early to complete paperwork',
        'Bring your insurance card and photo ID'
      ],
      documents: ['Insurance Card', 'Medication List', 'Previous Test Results'],
      restrictions: 'No caffeine or alcohol 24 hours before the appointment',
      duration: 'Expect the appointment to last approximately 60-90 minutes'
    },
    'general': {
      title: 'General Appointment Preparation',
      instructions: [
        'No special preparation required',
        'Come as you are',
        'Bring your insurance card and photo ID',
        'Arrive 10 minutes before your scheduled appointment'
      ],
      documents: ['Insurance Card', 'Photo ID'],
      restrictions: 'None',
      duration: 'Expect the appointment to last approximately 30-45 minutes'
    },
    'bloodwork': {
      title: 'Blood Test Preparation',
      instructions: [
        'Fast for 8-12 hours before your appointment (water is allowed)',
        'Avoid strenuous exercise 24 hours before the test',
        'Avoid alcohol for 24 hours before the test'
      ],
      documents: ['Lab Order', 'Insurance Card'],
      restrictions: 'No food or beverages (except water) for 8-12 hours before test',
      duration: 'The blood draw takes about 5-10 minutes'
    }
  };
  
  // Mock data for vitals
  const vitalsData = [
    {
      id: 1,
      name: 'Heart Rate',
      current: 72,
      unit: 'bpm',
      status: 'normal',
      trend: 'up',
      change: 3,
      range: '60-100 bpm',
      icon: <FiActivity />
    },
    {
      id: 2,
      name: 'Blood Pressure',
      current: '118/78',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      change: 0,
      range: '90-120/60-80 mmHg',
      icon: <FiActivity />
    },
    {
      id: 3,
      name: 'Oxygen Level',
      current: 98,
      unit: '%',
      status: 'normal',
      trend: 'stable',
      change: 0,
      range: '95-100%',
      icon: <FiActivity />
    },
    {
      id: 4,
      name: 'Glucose Level',
      current: 105,
      unit: 'mg/dL',
      status: 'borderline',
      trend: 'down',
      change: 8,
      range: '80-130 mg/dL',
      icon: <FiActivity />
    },
    {
      id: 5,
      name: 'Temperature',
      current: 98.6,
      unit: '°F',
      status: 'normal',
      trend: 'stable',
      change: 0,
      range: '97-99°F',
      icon: <FiActivity />
    }
  ];
  
  // Mock data for recent activities
  const activitiesData = [
    {
      id: 1,
      title: 'Cardiology Appointment',
      description: 'Follow-up with Dr. Sarah Miller to review recent test results and medication adjustments.',
      date: '2023-11-15',
      time: '10:30 AM',
      type: 'appointment',
      category: 'info',
      status: 'upcoming',
      appointmentType: 'cardiology',
      location: 'Heart & Vascular Center, Building 2, Room 305',
      doctor: 'Dr. Sarah Miller',
      actions: [
        { id: 'a1', label: 'Add to Calendar', icon: <FiCalendar />, className: 'calendar' },
        { id: 'a2', label: 'Preparation Info', icon: <FiFileText />, className: 'preparation' }
      ]
    },
    {
      id: 2,
      title: 'Medication Reminder',
      description: 'Take your Lisinopril 10mg tablet with food. This medication helps control your blood pressure.',
      date: '2023-11-12',
      time: '08:00 AM',
      type: 'medication',
      category: 'warning',
      status: 'missed',
      actions: [
        { id: 'b1', label: 'Taken Now', icon: <FiCheck /> },
        { id: 'b2', label: 'Skip Dose', icon: <FiX /> }
      ]
    },
    {
      id: 3,
      title: 'Blood Test Results',
      description: 'Your latest lipid panel results are ready. Cholesterol levels show improvement from previous tests.',
      date: '2023-11-10',
      time: '02:15 PM',
      type: 'test',
      category: 'success',
      status: 'completed',
      doctor: 'Dr. Sarah Miller',
      testType: 'Blood Test Results',
      actions: [
        { id: 'c1', label: 'View Results', icon: <FiFileText />, className: 'results' },
        { id: 'c2', label: 'Contact Doctor', icon: <FiMessageSquare />, className: 'contact' }
      ]
    },
    {
      id: 4,
      title: 'Elevated Blood Pressure Alert',
      description: 'Your blood pressure reading of 142/92 mmHg is above your target range. Consider rest and medication.',
      date: '2023-11-09',
      time: '06:45 PM',
      type: 'alert',
      category: 'alert',
      status: 'warning',
      actions: [
        { id: 'd1', label: 'Call Nurse', icon: <FiPhone /> },
        { id: 'd2', label: 'Track Readings', icon: <FiActivity /> }
      ]
    }
  ];
  
  // Helper function to determine trend icon
  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return <FiArrowUp />;
      case 'down':
        return <FiArrowDown />;
      case 'rising':
        return <FiTrendingUp />;
      case 'falling':
        return <FiTrendingDown />;
      default:
        return null;
    }
  };
  
  // Helper function to determine vital status class
  const getStatusClass = (status) => {
    switch(status) {
      case 'normal':
        return 'normal';
      case 'borderline':
        return 'borderline';
      case 'critical':
        return 'critical';
      default:
        return 'normal';
    }
  };
  
  // Helper function to determine activity icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'info':
        return <FiInfo className="category-icon info" />;
      case 'warning':
        return <FiAlertCircle className="category-icon warning" />;
      case 'alert':
        return <FiAlertTriangle className="category-icon alert" />;
      case 'success':
        return <FiCheckCircle className="category-icon success" />;
      default:
        return <FiInfo className="category-icon info" />;
    }
  };
  
  // Helper function to get activity type label
  const getActivityTypeLabel = (type) => {
    switch(type) {
      case 'appointment':
        return 'Appointment';
      case 'medication':
        return 'Medication';
      case 'test':
        return 'Test Results';
      case 'alert':
        return 'Health Alert';
      default:
        return 'Activity';
    }
  };
  
  // Handle action button clicks
  const handleActionClick = (actionType, activity) => {
    console.log(`Action ${actionType} clicked for activity:`, activity);
    
    let feedbackMessage = '';
    let feedbackType = 'success';
    
    // Set the selected activity for modals
    setSelectedActivity(activity);
    
    switch(actionType) {
      case 'Reschedule':
        feedbackMessage = `Rescheduling appointment: ${activity.title}`;
        // Here you would typically open a modal for rescheduling
        break;
      case 'Video Call':
        feedbackMessage = `Initiating video call for: ${activity.title}`;
        // Here you would initiate a video call
        break;
      case 'Taken Now':
        feedbackMessage = `Marked medication as taken: ${activity.title}`;
        break;
      case 'Skip Dose':
        feedbackMessage = `Marked dose as skipped: ${activity.title}`;
        feedbackType = 'warning';
        break;
      case 'View Results':
        // Navigate to the Results page
        navigate('/results', { 
          state: { 
            selectedTest: activity.testType,
            testData: testResultsData[activity.testType]
          } 
        });
        return;
        
      case 'Contact Doctor':
        setShowContactDoctorModal(true);
        return; // Exit early - no feedback needed with modal
        
      case 'Add to Calendar':
        setShowCalendarModal(true);
        return; // Exit early - feedback will be shown after calendar selection
        
      case 'Preparation Info':
        setShowPrepModal(true);
        return; // Exit early - no feedback needed with modal
        
      default:
        feedbackMessage = `Performing action on: ${activity.title}`;
    }
    
    // Show feedback message
    setActionFeedback({
      visible: true,
      message: feedbackMessage,
      type: feedbackType
    });
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      setActionFeedback({ visible: false, message: '', type: '' });
    }, 3000);
  };
  
  // Handle doctor contact form submission
  const handleContactSubmit = (contactType) => {
    if (!selectedActivity) return;
    
    const doctor = selectedActivity.doctor;
    let feedbackMessage = '';
    
    switch(contactType) {
      case 'message':
        feedbackMessage = `Message sent to ${doctor}. You'll receive a response within 24 hours.`;
        // In a real app, this would send the message to the backend
        console.log('Message to doctor:', contactMessage);
        console.log('Priority:', contactPriority);
        break;
        
      case 'phone':
        feedbackMessage = `Call scheduled with ${doctor}. You'll receive a confirmation email.`;
        // In a real app, this would schedule a call
        break;
        
      case 'video':
        feedbackMessage = `Video consultation requested with ${doctor}. You'll receive a confirmation email.`;
        // In a real app, this would schedule a video call
        break;
    }
    
    // Close the modal
    setShowContactDoctorModal(false);
    
    // Reset the form
    setContactMessage('');
    setContactPriority('normal');
    
    // Show success message
    setActionFeedback({
      visible: true,
      message: feedbackMessage,
      type: 'success'
    });
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      setActionFeedback({ visible: false, message: '', type: '' });
    }, 3000);
  };
  
  // Download test results as PDF
  const downloadTestResults = () => {
    if (!selectedActivity || !selectedActivity.testType) return;
    
    const testType = selectedActivity.testType;
    const testData = testResultsData[testType];
    
    if (!testData) return;
    
    // In a real app, this would download a real PDF
    // For now, we'll just simulate it with a delay
    setActionFeedback({
      visible: true,
      message: `Downloading ${testType} as PDF...`,
      type: 'info'
    });
    
    setTimeout(() => {
      setActionFeedback({
        visible: true,
        message: `${testType} downloaded successfully`,
        type: 'success'
      });
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setActionFeedback({ visible: false, message: '', type: '' });
      }, 3000);
    }, 1500);
    
    // For a real app, this would be the code to download the PDF:
    // const link = document.createElement('a');
    // link.href = testData.pdfUrl;
    // link.download = `${testType}_${testData.testDate}.pdf`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  
  // Print test results
  const printTestResults = () => {
    if (!selectedActivity || !selectedActivity.testType) return;
    
    // In a real app, this would use window.print() with a specialized print view
    // For now, we'll just show a feedback message
    setActionFeedback({
      visible: true,
      message: `Preparing ${selectedActivity.testType} for printing...`,
      type: 'info'
    });
    
    setTimeout(() => {
      setActionFeedback({
        visible: true,
        message: `Print dialog opened`,
        type: 'success'
      });
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setActionFeedback({ visible: false, message: '', type: '' });
      }, 3000);
    }, 1500);
  };
  
  // Share test results
  const shareTestResults = () => {
    if (!selectedActivity || !selectedActivity.testType) return;
    
    // In a real app, this would open a share dialog
    // For now, we'll just show a feedback message
    setActionFeedback({
      visible: true,
      message: `Share dialog opened for ${selectedActivity.testType}`,
      type: 'success'
    });
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      setActionFeedback({ visible: false, message: '', type: '' });
    }, 3000);
  };
  
  // Handle calendar selection
  const handleCalendarSelection = (calendarType) => {
    if (!selectedActivity) return;
    
    const activity = selectedActivity;
    let feedbackMessage = '';
    
    // Format date and time for calendar
    const formattedDate = activity.date;
    const formattedTime = activity.time;
    const title = activity.title;
    const description = activity.description;
    const location = activity.location || 'Medical Center';
    
    switch(calendarType) {
      case 'google':
        // Create Google Calendar URL
        const googleUrl = createGoogleCalendarUrl(title, description, formattedDate, formattedTime, location);
        window.open(googleUrl, '_blank');
        feedbackMessage = 'Event added to Google Calendar';
        break;
        
      case 'outlook':
        // Create Outlook Calendar URL or download .ics
        downloadIcsFile(title, description, formattedDate, formattedTime, location);
        feedbackMessage = 'Outlook calendar file downloaded';
        break;
        
      case 'apple':
        // Download .ics file for Apple Calendar
        downloadIcsFile(title, description, formattedDate, formattedTime, location);
        feedbackMessage = 'Apple calendar file downloaded';
        break;
        
      case 'ical':
        // Generic .ics download
        downloadIcsFile(title, description, formattedDate, formattedTime, location);
        feedbackMessage = 'Calendar file (.ics) downloaded';
        break;
    }
    
    // Close the modal
    setShowCalendarModal(false);
    
    // Show success message
    setActionFeedback({
      visible: true,
      message: feedbackMessage,
      type: 'success'
    });
    
    // Hide feedback after 3 seconds
    setTimeout(() => {
      setActionFeedback({ visible: false, message: '', type: '' });
    }, 3000);
  };
  
  // Create Google Calendar URL
  const createGoogleCalendarUrl = (title, description, date, time, location) => {
    // Parse the date and time
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.replace(' AM', '').replace(' PM', '').split(':').map(Number);
    
    // Adjust hours for PM
    const adjustedHours = time.includes('PM') && hours < 12 ? hours + 12 : hours;
    
    // Create start and end dates (1 hour appointment by default)
    const startDate = new Date(year, month - 1, day, adjustedHours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
    
    // Format dates for Google Calendar
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    
    // Create the URL
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      details: description,
      location: location,
      dates: `${startDateFormatted}/${endDateFormatted}`
    });
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  // Generate and download .ics file
  const downloadIcsFile = (title, description, date, time, location) => {
    // Parse the date and time
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.replace(' AM', '').replace(' PM', '').split(':').map(Number);
    
    // Adjust hours for PM
    const adjustedHours = time.includes('PM') && hours < 12 ? hours + 12 : hours;
    
    // Create start and end dates (1 hour appointment by default)
    const startDate = new Date(year, month - 1, day, adjustedHours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
    
    // Format dates for iCalendar
    const formatIcsDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, -1);
    };
    
    const startDateFormatted = formatIcsDate(startDate);
    const endDateFormatted = formatIcsDate(endDate);
    const now = formatIcsDate(new Date());
    
    // Create the iCalendar content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'PRODID:-//Healthcare Dashboard//EN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@healthcaredashboard.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDateFormatted}`,
      `DTEND:${endDateFormatted}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${title}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Create and download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get preparation data by appointment type
  const getPreparationData = (activity) => {
    // Try to match by appointmentType first, fallback to general
    const appointmentType = activity.appointmentType || 'general';
    return prepDataByType[appointmentType] || prepDataByType['general'];
  };
  
  // Calendar Modal Component
  const CalendarModal = ({ show, onClose, onSelect }) => {
    if (!show) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Add to Calendar</h3>
            <button className="modal-close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="modal-content">
            <p>Choose your calendar service:</p>
            <div className="calendar-options">
              <button 
                className="calendar-option-btn google" 
                onClick={() => onSelect('google')}
              >
                <FiExternalLink />
                <span>Google Calendar</span>
              </button>
              <button 
                className="calendar-option-btn outlook" 
                onClick={() => onSelect('outlook')}
              >
                <FiDownload />
                <span>Outlook (.ics)</span>
              </button>
              <button 
                className="calendar-option-btn apple" 
                onClick={() => onSelect('apple')}
              >
                <FiDownload />
                <span>Apple Calendar (.ics)</span>
              </button>
              <button 
                className="calendar-option-btn ical" 
                onClick={() => onSelect('ical')}
              >
                <FiDownload />
                <span>Other Calendar (.ics)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Preparation Info Modal Component
  const PreparationInfoModal = ({ show, onClose, activity }) => {
    if (!show || !activity) return null;
    
    const prepData = getPreparationData(activity);
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container prep-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{prepData.title}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="modal-content">
            <div className="prep-section">
              <h4>
                <FiFileText className="prep-icon" />
                Instructions
              </h4>
              <ul className="prep-list">
                {prepData.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>
            
            <div className="prep-section">
              <h4>
                <FiInfo className="prep-icon" />
                Required Documents
              </h4>
              <ul className="prep-list">
                {prepData.documents.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
            
            <div className="prep-section">
              <h4>
                <FiAlertTriangle className="prep-icon" />
                Restrictions
              </h4>
              <p>{prepData.restrictions}</p>
            </div>
            
            <div className="prep-section">
              <h4>
                <FiClock className="prep-icon" />
                Duration
              </h4>
              <p>{prepData.duration}</p>
            </div>
            
            <div className="prep-actions">
              <button className="prep-action-btn email">
                <FiMail />
                <span>Email Instructions</span>
              </button>
              <button className="prep-action-btn download">
                <FiDownload />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Test Results Modal Component
  const TestResultsModal = ({ show, onClose, activity }) => {
    if (!show || !activity || !activity.testType) return null;
    
    const testType = activity.testType;
    const testData = testResultsData[testType];
    
    if (!testData) return null;
    
    const getStatusColor = (status) => {
      switch(status) {
        case 'normal':
          return 'status-normal';
        case 'borderline':
          return 'status-borderline';
        case 'abnormal':
          return 'status-abnormal';
        case 'critical':
          return 'status-critical';
        case 'good':
          return 'status-good';
        default:
          return '';
      }
    };
    
    const getChangeIcon = (change) => {
      switch(change) {
        case 'improved':
          return <FiArrowUp className="change-icon improved" />;
        case 'worsened':
          return <FiArrowDown className="change-icon worsened" />;
        case 'stable':
          return <FiMinus className="change-icon stable" />;
        default:
          return null;
      }
    };
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container results-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{testType}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="modal-content">
            <div className="results-meta">
              <div className="results-meta-item">
                <span className="results-meta-label">Patient:</span>
                <span className="results-meta-value">{testData.patientName}</span>
              </div>
              <div className="results-meta-item">
                <span className="results-meta-label">Test Date:</span>
                <span className="results-meta-value">{testData.testDate}</span>
              </div>
              <div className="results-meta-item">
                <span className="results-meta-label">Ordered By:</span>
                <span className="results-meta-value">{testData.orderedBy}</span>
              </div>
            </div>
            
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Result</th>
                    <th>Reference Range</th>
                    <th>Status</th>
                    <th>Previous</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {testData.results.map((result, idx) => (
                    <tr key={idx}>
                      <td>{result.name}</td>
                      <td>{result.value} {result.unit}</td>
                      <td>{result.range}</td>
                      <td>
                        <span className={`status-indicator ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </td>
                      <td>{result.previousValue} {result.unit}</td>
                      <td className="change-cell">
                        {getChangeIcon(result.change)}
                        <span className={`change-text ${result.change}`}>{result.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {testData.doctorNotes && (
              <div className="doctor-notes">
                <h4>Doctor's Notes</h4>
                <p>{testData.doctorNotes}</p>
              </div>
            )}
            
            <div className="results-actions">
              <button className="results-action-btn download" onClick={downloadTestResults}>
                <FiDownload />
                <span>Download PDF</span>
              </button>
              <button className="results-action-btn print" onClick={printTestResults}>
                <FiPrinter />
                <span>Print Results</span>
              </button>
              <button className="results-action-btn share" onClick={shareTestResults}>
                <FiShare2 />
                <span>Share Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Contact Doctor Modal Component
  const ContactDoctorModal = ({ show, onClose, activity }) => {
    if (!show || !activity || !activity.doctor) return null;
    
    const doctorName = activity.doctor;
    const doctorData = doctorsData[doctorName];
    
    if (!doctorData) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container contact-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Contact {doctorName}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="modal-content">
            <div className="doctor-profile">
              <div className="doctor-avatar">
                <img src={doctorData.imageUrl} alt={doctorName} />
              </div>
              <div className="doctor-info">
                <h4>{doctorName}</h4>
                <p className="doctor-specialty">{doctorData.specialty}</p>
                <p className="doctor-affiliation">{doctorData.hospitalAffiliation}</p>
                <div className="doctor-availability">
                  <FiClock className="doctor-info-icon" />
                  <span>{doctorData.availability}</span>
                </div>
                <div className="doctor-response-time">
                  <FiMessageSquare className="doctor-info-icon" />
                  <span>{doctorData.responseTime}</span>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h4>Send a Message</h4>
              <div className="form-group">
                <label>Regarding</label>
                <div className="regarding-value">{activity.title}</div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Type your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <div className="priority-options">
                  <label className={`priority-option ${contactPriority === 'low' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="low" 
                      checked={contactPriority === 'low'}
                      onChange={() => setContactPriority('low')}
                    />
                    <span>Low</span>
                  </label>
                  <label className={`priority-option ${contactPriority === 'normal' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="normal" 
                      checked={contactPriority === 'normal'}
                      onChange={() => setContactPriority('normal')}
                    />
                    <span>Normal</span>
                  </label>
                  <label className={`priority-option ${contactPriority === 'urgent' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="priority" 
                      value="urgent" 
                      checked={contactPriority === 'urgent'}
                      onChange={() => setContactPriority('urgent')}
                    />
                    <span>Urgent</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="contact-actions">
              <h4>Contact Options</h4>
              <div className="contact-options">
                {doctorData.contactMethods.map((method, idx) => (
                  <button 
                    key={idx} 
                    className={`contact-option-btn ${method.type}`}
                    onClick={() => handleContactSubmit(method.type)}
                  >
                    {method.icon}
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`health-snapshot-section ${darkMode ? 'dark-mode' : ''}`}>
      {actionFeedback.visible && (
        <div className={`action-feedback ${actionFeedback.type}`}>
          {actionFeedback.message}
        </div>
      )}
      
      {/* Calendar Selection Modal */}
      <CalendarModal 
        show={showCalendarModal} 
        onClose={() => setShowCalendarModal(false)} 
        onSelect={handleCalendarSelection}
      />
      
      {/* Preparation Info Modal */}
      <PreparationInfoModal 
        show={showPrepModal} 
        onClose={() => setShowPrepModal(false)} 
        activity={selectedActivity}
      />
      
      {/* Test Results Modal */}
      <TestResultsModal 
        show={showResultsModal} 
        onClose={() => setShowResultsModal(false)} 
        activity={selectedActivity}
      />
      
      {/* Contact Doctor Modal */}
      <ContactDoctorModal 
        show={showContactDoctorModal} 
        onClose={() => setShowContactDoctorModal(false)} 
        activity={selectedActivity}
      />
      
      <div className="snapshot-header">
        <h2>Health Snapshot</h2>
        <div className="snapshot-tabs">
          <button 
            className={`snapshot-tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('vitals')}
          >
            Key Vitals
          </button>
          <button 
            className={`snapshot-tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Recent Activities
          </button>
        </div>
      </div>
      
      <div className="snapshot-content">
        {activeTab === 'vitals' ? (
          <div className="vitals-grid">
            {vitalsData.map(vital => (
              <div key={vital.id} className={`vital-card ${getStatusClass(vital.status)}`}>
                <div className="vital-header">
                  <div className="vital-icon">
                    {vital.icon}
                  </div>
                  <div className="vital-name">{vital.name}</div>
                </div>
                <div className="vital-value">
                  {vital.current}<span className="vital-unit">{vital.unit}</span>
                </div>
                <div className="vital-trend">
                  {vital.trend !== 'stable' && (
                    <>
                      {getTrendIcon(vital.trend)}
                      <span>{Math.abs(vital.change)} {vital.trend.includes('up') ? 'higher' : 'lower'}</span>
                    </>
                  )}
                  {vital.trend === 'stable' && <span>Stable</span>}
                </div>
                <div className="vital-range">
                  <span>Normal range:</span> {vital.range}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="activities-list">
            {activitiesData.map(activity => (
              <div key={activity.id} className={`activity-card ${activity.status}`}>
                <div className="activity-card-header">
                  <div className="activity-category">
                    {getCategoryIcon(activity.category)}
                    <span>{getActivityTypeLabel(activity.type)}</span>
                  </div>
                  <div className="activity-time">
                    <FiCalendar />
                    <span>{new Date(activity.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                    <FiClock />
                    <span>{activity.time}</span>
                  </div>
                </div>
                
                <div className="activity-card-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                </div>
                
                <div className="activity-card-actions">
                  {activity.actions.map(action => (
                    <button 
                      key={action.id} 
                      className={`activity-action-btn ${action.className || ''}`}
                      onClick={() => handleActionClick(action.label, activity)}
                      aria-label={`${action.label} for ${activity.title}`}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                  <button 
                    className="activity-more-btn"
                    aria-label="More options"
                    onClick={() => handleActionClick('More', activity)}
                  >
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            ))}
            
            {activitiesData.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FiCalendar />
                </div>
                <h3>No Recent Activities</h3>
                <p>Your recent activities and notifications will appear here.</p>
                <button className="empty-state-button">View All Activities</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthSnapshotSection; 