import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComplaint, getComplaint } from '../firebase';

function ResidentDashboards() {
    const [complaints, setComplaints] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

   
    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const data = await getComplaint();
        setComplaints(data); 
    };

    // Submit a new complaint
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !category) {
            alert('Please fill all fields');
            return;
        }

        const complaint = { title, description, category, status: 'pending', createdAt: new Date().toISOString()

         };

        await addComplaint(complaint);
        alert('Complaint submitted successfully!');
        setTitle('');
        setDescription('');
        setCategory('');
        fetchComplaints();
    };

 
    const handleLogout = async () => {
        await logoutUser();
        navigate('/login');
    };

    return (
        <div>
            <h1>Resident Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

            <h2>Submit a Complaint</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Complaint Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">Submit Complaint</button>
            </form>

            <h2>My Complaints</h2>
            <ul>
                {complaints.map((complaint) => (
                    <li key={complaint.id}>
                        <strong>{complaint.title}</strong> - {complaint.description} | Category: {complaint.category} | Status: {complaint.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResidentDashboards;
