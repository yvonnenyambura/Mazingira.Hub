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
      </Routes>
    </Router>
  );
}

export default App;

