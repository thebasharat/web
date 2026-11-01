import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Marks from "./components/Marks";
import "./App.css";

const marks = [
  { subject: "Mathematics", score: 92 },
  { subject: "Physics", score: 85 },
  { subject: "Chemistry", score: 78 },
  { subject: "Computer Science", score: 96 },
  { subject: "English", score: 88 },
];

function App() {
  return (
    <BrowserRouter>
      <div id="app-container">
        <Navbar studentName="Meena Sharma" />
        <Routes>
          <Route
            path="/"
            element={
              <div id="home-container">
                <h1 id="home-title">Welcome to Your Dashboard</h1>
                <p id="home-student-name">Student: Meena Sharma</p>
                <p id="home-department">Department: Computer Science</p>
                <p id="home-message">
                  Use the navigation bar to explore your Marks.
                </p>
              </div>
            }
          />
          <Route path="/marks" element={<Marks marks={marks} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;