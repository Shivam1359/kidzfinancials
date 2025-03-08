import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/SelectSlot/SelectSlot.css';
import useAppointment from '../hooks/useAppointment';

const SelectSlot = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userTimezone, setUserTimezone] = useState('');
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
    book
  } = useAppointment();

  // Get user's timezone on component mount
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  // Redirect if no user details are provided
  useEffect(() => {
    if (!state?.userDetails) {
      navigate('/');
    }
  }, [state, navigate]);

  // Format time to user's local timezone
  const formatTimeToLocal = (time, date) => {
    if (!time || !date) return time;

    try {
      // Create a date object from the time string and date
      const [hours, minutes] = time.split(':');
      const dateObj = new Date(date);
      dateObj.setHours(parseInt(hours, 10));
      dateObj.setMinutes(parseInt(minutes, 10));
      dateObj.setSeconds(0);
      
      // Format the time in the user's local time
      return dateObj.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return time; // Return original time if there's an error
    }
  };

  // Custom styling for highlighting available dates
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0]; // Ensure correct comparison
    return highlightedDates.has(formattedDate) ? 'highlighted-date' : '';
  };

  const handleBookAppointment = async () => {
    try {
      const result = await book(state.userDetails);
      if (result.success) {
        alert(`Meeting Scheduled! Join here: ${result.appointment.join_url}`);
        
        // Reset selected slot after successful booking
        setSelectedSlot(null);
        
        // No need for page reload - the hook will refresh the available slots
        // for the current date automatically when the book() function is called
      }
    } catch (error) {
      alert(error.message || 'Failed to book appointment. Please try again.');
    }
  };

  if (!state?.userDetails) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="select-slot-container">
      <h2>Select Appointment Date</h2>
      
      {userTimezone && (
        <div className="timezone-info">
          Times are shown in your local timezone: {userTimezone}
        </div>
      )}

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
              {availableSlots.map((slot, index) => {
                const localTime = formatTimeToLocal(slot, selectedDate);
                return (
                  <button 
                    key={index} 
                    className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={bookingLoading}
                  >
                    {localTime}
                  </button>
                );
              })}
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
