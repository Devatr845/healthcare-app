import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { RiDashboardLine } from 'react-icons/ri';
import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { IoStatsChartSharp } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { IoSearchOutline } from 'react-icons/io5';
import { FiFileText, FiCalendar, FiUsers, FiClipboard, FiAlertTriangle, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const toggleButton = document.querySelector('.sidebar-toggle');
      
      if (sidebar && !sidebar.contains(event.target) && 
          toggleButton && !toggleButton.contains(event.target) && 
          isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navigationItems = [
    {
      icon: RiDashboardLine,
      label: 'Dashboard',
      path: '/'
    },
    {
      icon: FaUserInjured,
      label: 'Patients',
      path: '/patients'
    },
    {
      icon: FiCalendar,
      label: 'Appointments',
      path: '/appointments'
    },
    {
      icon: FiFileText,
      label: 'Medical History',
      path: '/medical-history'
    },
    {
      icon: IoStatsChartSharp,
      label: 'Analytics',
      path: '/analytics'
    },
    {
      icon: FiClipboard,
      label: 'Results',
      path: '/results'
    },
    {
      icon: FiAlertTriangle,
      label: 'Emergency Settings',
      path: '/emergency-settings'
    },
    {
      icon: IoSettingsOutline,
      label: 'Settings',
      path: '/settings'
    },
    {
      icon: FiUsers,
      label: 'Admin',
      path: '/admin',
      isAdmin: true
    }
  ];

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <DiReact className="logo-icon" />
            <span>HealthCare Pro</span>
          </div>
          <button 
            className="close-sidebar"
            onClick={() => setIsOpen(false)}
          >
            <FiX />
          </button>
        </div>
        
        <div className="search-section">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Search here..." />
        </div>
        
        <nav>
          <ul>
            {navigationItems.map((item, index) => (
              <li key={index} className={location.pathname === item.path ? 'active' : ''}>
                <Link 
                  to={item.path}
                  className={item.isAdmin ? 'admin-link' : ''}
                >
                  <item.icon className="icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="user-profile">
          <FaUserCircle className="avatar-icon" />
          <span>John Doe</span>
        </div>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar; 