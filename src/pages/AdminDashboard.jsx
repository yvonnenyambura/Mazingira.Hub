import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reportsData = querySnapshot.docs.map((doc) => ({
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

  // Update report status
  const updateStatus = async (id, newStatus) => {
    try {
      const reportRef = doc(db, "reports", id);
      await updateDoc(reportRef, { status: newStatus });
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      {/* Navbar */}
      <header className="admin-dashboard-header">
        <h1>⚙️ Admin Dashboard - Mazingira Hub</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="admin-dashboard-main">
        <h2>All User Reports</h2>
        {loading ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          <ul className="reports-list">
            {reports.map((report) => (
              <li key={report.id} className="report-card">
                <h3>{report.title || "Untitled Report"}</h3>
                <p>{report.description || "No description provided."}</p>
                <span className={`status ${report.status?.toLowerCase()}`}>
                  {report.status || "Pending"}
                </span>
                <div className="actions">
                  <button
                    onClick={() => updateStatus(report.id, "Pending")}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(report.id, "In Progress")}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(report.id, "Resolved")}
                  >
                    Resolved
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
