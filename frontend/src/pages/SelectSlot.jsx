import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/SelectSlot/SelectSlot.css';
import useAppointment from '../hooks/useAppointment';

const SelectSlot = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { 
    selectedDate, 
    setSelectedDate,
    highlightedDates,
    availableSlots,
    selectedSlot,
    setSelectedSlot,
    loadingDates,
    loadingSlots,
    bookingLoading,
    bookingSuccess,
    clearBookingSuccess,
    book
  } = useAppointment();

  // Redirect if no user details are provided
  useEffect(() => {
    if (!state?.userDetails) {
      navigate('/');
    }
  }, [state, navigate]);

  // Format display time in 12-hour format with AM/PM
  const formatDisplayTime = (time) => {
    if (!time) return '';
    
    try {
      // If time is already an object with displayTime
      if (typeof time === 'object' && time.displayTime) {
        return time.displayTime;
      }
      
      // If time is a string in HH:MM format
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting display time:', error);
      return time; // Return original if error
    }
  };

  // Custom styling for highlighting available dates
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return highlightedDates.has(formattedDate) ? 'highlighted-date' : '';
  };

  const handleBookAppointment = async () => {
    try {
      await book(state.userDetails);
    } catch (error) {
      alert(error.message || 'Failed to book appointment. Please try again.');
    }
  };

  // Close the success notification modal
  const closeSuccessModal = () => {
    clearBookingSuccess();
  };

  if (!state?.userDetails) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="select-slot-container">
      <h2>Select Appointment Date</h2>
      
      <div className="timezone-info">
        <strong>All times are shown in Eastern Time (ET/EST - Toronto)</strong>
      </div>

      {loadingDates ? (
        <div className="loading-indicator">Loading available dates...</div>
      ) : (
        <Calendar 
          onChange={setSelectedDate} 
          value={selectedDate} 
          tileClassName={tileClassName}
          minDate={new Date()}
        />
      )}

      {loadingSlots ? (
        <div className="loading-indicator">Loading available slots...</div>
      ) : (
        availableSlots.length > 0 ? (
          <>
            <h3>Available Time Slots</h3>
            <div className="slots-container">
              {availableSlots.map((slot, index) => (
                <button 
                  key={index} 
                  className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={bookingLoading}
                >
                  {formatDisplayTime(slot)}
                </button>
              ))}
            </div>
          </>
        ) : (
          selectedDate && <p className="no-slots">No available slots for this date.</p>
        )
      )}

      <button 
        className="confirm-button" 
        onClick={handleBookAppointment} 
        disabled={!selectedSlot || bookingLoading}
      >
        {bookingLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Confirm Booking'
        )}
      </button>
      
      {/* Success Modal - replace alert with this */}
      {bookingSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <h3>Appointment Confirmed!</h3>
            {bookingSuccess.appointment.displayDateTime ? (
              <p className="appointment-time">
                Your appointment is scheduled for:<br/>
                <strong>
                  {bookingSuccess.appointment.displayDateTime.dayOfWeek}, {bookingSuccess.appointment.displayDateTime.monthAndDay} 
                  at {bookingSuccess.appointment.displayDateTime.time} EST
                </strong>
              </p>
            ) : (
              <p>Your meeting has been scheduled successfully.</p>
            )}
            <p className="join-url">
              <strong>Join URL:</strong> 
              <a href={bookingSuccess.appointment.join_url} target="_blank" rel="noopener noreferrer">
                {bookingSuccess.appointment.join_url}
              </a>
            </p>
            <button className="close-modal-button" onClick={closeSuccessModal}>
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Full-screen loading overlay for better UX */}
      {bookingLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Booking your appointment...</p>
        </div>
      )}
    </div>
  );
};

export default SelectSlot;
