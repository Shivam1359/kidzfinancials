import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";
// import './InsuranceService.css'; // Remove CSS import
import lifeInsuranceImage from "../../assets/img1.jpeg"; // Corrected path
import familyInsuranceImage from "../../assets/img2.jpg"; // Corrected path

const InsuranceService = () => {
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setContentReady(true); // Assume Tailwind handles styling without FOUC
  }, []);

  if (!contentReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Reusable section padding and container class from RRSPService template
  const sectionPadding = "py-12 md:py-16";
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-white text-neutral-700">
      <SEO 
        title="Life Insurance Services" 
        description="Secure your family&apos;s future with comprehensive life insurance plans. KidzFinancials helps you choose the right coverage for your needs."
      />
      
      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">Life Insurance Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link> 
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Insurance</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* Overview Section */}
        <section id="insurance-overview" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
             {/* Text Content */}
             <div className="order-2 md:order-1">
                <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Why Life Insurance?</h2>
                <p className="mb-6 leading-relaxed">
                  Life insurance is a crucial contract that pledges payment to your beneficiaries in the event of death 
                  or at maturity. It provides certainty in uncertain times and offers financial protection for your loved ones.
                </p>
                
                <h3 className="text-xl font-semibold text-neutral-700 mb-3">Key Protection Areas</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                  <li><strong>Family Protection:</strong> Financial security for dependents.</li>
                  <li><strong>Retirement Security:</strong> Ensuring comfortable living in old age.</li>
                  <li><strong>Investment Benefits:</strong> Tax advantages and wealth accumulation.</li>
                  <li><strong>Mortgage Protection:</strong> Coverage for outstanding mortgage payments.</li>
                  <li><strong>Education Planning:</strong> Securing children&apos;s educational future.</li>
                </ul>
                <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for Insurance planning">
                  Schedule Insurance Consultation
                </Link>
            </div>
            
            {/* Image */}
             <div className="order-1 md:order-2">
               <ImageOptimizer 
                 src={lifeInsuranceImage} 
                 alt="Family protected by life insurance" 
                 className="rounded-lg shadow-md w-full h-auto object-cover"
                 width={500} 
                 height={400}
                 loading="eager" 
               />
             </div>
          </div>
        </section>

        {/* Insurance Types Section */}
        <section id="insurance-types" className={`${sectionPadding} border-b border-neutral-200`}>
           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
             {/* Image */}
             <div className="order-1">
               <ImageOptimizer 
                 src={familyInsuranceImage} 
                 alt="Different types of insurance policies" 
                 className="rounded-lg shadow-md w-full h-auto object-cover"
                 width={500}
                 height={400}
                 loading="lazy"
               />
             </div>
            
             {/* Text Content */} 
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Types of Life Insurance</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Choose Your Coverage</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Term Life Insurance:</strong> Temporary coverage, lower premiums.</li>
                <li><strong>Permanent Life Insurance:</strong> Lifetime coverage, investment components.</li>
                <li><strong>Universal Life Insurance:</strong> Flexible premiums & benefits.</li>
                <li><strong>Mortgage Life Insurance:</strong> Specific coverage for mortgage debt.</li>
              </ul>
               {/* CTA Button could go here if desired */}
            </div>
           </div>
        </section>

        {/* Benefits Section (using cards) */}
        <section id="insurance-benefits" className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-10 text-center">Insurance Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ 
                  { title: "Financial Security", text: "Protect your family&apos;s lifestyle and meet financial needs.", icon: "🛡️" },
                  { title: "Tax Advantages", text: "Benefit from tax-deferred growth and tax-free payouts.", icon: "📊" },
                  { title: "Flexible Options", text: "Choose policies and coverage amounts to suit your needs.", icon: "⚙️" },
                  { title: "Peace of Mind", text: "Rest assured knowing your loved ones are protected.", icon: "😌" },
              ].map((card, index) => (
                  <div key={index} className="bg-primary-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="text-4xl mb-4">{card.icon}</div>
                      <h3 className="text-lg font-semibold text-primary-800 mb-2">{card.title}</h3>
                      <p className="text-sm text-primary-700">{card.text}</p>
                  </div>
              ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[ 
                { q: "How much life insurance do I need?", a: "The amount depends on factors like your income, debts, dependents&apos; needs, and long-term financial goals. Our advisors can help calculate the right coverage."
                },
                { q: "What&apos;s the difference between term and permanent insurance?", a: "Term insurance provides coverage for a specific period, while permanent insurance offers lifetime coverage with additional investment features."
                },
                { q: "Can I modify my policy later?", a: "Yes, many policies offer flexibility to adjust coverage, add riders, or convert to different policy types as your needs change."
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
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Protect Your Family&apos;s Future</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Our insurance advisors are here to help you choose the right coverage for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule an insurance consultation">
                    Schedule a Consultation
                </Link>
                <Link 
                    to="/contact"
                    className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" 
                    aria-label="Contact us about insurance"
                >
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceService;