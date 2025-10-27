import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Navbar */}
      <header className="w-full p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold"> Mazingira Hub</h1>
        <div>
          <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded mr-2">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-800 rounded">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center text-center px-6">
        <h2 className="text-4xl font-extrabold mb-4">Report, Track & Solve Environmental Issues</h2>
        <p className="max-w-lg mb-6">
          Join the community to keep our environment clean and safe. Report issues like pollution, 
          illegal dumping, and more.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-blue-800 text-center text-sm">
        © {new Date().getFullYear()} Mazingira Hub. All rights reserved.
      </footer>
    </div>
  );
}