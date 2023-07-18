export default class userApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  /* --------------------------------------- */
  /*             PUBLIC METHODS              */
  /* --------------------------------------- */

  getUserInfo() {
    return this._fetch("/users/me");
  }

  updateUserInfo(userInfo) {
    return this._fetch("/users/me", "PATCH", userInfo);
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  addCard(cardInfo) {
    return this._fetch("/cards", "POST", cardInfo);
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, "DELETE");
  }

  likeCard(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, "PUT");
  }

  unlikeCard(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, "DELETE");
  }

  updateUserPicture(avatar) {
    return this._fetch("/users/me/avatar", "PATCH", avatar).then((res) => {
      const profilePicture = document.querySelector(".profile__picture");
      profilePicture.src = res.avatar;
    });
  }

  /* --------------------------------------- */
  /*             PRIVATE METHODS             */
  /* --------------------------------------- */

  _fetch(endpoint, method = "GET", body = null) {
    const fetchOptions = {
      method,
      headers: this._headers,
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`${this._url}${endpoint}`, fetchOptions)
      .then(this._checkResponse)
      .catch((error) => console.error(error));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Oops there's an error!: ${res.status}`);
  }
}
