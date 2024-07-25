import MovieCard from "./movieCard.mjs";

export default class List {
    constructor(user_id) {
        this.user_id = user_id;
        this.lists = [];
        this.userLists = [];
    }


    async getAllListsFromUser() {
        await fetch('/data/lists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                const userLists = data.lists.filter(list => list.user_id === this.user_id);
                this.lists = data;
                this.userLists = userLists;
            })
    }

    async createList(list_name) {
        try {
            const response = await fetch('../json/lists.json');
            const data = await response.json();

            const newList = {
                user_id: this.user_id,
                list_id: data.lists.length + 1,
                list_name: list_name,
                movies: []
            };

            data.lists.push(newList);

            await fetch('/movies/list/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            alert('List created successfully');
        } catch (error) {
            console.error('Error creating list:', error);
        }
    }

    async addMovieToList(list_id, movie) {
        try {
            const response = await fetch('../json/lists.json');
            const data = await response.json();

            const newMovie = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path
            };
          
            let movieAlreadyAdded = false;
            data.lists.forEach(list => {
                if (list.user_id === this.user_id && list.list_id === parseInt(list_id)) {
                    const movieExists = list.movies.find(m => m.id === newMovie.id);
                    if (movieExists) {
                        movieAlreadyAdded = true;
                        alert('Movie already exists in the list ' + list.list_name);
                        return;
                    }
                    list.movies.push(newMovie);
                }
            });

            if (movieAlreadyAdded) {
                return;
            }

        
            await fetch('/movies/list/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            alert('Movie added successfully');
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

    async buildListModal() {
        await this.getAllListsFromUser()
            .then(() => {
                this.userLists.forEach(list => {
                    const listDiv = document.createElement('div');
                    listDiv.className = 'form-check';
                    listDiv.innerHTML = `
                    <input class="form-check-input" type="checkbox" name="list" id="list${list.list_id}" value="${list.list_id}">
                    <label class="form-check-label" for="list${list.list_id}">
                        ${list.list_name}
                    </label>
                `;
                    document.getElementById('listModalBody').appendChild(listDiv);

                });
            })
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