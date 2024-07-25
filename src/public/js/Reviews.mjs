import { makeRequest } from './utils.mjs';

export default class Reviews {
    constructor(movie_id = '') {
        this.reviews = [];
        this.movie_id = movie_id;
        this.allReviews = [];
        this.likeCount = 0;
        this.sumOfScores = 0;
        this.totalOfScores = 0;
    }

    init() {
        this.getAllReviewsByMovieId();
        this.getAPIMovieReviews();
    }


    async getAPIMovieReviews() {
        try {
            const response = await makeRequest(`movie/${this.movie_id}/reviews`);
            if (response.results) {
                response.results.forEach(item => {
                    let like = false
                    if (item.author_details.rating >= 7) {
                        like = true
                        this.likeCount++
                    }


                    const review = {
                        user_id: item.user_id || null,
                        author: item.author,
                        external_id: this.movie_id,
                        review_text: item.content,
                        rating: item.author_details.rating || null,
                        like: like

                    };
                    this.reviews.push(review);
                });

                this.renderReviews()
            }
        } catch (error) {
            console.error('Error fetching movie reviews:', error);
        }
    }

    async getAllReviews() {
        await fetch('/data/reviews', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.allReviews = data;
            })

    }

    async addReview(data) {
        await this.getAllReviews();
        this.allReviews.push(data);
        const userReview = this.allReviews.find(review => review.external_id === data.external_id && review.user_id === data.user_id);
        if (userReview) {
            alert('You have already reviewed this movie!');
            return location.reload();
        }
        try {
            const response = await fetch('/reviews/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.allReviews)
            });

            if (response.ok) {
                alert('Review added successfully!');
            }
            else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }

        }

        catch (error) {
            console.log('Error:', error);
            alert('An unexpected error occurred.');
        }
    }

    async deleteReview(reviewId) {
        const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
        if (reviewIndex !== -1) {
            return this.reviews.splice(reviewIndex, 1);
        }

        try {
            const response = await fetch('/reviews/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.reviews)
            });

            if (response.ok) {
                alert('Review added successfully!');
            }
            else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }

        }

        catch (error) {
            console.log('Error:', error);
            alert('An unexpected error occurred.');
        }



    }

    getAllReviewsByMovieId() {
        fetch('../json/reviews.json')
            .then(response => response.json())
            .then(data => {
                const reviews = data;
                const filterReviews = reviews.filter(review => parseInt(review.external_id) === parseInt(this.movie_id));

                this.likeCount += parseInt(filterReviews.filter(review => review.like === true).length, 10);
                this.reviews = filterReviews;
                this.renderReviews();

            });
    }

    getAllReviewsByUserId() {
        fetch('../json/reviews.json')
            .then(response => response.json())
            .then(data => {
                const reviews = data.reviews;
                const filterReviews = reviews.filter(review => parseInt(review.user_id) === parseInt(this.user_id));
                if (filterReviews.length === 0 || this.reviews.length === 0) {
                    const box = document.createElement('div');
                    box.classList.add('review-box');
                    const noReviewsParagraph = document.createElement('p');
                    noReviewsParagraph.textContent = 'No reviews yet';
                    box.appendChild(noReviewsParagraph);
                    document.getElementById('reviews').appendChild(box);
                } else {
                    this.reviews = filterReviews;
                    this.renderReviews();
                }
            });
    }

    renderReviews() {
        const reviewContainer = document.getElementById('reviews');
        document.getElementById('likes').textContent += this.likeCount;

        this.reviews.forEach(review => {
            const reviewBox = document.createElement('div');
            reviewBox.classList.add('review-box');

            const rating = document.createElement('div');
            rating.classList.add('rating');
            const ratingSpan = document.createElement('span');
            if (review.rating === null) {
                ratingSpan.textContent = 'No rating';
            } else {
                ratingSpan.textContent = `${review.rating}/10`;

            }
            rating.appendChild(ratingSpan);

            const reviewDetails = document.createElement('div');
            reviewDetails.classList.add('review-details');

            const author = document.createElement('div');
            author.classList.add('author');
            const authorStrong = document.createElement('strong');
            authorStrong.textContent = `Author: ${review.author}`;
            author.appendChild(authorStrong);
            reviewDetails.appendChild(author);




            const reviewText = document.createElement('div');
            reviewText.classList.add('review-text');
            reviewText.textContent = review.review_text;

            reviewDetails.appendChild(reviewText);

            reviewBox.appendChild(rating);
            reviewBox.appendChild(reviewDetails);

            reviewContainer.appendChild(reviewBox);
        });
    }
}