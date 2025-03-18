import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../components/Hero/Hero.css';
import AppointmentForm from '../forms/AppointmentForm';

const Hero = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleProceed = (userDetails) => {
        navigate('/select-slot', { state: { userDetails } });
    };

    return (
        <div className="hero container" role="banner">
            <div className="hero-text">
                <h1>Invest with Confidence!!</h1>
                <p>Give your kids a head start and secure your kids' future today.</p>
                <button 
                    className="btn" 
                    onClick={() => setShowForm(true)}
                    aria-label="Book your free consultation now"
                >
                    Book Your Free Consultation Now
                </button>
            </div>

            {showForm && (
                <div className='appointment-overlay'>
                    <div className='appointment-popup'>
                        <button className='close-btn' onClick={() => setShowForm(false)}>×</button>
                        <h2>Book Your Appointment</h2>
                        <AppointmentForm onProceed={handleProceed} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
