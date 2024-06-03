import logo from './logo.svg';
import './App.css';


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import AdminHomePage from './Pages/AdminHomePage';
import AdminEditPage from './Pages/AdminEditPage';
import UsercreatePage from './Pages/UsercreatePage';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/home' element={<HomePage/>} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/admin/home' element={<AdminHomePage  />} />
      <Route path='/admin/edit' element={<AdminEditPage  />} />
      <Route path='/admin/create' element={<UsercreatePage  />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
