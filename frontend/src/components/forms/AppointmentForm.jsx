import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import './Forms.css';
import OtpForm from './OtpForm';

const AppointmentForm = ({ onProceed }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
  });
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    onProceed(userDetails);
  };

  return (
    <div className='form-group'>
      <div className="form-field">
        <div className="form-label">Full Name</div>
        <div className="input-with-icon">
          <FaUser className="input-icon" />
          <input 
            type='text' 
            name='name' 
            placeholder='Enter your full name' 
            value={userDetails.name}
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <div className="form-field">
        <div className="form-label">Email Address</div>
        <div className="input-with-icon">
          <FaEnvelope className="input-icon" />
          <input 
            type='email' 
            name='email' 
            placeholder='Enter your email' 
            value={userDetails.email}
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <div className="form-field">
        <div className="form-label">Phone Number</div>
        <div className="input-with-icon">
          <FaPhone className="input-icon" />
          <input 
            type='text' 
            name='phone' 
            placeholder='Enter your phone number' 
            value={userDetails.phone}
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <div className="form-field">
        <div className="form-label">Address (Optional)</div>
        <div className="input-with-icon">
          <FaMapMarkerAlt className="input-icon" />
          <input 
            type='text' 
            name='address' 
            placeholder='Enter your address' 
            value={userDetails.address}
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="form-field">
        <div className="form-label">Service</div>
        <select 
          name='service' 
          value={userDetails.service}
          onChange={handleChange} 
          required
        >
          <option value=''>Select a service</option>
          <option value='Consultation'>Financial Consultation</option>
          <option value='RRSP'>RRSP Planning</option>
          <option value='Insurance'>Insurance Services</option>
          <option value='Mortgage'>Mortgage Advice</option>
          <option value='Other'>Other Services</option>
        </select>
      </div>
      
      {userDetails.email && (
        <OtpForm 
          email={userDetails.email} 
          onVerified={() => setVerified(true)} 
        />
      )}
      
      {verified && (
        <button 
          onClick={handleProceed} 
          className="dark-btn"
        >
          Proceed to Slot Selection
        </button>
      )}
    </div>
  );
};

export default AppointmentForm;
