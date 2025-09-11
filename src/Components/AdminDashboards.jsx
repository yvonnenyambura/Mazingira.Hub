import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComplaint, getComplaint, updateComplaint, deleteComplaint } from '../firebase'; // correct path

function AdminDashboards() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const data = await getComplaint();
    setComplaints(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert('Please fill all fields');
      return;
    }

    const complaint = { title, description, category, status: 'pending' };

    if (editingId) {
      await updateComplaint(editingId, complaint);
      setEditingId(null);
    } else {
      await addComplaint(complaint);
    }

    setTitle('');
    setDescription('');
    setCategory('');
    fetchComplaints();
  };

  const handleEdit = (complaint) => {
    setEditingId(complaint.id);
    setTitle(complaint.title);
    setDescription(complaint.description);
    setCategory(complaint.category);
  };

  const handleDelete = async (id) => {
    await deleteComplaint(id);
    fetchComplaints();
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Manage Complaints</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Complaint Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">{editingId ? 'Update Complaint' : 'Add Complaint'}</button>
      </form>

      <h2>Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            <strong>{complaint.title}</strong> - {complaint.description} | Category: {complaint.category} | Status: {complaint.status}
            <button onClick={() => handleEdit(complaint)}>Edit</button>
            <button onClick={() => handleDelete(complaint.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboards;
