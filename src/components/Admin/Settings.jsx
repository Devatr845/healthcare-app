import React, { useState, useContext } from 'react';
import { 
  FiUser, FiLock, FiMail, FiGlobe, FiBell, 
  FiShield, FiSave, FiRefreshCw 
} from 'react-icons/fi';
import './Settings.css';
import { NotificationContext } from '../../contexts/NotificationContext';
import { sendEmail } from '../../services/emailService';

const Settings = () => {
  const { notificationSettings, updateNotificationSettings } = useContext(NotificationContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Dr. Admin User',
      email: 'admin@hospital.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Administrator',
      language: 'English',
      timeZone: 'UTC-5'
    },
    notifications: {
      ...notificationSettings,
      emailNotifications: true,
      smsNotifications: false,
      prescriptionAlerts: true,
      appointmentReminders: true,
      systemUpdates: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAlerts: true
    },
    preferences: {
      theme: 'light',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      defaultView: 'list'
    }
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const sendSettingsSummary = async () => {
    const emailBody = `
      Current Settings Summary:

      Profile Settings:
      ----------------
      Name: ${settings.profile.name}
      Email: ${settings.profile.email}
      Phone: ${settings.profile.phone}
      Specialization: ${settings.profile.specialization}
      Language: ${settings.profile.language}
      Time Zone: ${settings.profile.timeZone}

      Notification Settings:
      --------------------
      Email Notifications: ${settings.notifications.emailNotifications ? 'Enabled' : 'Disabled'}
      SMS Notifications: ${settings.notifications.smsNotifications ? 'Enabled' : 'Disabled'}
      Prescription Alerts: ${settings.notifications.prescriptionAlerts ? 'Enabled' : 'Disabled'}
      Appointment Reminders: ${settings.notifications.appointmentReminders ? 'Enabled' : 'Disabled'}
      Desktop Notifications: ${settings.notifications.desktopNotifications ? 'Enabled' : 'Disabled'}
      Reminder Time: ${settings.notifications.reminderTime} hours before

      Security Settings:
      ----------------
      Two-Factor Auth: ${settings.security.twoFactorAuth ? 'Enabled' : 'Disabled'}
      Session Timeout: ${settings.security.sessionTimeout} minutes
      Password Expiry: ${settings.security.passwordExpiry} days
      Login Alerts: ${settings.security.loginAlerts ? 'Enabled' : 'Disabled'}

      System Preferences:
      -----------------
      Theme: ${settings.preferences.theme}
      Date Format: ${settings.preferences.dateFormat}
      Time Format: ${settings.preferences.timeFormat}
      Default View: ${settings.preferences.defaultView}
    `;

    try {
      const result = await sendEmail(
        'devtree741@gmail.com',
        'Admin Settings Update Summary',
        emailBody
      );

      if (result.success) {
        alert('Settings summary sent successfully to admin email!');
      } else {
        alert('Failed to send settings summary. Please try again.');
      }
    } catch (error) {
      console.error('Error sending settings summary:', error);
      alert('Error sending settings summary. Please try again.');
    }
  };

  const handleSave = async (section) => {
    if (section === 'notifications') {
      updateNotificationSettings(settings.notifications);
    }
    
    const changeEmailBody = `
      Admin Settings Update:
      
      Section: ${section.charAt(0).toUpperCase() + section.slice(1)}
      
      Updated settings:
      ${JSON.stringify(settings[section], null, 2)}
      
      Time of change: ${new Date().toLocaleString()}
    `;

    try {
      await sendEmail(
        'devtree741@gmail.com',
        `Admin Settings Update - ${section}`,
        changeEmailBody
      );
    } catch (error) {
      console.error('Error sending settings update email:', error);
    }

    console.log(`Saving ${section} settings:`, settings[section]);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <div className="header-actions">
          <p>Manage your account settings and preferences</p>
          <button 
            className="email-settings-btn"
            onClick={sendSettingsSummary}
          >
            <FiMail /> Email Current Settings
          </button>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Profile Settings
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FiBell /> Notifications
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FiShield /> Security
          </button>
          <button 
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <FiGlobe /> Preferences
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h3>Profile Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => handleChange('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleChange('profile', 'email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => handleChange('profile', 'phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    value={settings.profile.specialization}
                    onChange={(e) => handleChange('profile', 'specialization', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={settings.profile.language}
                    onChange={(e) => handleChange('profile', 'language', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Time Zone</label>
                  <select
                    value={settings.profile.timeZone}
                    onChange={(e) => handleChange('profile', 'timeZone', e.target.value)}
                  >
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                  </select>
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-btn" onClick={() => handleSave('profile')}>
                  <FiSave /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h3>Notification Preferences</h3>
              <div className="settings-options">
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => {
                        handleChange('notifications', 'emailNotifications', e.target.checked);
                      }}
                    />
                    Email Notifications
                  </label>
                  <span className="description">Receive notifications via email</span>
                </div>
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => handleChange('notifications', 'smsNotifications', e.target.checked)}
                    />
                    SMS Notifications
                  </label>
                  <span className="description">Receive notifications via SMS</span>
                </div>
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.prescriptionAlerts}
                      onChange={(e) => handleChange('notifications', 'prescriptionAlerts', e.target.checked)}
                    />
                    Prescription Alerts
                  </label>
                  <span className="description">Get alerts for prescription updates</span>
                </div>
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.appointmentReminders}
                      onChange={(e) => {
                        handleChange('notifications', 'appointmentReminders', e.target.checked);
                      }}
                    />
                    Appointment Reminders
                  </label>
                  <span className="description">Get reminders before appointments</span>
                </div>
                <div className="form-group">
                  <label>Reminder Time</label>
                  <select
                    value={settings.notifications.reminderTime || '24'}
                    onChange={(e) => handleChange('notifications', 'reminderTime', e.target.value)}
                  >
                    <option value="12">12 hours before</option>
                    <option value="24">24 hours before</option>
                    <option value="48">48 hours before</option>
                    <option value="72">72 hours before</option>
                  </select>
                </div>
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.desktopNotifications}
                      onChange={(e) => {
                        handleChange('notifications', 'desktopNotifications', e.target.checked);
                        if (e.target.checked) {
                          Notification.requestPermission();
                        }
                      }}
                    />
                    Desktop Notifications
                  </label>
                  <span className="description">Show desktop notifications</span>
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-btn" onClick={() => handleSave('notifications')}>
                  <FiSave /> Save Changes
                </button>
                <button 
                  className="secondary-btn"
                  onClick={async () => {
                    try {
                      const emailBody = `
                        Test Notification from Medical Center
                        -----------------------------------

                        System Status Check:
                        ------------------
                        Email Service: Active
                        Time of Test: ${new Date().toLocaleString()}
                        
                        Current Settings:
                        ---------------
                        Email Notifications: ${settings.notifications.emailNotifications ? 'Enabled' : 'Disabled'}
                        SMS Notifications: ${settings.notifications.smsNotifications ? 'Enabled' : 'Disabled'}
                        Desktop Notifications: ${settings.notifications.desktopNotifications ? 'Enabled' : 'Disabled'}
                        Reminder Time: ${settings.notifications.reminderTime} hours before
                        
                        This is a test email sent via OAuth2 authentication.
                        If you received this email, the notification system is working correctly.

                        Best regards,
                        Medical Center Admin System
                      `;

                      const result = await sendEmail(
                        'devtree741@gmail.com', // Admin email
                        'Medical Center - Test Notification',
                        emailBody,
                        'devtree741@gmail.com' // Sender email (same as admin)
                      );

                      if (result.success) {
                        alert('Test notification sent successfully to admin email!');
                      } else {
                        throw new Error(result.message || 'Failed to send test notification');
                      }

                      // Also show desktop notification if enabled
                      if (settings.notifications.desktopNotifications) {
                        new Notification('Test Notification', {
                          body: 'This is a test desktop notification'
                        });
                      }
                    } catch (error) {
                      console.error('Error sending test notification:', error);
                      alert(`Failed to send test notification: ${error.message}`);
                    }
                  }}
                >
                  Test Notifications
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h3>Security Settings</h3>
              <div className="settings-options">
                <div className="toggle-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                    Two-Factor Authentication
                  </label>
                  <span className="description">Enable 2FA for additional security</span>
                </div>
                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                    min="5"
                    max="120"
                  />
                </div>
                <div className="form-group">
                  <label>Password Expiry (days)</label>
                  <input
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => handleChange('security', 'passwordExpiry', e.target.value)}
                    min="30"
                    max="180"
                  />
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-btn" onClick={() => handleSave('security')}>
                  <FiSave /> Save Changes
                </button>
                <button className="secondary-btn">
                  <FiLock /> Change Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h3>System Preferences</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Theme</label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handleChange('preferences', 'theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date Format</label>
                  <select
                    value={settings.preferences.dateFormat}
                    onChange={(e) => handleChange('preferences', 'dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Time Format</label>
                  <select
                    value={settings.preferences.timeFormat}
                    onChange={(e) => handleChange('preferences', 'timeFormat', e.target.value)}
                  >
                    <option value="12h">12-hour</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Default View</label>
                  <select
                    value={settings.preferences.defaultView}
                    onChange={(e) => handleChange('preferences', 'defaultView', e.target.value)}
                  >
                    <option value="list">List View</option>
                    <option value="grid">Grid View</option>
                  </select>
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-btn" onClick={() => handleSave('preferences')}>
                  <FiSave /> Save Changes
                </button>
                <button className="secondary-btn">
                  <FiRefreshCw /> Reset to Default
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 