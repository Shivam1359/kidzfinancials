import { useEffect, useState } from 'react';
import { bookAppointment, getAvailableDates, getAvailableSlots } from '../services/appointmentService';
import useAsync from './useAsync';

const useAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { loading: loadingDates, execute: fetchDates } = useAsync(getAvailableDates);
  const { loading: loadingSlots, execute: fetchSlots } = useAsync(getAvailableSlots);
  const { loading: bookingLoading, execute: bookAppointmentAsync } = useAsync(bookAppointment);

  // Fetch available dates on component mount
  useEffect(() => {
    const loadAvailableDates = async () => {
      try {
        const data = await fetchDates();
        if (data.success) {
          const datesSet = new Set(
            data.dates.map(date => new Date(date).toISOString().split('T')[0])
          );
          setHighlightedDates(datesSet);
        }
      } catch (error) {
        console.error('Error loading available dates:', error);
      }
    };
    loadAvailableDates();
  }, [fetchDates]);

  // Fetch available slots when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const loadAvailableSlots = async () => {
        try {
          const formattedDate = formatDate(selectedDate);
          const data = await fetchSlots(formattedDate);
          if (data.success) {
            setAvailableSlots(data.slots);
          } else {
            setAvailableSlots([]);
          }
        } catch (error) {
          console.error('Error loading available slots:', error);
          setAvailableSlots([]);
        }
      };
      loadAvailableSlots();
    }
  }, [selectedDate, fetchSlots]);

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  };

  // Book an appointment with selected date and time
  const book = async (userDetails) => {
    if (!selectedDate || !selectedSlot) {
      throw new Error('Please select a date and time slot');
    }

    const formattedDate = formatDate(selectedDate);
    
    // Include the user's timezone in the booking data
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const appointmentData = {
      ...userDetails,
      date: formattedDate,
      time: selectedSlot,
      userTimezone,
      selectedDateTime: {
        date: formattedDate,
        time: selectedSlot
      }
    };

    return await bookAppointmentAsync(appointmentData);
  };

  return {
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
  };
};

export default useAppointment;
