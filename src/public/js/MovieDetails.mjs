import MovieCard from './movieCard.mjs';
import Reviews from './Reviews.mjs';
import { makeRequest } from './utils.mjs';

export default class MovieDetails {
    constructor() {
        this.movie = [];
        this.reviews = null;
        this.like_count = 0;
        this.average_rating = 0;
        this.review_count = 0;
    }


    async init(movie_id) {
        await makeRequest(`movie/${movie_id}`)
            .then(data => {
                this.movie = data;
            });
        this.reviews = new Reviews(movie_id);
        this.reviews.init();
        this.renderMovieDetails();
    }

    renderMovieDetails() {
        const movie_card = new MovieCard(this.movie);
        const card = movie_card.renderMovieCard()
        document.getElementById('movie-poster').appendChild(card);
        document.getElementById('description').innerHTML += this.movie.overview;
        document.getElementById('movie-name').innerHTML += this.movie.original_title;
    }

}
