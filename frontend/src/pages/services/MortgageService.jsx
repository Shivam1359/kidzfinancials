import React from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import SEO from "../../components/common/SEO";
import './MortgageService.css';
import mortgageImage from "/src/assets/img1.jpeg";
import homeProtectionImage from "/src/assets/img2.jpg";

const MortgageService = () => {
  return (
    <div className="service-page">
      <SEO 
        title="Mortgage Insurance Services" 
        description="Protect your home and family with comprehensive mortgage insurance. Learn about flexible coverage options and benefits at KidzFinancials."
      />
      
      <div className="service-header">
        <h1>Mortgage Insurance Services</h1>
        <div className="service-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <span>Services</span> / <span>Mortgage Insurance</span>
        </div>
      </div>
      
      <div className="service-sections">
        {/* Overview Section */}
        <section className="service-content">
          <h2 id="mortgage-overview">Protect Your Family and Your Home</h2>
          
          <div className="service-flex">
            <div className="service-text">
              <h3>What is Mortgage Life Insurance?</h3>
              <p>
                Mortgage life insurance is a specialized policy that ensures your mortgage will be paid off 
                if you pass away. It provides peace of mind knowing that your family can keep their home 
                even in challenging circumstances.
              </p>
              
              <div className="highlight-box">
                <p>
                  Your home is likely your biggest investment. But what happens if you become critically ill, 
                  suffer an accident, or pass away? Would your family manage the mortgage payments? 
                  Mortgage insurance helps protect your family from these uncertainties.
                </p>
              </div>
            </div>
            
            <div className="service-image">
              <ImageOptimizer 
                src={mortgageImage} 
                alt="Family in front of their protected home" 
                width={400} 
                height={300}
                loading="eager" 
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-content">
          <h2 id="mortgage-benefits">Coverage Benefits</h2>
          
          <div className="service-flex service-flex-reverse">
            <div className="service-image">
              <ImageOptimizer 
                src={homeProtectionImage} 
                alt="Home protection coverage illustration" 
                width={400} 
                height={300}
                loading="lazy"
              />
            </div>
            
            <div className="service-text">
              <h3>What's Covered?</h3>
              <ul>
                <li><strong>Full Principal Coverage</strong> - Your entire outstanding mortgage amount</li>
                <li><strong>Interest Protection</strong> - Up to five years of accrued interest</li>
                <li><strong>Tax Account Balance</strong> - Coverage for any debit balance</li>
                <li><strong>Early Payout Option</strong> - Available for diagnosed terminal illness</li>
                <li><strong>Immediate Protection</strong> - Coverage starts from mortgage approval date</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="service-content">
          <h2 id="insurance-comparison">Mortgage vs. Individual Life Insurance</h2>
          
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Mortgage Insurance</th>
                  <th>Individual Life Insurance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coverage Amount</td>
                  <td>Declines with mortgage</td>
                  <td>Stays constant</td>
                </tr>
                <tr>
                  <td>Beneficiary</td>
                  <td>Bank/Lender</td>
                  <td>Your choice</td>
                </tr>
                <tr>
                  <td>Transferability</td>
                  <td>Not transferrable</td>
                  <td>Fully transferrable</td>
                </tr>
                <tr>
                  <td>Joint Coverage</td>
                  <td>Ends with first claim</td>
                  <td>Can continue for surviving spouse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="service-content">
          <div className="service-faq">
            <h3>Common Questions</h3>
            
            <div className="faq-item">
              <h4>When should I get mortgage insurance?</h4>
              <p>Ideally, you should secure mortgage insurance when you're approved for your mortgage. This ensures protection from day one of homeownership.</p>
            </div>
            
            <div className="faq-item">
              <h4>How much coverage do I need?</h4>
              <p>Coverage typically matches your mortgage amount, though you may be eligible for partial coverage on mortgages over $500,000.</p>
            </div>
            
            <div className="faq-item">
              <h4>Can I have both mortgage and life insurance?</h4>
              <p>Yes, you can have both. Many financial advisors recommend considering term life insurance alongside or instead of mortgage insurance for more flexibility.</p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="service-contact">
        <h2>Protect Your Home Investment</h2>
        <p>Let our advisors help you choose the right mortgage protection strategy for your family.</p>
        <div className="service-buttons">
          <Link to="/select-slot" className="btn service-btn" aria-label="Schedule a mortgage insurance consultation">
            Get Protected Today
          </Link>
          <Link to="/contact" className="btn service-btn-outline" aria-label="Contact us about mortgage insurance">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MortgageService;