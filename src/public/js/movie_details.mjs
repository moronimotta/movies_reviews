import { getParam, getLocalStorage } from "./utils.mjs";
import MovieDetails from "./MovieDetails.mjs";
import Reviews from "./Reviews.mjs";
import List from "./List.mjs";

const movie_id = getParam('movie_id');
const details = new MovieDetails();

document.addEventListener('DOMContentLoaded', async () => {
    const modalTrigger = document.getElementById('new-review');
    const modalElement = document.getElementById('reviewModal');

    const modal = new bootstrap.Modal(modalElement);

    modalTrigger.addEventListener('click', () => {
        const user = getLocalStorage('currentUserInfo');
        if (!user) {
            alert('Please log in to submit a review');
            location.reload();
        }

        modal.show();
    });


    details.init(movie_id);
});

const listModal = document.getElementById('add-to-list');
listModal.addEventListener('click', async () => {
    document.getElementById('listModalBody').innerHTML = '';
    const user = getLocalStorage('currentUserInfo');
    if (!user) {
        alert('Please log in to add movie to list');
        location.reload();
    }

    const list = new List(user.id);
    list.buildListModal();
});

const submitChanges = document.getElementById('submit-list');
submitChanges.addEventListener('click', async () => {
    const user = getLocalStorage('currentUserInfo');
    if (!user) {
        alert('Please log in to add movie to list');
        location.reload();
    }

    // get the checked radio button
    const classList = new List(user.id);
    const lists = document.querySelectorAll('input[name="list"]');
    lists.forEach(list => {
        if (list.checked) {
            classList.addMovieToList(list.value, details.movie);
        }
    });

    window.location.reload();

});

const submitNewList = document.getElementById('submit-new-list')
submitNewList.addEventListener('click', async () => {
    const user = getLocalStorage('currentUserInfo');
    const list = new List(user.id);
    const listName = document.getElementById('listName').value;

    if (!listName) {
        alert('Please enter a name for the list');
        return;
    }

    list.createList(listName);
    document.getElementById('listName').value = '';

});

document.getElementById('submit-review').addEventListener('click', async () => {
    const user = getLocalStorage('currentUserInfo');

    if (!user) {
        alert('Please log in to submit a review');
        return;
    }

    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;
    const likeCheckbox = document.getElementById('reviewLike');
    const like = likeCheckbox.checked ? 1 : 0;

    if (!reviewText || !rating) {
        alert('Please fill in all fields');
        return;
    }

    const data = {
        review_text: reviewText,
        rating: rating,
        like: like,
        external_id: movie_id,
        user_id: user.id,
        author: user.name
    };

    const reviews = new Reviews();
    reviews.addReview(data);

    document.getElementById('reviewText').value = '';
    document.getElementById('reviewRating').value = '';
    document.getElementById('reviewLike').checked = false;

});
