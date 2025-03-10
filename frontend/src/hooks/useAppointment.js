import { useCallback, useEffect, useRef, useState } from 'react';
import { bookAppointment, getAvailableDates, getAvailableSlots } from '../services/appointmentService';
import useAsync from './useAsync';

const useAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  
  // Use ref to cache data and avoid unnecessary refetches
  const cachedDates = useRef(new Map());
  const cachedSlots = useRef(new Map());

  const { loading: loadingDates, execute: fetchDates } = useAsync(getAvailableDates);
  const { loading: loadingSlots, execute: fetchSlots } = useAsync(getAvailableSlots);
  const { loading: bookingLoading, execute: bookAppointmentAsync } = useAsync(bookAppointment);

  // Reset selected slot when date changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  // Format date with memoization
  const formatDate = useCallback((date) => {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  }, []);

  // Format time in EST (Toronto) timezone
  const formatTimeDisplay = useCallback((slot) => {
    if (!slot) return null;
    
    try {
      // Parse time in 24-hour format
      const [hours, minutes] = slot.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
      
      // Return a formatted display time with the original time as reference
      return {
        displayTime: `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`,
        originalTime: slot, // Keep original time for sending to server
      };
    } catch (error) {
      console.error('Error formatting time display:', error);
      return { displayTime: slot, originalTime: slot };
    }
  }, []);

  // Fetch available dates with optimized caching
  useEffect(() => {
    const loadAvailableDates = async () => {
      try {
        // Check if we have cached data first
        const currentMonth = selectedDate ? 
          new Date(selectedDate).toISOString().slice(0, 7) : 
          new Date().toISOString().slice(0, 7);
          
        if (cachedDates.current.has(currentMonth)) {
          setHighlightedDates(cachedDates.current.get(currentMonth));
          return;
        }
        
        const data = await fetchDates();
        if (data.success) {
          const datesSet = new Set(
            data.dates.map(date => new Date(date).toISOString().split('T')[0])
          );
          setHighlightedDates(datesSet);
          
          // Cache this result
          cachedDates.current.set(currentMonth, datesSet);
        }
      } catch (error) {
        console.error('Error loading available dates:', error);
      }
    };
    loadAvailableDates();
  }, [fetchDates]);

  // Fetch available slots with optimized caching
  const fetchAvailableSlotsForDate = useCallback(async (date) => {
    if (!date) return;
    
    try {
      const formattedDate = formatDate(date);
      
      // Check cache first
      if (cachedSlots.current.has(formattedDate)) {
        setAvailableSlots(cachedSlots.current.get(formattedDate));
        return;
      }
      
      const data = await fetchSlots(formattedDate);
      if (data.success) {
        // Simply format the time for display in EST, don't convert to local timezone
        const formattedSlots = data.slots.map(slot => formatTimeDisplay(slot));
        setAvailableSlots(formattedSlots);
        
        // Cache this result
        cachedSlots.current.set(formattedDate, formattedSlots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error loading available slots:', error);
      setAvailableSlots([]);
    }
  }, [fetchSlots, formatDate, formatTimeDisplay]);

  // Useeffect to call the function when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlotsForDate(selectedDate);
    }
  }, [selectedDate, fetchAvailableSlotsForDate]);

  // Optimized booking function with error handling
  const book = useCallback(async (userDetails) => {
    if (!selectedDate || !selectedSlot) {
      throw new Error('Please select a date and time slot');
    }

    const formattedDate = formatDate(selectedDate);
    
    // Get the original time to send to the server
    const originalTime = selectedSlot.originalTime || selectedSlot;
    
    // Log what we're sending to help with debugging
    console.log('Booking appointment with:', {
      date: formattedDate,
      time: originalTime,
    });
    
    // Build appointment data without any timezone conversion
    const appointmentData = {
      ...userDetails,
      date: formattedDate,
      time: originalTime,
      selectedDateTime: {
        date: formattedDate,
        time: originalTime
      }
    };

    try {
      // Clear previous success message
      setBookingSuccess(null);
      
      // Execute booking request
      const result = await bookAppointmentAsync(appointmentData);
      
      // On successful booking, update state immediately
      if (result.success) {
        // First, update local state
        setBookingSuccess(result); // Store success data for UI
        setSelectedSlot(null); // Reset selected slot

        // Clear cached data for this date and month immediately
        cachedSlots.current.delete(formattedDate);
        
        const currentMonth = new Date(selectedDate).toISOString().slice(0, 7);
        cachedDates.current.delete(currentMonth);
        
        // Fetch new data in the background
        fetchAvailableSlotsForDate(selectedDate);
        fetchDates(); // Refresh all available dates
      }
      
      return result;
    } catch (error) {
      console.error('Booking error:', error);
      throw new Error(error.message || 'Could not book appointment');
    }
  }, [selectedDate, selectedSlot, formatDate, bookAppointmentAsync, fetchAvailableSlotsForDate, fetchDates]);

  // Clear booking success message
  const clearBookingSuccess = useCallback(() => {
    setBookingSuccess(null);
  }, []);

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
    bookingSuccess,
    clearBookingSuccess,
    book
  };
};

export default useAppointment;
