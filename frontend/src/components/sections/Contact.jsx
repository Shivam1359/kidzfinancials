import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';

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
    setError(null); // Clear previous errors
    setSubmitted(false); // Reset submission status

    const formDataObj = new FormData();
    // Append form data...
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) { // Ensure we don't append null file
        formDataObj.append(key, formData[key]);
      }
    });
    
    try {
      // Replace with your actual API endpoint from environment variables if possible
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT || 'http://localhost:5000/send-email', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', file: null }); 
        // Clear file input visually (requires handling ref if needed, this clears state)
        e.target.reset(); // Reset form fields including file input
      } else {
        setError(result.message || 'Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error("Contact form submission error:", err); // Log error for debugging
    }
  };

  // Playful input styling
  const inputBaseStyle = "block w-full px-4 py-2.5 border border-neutral-200 rounded-lg shadow-sm placeholder-neutral-400 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent sm:text-sm transition duration-150 ease-in-out";
  const labelBaseStyle = "block text-sm font-semibold text-neutral-700 mb-1.5";

  return (
    // Added some background texture/color potentially to the parent container if desired
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"> {/* Align items start */} 
      {/* Left Column: Contact Info */}
      <div className="space-y-8"> {/* Increased spacing */} 
        <h3 className="text-3xl lg:text-4xl font-bold text-primary-700">Let's Connect!</h3> {/* Bolder, primary color */} 
        <p className="text-neutral-600 leading-relaxed text-base">
          Investing early is the key to securing your family's financial future. Our experts are ready to guide you through creating personalized investment plans tailored to your unique needs.
        </p>
        <ul className="space-y-5 text-neutral-700"> {/* Increased spacing */} 
          <li className="flex items-center gap-x-4"> {/* Increased gap */} 
            {/* Larger icon with background */}
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-100 text-secondary-700">
              <FaEnvelope className="h-5 w-5" aria-hidden="true" /> 
            </span>
            <a href="mailto:info@kidzfinancials.com" className="hover:text-primary-600 transition-colors font-medium">info@kidzfinancials.com</a>
          </li>
          <li className="flex items-center gap-x-4">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-100 text-secondary-700">
              <FaPhone className="h-5 w-5" aria-hidden="true" /> 
            </span>
            <span className="font-medium">+1 (647) 947-9369</span>
          </li>
          <li className="flex items-center gap-x-4">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-100 text-secondary-700">
              <FaMapMarkerAlt className="h-5 w-5" aria-hidden="true" /> 
            </span>
            <span className="font-medium">Brampton, Ontario, Canada</span>
          </li>
        </ul>
      </div>

      {/* Right Column: Form */}
      <div className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-md"> {/* Card-like appearance */} 
        <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-800 mb-1 text-center">Send us a message</h3> {/* Centered title */} 
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inline group for Name and Email */}
          <div className="grid sm:grid-cols-2 gap-5"> {/* Increased gap */} 
            <div>
              <label htmlFor="contact-name" className={labelBaseStyle}>Your Name</label>
              <input 
                type="text" 
                name="name" 
                id="contact-name" 
                placeholder="Enter your name" 
                required 
                className={inputBaseStyle}
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelBaseStyle}>Email</label>
              <input 
                type="email" 
                name="email" 
                id="contact-email"
                placeholder="Enter your email" 
                required 
                className={inputBaseStyle}
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          {/* Phone Number */}
          <div>
            <label htmlFor="contact-phone" className={labelBaseStyle}>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              id="contact-phone"
              placeholder="Enter your mobile number" 
              required 
              className={inputBaseStyle}
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="contact-message" className={labelBaseStyle}>Write your Message</label>
            <textarea 
              name="message" 
              id="contact-message"
              rows="4" 
              placeholder="Tell us more about your investment goals" // Shorter placeholder
              className={inputBaseStyle}
              value={formData.message} 
              onChange={handleChange} 
            />
          </div>
          
          {/* File Upload */}
          <div>
            <label htmlFor="contact-file" className={labelBaseStyle}>Attach File (optional)</label>
            <input 
              type="file" 
              name="file" 
              id="contact-file"
              // Slightly updated file input style
              className={`text-sm text-neutral-600 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border file:border-neutral-200 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 hover:file:cursor-pointer ${inputBaseStyle} px-0 py-0 border-none shadow-none bg-transparent`}
              onChange={handleChange} 
            />
          </div>
          
          {/* Submit Button with more playful hover */}
          <button 
            type="submit" 
            className="btn-primary inline-flex items-center justify-center gap-x-2 w-full sm:w-auto px-6 py-2.5 text-base rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 ease-in-out"
          >
            <FaPaperPlane aria-hidden="true" className="h-4 w-4"/> Send Message
          </button>
        </form>

        {/* Submission Status Messages - slightly updated styles */}
        {submitted && (
            <div className="mt-5 p-4 rounded-lg bg-green-50 border border-green-300 text-green-800 text-sm font-medium animate-fade-in">
              Message Sent! We'll be in touch soon. ✅
            </div>
        )}
        {error && (
            <div className="mt-5 p-4 rounded-lg bg-red-50 border border-red-300 text-red-800 text-sm font-medium animate-fade-in">
              Oops! {error} ❌
            </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
