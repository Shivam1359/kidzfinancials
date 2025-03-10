import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component automatically scrolls to the top when the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid visual issues
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]); // Run effect when route changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
