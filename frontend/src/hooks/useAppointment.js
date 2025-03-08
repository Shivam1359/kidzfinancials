import { useCallback, useEffect, useRef, useState } from 'react';
import { bookAppointment, getAvailableDates, getAvailableSlots } from '../services/appointmentService';
import useAsync from './useAsync';

const useAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState(new Set());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
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

  // Format date with memoization - MOVED UP to fix reference error
  const formatDate = useCallback((date) => {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
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
        setAvailableSlots(data.slots);
        // Cache this result
        cachedSlots.current.set(formattedDate, data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error loading available slots:', error);
      setAvailableSlots([]);
    }
  }, [fetchSlots, formatDate]);

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

    try {
      const result = await bookAppointmentAsync(appointmentData);
      
      // On successful booking, invalidate cached slots for this date
      if (result.success) {
        cachedSlots.current.delete(formattedDate);
        
        // Also refresh the list of available dates
        const currentMonth = new Date(selectedDate).toISOString().slice(0, 7);
        cachedDates.current.delete(currentMonth);
        
        // Immediately fetch updated slots for the current date
        await fetchAvailableSlotsForDate(selectedDate);
      }
      
      return result;
    } catch (error) {
      console.error('Booking error:', error);
      throw new Error(error.message || 'Could not book appointment');
    }
  }, [selectedDate, selectedSlot, formatDate, bookAppointmentAsync, fetchAvailableSlotsForDate]);

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
