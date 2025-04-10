import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiVideo,
  FiUser,
  FiFilter,
  FiPlus,
  FiCheck,
  FiX,
  FiBell,
  FiSearch,
  FiMapPin,
  FiAlertCircle
} from 'react-icons/fi';
import { sendConfirmationEmail } from '../../services/emailService';
import './AppointmentsPage.css';
import BookingModal from './BookingModal';
import AppointmentConfirmation from './AppointmentConfirmation';

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    image: "/images/doctor-1.jpg",
    availability: {
      monday: ["09:00", "10:00", "14:00", "15:00"],
      tuesday: ["09:00", "11:00", "14:00", "16:00"],
      wednesday: ["10:00", "11:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "14:00", "15:00"],
      friday: ["09:00", "11:00", "14:00", "16:00"]
    },
    rating: 4.8,
    nextAvailable: "2024-02-20"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Surgeon",
    image: "/images/doctor-2.jpg",
    availability: {
      monday: ["08:00", "09:00", "13:00", "14:00"],
      tuesday: ["08:00", "10:00", "13:00", "15:00"],
      wednesday: ["09:00", "10:00", "14:00", "15:00"],
      thursday: ["08:00", "09:00", "13:00", "14:00"],
      friday: ["08:00", "10:00", "13:00", "15:00"]
    },
    rating: 4.9,
    nextAvailable: "2024-02-22"
  }
];

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBooking, setShowBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialization: "Cardiologist",
      date: "2024-02-20",
      time: "09:00",
      type: "in-person",
      status: "upcoming",
      notes: "Regular check-up",
      location: "Main Clinic, Room 204",
      reminders: {
        email: true,
        sms: false,
        app: true,
        timing: ['1day', '1hour']
      },
      progress: {
        stage: "preparation",
        steps: ["registration", "preparation", "consultation", "follow-up"],
        currentStep: 1
      }
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "Surgeon",
      date: "2024-01-15",
      time: "14:00",
      type: "video",
      status: "completed",
      notes: "Post-surgery follow-up",
      location: "Video Consultation",
      progress: {
        stage: "completed",
        steps: ["registration", "preparation", "consultation", "follow-up"],
        currentStep: 4
      }
    }
  ]);
  const [emailStatus, setEmailStatus] = useState({ loading: false, error: null });

  const handleBookAppointment = async (appointmentData) => {
    setEmailStatus({ loading: true, error: null });
    
    try {
      const newAppointment = {
        id: Date.now(),
        ...appointmentData,
        status: 'upcoming',
        progress: {
          stage: "preparation",
          steps: ["registration", "preparation", "consultation", "follow-up"],
          currentStep: 1
        },
        reminders: {
          email: true,
          sms: false,
          app: true,
          timing: ['1day', '1hour']
        }
      };

      // First show confirmation (immediately after booking)
      setConfirmedAppointment(newAppointment);
      setShowConfirmation(true);
      
      // Then update appointment list and send email in background
      setAppointments(prev => [...prev, newAppointment]);
      
      try {
        await sendConfirmationEmail(newAppointment, 'user@example.com');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't disrupt user flow if email fails
      }
      
      setShowBooking(false);
      setEmailStatus({ loading: false, error: null });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setEmailStatus({ 
        loading: false, 
        error: 'Failed to complete booking. Please try again.'
      });
    }
  };

  const handleAddToCalendar = () => {
    // Implementation for adding to calendar
    console.log('Adding to calendar:', confirmedAppointment);
    
    // Example: Creating calendar file download
    const { doctor, date, time, location, notes } = confirmedAppointment;
    const startDate = new Date(`${date}T${time}`);
    const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // 1 hour appointment
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Appointment with ${doctor}
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
DTEND:${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
LOCATION:${location}
DESCRIPTION:${notes || 'No additional notes'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `appointment_${date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = () => {
    // Implementation for PDF download
    console.log('Downloading PDF for:', confirmedAppointment);
    
    // In a real implementation, you would use a library like jsPDF
    // This is a placeholder to show the functionality
    alert('PDF download functionality would be implemented here.');
  };

  const handleReschedule = () => {
    // Close confirmation and reopen booking with pre-filled data
    setShowConfirmation(false);
    setShowBooking(true);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  const handleReminderChange = (id, timing) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? {
        ...apt,
        reminders: {
          ...apt.reminders,
          timing: apt.reminders.timing.includes(timing)
            ? apt.reminders.timing.filter(t => t !== timing)
            : [...apt.reminders.timing, timing]
        }
      } : apt
    ));
  };

  const filteredAppointments = appointments
    .filter(apt => apt.status === activeTab)
    .filter(apt => 
      searchTerm === '' || 
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(apt => filterType === 'all' || apt.type === filterType);

  // Add console logs to debug confirmation state
  console.log('Render states:', { 
    showBooking, 
    showConfirmation, 
    hasConfirmedAppointment: !!confirmedAppointment 
  });

  return (
    <main className="main-content">
      <div className="appointments-page">
        <div className="page-header">
          <h1>Appointments</h1>
          <button 
            className="new-appointment-btn"
            onClick={() => setShowBooking(true)}
          >
            <FiPlus />
            Book New Appointment
          </button>
        </div>

        <div className="search-filter">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-dropdown"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="in-person">In-Person</option>
            <option value="video">Video Call</option>
          </select>
        </div>

        <div className="appointments-tabs">
          <button 
            className={activeTab === 'upcoming' ? 'active' : ''}
            onClick={() => setActiveTab('upcoming')}
          >
            <FiCalendar />
            Upcoming
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            <FiCheck />
            Completed
          </button>
          <button 
            className={activeTab === 'cancelled' ? 'active' : ''}
            onClick={() => setActiveTab('cancelled')}
          >
            <FiX />
            Cancelled
          </button>
        </div>

        <div className="appointments-list">
          {filteredAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment}
              onCancel={handleCancelAppointment}
              onReminderChange={handleReminderChange}
            />
          ))}
          {filteredAppointments.length === 0 && (
            <div className="no-appointments">
              <FiAlertCircle />
              <p>No appointments found</p>
              <button 
                className="new-appointment-btn"
                onClick={() => setShowBooking(true)}
              >
                Book Now
              </button>
            </div>
          )}
        </div>

        {showBooking && (
          <BookingModal
            doctors={initialDoctors}
            onClose={() => setShowBooking(false)}
            onBook={handleBookAppointment}
          />
        )}

        {showConfirmation && confirmedAppointment && (
          <AppointmentConfirmation
            appointment={confirmedAppointment}
            onClose={() => setShowConfirmation(false)}
            onAddToCalendar={handleAddToCalendar}
            onDownloadPdf={handleDownloadPdf}
            onReschedule={handleReschedule}
          />
        )}
      </div>
    </main>
  );
};

const AppointmentCard = ({ appointment, onCancel, onReminderChange }) => {
  const [showReminderOptions, setShowReminderOptions] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <FiCalendar className="status-icon" aria-hidden="true" />;
      case 'completed':
        return <FiCheck className="status-icon" aria-hidden="true" />;
      case 'cancelled':
        return <FiX className="status-icon" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const getProgressPercentage = (progress) => {
    return ((progress.currentStep / progress.steps.length) * 100).toFixed(0);
  };

  return (
    <div 
      className={`appointment-card ${appointment.status}`}
      role="article"
      aria-label={`${appointment.status} appointment with ${appointment.doctor}`}
    >
      <div className="appointment-status" role="status">
        {getStatusIcon(appointment.status)}
        <span>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
      </div>

      <div className="appointment-header">
        <div className="appointment-type" role="status">
          {appointment.type === 'video' ? 
            <FiVideo aria-hidden="true" /> : 
            <FiUser aria-hidden="true" />
          }
          <span>{appointment.type === 'video' ? 'Video Call' : 'In-person'}</span>
        </div>
        {appointment.status === 'upcoming' && (
          <button 
            className="cancel-btn" 
            onClick={() => onCancel(appointment.id)}
            aria-label="Cancel appointment"
          >
            <FiX aria-hidden="true" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      <div className="appointment-details">
        <h3>{appointment.doctor}</h3>
        <p className="specialization">{appointment.specialization}</p>
        
        <div className="detail-row">
          <FiCalendar aria-hidden="true" />
          <span>{new Date(appointment.date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        
        <div className="detail-row">
          <FiClock aria-hidden="true" />
          <span>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}</span>
        </div>

        <div className="detail-row">
          <FiMapPin aria-hidden="true" />
          <span>{appointment.location}</span>
        </div>
      </div>

      {appointment.notes && (
        <div className="appointment-notes">
          <p>{appointment.notes}</p>
        </div>
      )}

      {appointment.progress && appointment.status === 'upcoming' && (
        <div 
          className="progress-bar"
          role="progressbar"
          aria-valuenow={getProgressPercentage(appointment.progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div 
            className="progress-fill"
            style={{ width: `${getProgressPercentage(appointment.progress)}%` }}
          />
          <span className="progress-text">
            {appointment.progress.stage.charAt(0).toUpperCase() + 
             appointment.progress.stage.slice(1)}
          </span>
        </div>
      )}

      {appointment.reminders && (
        <div 
          className="reminder-info"
          onClick={() => setShowReminderOptions(!showReminderOptions)}
          role="button"
          tabIndex={0}
          aria-expanded={showReminderOptions}
          aria-label="Reminder settings"
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowReminderOptions(!showReminderOptions);
            }
          }}
        >
          <FiBell aria-hidden="true" />
          <span>
            Reminders: {appointment.reminders.timing.map(timing => 
              timing === '1day' ? '1 day before' : '1 hour before'
            ).join(', ')}
          </span>
          {showReminderOptions && (
            <div 
              className="reminder-options"
              role="dialog"
              aria-label="Reminder options"
            >
              <label>
                <input
                  type="checkbox"
                  checked={appointment.reminders.timing.includes('1day')}
                  onChange={() => onReminderChange(appointment.id, '1day')}
                  aria-label="Remind 1 day before"
                />
                1 day before
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={appointment.reminders.timing.includes('1hour')}
                  onChange={() => onReminderChange(appointment.id, '1hour')}
                  aria-label="Remind 1 hour before"
                />
                1 hour before
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage; 