export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.close();
    });
    this.popup.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
