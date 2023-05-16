import {checkResponse} from '../utils/checkResponse'
const { NODE_ENV } = process.env;
export const BASE_URL = NODE_ENV === 'production' ? 'https://api.thecure.nomoredomains.monster' : 'http://localhost:3000';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse)
}

