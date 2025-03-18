import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
import './PersonalLoanService.css';
import personalLoanImage from "/src/assets/img1.jpeg";
import loanComparisonImage from "/src/assets/img2.jpg";

// Pre-load the CSS explicitly to prevent flash
const preloadStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './PersonalLoanService.css';  // Fixed path
  document.head.appendChild(link);
};

const PersonalLoanService = () => {
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
    <div className="service-page personal-loan-service">
      <SEO 
        title="Personal Loan Services" 
        description="Get competitive personal loan options that fit your financial needs. KidzFinancials offers flexible terms, competitive rates, and fast approvals."
      />
      
      <div className="service-header">
        <h1>Personal Loan Services</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>Personal Loans</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* Overview Section */}
        <section className="service-content">
          <h2 id="loan-overview">Personal Loans Tailored to Your Needs</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <h3>Why Choose Our Personal Loans?</h3>
              <p>
                Whether you're consolidating debt, renovating your home, or covering unexpected expenses, 
                our personal loans provide the flexibility and competitive rates you need. We work with 
                multiple lenders to find the best solution for your unique situation.
              </p>
              
              <div className="highlight-box">
                <p>
                  Personal loans can be a smarter alternative to high-interest credit cards, offering fixed 
                  rates, predictable monthly payments, and typically lower interest rates. With our help, 
                  you could save thousands in interest charges.
                </p>
              </div>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={personalLoanImage} 
                alt="Person reviewing personal loan options" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
        </section>

        {/* Loan Types Section */}
        <section className="service-content">
          <h2 id="loan-types">Types of Personal Loans</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={loanComparisonImage} 
                alt="Comparison of different loan options" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>Find the Right Fit for Your Financial Situation</h3>
              <ul>
                <li><strong>Secured Loans</strong> - Lower rates by offering collateral as security</li>
                <li><strong>Unsecured Loans</strong> - No collateral required, based on creditworthiness</li>
                <li><strong>Debt Consolidation Loans</strong> - Combine multiple debts into one payment</li>
                <li><strong>Line of Credit</strong> - Flexible borrowing with interest charged only on what you use</li>
                <li><strong>Special Purpose Loans</strong> - Designed for specific needs like home renovation or education</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-content">
          <h2 id="loan-benefits">Benefits of Our Loan Services</h2>
          
          <div className="service-cards">
            <div className="service-card">
              <h3>Competitive Rates</h3>
              <p>We shop around with our lending partners to secure the best possible interest rates for your situation.</p>
            </div>
            
            <div className="service-card">
              <h3>Flexible Terms</h3>
              <p>Choose from various repayment terms to fit your budget and financial goals.</p>
            </div>
            
            <div className="service-card">
              <h3>Quick Approvals</h3>
              <p>Our streamlined application process means you can often get approved within 24-48 hours.</p>
            </div>
            
            <div className="service-card">
              <h3>Expert Guidance</h3>
              <p>Our loan specialists provide personalized advice to help you make informed borrowing decisions.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service-content">
          <div className="service-faq">
            <h3>Common Questions About Personal Loans</h3>
            
            <div className="faq-item">
              <h4>What credit score do I need for a personal loan?</h4>
              <p>While a higher score typically results in better rates, we work with lenders who accommodate various credit profiles. Even if you have less-than-perfect credit, we can often find options.</p>
            </div>
            
            <div className="faq-item">
              <h4>How much can I borrow with a personal loan?</h4>
              <p>Personal loan amounts typically range from $1,000 to $50,000, depending on your income, credit score, and other factors.</p>
            </div>
            
            <div className="faq-item">
              <h4>Are there penalties for early repayment?</h4>
              <p>Some loans have prepayment penalties while others don't. We prioritize finding you loans with flexible repayment options if early payoff is important to you.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Ready to Apply for a Personal Loan?</h2>
        <p>Our loan specialists are ready to help you find the right financing solution for your needs.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Apply for a personal loan">
            Apply Now
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us about personal loans">
            Get More Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanService;
