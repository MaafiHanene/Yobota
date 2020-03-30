import client from './api-client';

const localStorageKey = 'id_token';

function handleUserResponse({ data }) {
  window.localStorage.setItem('access_token', data.access_token);
  window.localStorage.setItem('id_token', data.id_token);
  window.localStorage.setItem('first_name', data.given_name);
  window.localStorage.setItem('last_name', data.family_name);
  window.localStorage.setItem('userID', data.userID);
  window.location.href = '/';
  return null;
}

function getUser() {
  const token = window.localStorage.getItem(localStorageKey);
  if (!token) {
    return Promise.resolve(null);
  }
  return client('auth/user', { body: { token } }).catch((error) => {
    logout();
    return Promise.reject(error);
  });
}

function login(code) {
  return client('auth/token', { body: { code } }).then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
  return Promise.resolve();
}

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

export {
  login, logout, getToken, getUser,
};
