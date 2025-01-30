// src/components/Button.jsx
import React from "react";

const Button = ({ children, onClick, className }) => {
  return (
    <button 
      className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;