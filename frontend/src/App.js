import logo from './logo.svg';
import './App.css';


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
