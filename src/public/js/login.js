
import { getLocalStorage, setLocalStorage } from './utils.mjs';
const user_id = getLocalStorage('currentUserId');
if (user_id) {
    window.location.href = '/user/account';
}

const form = document.getElementById('loginForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('All fields must be filled out.');
        return;
    }

    const data = {
        email,
        password
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Logged in successfully!');
            setLocalStorage('currentUserInfo', data.user);
            setLocalStorage('currentUserId', data.user.id);
            window.location.href = '/user/account';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});


