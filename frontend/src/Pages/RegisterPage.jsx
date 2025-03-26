import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     const response = await axios.post("https://job-find-server.vercel.app/", formData, {
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://job-find-client.vercel.app",
    },
});

  
      toast.success(response.data.message);
      navigate("/login");
  
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response); // Log actual error
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="./jf.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Full Name*
            </label>
            <div className="mt-2">
              <input
                value={formData.username}
                onChange={handleChange}
                name="username"
                type="text"
                required
                placeholder="Minimum 5 characters"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address*
            </label>
            <div className="mt-2">
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                type="email"
                required
                placeholder="Minimum 13 characters"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password*
            </label>
            <div className="mt-2">
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
                placeholder="Minimum 8 characters"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        {/* Already have an account? Login */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
