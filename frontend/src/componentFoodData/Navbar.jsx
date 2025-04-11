import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white fixed w-full top-0 z-10 shadow-md">
      <h1 className="text-xl font-bold">NutriAI Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;