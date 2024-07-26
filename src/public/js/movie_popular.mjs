console.log('movie_popular.mjs loaded');

import { makeRequest } from './utils.mjs';
import MovieCard from './movieCard.mjs';

(async () => {
  const movies = await makeRequest('movie/popular');
  console.log('Movies fetched:', movies); // Debugging
  movies.results.forEach(movie => {
    const movieCard = new MovieCard(movie);
    const card = movieCard.renderMovieCard();
    document.getElementById('movie-container').appendChild(card);
  });
})();
