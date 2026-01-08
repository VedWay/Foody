import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserLogin from '../pages/UserLogin.jsx';
import PartnerLogin from '../pages/PartnerLogin.jsx';


import HomePage from '../pages/HomePage.jsx';
const appRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/user/login" element = {<UserLogin />} />
        <Route path = "/foodpartner/login" element = {<PartnerLogin />} />
      </Routes>
    </Router>
  )
}

export default appRoutes
