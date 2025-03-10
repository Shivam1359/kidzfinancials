import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
import './RRSPService.css';
import respImage from "/src/assets/img1.jpeg";
import rrspImage from "/src/assets/img2.jpg";

// Pre-load the CSS explicitly to prevent flash
const preloadStyles = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/src/pages/services/RRSPService.css';
  document.head.appendChild(link);
};

const RRSPService = () => {
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
    <div className="service-page">
      <SEO 
        title="RRSP & RESP Saving Plans" 
        description="Learn about RRSP and RESP saving plans. KidzFinancials helps you maximize tax benefits and secure your family's financial future through personalized planning."
      />
      
      <div className="service-header">
        <h1>RRSP & RESP Saving Plans</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>RRSP & RESP Plans</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* RRSP Section */}
        <section className="service-content">
          <h2 id="rrsp-section">Registered Retirement Savings Plan (RRSP)</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <h3>What is an RRSP?</h3>
              <p>
                A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account designed to help Canadians save for retirement. 
                Contributions to an RRSP are tax-deductible, meaning you can reduce your taxable income for the year. 
                The investments within your RRSP grow tax-free until withdrawal, typically during retirement when you may be in a lower tax bracket.
              </p>
              
              <h3>Key Benefits of RRSPs</h3>
              <ul>
                <li><strong>Tax Deductions</strong> - Reduce your current income tax by contributing to your RRSP</li>
                <li><strong>Tax-Deferred Growth</strong> - Your investments grow tax-free while inside the RRSP</li>
                <li><strong>Income Splitting</strong> - Options for spousal RRSPs to balance retirement income</li>
                <li><strong>Home Buyers' Plan</strong> - Withdraw up to $35,000 tax-free for your first home</li>
                <li><strong>Lifelong Learning Plan</strong> - Use up to $20,000 for education purposes</li>
              </ul>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={rrspImage} 
                alt="A person reviewing retirement investment documents" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
          
          <div className="service-cta">
            <h3>Start Your RRSP Today</h3>
            <p>Our advisors can help you determine the right contribution strategy based on your income, tax bracket, and retirement goals.</p>
            <Link to="/select-slot" className="btn service-btn" aria-label="Schedule a consultation for RRSP planning">
              Schedule a Consultation
            </Link>
          </div>
        </section>

        {/* RESP Section */}
        <section className="service-content">
          <h2 id="resp-section">Registered Education Savings Plan (RESP)</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={respImage} 
                alt="Parents planning education savings with their child" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>What is an RESP?</h3>
              <p>
                A Registered Education Savings Plan (RESP) is a tax-sheltered investment account that helps parents save for their children's 
                post-secondary education. The Canadian government offers grants to boost your contributions, making RESPs one of the most 
                effective ways to save for education expenses.
              </p>
              
              <h3>Key Benefits of RESPs</h3>
              <ul>
                <li><strong>Government Grants</strong> - Receive up to 20% of your annual contributions through the Canada Education Savings Grant (CESG)</li>
                <li><strong>Tax-Deferred Growth</strong> - Investments grow tax-free until withdrawal</li>
                <li><strong>Canada Learning Bond</strong> - Eligible low-income families can receive additional government bonds</li>
                <li><strong>Flexibility</strong> - Funds can be used for various education expenses including tuition, housing, and books</li>
                <li><strong>Transferability</strong> - Unused funds can be transferred to siblings or into your RRSP</li>
              </ul>
            </div>
          </div>
          
          <div className="service-cta">
            <h3>Secure Your Child's Educational Future</h3>
            <p>The earlier you start an RESP, the more time your investments have to grow and the more government grants you can collect.</p>
            <Link to="/select-slot" className="btn service-btn" aria-label="Open an RESP account">
              Open an RESP
            </Link>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="service-content">
          <h2 id="our-services">How We Help</h2>
          <p>At Kidzfinancials, we provide comprehensive guidance for both RRSP and RESP planning:</p>
          
          <div className="service-cards">
            <div className="service-card">
              <h3>Personalized Planning</h3>
              <p>We create customized saving strategies based on your specific financial situation and goals.</p>
            </div>
            
            <div className="service-card">
              <h3>Investment Selection</h3>
              <p>Our advisors help you choose the right investment mix to optimize growth while managing risk.</p>
            </div>
            
            <div className="service-card">
              <h3>Tax Optimization</h3>
              <p>We structure your contributions to maximize tax benefits and government grants.</p>
            </div>
            
            <div className="service-card">
              <h3>Regular Reviews</h3>
              <p>We conduct periodic reviews to ensure your plans remain aligned with your changing needs and goals.</p>
            </div>
          </div>
          
          <div className="service-faq">
            <h3>Frequently Asked Questions</h3>
            
            <div className="faq-item">
              <h4>What's the RRSP contribution deadline?</h4>
              <p>The RRSP contribution deadline for the tax year is typically 60 days into the following calendar year (usually March 1st or February 29th in a leap year).</p>
            </div>
            
            <div className="faq-item">
              <h4>How much can I contribute to an RESP?</h4>
              <p>The lifetime contribution limit for an RESP is $50,000 per beneficiary. There is no annual contribution limit, but to maximize CESG grants, consider contributing $2,500 annually.</p>
            </div>
            
            <div className="faq-item">
              <h4>Can I have both an RRSP and an RESP?</h4>
              <p>Yes, you can contribute to both plans. Many parents balance their retirement savings with education savings for their children.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Ready to Start Saving?</h2>
        <p>Our financial advisors are here to help you navigate RRSP and RESP options for a secure financial future.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Book a consultation with our advisors">
            Book a Consultation
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us for more information">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RRSPService;