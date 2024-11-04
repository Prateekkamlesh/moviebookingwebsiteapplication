import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from '../store/movieSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
