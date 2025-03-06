import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import './SelectSlot.css';

const SelectSlot = () => {
  const { state } = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [selectedSlot, setSelectedSlot] = useState('');

  // Fetch available dates from backend
  useEffect(() => {
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

    fetchAvailableDates();
  }, []);

  // Fetch available slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailableSlots = async () => {
      try {
        // Convert selectedDate to YYYY-MM-DD in UTC
        const formattedDate = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata', // Ensures IST time
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).format(new Date(selectedDate)); // e.g., "2024-03-05"
          
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

    fetchAvailableSlots();
  }, [selectedDate]);

  // Handle appointment booking
  const bookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...state.userDetails, start_time: selectedSlot }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Meeting Scheduled! Join here: ${data.appointment.join_url}`);
      } else {
        alert('Failed to schedule appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
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
        disabled={!selectedSlot}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SelectSlot;
