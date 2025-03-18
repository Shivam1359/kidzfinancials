import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
import './TaxPlanningService.css';
import taxPlanningImage from "/src/assets/img1.jpeg";
import taxStrategyImage from "/src/assets/img2.jpg";

// Pre-load the CSS explicitly to prevent flash
const preloadStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './TaxPlanningService.css';  // Fixed path
  document.head.appendChild(link);
};

const TaxPlanningService = () => {
  const [contentReady, setContentReady] = useState(false);
  
  // Handle page initialization
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Preload stylesheet
    preloadStyles();
    
    // Set a small delay to ensure CSS is applied before showing content
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading spinner until content is ready
  if (!contentReady) {
    return (
      <div className="service-page-loader">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="service-page tax-planning-service">
      <SEO 
        title="Tax Planning Services" 
        description="Optimize your tax strategy with KidzFinancials' tax planning services. We help individuals and families minimize tax liabilities and maximize savings."
      />
      
      <div className="service-header">
        <h1>Tax Planning Services</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>Tax Planning</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* Overview Section */}
        <section className="service-content">
          <h2 id="tax-overview">Smart Tax Planning for Your Future</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <h3>Why Tax Planning Matters</h3>
              <p>
                Effective tax planning involves analyzing your financial situation to ensure all elements work 
                together in the most tax-efficient manner possible. Our proactive approach helps you keep more 
                of what you earn while ensuring compliance with all tax regulations.
              </p>
              
              <div className="highlight-box">
                <p>
                  Did you know? The average Canadian family could save thousands of dollars annually through 
                  strategic tax planning. Yet most people overpay simply because they don't have a comprehensive 
                  tax strategy in place.
                </p>
              </div>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={taxPlanningImage} 
                alt="Professional tax planning consultation" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section className="service-content">
          <h2 id="tax-strategies">Tax Optimization Strategies</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={taxStrategyImage} 
                alt="Tax strategy planning documents" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>How We Help Minimize Your Tax Burden</h3>
              <ul>
                <li><strong>Income Splitting</strong> - Strategic allocation of income among family members</li>
                <li><strong>Tax-Loss Harvesting</strong> - Offsetting capital gains with capital losses</li>
                <li><strong>Registered Account Optimization</strong> - Strategic use of TFSAs, RRSPs, and RESPs</li>
                <li><strong>Small Business Deductions</strong> - Maximizing eligible business expense claims</li>
                <li><strong>Retirement Tax Planning</strong> - Structuring retirement income to minimize taxes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="service-content">
          <h2 id="tax-services">Our Tax Planning Services</h2>
          
          <div className="service-cards">
            <div className="service-card">
              <h3>Personal Tax Planning</h3>
              <p>Customized tax strategies for individuals to maximize deductions and credits while minimizing tax liability.</p>
            </div>
            
            <div className="service-card">
              <h3>Small Business Tax Planning</h3>
              <p>Comprehensive planning for small business owners to optimize business structure and tax efficiency.</p>
            </div>
            
            <div className="service-card">
              <h3>Investment Tax Planning</h3>
              <p>Strategic investment advice to minimize tax on investment income and capital gains.</p>
            </div>
            
            <div className="service-card">
              <h3>Estate Tax Planning</h3>
              <p>Planning to minimize tax impact on wealth transfer to the next generation.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service-content">
          <div className="service-faq">
            <h3>Frequently Asked Questions</h3>
            
            <div className="faq-item">
              <h4>When should I start tax planning?</h4>
              <p>The best time to start tax planning is at the beginning of the tax year, but it's never too late. Proactive planning throughout the year yields the best results rather than rushing before the tax filing deadline.</p>
            </div>
            
            <div className="faq-item">
              <h4>How is tax planning different from tax preparation?</h4>
              <p>Tax preparation is the process of filing tax returns, while tax planning is a year-round strategic approach to minimize taxes through financial decisions made throughout the year.</p>
            </div>
            
            <div className="faq-item">
              <h4>How often should I review my tax plan?</h4>
              <p>You should review your tax plan annually, or whenever significant life changes occur such as marriage, having children, buying property, or changing jobs.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Start Saving on Taxes Today</h2>
        <p>Our tax specialists can help you develop a personalized strategy to legally minimize your tax burden.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Schedule a tax planning consultation">
            Schedule a Consultation
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us about tax planning">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaxPlanningService;
