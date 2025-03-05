import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token sent in request:", token);  // Debugging line
            
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.get("http://localhost:5000/home", {
                headers: { Authorization: `Bearer ${token}` },
            });

        } catch (error) {
            console.error("Access denied:", error);
            navigate("/login"); 
        }
    };

    checkAuth();
}, [navigate]);

  return <>
  
 <Navbar/>
  
  
 <Hero/>

 
  </>
}

export default HomePage