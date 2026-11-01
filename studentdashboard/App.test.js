import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import App from '../App';
import Navbar from '../components/Navbar';
import Marks from '../components/Marks';

const marks = [
  { subject: "Mathematics", score: 92 },
  { subject: "Physics", score: 85 },
  { subject: "Chemistry", score: 78 },
  { subject: "Computer Science", score: 96 },
  { subject: "English", score: 88 },
];

describe("App", () => {
  test("renders_home_title", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Your Dashboard")).toBeInTheDocument();
  });

  test("renders_home_student_name", () => {
    render(<App />);
    expect(screen.getByText("Student: Meena Sharma")).toBeInTheDocument();
  });
});

describe("Navbar", () => {
  test("renders_navbar_brand", () => {
    render(<MemoryRouter><Navbar studentName="Meena Sharma" /></MemoryRouter>);
    expect(screen.getByText("Student Dashboard")).toBeInTheDocument();
  });

  test("renders_navbar_links", () => {
    render(<MemoryRouter><Navbar studentName="Meena Sharma" /></MemoryRouter>);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Marks")).toBeInTheDocument();
  });

  test("renders_navbar_student_name", () => {
    render(<MemoryRouter><Navbar studentName="Meena Sharma" /></MemoryRouter>);
    expect(screen.getByText("Welcome, Meena Sharma")).toBeInTheDocument();
  });

  test("validates_navbar_proptypes", () => {
    const { propTypes } = Navbar;
    expect(propTypes).toHaveProperty("studentName");
  });
});

describe("Marks", () => {
  test("renders_marks_page_title", () => {
    render(<MemoryRouter><Marks marks={marks} /></MemoryRouter>);
    expect(screen.getByText("Subject Marks")).toBeInTheDocument();
  });

  test("renders_marks_list", () => {
    render(<MemoryRouter><Marks marks={marks} /></MemoryRouter>);
    const items = document.querySelectorAll('.mark-item');
    expect(items.length).toBe(5);
  });

  test("renders_total_score", () => {
    render(<MemoryRouter><Marks marks={marks} /></MemoryRouter>);
    expect(screen.getByText("Total Score: 439")).toBeInTheDocument();
  });

  test("validates_marks_proptypes", () => {
    const { propTypes } = Marks;
    expect(propTypes).toHaveProperty("marks");
  });
});