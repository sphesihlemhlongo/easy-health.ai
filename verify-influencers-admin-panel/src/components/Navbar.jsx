// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">EasyHealth</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        <Link className="mx-2" to="/leaderboard">Leaderboard</Link>
        <Link className="mx-2" to="/influencers">Influencers</Link>
      </div>
    </nav>
  );
};

export default Navbar;