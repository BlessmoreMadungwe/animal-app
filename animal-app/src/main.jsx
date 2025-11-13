// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Navbar from './components/Navbar.jsx'  // ✅ Capitalized
// import Home from './components/Home.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
    
//     <Navbar />  
//     <br />
//     <Home/>
//       <br />
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
