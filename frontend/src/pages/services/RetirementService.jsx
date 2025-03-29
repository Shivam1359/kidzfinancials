import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import retirementImage from "../../assets/img1.jpeg"; // Corrected extension
import planningImage from "../../assets/img2.jpg"; // Corrected path
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";

const RetirementService = () => {
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
        title="Retirement Planning Services" 
        description="Secure your future with comprehensive retirement planning. Explore RRSPs, TFSAs, and investment strategies for a comfortable retirement with KidzFinancials."
      />
      
      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">Retirement Planning Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link> 
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Retirement Planning</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* Overview Section */}
        <section id="retirement-overview" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Plan for a Comfortable Retirement</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Why Retirement Planning Matters</h3>
              <p className="mb-4 leading-relaxed">
                Retirement planning involves setting financial goals and implementing strategies to ensure you have sufficient income during your retirement years. 
                It&apos;s about making informed decisions today to enjoy financial freedom tomorrow.
              </p>
              {/* Highlight Box Styling */}
              <div className="bg-secondary-50 border-l-4 border-secondary-400 p-4 rounded-r-md mb-6">
                <p className="text-secondary-800 italic">
                  Starting early, understanding your options (like RRSPs and TFSAs), and regularly reviewing your plan are key steps towards achieving your desired retirement lifestyle.
                </p>
              </div>
               <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for Retirement Planning">
                 Start Planning Your Future
               </Link>
            </div>
            
            {/* Image */}
            <div className="order-1 md:order-2">
              <ImageOptimizer 
                src={retirementImage} 
                alt="Couple enjoying their retirement" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section id="retirement-strategies" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <ImageOptimizer 
                src={planningImage} 
                alt="Infographic showing retirement planning elements" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="lazy"
              />
            </div>
            
            {/* Text Content */} 
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Key Retirement Strategies</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Tools for Your Future</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Registered Retirement Savings Plans (RRSPs):</strong> Tax-deferred savings accounts designed for retirement.</li>
                <li><strong>Tax-Free Savings Accounts (TFSAs):</strong> Flexible savings accounts where investment income grows tax-free.</li>
                <li><strong>Pension Plans:</strong> Employer-sponsored plans (Defined Benefit or Defined Contribution).</li>
                <li><strong>Investment Portfolio Management:</strong> Strategic investing to grow your retirement nest egg.</li>
                <li><strong>Withdrawal Strategies:</strong> Planning how to access your funds efficiently in retirement (e.g., RRIFs).</li>
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
                { q: "How much do I need to save for retirement?", a: "This varies greatly based on your desired lifestyle, expected expenses, and retirement age. A financial advisor can help calculate a personalized target."
                },
                { q: "What&apos;s the difference between an RRSP and a TFSA?", a: "RRSP contributions are tax-deductible, but withdrawals in retirement are taxed. TFSA contributions are not deductible, but growth and withdrawals are tax-free."
                },
                { q: "When should I start planning for retirement?", a: "The earlier, the better! Starting early allows compound interest to work significantly in your favor, making it easier to reach your goals."
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
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Secure Your Financial Future</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Let us help you build a solid retirement plan. Connect with our expert advisors today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a retirement planning consultation">
                    Get Retirement Advice
                </Link>
                <Link to="/contact" className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" aria-label="Contact us about retirement planning">
                    Learn More
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementService; 