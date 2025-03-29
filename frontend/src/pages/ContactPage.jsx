import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Contact from '../components/sections/Contact'; // Import the existing Contact component

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reusable styling constants 
  const sectionPadding = "py-12 md:py-16"; // Consistent padding
  const containerClass = "container mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <div className="bg-white text-neutral-700 min-h-screen">
      <SEO 
        title="Contact Us" 
        description="Get in touch with KidzFinancials. Send us a message or find our contact details. We're here to help with your financial needs."
      />
      
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200 py-10 md:py-12">
        <div className={containerClass}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-2 pt-8">Contact Us</h1>
            <nav className="text-sm text-neutral-500" aria-label="breadcrumb">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-neutral-700">Contact</span>
            </nav>
        </div>
      </div>
      
      {/* Render the Contact component section */}
      {/* Add padding around the Contact component if needed */}
      <div className={`${containerClass} ${sectionPadding}`}>
        <Contact /> 
      </div>
      
      {/* You might want a simple CTA or just let the contact form be the main focus */}
      {/* Optional: Add a simpler CTA if desired */}
      {/* <div className="bg-secondary-100 py-16 text-center"> */}
      {/*   <div className={containerClass}> */}
      {/*     <h2 className="text-3xl font-semibold text-secondary-800 mb-4">We're Ready to Listen</h2> */}
      {/*     <p className="text-secondary-700 max-w-xl mx-auto mb-8"> */}
      {/*       Reach out today and let's start planning your financial future together. */}
      {/*     </p> */}
      {/*     <Link to="/select-slot" className="btn-secondary" aria-label="Schedule a consultation"> */}
      {/*       Schedule a Consultation */}
      {/*     </Link> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

export default ContactPage; 