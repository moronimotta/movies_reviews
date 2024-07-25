import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class Account {
    constructor() {
        this.users = [];
    }

    init() {
        fetch('../json/users.json')
            .then(response => response.json())
            .then(data => {
                this.users = data;
            });
    }

    // Create account method
    createAccount(name, email, password) {

       if (this.users.find(user => user.email === email)) {
            throw new Error('Email already in use.');
        }

        // Create new user
        const newUser = {
            id: users.length + 1, // Simple ID generation, consider more robust solutions
            name,
            email,
            password // Note: In production, never store passwords as plain text
        };

        users.push(newUser);
        setLocalStorage('currentUser', newUser);
        return newUser;
    }

    // Login method
    login(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        this.user = user;
        setLocalStorage('currentUser', user); // Save user info to local storage
        return user;
    }

    // Logout method
    logout() {
        setLocalStorage('currentUser', null); // Remove user info from local storage
    }

    isLoggedIn() {
        return getLocalStorage('currentUser') !== null;
    }
}

// https://letterboxd.com/ ->reference
