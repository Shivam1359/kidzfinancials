import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AppointmentForm from '../forms/AppointmentForm';
import logo from "/src/assets/react.svg";

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showForm) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        // Cleanup function to remove the class if component unmounts while modal is open
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showForm]); // Dependency array ensures this runs when showForm changes

    // Define paths that should have a light navbar theme immediately
    const lightThemePaths = ['/select-slot', '/services', '/contact']; // Add other paths as needed
    // Check if the current path matches one of the light theme paths
    const forceLightTheme = lightThemePaths.some(path => location.pathname.startsWith(path));

    useEffect(() => {
        const handleScroll = () => {
            // Only set sticky based on scroll if not forcing light theme
            if (!forceLightTheme) {
                setSticky(window.scrollY > 50);
            }
        };
        // Apply light theme immediately if forced
        if (forceLightTheme) {
            setSticky(true);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check in case the page loads scrolled down on a non-light theme path
        if (!forceLightTheme && window.scrollY > 50) {
          setSticky(true);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, forceLightTheme]); // Re-run effect if path changes

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMobileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    const handleLogoClick = () => {
        navigate('/');
        setMobileMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const closeMenu = () => setMobileMenu(false);

    // Added handleProceed function for modal navigation
    const handleProceed = (userDetails) => {
        setShowForm(false); // Close modal on proceed
        navigate('/select-slot', { state: { userDetails } });
    };

    // Define base styles
    const linkBaseStyle = "block py-2 px-3 md:p-0 rounded transition-colors duration-200";
    
    // Define styles for STICKY state
    const stickyLinkDefault = "text-neutral-700 hover:text-primary-500";
    const stickyLinkActive = "text-primary-600 font-semibold";
    
    // Define styles for NON-STICKY state (on Hero)
    const nonStickyLinkDefault = "text-white hover:text-secondary-200"; // Hover uses light amber
    const nonStickyLinkActive = "text-secondary-300 font-semibold"; // Active uses light amber

    // Determine if the navbar should use the sticky/light appearance
    const useLightAppearance = sticky || forceLightTheme;

    // Combine base style with state-specific styles
    const getLinkStyle = (isActive = false, isMobile = false) => {
        let stateStyle;
        // Use light appearance styles if sticky OR on a light theme path
        if (useLightAppearance) {
            stateStyle = isActive ? stickyLinkActive : stickyLinkDefault;
        } else {
            stateStyle = isActive ? nonStickyLinkActive : nonStickyLinkDefault;
        }
        // Apply larger text size for mobile if needed, though base style might be sufficient
        return `${linkBaseStyle} ${stateStyle} ${isMobile ? 'text-lg' : ''}`;
    };

    return (
        <>
            <nav 
                ref={navRef}
                role="navigation"
                aria-label="Main navigation"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                    useLightAppearance 
                        ? 'bg-white/90 backdrop-blur-sm shadow-md' 
                        : 'bg-gradient-to-b from-black/10 to-transparent'
                } ${useLightAppearance ? 'text-neutral-800' : 'text-white'}`}
            >
                <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
                    <img 
                        src={logo} 
                        alt="KidzFinancials Logo" 
                        className='h-10 w-auto cursor-pointer transition-transform duration-300 hover:scale-105'
                        onClick={handleLogoClick}
                        width="180"
                        height="40"
                    />

                    <button 
                        type="button"
                        onClick={toggleMenu} 
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-current hover:bg-neutral-100/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition duration-150 ease-in-out"
                        aria-controls="mobile-menu" 
                        aria-expanded={mobileMenu}
                        aria-label={mobileMenu ? "Close main menu" : "Open main menu"}
                    >
                        {mobileMenu ? (
                            <HiX className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <HiMenu className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>

                    <div className={`w-full md:block md:w-auto ${mobileMenu ? 'block' : 'hidden'}`} id="mobile-menu">
                        <ul className={`flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ${mobileMenu ? 'items-start px-2 pb-3 pt-2 space-y-1 bg-white/95 dark:bg-neutral-800/95 rounded-md shadow-lg text-neutral-800 dark:text-white' : 'items-center'}`}>
                            <li>
                                <RouterLink 
                                    to="/" 
                                    onClick={closeMenu}
                                    className={getLinkStyle(location.pathname === '/', mobileMenu)}
                                    aria-current={location.pathname === '/' ? 'page' : undefined}
                                >
                                    Home
                                </RouterLink>
                            </li>
                            
                            {location.pathname === '/' ? (
                                <>
                                    <li><ScrollLink to='services' smooth={true} offset={-80} duration={500} onClick={closeMenu} className={getLinkStyle(false, mobileMenu)} role="button">Services</ScrollLink></li>
                                    <li><ScrollLink to='about' smooth={true} offset={-80} duration={500} onClick={closeMenu} className={getLinkStyle(false, mobileMenu)} role="button">About Us</ScrollLink></li>
                                    <li><ScrollLink to='blogs' smooth={true} offset={-80} duration={500} onClick={closeMenu} className={getLinkStyle(false, mobileMenu)} role="button">Blogs</ScrollLink></li>
                                </>
                            ) : (
                                <li>
                                    <RouterLink 
                                        to="/#services"
                                        onClick={closeMenu}
                                        className={getLinkStyle(false, mobileMenu)}
                                    >
                                        Services
                                    </RouterLink>
                                </li>
                            )}

                            <li>
                                {location.pathname === '/' ? (
                                    <ScrollLink 
                                        to='contact' 
                                        smooth={true} 
                                        offset={-80} 
                                        duration={500} 
                                        onClick={closeMenu} 
                                        className={`btn-primary ${mobileMenu ? 'w-full text-center' : ''}`}
                                        role="button"
                                    >
                                        Contact us
                                    </ScrollLink>
                                ) : (
                                    <RouterLink 
                                        to="/#contact"
                                        onClick={closeMenu} 
                                        className={`btn-primary ${mobileMenu ? 'w-full text-center' : ''}`}
                                        role="button"
                                    >
                                        Contact us
                                    </RouterLink>
                                )}
                            </li>
                            <li>
                                {/* Changed RouterLink to button to trigger modal */}
                                <button 
                                    onClick={() => { 
                                        closeMenu(); 
                                        setShowForm(true); 
                                    }}
                                    className={`btn-secondary ${mobileMenu ? 'w-full text-center mt-2' : 'ml-4'}`}
                                    role="button"
                                >
                                    Book Now
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Moved Appointment Modal Outside Nav - Matching Hero styles */}
            {showForm && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm'> 
                    <div className='bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full relative transform transition-all animate-slide-up'> 
                        <button 
                            className='absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors' 
                            onClick={() => setShowForm(false)}
                            aria-label="Close appointment form"
                        >
                            <FaTimes size={20}/>
                        </button>
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">Book Your Appointment</h2>
                        <AppointmentForm onProceed={handleProceed} /> 
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
