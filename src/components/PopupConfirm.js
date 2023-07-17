import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this.popup.querySelector(
      ".confirm-popup__submit-button"
    );
  }

  setAction(action, buttonElement, renderLoading) {
    this._handleFormSubmit = () => {
      renderLoading(buttonElement, "Deleting...");
      action().finally(() => {
        renderLoading(buttonElement, "Yes");
      });
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }

  open(objectId) {
    super.open();
    this.object = objectId;
  }
}
