import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar({ studentName }) {
  return (
    <nav id="navbar">
      <span id="nav-brand">Student Dashboard</span>
      <div id="nav-links">
        <Link to="/" id="home-link">Home</Link>
        <Link to="/marks" id="marks-link">Marks</Link>
      </div>
      <span id="nav-student">{`Welcome, ${studentName}`}</span>
    </nav>
  );
}

Navbar.propTypes = {
  studentName: PropTypes.string.isRequired,
};

export default Navbar;