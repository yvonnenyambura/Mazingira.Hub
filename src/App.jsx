<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<LandingPage />} />
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminDashboards from "./Components/AdminDashboards";
import ReporterDashboards from "./Components/ReporterDashboards";
import ResidentDashboards from "./Components/ResidentDashboards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards for each role */}
        <Route path="/admin" element={<AdminDashboards />} />
        {/* <Route path="/reporter" element={<ReporterDashboards />} /> */}
        <Route path="/resident" element={<ResidentDashboards />} />

        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
>>>>>>> 9b11a35a85b735376f2b74ca68ebaed645e7e809
      </Routes>
    </Router>
  );
}
<<<<<<< HEAD
=======

export default App;

>>>>>>> 9b11a35a85b735376f2b74ca68ebaed645e7e809
