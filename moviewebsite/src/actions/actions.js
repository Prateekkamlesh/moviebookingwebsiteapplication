import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails } from '../api/movieAPI';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const movies = await fetchMovies();
  return movies;
});

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id) => {
    const movieDetails = await fetchMovieDetails(id);
    return movieDetails;
  }
);
