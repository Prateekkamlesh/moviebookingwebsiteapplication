import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../actions/actions';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Book My Show</h1>
      <Link to="/booking-history" className="booking-history-link">Booking History</Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
