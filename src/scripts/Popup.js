export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
    this.closeButton = this.popupSelector.querySelector(".popup__close-button");
  }
  open() {
    this.popupSelector.classList.add("popup_opened");
  }
  close() {
    this.popupSelector.classList.remove("popup_opened");
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.popupSelector.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
  }
}
