// URL 정보

// GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const ME = "/me";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id"; // :id -> 변수로 인식
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Items
const ITEMS = "/items";
const UPLOAD = "/upload";
const ITEM_DETAIL = "/:id";
const EDIT_ITEM = "/:id/edit";
const DELETE_ITEM = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  items: ITEMS,
  upload: UPLOAD,
  itemDetail: (id) => {
    if (id) {
      return `/items/${id}`;
    } else {
      return ITEM_DETAIL;
    }
  },
  editItem: (id) => {
    if (id) {
      return `/items/${id}/edit`;
    } else {
      return EDIT_ITEM;
    }
  },
  deleteItem: (id) => {
    if (id) {
      return `/items/${id}/delete`;
    } else {
      return DELETE_ITEM;
    }
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
};

export default routes;
