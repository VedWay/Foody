import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/UserRegister.jsx'
import HomePage from '../pages/HomePage.jsx';
const appRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/user/register" element = {<UserRegister />} />
        <Route path = "/user/login" element = {<div>User Login Page</div>} />
        <Route path = "/foodpartner/register" element = {<div>Food Partner Register Page</div>} />
        <Route path = "/foodpartner/login" element = {<div>Food Partner Login Page</div>} />
      </Routes>
    </Router>
  )
}

export default appRoutes
