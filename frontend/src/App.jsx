// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// // import './index.css'
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Hero from './components/Hero/Hero';
// import Services from "./components/Services/Services";
// import Title from "./components/Title/Title";
// import About from './components/About/About';
// import Footer from './components/Footer/Footer';
// import Blogs from './components/Blogs/Blogs';
// import Contact from './components/Contact/Contact';
// import Appointment from './components/Appointment/Appointment';
// import RESP from './components/RESP/RESP';
// const App = () => {
//   return(
//     <div>
//       <Navbar />
//       <Hero/>
//       <div className="container">
//         <Title subTitle='Our Service' title='What We Offer'/>
//         <Services/>
//         <About/>
//         <Title subTitle='Blogs' title='Explore'/>
//         <Blogs />
//         <Title  title='Online Appointment'/>
//         <Appointment/>
//         <Title subTitle='Contact Us' title='Get in Touch'/>
//         <Contact/>
//         <Footer/>
//         {/* <RESP/> */}
//       </div>
    
//     </div>
    
//   )
  
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Title from "./components/Title/Title";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contact/Contact";
import Appointment from "./components/Appointment/Appointment";
import SelectSlot from "./components/SelectSlot/SelectSlot"; // ✅ Import SelectSlot component
import RRSPService from "./pages/services/RRSPService";
// import MortgageService from "./pages/services/MortgageService";
// import PersonalLoanService from "./pages/services/PersonalLoanService";
// import InsuranceService from "./pages/services/InsuranceService";
// import TaxPlanningService from "./pages/services/TaxPlanningService";
// import RetirementService from "./pages/services/RetirementService";
// import AllServices from "./pages/services/AllServices";




const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="container">
                <Title subTitle="Our Service" title="What We Offer" />
                <Services />
                <About />
                <Title subTitle="Blogs" title="Explore" />
                <Blogs />
                <Title title="Online Appointment" />
                <Appointment />
                <Title subTitle="Contact Us" title="Get in Touch" />
                <Contact />
              </div>
              <Footer />
            </>
          }
        />
        {/* Appointment Slot Selection Page */}
        <Route path="/select-slot" element={<SelectSlot />} /> {/* ✅ Add route for slot selection */}

          {/* Service routes */}
        {/* <Route path="/services" element={<AllServices />} /> */}
        <Route path="/services/rrsp-resp" element={<RRSPService />} />
        {/* <Route path="/services/mortgage" element={<MortgageService />} />
        <Route path="/services/personal-loan" element={<PersonalLoanService />} />
        <Route path="/services/insurance" element={<InsuranceService />} />
        <Route path="/services/tax-planning" element={<TaxPlanningService />} />
        <Route path="/services/retirement" element={<RetirementService />} /> */}
      


      </Routes>
    </Router>
  );
};

export default App;
