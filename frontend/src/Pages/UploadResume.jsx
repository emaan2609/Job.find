import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const UploadResume = () => {
  const [formData, setFormData] = useState({
          username: "",
          email: "",
          job: "",
      });

    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // Get token from localStorage
  if (!token) {
    alert("Unauthorized: No token found. Please log in.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/upload-resume",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      }
    );

    toast.success(response.data.message);
    setFormData({ username: "", email: "", job: "" });
    navigate("/all-resumes");
  } catch (error) {
    toast.error(error.response?.data?.error || "Error Submitting Profile");
  }
};
 
  return <>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-96 bg-white p-5 shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-600">This information will be displayed publicly, so be careful what you share.</p>

          {/* First Name */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">Full name*</label>
            <input type="text" name="username" id="username" autoComplete="given-name" onChange={handleChange} required placeholder="Minimum 5 characters"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600" />
          </div>


          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address*</label>
            <input type="email" name="email" id="email" autoComplete="email" onChange={handleChange} required placeholder="Minimum 13 characters"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600" />
          </div>
        
        {/* Job */}
        <div>
            <label htmlFor="job" className="block text-sm font-medium text-gray-900">Job you are looking for*</label>
            <input type="text" name="job" id="job" autoComplete="given-job"  onChange={handleChange} required placeholder="Minimum 5 characters"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600" />
          </div>


          {/* Upload File 
          <div className="col-span-full">
            <label for="cover-photo" className="block text-sm/6 font-medium text-gray-900">Upload Resume</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label for="file-upload" className="underline relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                    <span>Upload a resume</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">Upload In PDF Format Only </p>
              </div>
            </div>
          </div>
          */}
        </div>
        
    
<br />
    {/* Submit Button */}
    <div className="flex justify-end">
      <Link to='/home'><button type="button" className="px-4 py-2 rounded-md  font-semibold text-gray-900 cursor-pointer">Cancel</button></Link>
      <button type="submit"
        className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600">
        Submit
      </button>
    </div>
  
  </form >
</div >

  </>
}

export default UploadResume