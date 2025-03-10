import React from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import SEO from "../../components/common/SEO";
import './InsuranceService.css';
import lifeInsuranceImage from "/src/assets/img1.jpeg"; // Replace with actual insurance-related images
import familyInsuranceImage from "/src/assets/img2.jpg";

const InsuranceService = () => {
  return (
    <div className="service-page">
      <SEO 
        title="Life Insurance Services" 
        description="Secure your family's future with comprehensive life insurance plans. KidzFinancials helps you choose the right coverage for your needs."
      />
      
      <div className="service-header">
        <h1>Life Insurance Services</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>Insurance</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* Overview Section */}
        <section className="service-content">
          <h2 id="insurance-overview">Why Life Insurance?</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <p>
                Life insurance is a crucial contract that pledges payment to your beneficiaries in the event of death 
                or at maturity. It provides certainty in uncertain times and offers financial protection for your loved ones.
              </p>
              
              <h3>Key Protection Areas</h3>
              <ul>
                <li><strong>Family Protection</strong> - Financial security for dependents in case of premature death</li>
                <li><strong>Retirement Security</strong> - Ensuring comfortable living in old age</li>
                <li><strong>Investment Benefits</strong> - Tax advantages and wealth accumulation</li>
                <li><strong>Mortgage Protection</strong> - Coverage for outstanding mortgage payments</li>
                <li><strong>Education Planning</strong> - Securing your children's educational future</li>
              </ul>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={lifeInsuranceImage} 
                alt="Family protected by life insurance" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
        </section>

        {/* Insurance Types Section */}
        <section className="service-content">
          <h2 id="insurance-types">Types of Life Insurance</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={familyInsuranceImage} 
                alt="Different types of insurance policies" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>Choose Your Coverage</h3>
              <ul>
                <li><strong>Term Life Insurance</strong> - Temporary coverage for specific periods with lower premiums</li>
                <li><strong>Permanent Life Insurance</strong> - Lifetime coverage with investment components</li>
                <li><strong>Universal Life Insurance</strong> - Flexible premiums and adjustable death benefits</li>
                <li><strong>Mortgage Life Insurance</strong> - Specific coverage for mortgage protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-content">
          <h2 id="insurance-benefits">Insurance Benefits</h2>
          
          <div className="service-cards">
            <div className="service-card">
              <h3>Financial Security</h3>
              <p>Protect your family's lifestyle and ensure their financial needs are met.</p>
            </div>
            
            <div className="service-card">
              <h3>Tax Benefits</h3>
              <p>Take advantage of tax-deferred growth and tax-free death benefits.</p>
            </div>
            
            <div className="service-card">
              <h3>Flexible Options</h3>
              <p>Choose from various policy types and coverage amounts to suit your needs.</p>
            </div>
            
            <div className="service-card">
              <h3>Peace of Mind</h3>
              <p>Rest assured knowing your loved ones are protected financially.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service-content">
          <div className="service-faq">
            <h3>Frequently Asked Questions</h3>
            
            <div className="faq-item">
              <h4>How much life insurance do I need?</h4>
              <p>The amount depends on factors like your income, debts, dependents' needs, and long-term financial goals. Our advisors can help you calculate the right coverage amount.</p>
            </div>
            
            <div className="faq-item">
              <h4>What's the difference between term and permanent insurance?</h4>
              <p>Term insurance provides coverage for a specific period, while permanent insurance offers lifetime coverage with additional investment features.</p>
            </div>
            
            <div className="faq-item">
              <h4>Can I modify my policy later?</h4>
              <p>Yes, many policies offer flexibility to adjust coverage, add riders, or convert to different policy types as your needs change.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Protect Your Family's Future</h2>
        <p>Our insurance advisors are here to help you choose the right coverage for your needs and budget.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Schedule an insurance consultation">
            Schedule a Consultation
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us about insurance">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsuranceService;