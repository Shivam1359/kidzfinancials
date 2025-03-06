import React, { useState } from 'react';
import './Contact.css';

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
        <h3>Send us a message</h3>
        <p>
          Investing early is the key to securing your and your family's financial future. Let us help you create investment plans that fit your unique needs.
        </p>
        <ul>
          <li>info@kidzfinancials.com</li>
          <li>+1679479369</li>
          <li>Brampton, Canada</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange} />
          
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your mobile number" required value={formData.phone} onChange={handleChange} />
          
          <label>Write your Message</label>
          <textarea name="message" rows="6" placeholder="Tell us more about investment goals" value={formData.message} onChange={handleChange} />
          
          <label>Attach File</label>
          <input type="file" name="file" onChange={handleChange} />
          
          <button type="submit" className="btn dark-btn">Submit Now</button>
        </form>

        {submitted && <div className="thank-you-message">Thanks for contacting us!</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Contact;
