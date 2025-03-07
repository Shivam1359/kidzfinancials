import about_img from '../../assets/contact-img1.jpg';
import '../../components/About/About.css';
import ImageOptimizer from '../common/ImageOptimizer';

const About = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <ImageOptimizer 
                src={about_img} 
                alt="Our financial advisors helping clients" 
                className='about-img'
                width={400}
                height={300}
            />
        </div>
        <div className='about-right'>
            <h3>About Kidzfinancials</h3>
            <h2>Secure Your Future</h2>
            <p>At Kidzfinancials, we believe in building strong financial foundations for families. Our team of experts specializes in child-focused financial planning that ensures a bright future for the next generation.</p>
            <p>We offer personalized financial advice, innovative savings strategies, and educational resources that empower parents to make informed decisions about their children's financial wellbeing.</p>
        </div>
    </div>
  );
};

export default About;
