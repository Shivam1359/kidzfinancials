import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import respImage from "../../assets/img1.jpeg";
import rrspImage from "../../assets/img2.jpg";
import ImageOptimizer from "../../components/common/ImageOptimizer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";

const RRSPService = () => {
  const [contentReady, setContentReady] = useState(false);

  // Handle page initialization
  useEffect(() => {
    window.scrollTo(0, 0);
    // Setting content ready immediately as Tailwind should handle styles better
    // Remove the CSS preloading and timeout logic
    setContentReady(true);
  }, []);

  // Show loading spinner if needed (though likely unnecessary with Tailwind)
  if (!contentReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Reusable section padding
  const sectionPadding = "py-12 md:py-16";
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-white text-neutral-700">
      <SEO 
        title="RRSP & RESP Saving Plans" 
        description="Learn about RRSP and RESP saving plans. KidzFinancials helps you maximize tax benefits and secure your family's financial future through personalized planning."
      />
      
      {/* Header Section - Adjusted Styling */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={`${containerClass} text-left`}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">RRSP & RESP Saving Plans</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                {/* Link to services overview page if it exists */}
                <Link to="/services" className="hover:text-primary-600">Services</Link> 
                <span className="mx-2">/</span>
                <span className="text-neutral-700">RRSP & RESP Plans</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* RRSP Section */}
        <section id="rrsp-section" className={`${sectionPadding} border-b border-neutral-200`}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Registered Retirement Savings Plan (RRSP)</h2>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">What is an RRSP?</h3>
              <p className="mb-6 leading-relaxed">
                A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account designed to help Canadians save for retirement. 
                Contributions to an RRSP are tax-deductible, meaning you can reduce your taxable income for the year. 
                The investments within your RRSP grow tax-free until withdrawal, typically during retirement when you may be in a lower tax bracket.
              </p>
              
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">Key Benefits of RRSPs</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                <li><strong>Tax Deductions:</strong> Reduce your current income tax.</li>
                <li><strong>Tax-Deferred Growth:</strong> Investments grow tax-free inside the RRSP.</li>
                <li><strong>Income Splitting:</strong> Options for spousal RRSPs.</li>
                <li><strong>Home Buyers&apos; Plan:</strong> Withdraw funds tax-free for your first home.</li>
                <li><strong>Lifelong Learning Plan:</strong> Use funds for education.</li>
              </ul>
               <Link to="/select-slot" className="btn-primary inline-block" aria-label="Schedule a consultation for RRSP planning">
                 Schedule RRSP Consultation
               </Link>
            </div>
            
            {/* Image */}
            <div className="order-1 md:order-2">
              <ImageOptimizer 
                src={rrspImage} 
                alt="A person reviewing retirement investment documents" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                width={500} // Adjust dimensions as needed
                height={400}
                loading="eager" // Load RRSP image eagerly as it might be higher up
              />
            </div>
          </div>
        </section>

        {/* RESP Section */}
        <section id="resp-section" className={`${sectionPadding} border-b border-neutral-200`}>
           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
             {/* Image */}
             <div className="order-1">
               <ImageOptimizer 
                 src={respImage} 
                 alt="Parents planning education savings with their child" 
                 className="rounded-lg shadow-md w-full h-auto object-cover"
                 width={500}
                 height={400}
                 loading="lazy" // Lazy load RESP image
               />
             </div>
             
             {/* Text Content */} 
             <div className="order-2">
               <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Registered Education Savings Plan (RESP)</h2>
               <h3 className="text-xl font-semibold text-neutral-700 mb-3">What is an RESP?</h3>
               <p className="mb-6 leading-relaxed">
                 A Registered Education Savings Plan (RESP) is a tax-sheltered investment account that helps parents save for their children&apos;s 
                 post-secondary education. The Canadian government offers grants to boost your contributions, making RESPs one of the most 
                 effective ways to save for education expenses.
               </p>
               
               <h3 className="text-xl font-semibold text-neutral-700 mb-3">Key Benefits of RESPs</h3>
               <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-600">
                 <li><strong>Government Grants (CESG):</strong> Receive up to 20% match on contributions.</li>
                 <li><strong>Tax-Deferred Growth:</strong> Investments grow tax-free.</li>
                 <li><strong>Canada Learning Bond:</strong> Additional funds for eligible families.</li>
                 <li><strong>Flexibility:</strong> Use funds for various education expenses.</li>
                 <li><strong>Transferability:</strong> Options if the child doesn&apos;t pursue post-secondary.</li>
               </ul>
                <Link to="/select-slot" className="btn-primary inline-block" aria-label="Open an RESP account">
                  Open an RESP
                </Link>
             </div>
           </div>
        </section>

        {/* How We Help Section */}
        <section id="our-services" className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-4 text-center">How We Help</h2>
          <p className="text-center max-w-2xl mx-auto text-neutral-600 mb-10">
              At Kidzfinancials, we provide comprehensive guidance for both RRSP and RESP planning:
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ // Array for cards data
                  { title: "Personalized Planning", text: "Custom saving strategies based on your goals.", icon: "💡" },
                  { title: "Investment Selection", text: "Choosing the right mix to optimize growth.", icon: "📈" },
                  { title: "Tax Optimization", text: "Maximizing tax benefits and government grants.", icon: "💰" },
                  { title: "Regular Reviews", text: "Ensuring plans stay aligned with your needs.", icon: "🔄" },
              ].map((card, index) => (
                  <div key={index} className="bg-primary-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="text-4xl mb-4">{card.icon}</div> {/* Placeholder icon */} 
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
            {[ // Array for FAQ data
                { q: "What&apos;s the RRSP contribution deadline?", a: "The RRSP contribution deadline for the tax year is typically 60 days into the following calendar year (usually March 1st or February 29th in a leap year)." },
                { q: "How much can I contribute to an RESP?", a: "The lifetime contribution limit for an RESP is $50,000 per beneficiary. There is no annual contribution limit, but to maximize CESG grants, consider contributing $2,500 annually." },
                { q: "Can I have both an RRSP and an RESP?", a: "Yes, you can contribute to both plans. Many parents balance their retirement savings with education savings for their children." },
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
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Ready to Start Saving?</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Our financial advisors are here to help you navigate RRSP and RESP options for a secure financial future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Book a consultation with our advisors">
                    Book a Consultation
                </Link>
                <Link 
                    to="/contact"
                    className="btn-outline-primary border-secondary-500 text-secondary-600 hover:bg-secondary-200/50" 
                    aria-label="Contact us for more information"
                >
                    Contact Us
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RRSPService;