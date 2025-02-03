// src/pages/Home.jsx
import React from "react";
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Welcome to the App</h2>
      <Button className="mt-4" onClick={() => navigate("/register")}>
        Get Started
      </Button>
    </div>
  );
};

export default Home;