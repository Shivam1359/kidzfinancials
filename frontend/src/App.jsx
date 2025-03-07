import React, { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

// Lazy load page components for better performance with prefetching
const HomePage = lazy(() => {
  // Use a Promise to add a small delay to avoid blocking the main thread
  return new Promise(resolve => {
    const component = import("./pages/HomePage");
    // Small delay to prevent long tasks
    setTimeout(() => resolve(component), 0);
  });
});

const SelectSlot = lazy(() => import("./pages/SelectSlot"));
const RRSPService = lazy(() => import("./pages/services/RRSPService"));

// Preload critical assets
const preloadAssets = () => {
  // Preconnect to Google Fonts
  const link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link1);

  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  document.head.appendChild(link2);
  
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
  document.head.appendChild(criticalCSS);
};

const App = () => {
  useEffect(() => {
    // Run immediately
    preloadAssets();
    
    // Prefetch other components with priority
    const prefetchComponents = () => {
      const prefetchQueue = [
        () => import("./pages/HomePage"),
        () => import("./pages/SelectSlot"),
        () => import("./pages/services/RRSPService")
      ];
      
      // Schedule prefetching with requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        prefetchQueue.forEach(prefetch => {
          window.requestIdleCallback(() => prefetch(), { timeout: 2000 });
        });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        let delay = 1000;
        prefetchQueue.forEach(prefetch => {
          setTimeout(() => prefetch(), delay);
          delay += 500;
        });
      }
    };
    
    // Run prefetching after a short delay
    const prefetchTimeout = setTimeout(prefetchComponents, 2000);
    
    return () => clearTimeout(prefetchTimeout);
  }, []);
  
  return (
    <Router>
      <ErrorBoundary>
        <div className="app-container">
          <Navbar />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/select-slot" element={<SelectSlot />} />
                <Route path="/services/rrsp-resp" element={<RRSPService />} />
                {/* Add other service routes as needed */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
