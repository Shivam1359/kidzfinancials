import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    // Handle route changes - fade out, change location, fade in
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      
      // Wait for fade out animation to complete
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
        
        // Always scroll to top when location changes
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }, 250); // Match this to CSS transition time
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);
  
  // Also ensure we scroll to top on initial render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {children}
    </div>
  );
};

export default PageTransition;
