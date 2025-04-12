import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  // Regex patterns for validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (
        !nameRegex.test(username) ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
      ) {
        toast.error(" Invalid input format");
        setError("Invalid input format");
        console.log("Invalid input format");
        return;
      } else {
        console.log("Registering with:", { username, email, password });
        setError("");
        await axios.post(`${baseURL}/api/auth/register`, {
          username,
          password,
          email,
        });
        navigate("/login");
        console.log("Registration successful");
        window.location.reload();
        toast.success("Registration successful!");

      }
    } catch (err) {
      // alert("Registration failed");
      toast.error(" Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
              <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
        
          <span>
            <a href="/login" className="text-blue-500 hover:underline ml-1">Sign In</a>
          </span>
          
        </div>
      </div>
    </div>
  );
};

export default Register;

// -----------------------------
// src/Register.js
// import React, { useState } from 'react';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//
//     };

//     return (

//     );
// };

// export default Register;
