import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; 
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user reports from Firestore
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="dashboard-header">
        <h1>🌍 Mazingira Hub</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        <h2>Your Reports</h2>
        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No reports found. Start by reporting an issue!</p>
        ) : (
          <ul className="reports-list">
            {reports.map(report => (
              <li key={report.id} className="report-card">
                <h3>{report.title || "Untitled Report"}</h3>
                <p>{report.description || "No description provided."}</p>
                <span className="status">{report.status || "Pending"}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
