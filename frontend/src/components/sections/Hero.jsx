import { Link } from 'react-router-dom';
import '../../components/Hero/Hero.css';

const Hero = () => {
    return (
        <div className="hero container" role="banner">
            <div className="hero-text">
                <h1>Invest with Confidence!!</h1>
                <p>Give your kids a head start and secure your kids' future today.</p>
                <Link to="/select-slot" className="btn" aria-label="Book your free consultation now">
                    Book Your Free Consultation Now
                </Link>
            </div>
        </div>
    );
};

export default Hero;
