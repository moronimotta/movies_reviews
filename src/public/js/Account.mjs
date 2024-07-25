import { getLocalStorage, setLocalStorage } from './utils.mjs';
import List from './List.mjs';

export default class Account {
    constructor() {
        this.users = [];
        this.user = [];
    }

    async init() {
        await fetch('/data/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.users = data;
            })

    }
    getAllAccountData() {
        const user = getLocalStorage('currentUserInfo');
        this.buildUserInfo(user);

        const lists = new List();
        lists.buildListView(user.id);
    }

    buildUserInfo(user) {
        const userInfo = document.getElementById('user-info');
        const h1 = document.createElement('h1');
        h1.textContent = "Name: " + user.name;
        userInfo.appendChild(h1);

        const p1 = document.createElement('p');
        p1.textContent = "Email: " + user.email;
        userInfo.appendChild(p1);

        const p2 = document.createElement('p');
        p2.textContent = "Username: " + user.username;
        userInfo.appendChild(p2);


        
    }


    createAccount(name, email, password, username) {

        if (this.users.find(user => user.email === email)) {
            throw new Error('Email already in use.');
        }
        if (this.users.find(user => user.username === username)) {
            throw new Error('Username already in use.');
        }

        const newUser = {
            id: this.users.length + 1,
            name,
            email,
            password,
            username
        };

        this.user.push(newUser);
        this.users.push(newUser);
    }

    login(email, password) {
        const user = this.users.find(user => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        this.user = user;
        setLocalStorage('currentUser', user);
        return user;
    }


    logout() {
        setLocalStorage('currentUser', null);
    }

    isLoggedIn() {
        return getLocalStorage('currentUser') !== null;
    }
}

// https://letterboxd.com/ ->reference
