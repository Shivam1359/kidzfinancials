import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
import './RetirementPlanningService.css';
import retirementImage from "/src/assets/img1.jpeg";
import pensionPlanningImage from "/src/assets/img2.jpg";

// Pre-load the CSS explicitly to prevent flash
const preloadStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './RetirementPlanningService.css';  // Fixed path
  document.head.appendChild(link);
};

const RetirementPlanningService = () => {
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
    <div className="service-page retirement-planning-service">
      <SEO 
        title="Retirement Planning Services" 
        description="Plan for a secure and comfortable retirement with personalized strategies from KidzFinancials. Expert guidance on pensions, investments, and more."
      />
      
      <div className="service-header">
        <h1>Retirement Planning Services</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>Retirement Planning</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* Overview Section */}
        <section className="service-content">
          <h2 id="retirement-overview">Secure Your Financial Future</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <h3>Why Retirement Planning Matters</h3>
              <p>
                Retirement planning is about creating financial security for your later years. With increasing life 
                expectancy and rising living costs, having a comprehensive retirement strategy is more important 
                than ever. Our personalized approach ensures you can enjoy the retirement lifestyle you envision.
              </p>
              
              <div className="highlight-box">
                <p>
                  Studies show that Canadians need to replace 70-80% of their pre-retirement income to maintain 
                  their standard of living in retirement. Yet many are saving less than half of what they'll need. 
                  A sound retirement strategy can help bridge this gap.
                </p>
              </div>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={retirementImage} 
                alt="Happy retired couple enjoying retirement" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
        </section>

        {/* Retirement Components Section */}
        <section className="service-content">
          <h2 id="retirement-components">Planning Components</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={pensionPlanningImage} 
                alt="Retirement planning documents and calculator" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>Building Your Retirement Foundation</h3>
              <ul>
                <li><strong>Government Benefits</strong> - Maximizing CPP, OAS, and GIS benefits</li>
                <li><strong>Employer Pensions</strong> - Understanding and optimizing your workplace pension</li>
                <li><strong>Personal Savings</strong> - Strategic use of RRSPs, TFSAs, and other investment vehicles</li>
                <li><strong>Income Planning</strong> - Creating sustainable income streams in retirement</li>
                <li><strong>Estate Planning</strong> - Ensuring efficient transfer of assets to your beneficiaries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="service-content">
          <h2 id="our-services">Our Retirement Planning Services</h2>
          
          <div className="service-cards">
            <div className="service-card">
              <h3>Retirement Needs Assessment</h3>
              <p>We'll help you determine how much you need to save based on your desired retirement lifestyle.</p>
            </div>
            
            <div className="service-card">
              <h3>Investment Strategy</h3>
              <p>Develop an investment mix aligned with your retirement timeline, risk tolerance, and goals.</p>
            </div>
            
            <div className="service-card">
              <h3>Tax-Efficient Withdrawals</h3>
              <p>Strategic planning to minimize taxes on your retirement income and maximize after-tax returns.</p>
            </div>
            
            <div className="service-card">
              <h3>Pension Optimization</h3>
              <p>Guidance on pension options, timing decisions, and benefit maximization strategies.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service-content">
          <div className="service-faq">
            <h3>Frequently Asked Questions</h3>
            
            <div className="faq-item">
              <h4>When should I start planning for retirement?</h4>
              <p>The earlier you start, the better. Ideally, retirement planning should begin with your first job, but it's never too late to start. Even those nearing retirement can benefit from professional planning.</p>
            </div>
            
            <div className="faq-item">
              <h4>How much do I need to save for retirement?</h4>
              <p>The amount varies based on your desired lifestyle, expected longevity, and other factors. A common guideline is to aim for replacing 70-80% of your pre-retirement income.</p>
            </div>
            
            <div className="faq-item">
              <h4>What if I'm behind on retirement savings?</h4>
              <p>There are several catch-up strategies we can implement, including increased contributions, delayed retirement, part-time work in retirement, and optimizing investment returns.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Start Planning Your Dream Retirement</h2>
        <p>Our retirement specialists will help you create a customized plan that aligns with your goals and timeline.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Schedule a retirement planning consultation">
            Plan Your Retirement
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us about retirement planning">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanningService;
