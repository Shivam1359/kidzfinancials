import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'; // Assuming logo path
import './Navbar.css';

const Navbar = () => {
  const [navbarDark, setNavbarDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarDark(true);
      } else {
        setNavbarDark(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={navbarDark ? 'dark-nav' : ''}>
      <a href="/" aria-label="Home">
        <img src={logo} alt="KidzFinancials Logo" className="logo size-[40px]" />
      </a>
      
      <ul className={showMenu ? 'show-mobile-menu' : 'hide-mobile-menu'}>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact" className="btn">Contact Us</a></li>
        <li><a href="/resources" className="text-brand-primary-normal">Resources</a></li>
        <li><a href="/login" className="text-brand-primary-normal">Login</a></li>
      </ul>
      
      <img 
        src={showMenu ? "close-icon.png" : "menu-icon.png"} 
        alt={showMenu ? "Close Menu" : "Open Menu"} 
        onClick={() => setShowMenu(!showMenu)} 
        className="menu-icon" 
      />
    </nav>
  );
};

export default Navbar;