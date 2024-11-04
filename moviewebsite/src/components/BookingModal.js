import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookTicket } from '../store/movieSlice';

const BookingModal = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const bookedSeats = useSelector(state => state.movies.bookings);

  const showtimes = ['9AM', '12PM', '3PM', '6PM'];
  const seats = Array.from({ length: 30 }, (_, i) => i + 1);

  const toggleSeatSelection = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    setError('');
    if (!selectedShowtime) {
      setError('Please select a showtime.');
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.');
      return;
    }

    const isSeatAlreadyBooked = selectedSeats.some(seat =>
      bookedSeats.some(b => b.movieId === movie.id && b.showtime === selectedShowtime && b.seats.includes(seat))
    );

    if (isSeatAlreadyBooked) {
      setError('Some seats are already booked for this showtime.');
      return;
    }

    dispatch(bookTicket({ movieId: movie.id, movieName: movie.title, showtime: selectedShowtime, seats: selectedSeats }));
    setConfirmationMessage(`Booking confirmed for ${movie.title} at ${selectedShowtime} on seats: ${selectedSeats.join(', ')}`);
    setSelectedSeats([]);
  };

  return (
    <div className="modal">
      <h3>Book Ticket for {movie.title}</h3>
      
      <label>Showtime:</label>
      <select
        value={selectedShowtime}
        onChange={(e) => setSelectedShowtime(e.target.value)}
      >
        <option value="">Select showtime</option>
        {showtimes.map(time => <option key={time} value={time}>{time}</option>)}
      </select>

      <div className="seats-container">
        <h4>Select Seats:</h4>
        
        {[0, 10, 20].map((startIndex) => (
          <div key={startIndex} className="seat-row">
            {seats.slice(startIndex, startIndex + 10).map((seat) => {
              const isBooked = bookedSeats.some(b => b.movieId === movie.id && b.showtime === selectedShowtime && b.seats.includes(seat));
              return (
                <button
                  key={seat}
                  disabled={isBooked}
                  className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                  onClick={() => toggleSeatSelection(seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="confirm-booking" onClick={handleBooking}>Confirm Booking</button>
      {confirmationMessage && <p style={{ color: 'green', marginTop: '10px' }}>{confirmationMessage}</p>}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default BookingModal;
