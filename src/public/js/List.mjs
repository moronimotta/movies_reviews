import MovieCard from "./MovieCard.mjs";

export default class List {
    constructor(user_id) {
        this.user_id = user_id;
    }

    async addMovieToList(list_id, movie_id, title, poster_path) {
        try {
            const response = await fetch('../json/lists.json');
            const data = await response.json();

            const list = data.lists.find(l => l.user_id === this.user_id && l.list_id === list_id);
            if (!list) {
                console.error('List not found for the given user_id and list_id');
                return;
            }

            const newMovie = {
                id: movie_id,
                title: title,
                poster_path: poster_path
            };

            list.movies.push(newMovie);

            await fetch('http://localhost:3000/movies/list/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Movie added successfully');
        } catch (error) {
            console.error('Error adding movie to list:', error);
        }
    }


    removeMovieFromList(list_id, movie_id) {
        fetch('../json/lists.json')
            .then(response => response.json())
            .then(data => {
                const list = data.lists.find(l => l.user_id === this.user_id && l.list_id === list_id);
                if (!list) {
                    console.error('List not found for the given user_id and list_id');
                    return;
                }

                const index = list.movies.findIndex(m => m.id === movie_id);
                if (index === -1) {
                    console.error('Movie not found in the list');
                    return;
                }

                list.movies.splice(index, 1);

                fetch('http://localhost:3000/movies/list/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                console.log('Movie removed successfully');
            })
            .catch(error => console.error('Error removing movie from list:', error));
    }

    async buildListView(user_id, list_id = '') {
        const response = await fetch('../json/lists.json');
        const data = await response.json();
        const section = document.getElementById('lists');

        data.lists = data.lists.filter(list => list.user_id === user_id);
        if (list_id !== '') {
            data.lists = data.lists.filter(list => list.list_id === list_id);
        }

        data.lists.forEach(list => {
            const list_div = document.createElement('div');
            list_div.id = "list-div";

            const movie_container = document.createElement('div');
            movie_container.id = 'movie-container';

            const list_name = document.createElement('h1');
            list_name.innerText = list.list_name;
            list_div.appendChild(list_name)

            const movieList = document.createElement('div');
            movieList.className = 'movie-list';
            list.movies.forEach(movie => {
                const movieCard = new MovieCard(movie);
                const card = movieCard.renderMovieCard();
                movie_container.appendChild(card)
                list_div.appendChild(movie_container);
                section.appendChild(list_div);

            });
        });
    }
}