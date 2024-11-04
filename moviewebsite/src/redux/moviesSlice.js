import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual TMDb API key
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
  return response.data.results; // TMDb returns movies under 'results'
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
