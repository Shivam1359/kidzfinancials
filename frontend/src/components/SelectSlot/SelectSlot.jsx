import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectSlot.css';

const SelectSlot = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available dates from backend
  const fetchAvailableDates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/available-dates');
      const data = await response.json();

      if (data.success) {
        // Convert dates to YYYY-MM-DD format in UTC
        const datesSet = new Set(
          data.dates.map(date => new Date(date).toISOString().split('T')[0])
        );
        setHighlightedDates(datesSet);
      }
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };

  // Fetch available slots for the selected date
  const fetchAvailableSlots = async (date) => {
    if (!date) return;

    try {
      // Convert selectedDate to YYYY-MM-DD in UTC
      const formattedDate = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Kolkata', // Ensures IST time
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date(date)); // e.g., "2024-03-05"
        
      console.log('Selected Date:', formattedDate);

      const response = await fetch(`http://localhost:5000/api/available-slots?date=${formattedDate}`);
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  // Handle appointment booking
  const bookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    // Format the date in YYYY-MM-DD
    const formattedDate = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(selectedDate));

    try {
      setIsLoading(true); // Start loading
      
      const response = await fetch('http://localhost:5000/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...state.userDetails,
          date: formattedDate,
          time: selectedSlot,
          selectedDateTime: {
            date: formattedDate,
            time: selectedSlot
          }
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Meeting Scheduled! Join here: ${data.appointment.join_url}`);
        // Reset selected slot
        setSelectedSlot('');
        // Refetch available dates and slots after booking
        await fetchAvailableDates();
        if (selectedDate) {
          await fetchAvailableSlots(selectedDate);
        }
        // Optionally, you can redirect to another page
        // navigate('/booking-confirmation', { state: { appointmentDetails: data.appointment } });
      } else {
        alert('Failed to schedule appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  // Custom styling for highlighting available dates
  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0]; // Ensure correct comparison
    return highlightedDates.has(formattedDate) ? 'highlighted-date' : '';
  };

  return (
    <div className="select-slot-container">
      <h2>Select a Date</h2>

      {/* Calendar with highlighted available dates */}
      <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate} 
        tileClassName={tileClassName}
      />

      {availableSlots.length > 0 ? (
        <>
          <h3>Available Time Slots</h3>
          <div className="slots-container">
            {availableSlots.map((slot, index) => (
              <button 
                key={index} 
                className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => setSelectedSlot(slot)}
                disabled={isLoading}
              >
                {slot}
              </button>
            ))}
          </div>
        </>
      ) : (
        selectedDate && <p className="no-slots">No available slots for this date.</p>
      )}

      <button 
        className="confirm-button" 
        onClick={bookAppointment} 
        disabled={!selectedSlot || isLoading}
      >
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Confirm Booking'
        )}
      </button>
      
      {/* Full-screen loading overlay for better UX */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Booking your appointment...</p>
        </div>
      )}
    </div>
  );
};

export default SelectSlot;
