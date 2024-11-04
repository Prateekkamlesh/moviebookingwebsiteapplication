import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails } from '../api/movieAPI';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  return await fetchMovies();
});

export const getMovieDetail = createAsyncThunk('movies/getMovieDetail', async (id) => {
  return await fetchMovieDetails(id);
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], movieDetail: null, bookings: [], loading: false },
  reducers: {
    bookTicket: (state, action) => {
      const { movieId, movieName, showtime, seats } = action.payload;
      state.bookings.push({ movieId, movieName, showtime, seats });
    },
    cancelBooking: (state, action) => {
      const bookingIndex = action.payload;
      state.bookings.splice(bookingIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => { state.loading = true; })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
      });
  }
});

export const { bookTicket, cancelBooking } = movieSlice.actions;
export default movieSlice.reducer;
