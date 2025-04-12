import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// login component
// This component handles user login, including form submission and error handling. It uses axios to send login requests to the server and stores the authentication token in local storage.
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseURL = "http://localhost:5000";

  useEffect(() => {}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      if (username === "" || password === "") {
        setError("Please fill in all fields");
      } else {
        console.log("Logging in with:", { username, password });
        setError("");

        const res = await axios.post(`${baseURL}/api/auth/login`, {
          username,
          password,
        });
        toast.success(" Login successful!");

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");

        window.location.reload();
      }
    } catch (err) {
      toast.error(" Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <ToastContainer />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          signUp
          <span>
            <a href="/register" className="text-blue-500 hover:underline ml-1">
              Register
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
