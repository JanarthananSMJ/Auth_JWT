import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userid, setUserId] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userid,
        userpassword,
      });
      if (response.data.status == 200) {
        navigate("/dashboard");
      }
      if (response.data.status == 404) {
        setError(response.data.message);
      }
      if (response.data.status == 401) {
        setError(response.data.message);
      }
      setError("");
      setUserId("");
      setUserPassword("");
    } catch (error) {
      console.log("Login Error:", error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={formSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="userid"
              id="userid"
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
          <p className="text-lg font-semibold text-red-700 bg-red-100  rounded-lg shadow-sm">
            {error}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
