import React from 'react';
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="search-container">
        <IoSearchOutline className="search-icon" />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="header-right">
        <button className="icon-button">
          <IoNotificationsOutline className="header-icon" />
        </button>
        <button className="icon-button">
          <FaUserCircle className="header-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header; 