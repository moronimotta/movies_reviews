import Account from './account.mjs';
import { setLocalStorage } from './utils.mjs';



async function submitRegisterForm() {
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const username = document.getElementById('username').value;

  if (!email || !name || !password || !confirmPassword || !username) {
    alert('All fields must be filled out.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }


  const account = new Account();
  await account.init();
  account.createAccount(name, email, password, username);

  try {
    const response = await fetch('/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account.users)
    });

    if (response.ok) {
      alert('Account created successfully!');
      setLocalStorage('currentUserInfo', account.user[0]);
      setLocalStorage('currentUserId', account.user[0].id);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.log('Error:', error);
    alert('An unexpected error occurred.');
  }
}

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  submitRegisterForm();
  // redirect to account page
});




