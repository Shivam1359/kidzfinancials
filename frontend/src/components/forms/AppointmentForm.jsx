import { useState } from 'react';
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
      <input 
        type='text' 
        name='name' 
        placeholder='Full Name' 
        value={userDetails.name}
        onChange={handleChange} 
        required 
      />
      <input 
        type='email' 
        name='email' 
        placeholder='Email' 
        value={userDetails.email}
        onChange={handleChange} 
        required 
      />
      <input 
        type='text' 
        name='phone' 
        placeholder='Phone Number' 
        value={userDetails.phone}
        onChange={handleChange} 
        required 
      />
      <input 
        type='text' 
        name='address' 
        placeholder='Address (Optional)' 
        value={userDetails.address}
        onChange={handleChange} 
      />
      <select 
        name='service' 
        value={userDetails.service}
        onChange={handleChange} 
        required
      >
        <option value=''>Select Service</option>
        <option value='Consultation'>Consultation</option>
        <option value='Support'>Support</option>
      </select>
      
      {userDetails.email && (
        <OtpForm 
          email={userDetails.email} 
          onVerified={() => setVerified(true)} 
        />
      )}
      
      {verified && (
        <button 
          onClick={handleProceed} 
          className="btn dark-btn"
        >
          Proceed to Slot Selection
        </button>
      )}
    </div>
  );
};

export default AppointmentForm;
