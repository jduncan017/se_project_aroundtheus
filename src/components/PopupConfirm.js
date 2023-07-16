import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this.popup.querySelector(
      ".confirm-popup__submit-button"
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleConfirm(this.object);
      this.close();
    });
  }

  open(objectId) {
    super.open();
    this.object = objectId;
  }
}
