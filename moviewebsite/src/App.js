import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingHistory from './pages/BookingHistory';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/movies" replace />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      <Route path="/booking-history" element={<BookingHistory />} />
    </Routes>
  </Router>
);

export default App;
