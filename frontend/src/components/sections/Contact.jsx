import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';
import '../../components/Contact/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('message', formData.message);
    if (formData.file) {
      formDataObj.append('file', formData.file);
    }

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', file: null });
      } else {
        setError('Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>Let's Connect</h3>
        <p>
          Investing early is the key to securing your family's financial future. Our experts are ready to guide you through creating personalized investment plans tailored to your unique needs.
        </p>
        <ul>
          <li><FaEnvelope /> info@kidzfinancials.com</li>
          <li><FaPhone /> +1 (647) 947-9369</li>
          <li><FaMapMarkerAlt /> Brampton, Ontario, Canada</li>
        </ul>
      </div>
      <div className="contact-col">
        <h3>Send us a message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <div>
              <label>Your Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                required 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div>
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="Enter your mobile number" 
              required 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          
          <div>
            <label>Write your Message</label>
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Tell us more about your investment goals" 
              value={formData.message} 
              onChange={handleChange} 
            />
          </div>
          
          <div>
            <label>Attach File (optional)</label>
            <input 
              type="file" 
              name="file" 
              onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="btn dark-btn">
            <FaPaperPlane /> Send Message
          </button>
        </form>

        {submitted && <div className="thank-you-message">Thanks for contacting us! We'll be in touch soon.</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Contact;
