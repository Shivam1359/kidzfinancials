import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
// import './MortgageService.css'; // Remove CSS import
import mortgageImage from "../../assets/img1.jpeg"; // Corrected extension
import homeProtectionImage from "../../assets/img2.jpg"; // Corrected path

const MortgageService = () => {
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
        title="Mortgage Insurance Services" 
        description="Protect your home and family with comprehensive mortgage insurance. Learn about flexible coverage options and benefits at KidzFinancials."
      />
      
      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">Mortgage Insurance Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link> 
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Mortgage Insurance</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* Overview Section */}
        <section id="mortgage-overview" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Protect Your Family and Your Home</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">What is Mortgage Life Insurance?</h3>
              <p className="mb-4 leading-relaxed">
                Mortgage life insurance is a specialized policy that ensures your mortgage will be paid off 
                if you pass away. It provides peace of mind knowing that your family can keep their home 
                even in challenging circumstances.
              </p>
              {/* Highlight Box Styling */}
              <div className="bg-secondary-50 border-l-4 border-secondary-400 p-4 rounded-r-md mb-6">
                <p className="text-secondary-800 italic">
                  Your home is likely your biggest investment. Mortgage insurance helps protect your family from uncertainties like critical illness, accidents, or death, ensuring they can manage mortgage payments.
                </p>
              </div>
              <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for Mortgage Insurance">
                 Get Mortgage Protection Advice
               </Link>
            </div>
            
            {/* Image */}
            <div className="order-1 md:order-2">
              <ImageOptimizer 
                src={mortgageImage} 
                alt="Family in front of their protected home" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="mortgage-benefits" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <ImageOptimizer 
                src={homeProtectionImage} 
                alt="Home protection coverage illustration" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="lazy"
              />
            </div>
            
            {/* Text Content */} 
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Coverage Benefits</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">What&apos;s Covered?</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Full Principal Coverage:</strong> Your entire outstanding mortgage amount.</li>
                <li><strong>Interest Protection:</strong> Up to five years of accrued interest.</li>
                <li><strong>Tax Account Balance:</strong> Coverage for any debit balance.</li>
                <li><strong>Early Payout Option:</strong> Available for diagnosed terminal illness.</li>
                <li><strong>Immediate Protection:</strong> Coverage starts from mortgage approval date.</li>
              </ul>
              {/* Optional CTA Button */}
            </div>
          </div>
        </section>

        {/* Comparison Section - Styling the table */}
        <section id="insurance-comparison" className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">Mortgage vs. Individual Life Insurance</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-neutral-600">
              <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
                <tr>
                  <th scope="col" className="py-3 px-6">Feature</th>
                  <th scope="col" className="py-3 px-6">Mortgage Insurance</th>
                  <th scope="col" className="py-3 px-6">Individual Life Insurance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">Coverage Amount</td>
                  <td className="py-4 px-6">Declines with mortgage</td>
                  <td className="py-4 px-6">Stays constant</td>
                </tr>
                <tr className="bg-white border-b hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">Beneficiary</td>
                  <td className="py-4 px-6">Bank/Lender</td>
                  <td className="py-4 px-6">Your choice</td>
                </tr>
                <tr className="bg-white border-b hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">Transferability</td>
                  <td className="py-4 px-6">Not transferrable</td>
                  <td className="py-4 px-6">Fully transferrable</td>
                </tr>
                <tr className="bg-white hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">Joint Coverage</td>
                  <td className="py-4 px-6">Ends with first claim</td>
                  <td className="py-4 px-6">Can continue for surviving spouse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">Common Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[ 
                { q: "When should I get mortgage insurance?", a: "Ideally, secure mortgage insurance upon mortgage approval for immediate protection."
                },
                { q: "How much coverage do I need?", a: "Typically matches your mortgage amount. Partial coverage might be available for larger mortgages."
                },
                { q: "Can I have both mortgage and life insurance?", a: "Yes. Many advisors suggest term life insurance for its flexibility alongside or instead of mortgage insurance."
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
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Protect Your Home Investment</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Let our advisors help you choose the right mortgage protection strategy for your family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a mortgage insurance consultation">
                    Get Protected Today
                </Link>
                <Link 
                    to="/contact"
                    className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" 
                    aria-label="Contact us about mortgage insurance"
                >
                    Learn More
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageService;