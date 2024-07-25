import Account from "./account.mjs";
import {getLocalStorage} from "./utils.mjs";

const user_id = getLocalStorage('currentUserInfo').id;
if (!user_id) {
    alert('You must be logged in to access this page');
    window.location.href = '/login';
}

const account = new Account();
account.getAllAccountData();




