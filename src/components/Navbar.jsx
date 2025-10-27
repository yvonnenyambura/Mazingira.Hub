import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-4 sticky top-0 z-50 shadow-md flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl">MazingiraHub</h1>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:underline">Home</Link>
        <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
        <Link to="/reports" className="text-white hover:underline">Reports</Link>
        <Link to="/login" className="text-white hover:underline">Login</Link>
        <Link to="/signup" className="text-white hover:underline">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
