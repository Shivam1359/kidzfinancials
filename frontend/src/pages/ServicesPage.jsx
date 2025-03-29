import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
// Assuming you might want a Title component if available, otherwise manage headings directly
// import Title from '../components/common/Title'; 

// Data for the service cards - could be moved to a separate file or fetched later
const services = [
  { 
    title: 'Life Insurance', 
    description: "Protect your loved ones' future with comprehensive life insurance coverage tailored to your needs.", 
    link: '/services/insurance', 
    icon: '🛡️' // Replace with appropriate icon or image component if needed
  },
  { 
    title: 'RRSP & RESP Plans', 
    description: 'Save effectively for retirement and education goals with tax-advantaged RRSP and RESP accounts.', 
    link: '/services/rrsp-resp', 
    icon: '💰' 
  },
  { 
    title: 'Retirement Planning', 
    description: 'Build a secure financial future with personalized retirement planning strategies and investment advice.', 
    link: '/services/retirement', 
    icon: '🏖️' 
  },
  { 
    title: 'Mortgage Insurance', 
    description: 'Safeguard your home investment and protect your family with reliable mortgage insurance options.', 
    link: '/services/mortgage', 
    icon: '🏠' 
  },
   { 
    title: 'Tax Planning', 
    description: 'Minimize your tax burden and maximize savings through strategic, year-round tax planning.', 
    link: '/services/tax-planning', 
    icon: '📊' 
  },
  { 
    title: 'Personal Loans', 
    description: 'Access flexible funding options for debt consolidation, major purchases, or unexpected expenses.', 
    link: '/services/personal-loan', 
    icon: '💸' 
  },
];

// FAQ data
const faqs = [
  { 
    q: "Why is financial planning important?", 
    a: "Financial planning provides a roadmap to achieve your life goals, such as buying a home, retiring comfortably, or funding education. It helps you manage income, expenses, and investments effectively, ensuring financial security and peace of mind." 
  },
  { 
    q: "How do I know which financial service is right for me?", 
    a: "The right service depends on your individual circumstances, goals, and risk tolerance. We recommend scheduling a consultation with one of our advisors who can assess your needs and recommend the most suitable solutions." 
  },
  { 
    q: "What should I bring to a financial consultation?", 
    a: "It's helpful to bring information about your income, expenses, assets (like savings and investments), liabilities (like loans and mortgages), and any specific financial goals you have in mind. The more information you provide, the better we can assist you." 
  },
   { 
    q: "How often should I review my financial plan?", 
    a: "We recommend reviewing your financial plan at least annually, or whenever significant life changes occur (e.g., marriage, new job, birth of a child, retirement). Regular reviews ensure your plan stays aligned with your evolving goals and market conditions." 
  },
];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reusable styling constants from other service pages
  const sectionPadding = "py-12 md:py-16";
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-white text-neutral-700">
      <SEO 
        title="Our Financial Services" 
        description="Explore KidzFinancials' comprehensive range of financial services including insurance, RRSP, RESP, retirement planning, mortgage insurance, tax planning, and personal loans." 
      />
      
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">Our Services</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Services</span>
            </nav>
        </div>
      </div>
      
      <div className={containerClass}>
        {/* Introduction Section */}
        <section id="services-intro" className={`${sectionPadding} border-b border-neutral-200 text-center`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-4">Your Partner in Financial Well-being</h2>
          <p className="max-w-3xl mx-auto text-neutral-600 mb-8 leading-relaxed">
            Whether you&apos;re starting your financial journey, planning for major life events, or securing your future, 
            KidzFinancials offers tailored solutions. Explore our comprehensive suite of services designed to empower 
            your financial decisions and help you achieve your goals with confidence.
          </p>
        </section>

        {/* Services Grid Section */}
        <section id="service-cards" className={`${sectionPadding} border-b border-neutral-200`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-10 text-center">Explore What We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.link} 
                className="block bg-white border border-neutral-200 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 text-primary-600">{service.icon}</div> 
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors duration-300">{service.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
                <span className="text-sm font-medium text-primary-600 group-hover:underline">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${sectionPadding}`}>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
                 <details key={index} className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg cursor-pointer group transition-colors hover:bg-neutral-100">
                     <summary className="font-semibold text-neutral-700 list-none flex justify-between items-center group-hover:text-neutral-800">
                         {faq.q}
                         <span className="ml-2 text-primary-600 transition-transform duration-300 group-open:rotate-180">▼</span>
                     </summary>
                     <p className="mt-3 text-neutral-600 text-sm leading-relaxed">
                         {faq.a}
                     </p>
                 </details>
            ))}
          </div>
        </section>
      </div> 
      
      {/* Final CTA Section (Consistent with other service pages) */}
      <div className="bg-secondary-100 py-16 text-center">
        <div className={containerClass}>
            <h2 className="text-3xl font-semibold text-secondary-800 mb-4">Ready to Take the Next Step?</h2>
            <p className="text-secondary-700 max-w-xl mx-auto mb-8">
                Let our expert advisors guide you towards the right financial solutions. Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a consultation">
                    Schedule a Consultation
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

export default ServicesPage; 