import List from "./List.mjs";
import {getLocalStorage, getParam} from "./utils.mjs";

const list = new List();
const user_id = getLocalStorage('currentUserId');
if (!user_id) {
   alert('You must be logged in to access this page');
    window.location.href = '/login';
}

const list_id = getParam('list_id');
if (!list_id) {
    list.buildListView(user_id);
}else{
    list.buildListView(user_id, list_id);
}






