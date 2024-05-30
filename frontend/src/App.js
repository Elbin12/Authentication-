import logo from './logo.svg';
import './App.css';


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/home' element={<HomePage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
