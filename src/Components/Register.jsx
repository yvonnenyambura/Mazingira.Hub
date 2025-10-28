import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, setUserRole } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !role) {
      alert("Please fill all fields and select a role.");
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Save the user role in Firestore
      await setUserRole(user.uid, role);

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Mazingira Hub Registration</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="reporter">Reporter</option>
        <option value="resident">Resident</option>
      </select>

      <button onClick={handleSignUp} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
