
import { createLoginButton, getLocalStorage, getRandomQuote, createAccountActionsButton } from "./utils.mjs";


document.addEventListener("DOMContentLoaded", async () => {
    const user_id = getLocalStorage('currentUserId');
    if (user_id) {
        createAccountActionsButton();
    } else {
        createLoginButton();
    }
    getRandomQuote();

    const footer = document.getElementById('footer');
    const p = document.createElement('p');
    p.textContent = '© 2024 Movie Reviews. All rights reserved.';
    footer.appendChild(p);

});
