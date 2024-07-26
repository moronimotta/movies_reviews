// main script
import { makeRequest, getParam, deleteLocalStorage } from "./utils.mjs";
import MovieCard from "./movieCard.mjs";

const logout = getParam('logout');
if (logout) {
    deleteLocalStorage('currentUserId');
    deleteLocalStorage('currentUserInfo');

    window.location.href = '/';
}




document.addEventListener("DOMContentLoaded", async () => {
    const movies = await makeRequest('movie/now_playing');
    movies.results.forEach(movie => {
        const movieCard = new MovieCard(movie);
        const card = movieCard.renderMovieCard();
        document.getElementById('movie-container').appendChild(card);
    });
});
