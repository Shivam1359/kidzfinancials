import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './RRSPService.css';

const RRSPService = () => {
  return (
    
    <div className="service-page">
      
      <h1>RRSP & RESP Saving Plan</h1>
      <div className="service-content">
        <h2>What is RRSP & RESP?</h2>
        <p>Detailed information about RRSP & RESP savings plans...</p>
        
        <h2>Benefits</h2>
        <ul>
          <li>Tax advantages</li>
          <li>Government grants</li>
          <li>Investment options</li>
        </ul>
        
        <h2>How We Help</h2>
        <p>Our services for RRSP & RESP planning...</p>
      </div>
    </div>
  );
};

export default RRSPService;