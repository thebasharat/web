import React, { useState } from 'react';
import EmployeeCard from './components/EmployeeCard';
import './App.css';

const employees = [
  { id: 1, employeeName: 'Rajan Kumar', role: 'Software Engineer', department: 'Engineering' },
  { id: 2, employeeName: 'Meena Iyer', role: 'Product Manager', department: 'Product' },
  { id: 3, employeeName: 'Karthik Raj', role: 'UI Designer', department: 'Design' },
  { id: 4, employeeName: 'Sneha Pillai', role: 'QA Engineer', department: 'Engineering' },
  { id: 5, employeeName: 'Divya Nair', role: 'Data Analyst', department: 'Product' },
];

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees =
    selectedDepartment === 'All'
      ? employees
      : employees.filter((employee) => employee.department === selectedDepartment);

  return (
    <div id="app-container">
      <h1 id="directory-title">Employee Directory</h1>
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Engineering">Engineering</option>
        <option value="Product">Product</option>
        <option value="Design">Design</option>
      </select>

      {filteredEmployees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employeeName={employee.employeeName}
          role={employee.role}
          department={employee.department}
        />
      ))}
    </div>
  );
}

export default App;