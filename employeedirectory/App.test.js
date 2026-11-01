import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from '../App';
import EmployeeCard from '../components/EmployeeCard';

describe("App", () => {
  test("renders_directory_title", () => {
    render(<App />);
    expect(screen.getByText("Employee Directory")).toBeInTheDocument();
  });

  test("renders_department_filter_dropdown", () => {
    render(<App />);
    const dropdown = document.querySelector('#department-filter');
    expect(dropdown).toBeInTheDocument();
  });

  test("renders_all_employees_on_load", () => {
    render(<App />);
    const cards = document.querySelectorAll('.employee-card');
    expect(cards.length).toBe(5);
  });

  test("filters_employees_by_department", () => {
    render(<App />);
    const dropdown = document.querySelector('#department-filter');
    fireEvent.change(dropdown, { target: { value: 'Engineering' } });
    const cards = document.querySelectorAll('.employee-card');
    expect(cards.length).toBe(2);
  });
});

describe("EmployeeCard", () => {
  test("renders_employee_name", () => {
    render(<EmployeeCard employeeName="Rajan Kumar" role="Software Engineer" department="Engineering" />);
    expect(screen.getByText("Rajan Kumar")).toBeInTheDocument();
  });

  test("renders_employee_role", () => {
    render(<EmployeeCard employeeName="Rajan Kumar" role="Software Engineer" department="Engineering" />);
    expect(screen.getByText("Role: Software Engineer")).toBeInTheDocument();
  });

  test("renders_employee_department", () => {
    render(<EmployeeCard employeeName="Rajan Kumar" role="Software Engineer" department="Engineering" />);
    expect(screen.getByText("Department: Engineering")).toBeInTheDocument();
  });

  test("validates_proptypes", () => {
    const { propTypes } = EmployeeCard;
    expect(propTypes).toHaveProperty("employeeName");
    expect(propTypes).toHaveProperty("role");
    expect(propTypes).toHaveProperty("department");
  });
});