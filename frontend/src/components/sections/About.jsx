import about_img from '../../assets/contact-img1.jpg';
import ImageOptimizer from '../common/ImageOptimizer';

const About = () => {
  return (
    // Section container with padding
    <div className='py-12 md:py-16'> 
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Grid layout for two columns */}
        <div className='grid md:grid-cols-2 gap-8 md:gap-12 items-center'>
            {/* Left column: Image */}
            <div className='order-1'>
                <ImageOptimizer 
                    src={about_img} 
                    alt="KidzFinancials team discussing financial planning"
                    className='rounded-lg shadow-md w-full h-auto object-cover' // Tailwind classes for styling
                    width={500} // Adjusted for better layout
                    height={400}
                    loading="lazy"
                />
            </div>
            {/* Right column: Text Content */}
            <div className='order-2'>
                {/* Subtitle */}
                <h3 className="text-lg font-semibold text-primary-600 mb-2">About Kidzfinancials</h3>
                {/* Main Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Secure Your Future</h2>
                {/* Paragraphs */}
                <p className="text-neutral-600 leading-relaxed mb-4">
                    At Kidzfinancials, we believe in building strong financial foundations for families. Our team of experts specializes in child-focused financial planning that ensures a bright future for the next generation.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                    We offer personalized financial advice, innovative savings strategies, and educational resources that empower parents to make informed decisions about their children&apos;s financial wellbeing.
                </p>
                {/* Optional CTA Button (Example) */}
                {/* 
                <Link to="/contact" className="btn-primary mt-6 inline-block">
                    Learn More About Us
                </Link> 
                */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
