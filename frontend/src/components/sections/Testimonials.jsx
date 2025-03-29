import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import '../../components/Testimonials/Testimonials.css';

const testimonialData = [
  {
    id: 1,
    name: "Samantha Brown",
    role: "Parent of 2",
    text: "KidzFinancials has completely changed the way we plan for our children's future. Their advisors took the time to understand our unique situation and created a plan that truly works for us.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Parent of 3",
    text: "I've been working with KidzFinancials for over a year now, and I'm already seeing incredible progress in our savings plan. Their expertise in RESP planning has been invaluable.",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "New Parent",
    text: "As new parents, we were overwhelmed with financial planning. KidzFinancials made everything simple and clear. Now we feel confident about our baby's financial future.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Clients Say</h2>
          <p>Real stories from real families who have secured their children's financial future with us</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonialData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <div className="testimonial-content">
                <p>{testimonial.text}</p>
              </div>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 