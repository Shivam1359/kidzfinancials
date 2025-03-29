import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import taxImage from "../../assets/img1.jpeg"; // Corrected extension
import savingsImage from "../../assets/img2.jpg"; // Corrected path
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";

const TaxPlanningService = () => {
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
        title="Tax Planning Services"
        description="Minimize your tax burden and maximize savings with strategic tax planning. Explore deductions, credits, and tax-efficient investment strategies at KidzFinancials."
      />

      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2">Tax Planning Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/services" className="hover:text-primary-600">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Tax Planning</span>
            </nav>
        </div>
      </div>

      <div className={containerClass}>
        {/* Overview Section */}
        <section id="tax-overview" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Minimize Your Tax Liability</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">What is Tax Planning?</h3>
              <p className="mb-4 leading-relaxed">
                Tax planning is the analysis of your financial situation to ensure maximum tax efficiency.
                It involves understanding and utilizing available deductions, credits, and tax-advantaged accounts to legally reduce the amount of tax you pay.
              </p>
              {/* Highlight Box Styling */}
              <div className="bg-secondary-50 border-l-4 border-secondary-400 p-4 rounded-r-md mb-6">
                <p className="text-secondary-800 italic">
                  Effective tax planning is a year-round process, not just something done at tax time. Strategic decisions can significantly impact your overall financial health.
                </p>
              </div>
               <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for Tax Planning">
                 Optimize Your Tax Strategy
               </Link>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2">
              <ImageOptimizer
                src={taxImage}
                alt="Illustration representing tax planning and savings"
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Strategies Section */}
        <section id="tax-strategies" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="order-1">
              <ImageOptimizer
                src={savingsImage}
                alt="Charts showing tax savings potential"
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500}
                height={400}
                loading="lazy"
              />
            </div>

            {/* Text Content */}
            <div className="order-2">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Key Tax Planning Strategies</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Ways to Save</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Maximizing Deductions:</strong> Identifying all eligible expenses (e.g., RRSP contributions, childcare, medical).</li>
                <li><strong>Claiming Credits:</strong> Utilizing tax credits available to you (e.g., tuition, disability, charitable donations).</li>
                <li><strong>Tax-Advantaged Accounts:</strong> Leveraging RRSPs, TFSAs, and RESPs for tax-efficient growth.</li>
                <li><strong>Income Splitting:</strong> Strategies to shift income to family members in lower tax brackets (where applicable).</li>
                <li><strong>Investment Location:</strong> Placing investments strategically between taxable and tax-advantaged accounts.</li>
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
                { q: "Is tax planning only for high-income earners?", a: "No! Everyone who pays taxes can benefit from tax planning. Even small adjustments can lead to significant savings over time."
                },
                { q: "What&apos;s the difference between tax planning and tax preparation?", a: "Tax preparation focuses on accurately filing your return based on past events. Tax planning is proactive and focuses on future strategies to minimize taxes."
                },
                { q: "Can I do my own tax planning?", a: "While you can research strategies, tax laws can be complex. A financial advisor or tax professional can provide personalized advice based on your specific situation."
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
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Keep More of Your Hard-Earned Money</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Discover tax-saving opportunities with our expert planning services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a tax planning consultation">
                    Get Tax Advice
                </Link>
                <Link to="/contact" className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" aria-label="Contact us about tax planning">
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaxPlanningService; 