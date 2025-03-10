/**
 * Utility to measure and debug page loading times
 */
const pageTiming = {
  // Track CSS loading events
  cssLoaded: false,
  
  // Initialize timing tracking
  init: () => {
    console.log('⏱️ Page loading started');
    
    // Monitor CSS loading
    const styleSheets = document.styleSheets;
    const checkCSSLoaded = () => {
      if (styleSheets.length > 0 && !pageTiming.cssLoaded) {
        pageTiming.cssLoaded = true;
        console.log('🎨 CSS loaded: ' + performance.now().toFixed(2) + 'ms');
      }
    };
    
    // Set up observers
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`⚡ ${entry.name}: ${entry.startTime.toFixed(2)}ms - Duration: ${entry.duration.toFixed(2)}ms`);
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    
    // Check document ready state
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      console.log('📄 Document ready: ' + performance.now().toFixed(2) + 'ms');
      checkCSSLoaded();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOMContentLoaded: ' + performance.now().toFixed(2) + 'ms');
        checkCSSLoaded();
      });
    }
    
    // Log when window is fully loaded
    window.addEventListener('load', () => {
      console.log('🏁 Window loaded: ' + performance.now().toFixed(2) + 'ms');
      
      // Log important metrics
      setTimeout(() => {
        const paintMetrics = performance.getEntriesByType('paint');
        paintMetrics.forEach(metric => {
          console.log(`🎭 ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
        });
      }, 0);
    });
  }
};

export default pageTiming;
