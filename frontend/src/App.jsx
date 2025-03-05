import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import UploadResume from './Pages/UploadResume'
import AllApplications from './Pages/AllApplications'
import ProtectedRoute from './Pages/ProtectedRoute'
import AboutPage from './Pages/AboutPage'




const App = () => {
  return <>

<Router>
  <Routes>
    <Route path='/' element={<RegisterPage />} />
    <Route path='/login' element={<LoginPage />} />
    
    {/* Protect all routes inside ProtectedRoute */}
    <Route element={<ProtectedRoute />}>
      <Route path='/home' element={<HomePage />} />
      <Route path='/upload-resume' element={<UploadResume />} />
      <Route path='/all-resumes' element={<AllApplications />} />
      <Route path='/about' element={<AboutPage />} />
      
    </Route>
  </Routes>
</Router>

  

  </>
}

export default App