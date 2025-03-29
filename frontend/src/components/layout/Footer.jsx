import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define reusable styles for social icons
  const socialIconStyle = "text-neutral-500 hover:text-primary-500 transition-colors duration-200";

  return (
    <footer className='bg-neutral-100 border-t border-neutral-200 mt-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Copyright Info */}
          <div className='text-center md:text-left text-sm text-neutral-600'>
            <p>&copy; {currentYear} KidzFinancials - All Rights Reserved.</p>
            <p>® Registered Trademark for Humble Offer Inc.</p> 
          </div>

          {/* Footer Links */}
          <nav className='flex gap-x-6 gap-y-2 flex-wrap justify-center'>
            {/* Replace '#' with actual paths if they exist */}
            <Link to="/terms" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">Terms of Services</Link>
            <Link to="/privacy" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">Privacy Policy</Link>
            {/* Add other footer links as needed */}
          </nav>

          {/* Social Icons */}
          <div className='flex gap-4'>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className={socialIconStyle}> <FaFacebook size={22} /> </a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className={socialIconStyle}> <FaTwitter size={22} /> </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className={socialIconStyle}> <FaInstagram size={22} /> </a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className={socialIconStyle}> <FaLinkedin size={22} /> </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
