class Api {
  #onResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({ message: "Ошибка на стороне сервера", res })
  }

  constructor() {
    this._url = 'https://api.thecure.nomoredomains.monster';
    this._headers = {
      "content-type": "application/json",
      "authorization": `Bearer ${localStorage.getItem('jwt')}`,
    };
  }

  getCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this.#onResponse);
  }
  getProfile() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this.#onResponse);
  }
  editInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponse);
  }
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponse);
  }
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this.#onResponse);
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers  
      })
        .then(this.#onResponse);
    }
    else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers  
      })
        .then(this.#onResponse);
    }
  }
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this.#onResponse);
  }
  
}

const api = new Api();
export default api;