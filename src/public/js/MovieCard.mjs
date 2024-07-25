export default class MovieCard {
    constructor(movie) {
        this.id = movie.id;
        this.poster_path = movie.poster_path;
        this.title = movie.title;
    }

    renderMovieCard() {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
      
        const movieLink = document.createElement('a');
        movieLink.href = `/movies/details?movie_id=${this.id}`;
      
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${this.poster_path}`;
        moviePoster.alt = `${this.title} Poster`;
        moviePoster.className = 'movie-poster';
        movieLink.appendChild(moviePoster);
      
        movieCard.appendChild(movieLink);
        return movieCard;
    }

}