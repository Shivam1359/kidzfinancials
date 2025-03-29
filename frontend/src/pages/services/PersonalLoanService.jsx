import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import personalLoanImage from "../../assets/img1.jpeg"; // Corrected extension
import loanOptionsImage from "../../assets/img2.jpg"; // Corrected path
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";

const PersonalLoanService = () => {
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setContentReady(true);
  }, []);

  if (!contentReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Reusable section padding and container class
  const sectionPadding = "py-12 md:py-16";
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-white text-neutral-700">
      <SEO 
        title="Personal Loan Services" 
        description="Explore flexible personal loan options for various needs, from debt consolidation to major purchases. Find competitive rates at KidzFinancials."
      />
      
      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">Personal Loan Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link> 
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Personal Loans</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* Overview Section */}
        <section id="loan-overview" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Flexible Funding for Your Goals</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">What is a Personal Loan?</h3>
              <p className="mb-4 leading-relaxed">
                A personal loan provides a lump sum of money that you can use for almost any purpose. 
                You repay the loan, plus interest, in fixed monthly installments over a set period. 
                They offer flexibility for consolidating debt, financing large purchases, or covering unexpected expenses.
              </p>
              {/* Highlight Box Styling */}
              <div className="bg-secondary-50 border-l-4 border-secondary-400 p-4 rounded-r-md mb-6">
                <p className="text-secondary-800 italic">
                  Whether you&apos;re planning a home renovation, managing medical bills, or simplifying your finances, a personal loan can provide the necessary funds with predictable payments.
                </p>
              </div>
               <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for Personal Loans">
                 Explore Loan Options
               </Link>
            </div>
            
            {/* Image */}
            <div className="order-1 md:order-2">
              <ImageOptimizer 
                src={personalLoanImage} 
                alt="Illustration of personal loan usage scenarios" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Uses Section */}
        <section id="loan-uses" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <ImageOptimizer 
                src={loanOptionsImage} 
                alt="Icons representing different personal loan uses" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="lazy"
              />
            </div>
            
            {/* Text Content */} 
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Common Uses for Personal Loans</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">How Can You Use It?</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Debt Consolidation:</strong> Combine multiple high-interest debts into one lower-interest payment.</li>
                <li><strong>Home Improvements:</strong> Finance renovations, repairs, or upgrades to your home.</li>
                <li><strong>Major Purchases:</strong> Cover costs for vehicles, appliances, or other large items.</li>
                <li><strong>Medical Expenses:</strong> Manage unexpected healthcare bills or planned procedures.</li>
                <li><strong>Life Events:</strong> Fund weddings, vacations, or other significant personal events.</li>
              </ul>
              {/* Optional CTA Button */}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[ 
                { q: "What credit score do I need for a personal loan?", a: "Requirements vary by lender, but generally, a good credit score (typically 670+) improves your chances of approval and getting a lower interest rate."
                },
                { q: "What&apos;s the difference between secured and unsecured loans?", a: "Secured loans require collateral (like a car or savings account), while unsecured loans do not. Most personal loans are unsecured."
                },
                { q: "How quickly can I get funds from a personal loan?", a: "Funding times vary, but many online lenders can approve and disburse funds within a few business days, sometimes even sooner."
                },
            ].map((faq, index) => (
                 <details key={index} className="bg-neutral-100 p-4 rounded-lg cursor-pointer group">
                     <summary className="font-semibold text-neutral-700 list-none flex justify-between items-center">
                         {faq.q}
                         <span className="ml-2 transition-transform duration-300 group-open:rotate-180">▼</span>
                     </summary>
                     <p className="mt-3 text-neutral-600 text-sm leading-relaxed">
                         {faq.a}
                     </p>
                 </details>
            ))}
          </div>
        </section>
      </div> 
      
      {/* Final CTA Section */}
      <div className="bg-secondary-100 py-16 text-center">
        <div className={containerClass}>
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Ready to Achieve Your Financial Goals?</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Find the personal loan that fits your needs. Talk to our advisors today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a personal loan consultation">
                    Apply for a Loan
                </Link>
                <Link 
                    to="/contact"
                    className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" 
                    aria-label="Contact us about personal loans"
                >
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanService; 