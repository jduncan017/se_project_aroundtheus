import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this.popup.querySelector(".image-popup__image");
    this.imagePopupTitle = this.popup.querySelector(".image-popup__title");
  }
  open(imageLink, text) {
    this.popupImage.src = imageLink;
    this.popupImage.alt = text;
    this.imagePopupTitle.textContent = text;
    super.open();
  }
}
