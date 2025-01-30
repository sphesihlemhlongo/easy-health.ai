// src/pages/Home.jsx
import React from "react";
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Welcome to the App</h2>
      <Button className="mt-4">Get Started</Button>
    </div>
  );
};

export default Home;