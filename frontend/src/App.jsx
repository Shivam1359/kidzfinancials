import React, { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PageTransition from './components/common/PageTransition';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

// Improve lazy load implementation with better error handling and prefetching
const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// Lazy load page components with improved implementation
const HomePage = lazyWithPreload(() => import("./pages/HomePage"));
const SelectSlot = lazyWithPreload(() => import("./pages/SelectSlot"));
const ServicesPage = lazyWithPreload(() => import("./pages/ServicesPage"));
const ContactPage = lazyWithPreload(() => import("./pages/ContactPage"));
const RRSPService = lazyWithPreload(() => import("./pages/services/RRSPService"));
const InsuranceService = lazyWithPreload(() => import("./pages/services/InsuranceService"));
const MortgageService = lazyWithPreload(() => import("./pages/services/MortgageService"));
const PersonalLoanService = lazyWithPreload(() => import("./pages/services/PersonalLoanService"));
const RetirementService = lazyWithPreload(() => import("./pages/services/RetirementService"));
const TaxPlanningService = lazyWithPreload(() => import("./pages/services/TaxPlanningService"));

// Preload critical assets with resource hints
const preloadAssets = () => {
  // Preconnect to critical domains
  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  preconnects.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    if (url.includes('gstatic')) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // DNS-prefetch for additional performance
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = 'https://fonts.googleapis.com';
  document.head.appendChild(dnsPrefetch);
  
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
  document.head.appendChild(criticalCSS);
  
  // Preload critical fonts
  const preloadFont = document.createElement('link');
  preloadFont.rel = 'preload';
  preloadFont.as = 'font';
  preloadFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  preloadFont.crossOrigin = 'anonymous';
  document.head.appendChild(preloadFont);
};

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="suspense-loader">
    <LoadingSpinner size="large" />
  </div>
);

const App = () => {
  useEffect(() => {
    // Run immediately
    preloadAssets();
    
    // Improved prefetch strategy with priority queue
    const prefetchComponents = () => {
      // Define components in order of likely navigation
      const prefetchQueue = [
        HomePage.preload,
        ServicesPage.preload,
        ContactPage.preload,
        SelectSlot.preload,
        RRSPService.preload,
        InsuranceService.preload,
        MortgageService.preload,
        PersonalLoanService.preload,
        RetirementService.preload,
        TaxPlanningService.preload
      ];
      
      // Use more sophisticated prefetch scheduling
      if ('requestIdleCallback' in window) {
        let priority = 0;
        prefetchQueue.forEach(prefetch => {
          window.requestIdleCallback(() => prefetch(), { 
            timeout: 1500 + priority * 500 
          });
          priority++;
        });
      } else {
        // Fallback with better timing
        let delay = 500;
        prefetchQueue.forEach(prefetch => {
          setTimeout(() => prefetch(), delay);
          delay += 300;
        });
      }
    };
    
    // Start prefetching earlier but with lower priority
    const prefetchTimeout = setTimeout(prefetchComponents, 1000);
    
    return () => clearTimeout(prefetchTimeout);
  }, []);
  
  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <div className="app-container">
          <Navbar />
          <PageTransition>
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/select-slot" element={<SelectSlot />} />
                  <Route path="/services/rrsp-resp" element={<RRSPService />} />
                  <Route path="/services/insurance" element={<InsuranceService />} />
                  <Route path="/services/mortgage" element={<MortgageService />} />
                  <Route path="/services/personal-loan" element={<PersonalLoanService />} />
                  <Route path="/services/retirement" element={<RetirementService />} />
                  <Route path="/services/tax-planning" element={<TaxPlanningService />} />
                  
                  {/* Add other service routes as needed */}
                </Routes>
              </Suspense>
            </main>
          </PageTransition>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
