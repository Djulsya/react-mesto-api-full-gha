class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._checkError(res))
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => this._checkError(res))
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }).then((res) => this._checkError(res))

  }
}

const authorization = new Authorization("https://auth.nomoreparties.co")

export default authorization


