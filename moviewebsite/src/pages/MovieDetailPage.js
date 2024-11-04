import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../store/movieSlice';
import BookingModal from '../components/BookingModal';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieDetail } = useSelector((state) => state.movies);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="movie-details">
      <button className="home-button" onClick={() => navigate('/movies')}>Home</button>
      {movieDetail ? (
        <div>
          <h1>{movieDetail.title}</h1>
          <table>
            <tbody>
              <tr>
                <td>Overview:</td>
                <td>{movieDetail.overview}</td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td>{movieDetail.vote_average}</td>
              </tr>
            </tbody>
          </table>
          <button className="book-ticket-button" onClick={toggleModal}>Book Ticket</button>
          {isModalOpen && <BookingModal movie={movieDetail} onClose={toggleModal} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
