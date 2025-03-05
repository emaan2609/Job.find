import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";


const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            
            console.log("Token saved:", response.data.token);  // Debugging line
    
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
           
            navigate('/home'); 
        } catch (error) {
            console.error("Login Error:", error);
           toast.error(error.response?.data?.message || "Login failed");
        }
    };




    return <>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="./jf.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>



            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form  className="space-y-6" onSubmit={handleSubmit} >
                    <div>
                       
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address*
                        </label>
                        <div className="mt-2">
                            <input
                                 value={formData.email}
                                 onChange={handleChange}
                                name="email"
                                type="email"
                                required
                                placeholder='Enter your registered Email'
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password*
                            </label>
                            
                        </div>
                        <div className="mt-2">
                            <input
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                type="password"
                                required
                                placeholder='Enter your registered Password'
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"     
                            className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                   Not a member?{' '}
                    <Link to='/' className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>



    </>
}

export default LoginPage