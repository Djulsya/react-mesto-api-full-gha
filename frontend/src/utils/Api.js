class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  };

  getInfo() {
    return fetch(`${this._url}/users/me`,
      {
        method: "GET",
        credentials: 'include',
        headers: this._headers,
      }).then((res) => this._checkError(res));
  };

  updateUserInfo(data) {
    return fetch(`${this._url}/users/me`,
      {
        method: "PATCH",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkError(res));
  };

  updateUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: "PATCH",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkError(res));
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`,
      {
        method: "GET",
        credentials: 'include',
        headers: this._headers,
      }).then((res) => this._checkError(res));
  };

  createCard(data) {
    return fetch(`${this._url}/cards`,
      {
        method: "POST",
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkError(res));
  };

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`,
      {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers,
      }).then((res) => this._checkError(res));
  };

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: this._headers,
        })
        .then((res) => this._checkError(res));
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: this._headers,
        })
        .then((res) => this._checkError(res));
    }
  }
};

const apiConfig = {
  url: 'https://back.jules-bo.nomoredomains.xyz',
  headers: {
    // autharization: '813a52a6-fb30-422d-b79d-9de8b1db1ade',
    'Content-Type': 'application/json'
  },
};

const api = new Api(apiConfig)

export default api