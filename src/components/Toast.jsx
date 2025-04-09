// src/components/Toast.jsx
import React from "react";

const Toast = ({ message }) => (
  <div className="fixed top-4 right-4 bg-green-500  text-white px-4 py-2 rounded shadow-lg h-14 animate-slide-in">
    {message}
  </div>
);

export default Toast;
