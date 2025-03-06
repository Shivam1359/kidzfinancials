// import React, { useState } from 'react';
// import './Appointment.css';

// const Appointment = () => {
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [appointmentDetails, setAppointmentDetails] = useState(null);
//   const [email, setEmail] = useState('');

//   const handleBookNow = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/book-appointment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAppointmentDetails(data.appointment);
//         setBookingStatus('Appointment booked successfully!');
//       } else {
//         setBookingStatus('Booking failed: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       setBookingStatus('Error booking appointment.');
//     }
//   };

//   return (
//     <div className='appointment'>
//       <div className='appointment-left'>
//         <img
//           src='https://img1.wsimg.com/isteam/stock/5226'
//           alt='Appointment'
//           className='appointment-img'
//         />
//       </div>
//       <div className='appointment-right'>
//         <h2>Initial Consultations</h2>
//         <p>1 hr | Free</p>
//         <p>
//           Let's get to know each other better, so we can help you achieve your dream goals
//         </p>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleBookNow} type='button' className='btn dark-btn'>
//           Book Now
//         </button>
//         {bookingStatus && <p>{bookingStatus}</p>}
//         {appointmentDetails && (
//           <div className="appointment-details">
//             <p>Date: {appointmentDetails.date}</p>
//             <p>Time: {appointmentDetails.time}</p>
//             <p>
//               Zoom Meeting Link:{' '}
//               <a
//                 href={appointmentDetails.zoomLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {appointmentDetails.zoomLink}
//               </a>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Appointment;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Appointment.css';

// const Appointment = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     service: '',
//   });
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
//   };

//   const sendOTP = async () => {
//     const response = await fetch('http://localhost:5000/api/send-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: userDetails.email }),
//     });

//     if (response.ok) {
//       setOtpSent(true);
//       alert('OTP sent to email!');
//     }
//   };

//   const verifyOTP = async () => {
//     const response = await fetch('http://localhost:5000/api/verify-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: userDetails.email, otp }),
//     });

//     if (response.ok) {
//       setVerified(true);
//       alert('Email verified! You can proceed.');
//     } else {
//       alert('Invalid OTP!');
//     }
//   };

//   const proceedToBooking = () => {
//     navigate('/select-slot', { state: { userDetails } });
//   };

//   return (
//     <div className='appointment'>
//       <h2>Book Your Appointment</h2>
//       <input type='text' name='name' placeholder='Full Name' onChange={handleChange} required />
//       <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
//       <input type='text' name='phone' placeholder='Phone Number' onChange={handleChange} required />
//       <input type='text' name='address' placeholder='Address (Optional)' onChange={handleChange} />
//       <select name='service' onChange={handleChange} required>
//         <option value=''>Select Service</option>
//         <option value='Consultation'>Consultation</option>
//         <option value='Support'>Support</option>
//       </select>

//       {!otpSent && <button onClick={sendOTP}>Send OTP</button>}
//       {otpSent && !verified && (
//         <>
//           <input type='text' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} />
//           <button onClick={verifyOTP}>Verify OTP</button>
//         </>
//       )}
//       {verified && <button onClick={proceedToBooking}>Proceed to Slot Selection</button>}
//     </div>
//   );
// };

// export default Appointment;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointment.css';

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    const response = await fetch('http://localhost:5000/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userDetails.email }),
    });

    if (response.ok) {
      setOtpSent(true);
      alert('OTP sent to email!');
    }
  };

  const verifyOTP = async () => {
    const response = await fetch('http://localhost:5000/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userDetails.email, otp }),
    });

    if (response.ok) {
      setVerified(true);
      alert('Email verified! You can proceed.');
    } else {
      alert('Invalid OTP!');
    }
  };

  const proceedToBooking = () => {
    navigate('/select-slot', { state: { userDetails } });
  };

  return (
    <div className='appointment'>
      <div className='appointment-content'>
        <h2>Initial Consultations</h2>
        <p>1 hr | Free</p>
        <p>Lets get to know each other better, so we can help you achieve your dream goals</p>
        <button onClick={() => setShowForm(true)} className='btn dark-btn'>
          Book Now
        </button>
      </div>

      {showForm && (
        <div className='appointment-overlay'>
          <div className='appointment-popup'>
            <button className='close-btn' onClick={() => setShowForm(false)}>×</button>
            <h2>Book Your Appointment</h2>
            <div className='form-group'>
              <input 
                type='text' 
                name='name' 
                placeholder='Full Name' 
                onChange={handleChange} 
                required 
              />
              <input 
                type='email' 
                name='email' 
                placeholder='Email' 
                onChange={handleChange} 
                required 
              />
              <input 
                type='text' 
                name='phone' 
                placeholder='Phone Number' 
                onChange={handleChange} 
                required 
              />
              <input 
                type='text' 
                name='address' 
                placeholder='Address (Optional)' 
                onChange={handleChange} 
              />
              <select name='service' onChange={handleChange} required>
                <option value=''>Select Service</option>
                <option value='Consultation'>Consultation</option>
                <option value='Support'>Support</option>
              </select>

              {!otpSent && (
                <button onClick={sendOTP} className='btn dark-btn'>
                  Send OTP
                </button>
              )}
              
              {otpSent && !verified && (
                <div className='otp-section'>
                  <input 
                    type='text' 
                    placeholder='Enter OTP' 
                    onChange={(e) => setOtp(e.target.value)} 
                  />
                  <button onClick={verifyOTP} className='btn dark-btn'>
                    Verify OTP
                  </button>
                </div>
              )}
              
              {verified && (
                <button onClick={proceedToBooking} className='btn dark-btn'>
                  Proceed to Slot Selection
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;