import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/Appointment/Appointment.css';
import AppointmentForm from '../forms/AppointmentForm';

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleProceed = (userDetails) => {
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
            <AppointmentForm onProceed={handleProceed} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
