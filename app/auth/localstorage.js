const TOKEN_KEY = "token";
const CURRENT_USER_ID_KEY = "currentUserId";

export function storeToken (token) {
  return window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken () {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function isTokenSet () {
  return window.localStorage.getItem(TOKEN_KEY) ? true : false;
}

export function storeCurrentUserId (userId) {
  return window.localStorage.setItem(CURRENT_USER_ID_KEY, userId);
}

export function getCurrentUserId () {
  return window.localStorage.getItem(CURRENT_USER_ID_KEY);
}

export function clearAll () {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(CURRENT_USER_ID_KEY);
}
