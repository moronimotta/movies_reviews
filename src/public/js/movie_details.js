import { getParam, makeRequest } from "./utils.mjs";
import MovieCard from "./MovieCard.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    const movie_id = getParam('movie_id');
    const movie = await makeRequest(`movie/${movie_id}`);

    const movieCard = new MovieCard(movie);
    const card = movieCard.renderMovieCard();
    document.getElementById('movie-poster').appendChild(card);
    document.getElementById('description').innerHTML += movie.overview;
    document.getElementById('movie-name').innerHTML += movie.original_title;

}
);
