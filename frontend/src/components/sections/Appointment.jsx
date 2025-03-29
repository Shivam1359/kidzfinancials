import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaHandshake, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../forms/AppointmentForm';

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleProceed = (userDetails) => {
    navigate('/select-slot', { state: { userDetails } });
  };

  return (
    <div className='py-16 md:py-20 bg-primary-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Initial Consultations</h2>
        <p className="inline-flex items-center text-neutral-600 mb-4">
          <FaClock className="mr-2 text-primary-600" /> 1 hr | Free
        </p>
        <p className="max-w-2xl mx-auto text-neutral-700 mb-8">
          Let's get to know each other better, so we can help you develop a personalized financial plan that secures your children's future and achieves your family's long-term goals.
        </p>
        <button 
          onClick={() => setShowForm(true)} 
          className='btn-primary inline-flex items-center'
          aria-label="Book your free consultation"
        >
          <FaCalendarAlt className="mr-2" /> Book Your Free Consultation
        </button>
      </div>

      {showForm && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm'>
          <div className='bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full relative transform transition-all animate-slide-up'>
            <button 
              className='absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition-colors' 
              onClick={() => setShowForm(false)}
              aria-label="Close appointment form"
            >
              <FaTimes size={20}/>
            </button>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-6 text-center flex items-center justify-center">
              <FaHandshake className="mr-3 text-primary-600" /> Book Your Appointment
            </h2>
            <AppointmentForm onProceed={handleProceed} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
