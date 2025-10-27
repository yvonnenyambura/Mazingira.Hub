// src/pages/ReportsPage.jsx
import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // ✅ fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      const snapshot = await getDocs(collection(db, "reports"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReports(list);
    };
    fetchReports();
  }, []);

  // ✅ submit report
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileUrl = null;
      if (file) {
        const storageRef = ref(storage, `reports/${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "reports"), {
        description,
        fileUrl,
        createdAt: serverTimestamp(),
        user: auth.currentUser?.email || "Anonymous",
      });

      setDescription("");
      setFile(null);
      alert("Report submitted ✅");
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg space-y-3 mb-6"
      >
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-gray-300"
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Submit Report
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-gray-800 p-4 rounded-lg">
            <p className="mb-2">{report.description}</p>
            {report.fileUrl && (
              <a
                href={report.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                View Attachment
              </a>
            )}
            <p className="text-sm text-gray-400 mt-2">
              By: {report.user} |{" "}
              {report.createdAt?.toDate().toLocaleString() || "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
