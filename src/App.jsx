import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Hero from './components/hero'
import Loader from './components/loader'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import StudentRegister from './pages/StudentRegister'
import WardenLogin from './pages/wardenLogin'
import WardenRegister from './pages/wardenRegister'
import StudentDashboard from './pages/studentDashboard'
import DriverLogin from './pages/driverLogin'
import DriverLocation from './pages/driverLocation'
import DriverRegister from './pages/driverRegister'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/ResetPassword'; 
import WardenDashboard from './pages/wardenDashboard';
const App = () => {
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setLoading(false);
    }, 2000);
      return ()=> clearTimeout(timeout);
  },[]);
  if (loading) return <Loader />
 
   return (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/warden/login" element={<WardenLogin />} />
          <Route path="/warden/register" element={<WardenRegister />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver/register" element={<DriverRegister />} />
          <Route path="/driver/location" element={<DriverLocation />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/resetLink/:token" element={<ResetPassword />} />
          <Route path="/warden/dashboard" element={<WardenDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  </Router>
);

}

export default App