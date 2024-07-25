// main script
import { makeRequest, getRandomQuote } from "./utils.mjs";
import MovieCard from "./MovieCard.mjs";



document.addEventListener("DOMContentLoaded", async () => {
    getRandomQuote();
    const movies = await makeRequest('movie/now_playing');
    movies.results.forEach(movie => {
        const movieCard = new MovieCard(movie);
        const card = movieCard.renderMovieCard();
        document.getElementById('movie-container').appendChild(card);
    });
});
