import axios from 'axios';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "07552b0015eb1b93b05b7d00f9d35fc6";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/discover/movie`, {
      params: { api_key: API_KEY }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
