import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings } = useSelector((state) => state.movies);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const handleCancelBooking = (index) => {
    setShowCancelPopup(true);
    setBookingToCancel(index);
  };

  const confirmCancelBooking = () => {
    dispatch(cancelBooking(bookingToCancel));
    setShowCancelPopup(false);
    setBookingToCancel(null);
  };

  return (
    <div className="booking-history">
      <h1>Booking History</h1>
      <button className="home-button" onClick={() => navigate('/movies')}>Home</button>
      {bookings.length > 0 ? (
        <table className="centered-table">
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Showtime</th>
              <th>Number of Tickets</th>
              <th>Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.movieName || 'No Movie Name'}</td>
                <td>{booking.showtime}</td>
                <td>{booking.seats.length}</td>
                <td>{booking.seats.join(', ')}</td>
                <td>
                  <button className="cancel-button" onClick={() => handleCancelBooking(index)}>Cancel Booking</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booking history available.</p>
      )}
      {showCancelPopup && (
        <div className="popup">
          <p>Are you sure you want to cancel the booking?</p>
          <button className="popup-confirm" onClick={confirmCancelBooking}>Yes</button>
          <button className="popup-cancel" onClick={() => setShowCancelPopup(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
