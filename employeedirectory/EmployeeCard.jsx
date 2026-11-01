import React from 'react';
import PropTypes from 'prop-types';
import './EmployeeCard.css';

function EmployeeCard({ employeeName, role, department }) {
  return (
    <div className="employee-card">
      <h2 className="employee-name">{employeeName}</h2>
      <p className="employee-role">Role: {role}</p>
      <p className="employee-department">Department: {department}</p>
    </div>
  );
}

EmployeeCard.propTypes = {
  employeeName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default EmployeeCard;