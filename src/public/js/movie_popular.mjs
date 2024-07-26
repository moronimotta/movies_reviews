import { makeRequest } from './utils.mjs';
import MovieCard from './movieCard.mjs';

const movies = await makeRequest('movie/popular');
movies.results.forEach(movie => {
    const movieCard = new MovieCard(movie);
    const card = movieCard.renderMovieCard();
    document.getElementById('movie-container').appendChild(card);
});
