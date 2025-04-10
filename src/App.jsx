import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AppointmentNotification from './components/AppointmentNotification';
import HealthMetrics from './components/HealthMetrics';
import ActivityGrowth from './components/ActivityGrowth';
import RecentConsultations from './components/RecentConsultations';
import QuickActions from './components/QuickActions';
import MedicationReminder from './components/MedicationReminder';
import MonthlyHealthSummary from './components/MonthlyHealthSummary';
import HealthGoals from './components/HealthGoals';
import NutritionTracker from './components/NutritionTracker';
import MedicalHistory from './components/MedicalHistory/MedicalHistory';
import AppointmentsPage from './components/Appointments/AppointmentsPage';
import AdminPage from './components/Admin/AdminPage';
import PatientAnalytics from './components/Analytics/PatientAnalytics';
import ResultsPage from './components/Results/ResultsPage';
import EmergencySettings from './components/PatientProfile/EmergencySettings';
import EmergencyAlerts from './components/Admin/EmergencyAlerts';
import CustomChatWidget from './components/Chat/CustomChatWidget';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-wrapper">
            <Header />
            <Routes>
              <Route path="/" element={
                <main className="main-content">
                  <AppointmentNotification />
                  <HealthMetrics />
                  <ActivityGrowth />
                  <div className="dashboard-grid">
                    <RecentConsultations />
                    <QuickActions />
                  </div>
                  <MedicationReminder />
                  <MonthlyHealthSummary />
                  <HealthGoals />
                  <NutritionTracker />
                </main>
              } />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/analytics" element={<PatientAnalytics />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/emergency-settings" element={<EmergencySettings />} />
              <Route path="/admin/emergency-alerts" element={<EmergencyAlerts />} />
            </Routes>
          </div>
          <CustomChatWidget />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App; 