import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
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

  // Custom styling for highlighting available dates and applying base styles
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      if (highlightedDates.has(formattedDate)) {
        return '!bg-primary-100'; // Available date style
      }
    }
    return ''; // Default, other styles (today, selected, disabled) handled by CSS
  };

  const handleBookAppointment = async () => {
    try {
      await book(state.userDetails);
    } catch (error) {
      // Consider replacing alert with a more user-friendly notification component
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

  // Re-applied structure with Tailwind classes
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-gray-100 py-8 md:py-12"> {/* Reduced padding */} 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"> {/* Changed max-w-3xl to max-w-5xl */} 
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6 text-center">Select Appointment Date</h2>
          
          {/* Calendar Legend */}
          <div className="w-fit mx-auto mb-4 py-2 px-4 border border-gray-200 rounded-md bg-white shadow-sm"> {/* Reduced padding */} 
            <p className="text-sm font-semibold mb-1 text-gray-700 text-center">Legend:</p> {/* Reduced mb, added text-center */} 
            <div className="flex justify-center gap-x-4 gap-y-2 text-xs"> {/* Removed flex-wrap, added justify-center */} 
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-secondary-100 mr-1.5"></span> Today
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-primary-100 mr-1.5"></span> Available
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-primary-600 mr-1.5"></span> Selected
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-neutral-100 mr-1.5 border border-neutral-300"></span> Disabled
              </div>
            </div>
          </div>

          {/* Loading Indicator for Dates */}
          {loadingDates ? (
            <div className="loading-indicator text-center py-4 text-gray-600">Loading available dates...</div> 
          ) : (
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate} 
              tileClassName={tileClassName} // Updated function
              minDate={new Date()}
              className="react-calendar-modern" // Added className
            />
          )}

          {/* Loading Indicator for Slots */}
          {loadingSlots ? (
            <div className="loading-indicator text-center py-4 text-gray-600">Loading available slots...</div> 
          ) : (
            availableSlots.length > 0 ? (
              <>
                {/* Available Slots Section */}
                <h3 className="mt-6 mb-4 text-xl font-semibold text-gray-800">Available Time Slots</h3> {/* Reduced mt */} 
                <div className="slots-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4"> 
                  {availableSlots.map((slot, index) => (
                    <button 
                      key={index} 
                      // Styled Slot Button
                      className={`slot-button border border-primary-300 text-primary-700 rounded px-4 py-2 text-center hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300 transition duration-150 ease-in-out ${selectedSlot === slot ? 'bg-primary-600 text-white hover:bg-primary-700' : ''} ${bookingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={bookingLoading}
                    >
                      {formatDisplayTime(slot)}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              // Styled No Slots Message
              selectedDate && <p className="no-slots mt-4 text-gray-600">No available slots for this date.</p> 
            )
          )}

          {/* Styled Confirm Button */}
          <button 
            className="confirm-button mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed" // Reduced mt
            onClick={handleBookAppointment} 
            disabled={!selectedSlot || bookingLoading}
          >
            {bookingLoading ? (
              // Styled Loading Indicator inside Button
              <div className="loader-container flex items-center"> 
                <div className="loader w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div> 
                <span>Processing...</span>
              </div>
            ) : (
              'Confirm Booking'
            )}
          </button>
          
          {/* Styled Success Modal */}
          {bookingSuccess && (
            <div className="success-modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"> 
              <div className="success-modal bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-md mx-auto text-center"> 
                <h3 className="text-2xl font-bold text-green-600 mb-4">Appointment Confirmed!</h3> 
                {bookingSuccess.appointment.displayDateTime ? (
                  <p className="appointment-time mb-4 text-gray-700"> 
                    Your appointment is scheduled for:<br/>
                    <strong className="block mt-1"> 
                      {bookingSuccess.appointment.displayDateTime.dayOfWeek}, {bookingSuccess.appointment.displayDateTime.monthAndDay} 
                      at {bookingSuccess.appointment.displayDateTime.time} EST
                    </strong>
                  </p>
                ) : (
                  <p className="mb-4 text-gray-700">Your meeting has been scheduled successfully.</p> 
                )}
                <p className="join-url mb-6 text-gray-700"> 
                  <strong className="block mb-1">Join URL:</strong> 
                  <a href={bookingSuccess.appointment.join_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 break-all"> 
                    {bookingSuccess.appointment.join_url}
                  </a>
                </p>
                <button className="close-modal-button w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm" onClick={closeSuccessModal}> 
                  Close
                </button>
              </div>
            </div>
          )}
          
          {/* Styled Full-screen loading overlay */}
          {bookingLoading && !bookingSuccess && ( 
            <div className="loading-overlay fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center z-40"> 
              <div className="loading-spinner w-12 h-12 border-4 border-t-4 border-primary-600 border-gray-200 rounded-full animate-spin mb-4"></div> 
              <p className="text-lg font-medium text-primary-800">Booking your appointment...</p> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSlot;
