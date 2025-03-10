import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import CSS before app renders
import './index.css';

// Add a class to indicate JS is loaded
document.documentElement.classList.add('js-loaded');

// Initialize performance monitoring in dev mode only
if (import.meta.env.DEV) {
  const pageTiming = {
    init: () => {
      console.log('⏱️ Page loading started');
      
      // Log when window is fully loaded
      window.addEventListener('load', () => {
        console.log('🏁 Window loaded: ' + performance.now().toFixed(2) + 'ms');
        
        // Log paint metrics
        const paintMetrics = performance.getEntriesByType('paint');
        paintMetrics.forEach(metric => {
          console.log(`🎭 ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
        });
      });
    }
  };
  
  pageTiming.init();
}

// Remove loader when page is fully loaded
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
