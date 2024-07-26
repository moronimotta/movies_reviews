
import { createLoginButton, getLocalStorage, getRandomQuote, createAccountActionsButton } from "./utils.mjs";


document.addEventListener("DOMContentLoaded", async () => {
    const user_id = getLocalStorage('currentUserId');
    if (user_id) {
        createAccountActionsButton();
    } else {
        createLoginButton();
    }
    getRandomQuote();

    const footer = document.getElementsByName('footer')[0];
    footer.innerHTML = '<p>&copy; 2024 Movie Reviews. All rights reserved.</p>';

});
