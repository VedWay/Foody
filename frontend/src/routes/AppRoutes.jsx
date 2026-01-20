import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserLogin from '../pages/UserLogin.jsx';
import PartnerLogin from '../pages/PartnerLogin.jsx';
import UserHome from '../pages/UserHome.jsx';
import PartnerHome from '../pages/PartnerHome.jsx';
import HomePage from '../pages/HomePage.jsx';
import PartnerFood from '../pages/PartnerFood.jsx';
import PartnerProtectedRoute from '../protected/partnerProtectedRoute.jsx';
import UserProtectedRoute from '../protected/userProtectedRoute.jsx';
const appRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/user/login" element = {<UserLogin />} />
        <Route path = "/foodpartner/login" element = {<PartnerLogin />} />
        <Route path = "/home" element = {
          <UserProtectedRoute>
          <UserHome />
          </UserProtectedRoute>
        } />
        <Route path = "/partner/home" element = {
          <PartnerProtectedRoute>
          <PartnerHome />
          </PartnerProtectedRoute>
        }
           />
        <Route path = "/partner/food" element = {
          <PartnerProtectedRoute>
          <PartnerFood />
          </PartnerProtectedRoute>
          } />
      </Routes>
    </Router>
  )
}

export default appRoutes
