import { useState } from 'react';
import { FaArrowDown, FaCalendarCheck, FaShieldAlt, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import AppointmentForm from '../forms/AppointmentForm';

const Hero = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleProceed = (userDetails) => {
        navigate('/select-slot', { state: { userDetails } });
    };

    return (
        <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" role="banner">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                    Financial Planning for Families
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Invest with Confidence!
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-100 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Give your kids a head start and secure your children's financial future today with our expert guidance and personalized investment strategies.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <button 
                        className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                        onClick={() => setShowForm(true)}
                        aria-label="Book your free consultation now"
                    >
                        <FaCalendarCheck /> Book Free Consultation
                    </button>
                    <Link 
                        to="/services"
                        className="btn-outline-primary border-white text-white hover:bg-white hover:text-primary-600 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <FaShieldAlt /> Explore Services
                    </Link>
                </div>
            </div>

            <ScrollLink 
                to="services"
                smooth={true} 
                duration={800} 
                offset={-80}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group animate-bounce text-white/80 hover:text-white transition-colors duration-300"
                aria-label="Scroll down to services section"
            >
                <span className="text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Learn More</span>
                <FaArrowDown size={24} />
            </ScrollLink>

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
        </div>
    );
};

export default Hero;
