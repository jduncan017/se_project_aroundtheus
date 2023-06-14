// imports
import { openModal } from "../utils/utils.js";

export class Card {
  constructor(text, imageLink, templateElement) {
    this.text = text;
    this.imageLink = imageLink;
    this.templateElement = templateElement;
    this.cardsList = document.querySelector(".cards__list");
  }

  renderCard(cardData) {
    const newCard = this._createCard(cardData);
    this.cardsList.prepend(newCard);
  }

  _addListeners(newCard) {
    const imageModal = document.querySelector("#image-modal");
    const imageModalTitle = imageModal.querySelector(".image-modal__title");
    const modalImage = imageModal.querySelector(".image-modal__image");

    newCard.addEventListener("click", (evt) => {
      const clickedElement = evt.target;
      switch (true) {
        case clickedElement.classList.contains("card__like-button"):
          clickedElement.classList.toggle("card__like-button_active");
          break;
        case clickedElement.classList.contains("card__trash-button"):
          const parentCard = clickedElement.closest(".card");
          parentCard.remove();
          break;
        case clickedElement.classList.contains("card__image"):
          modalImage.src = this.imageLink;
          modalImage.alt = this.text;
          imageModalTitle.textContent = this.text;
          openModal(imageModal);
          break;
        default:
          break;
      }
    });
  }

  _createCard() {
    // clone the template
    const newCard = this.templateElement.cloneNode(true);
    // select the elements
    const cardImage = newCard.querySelector(".card__image");
    const cardTitle = newCard.querySelector(".card__title");
    // add content to each element
    cardImage.src = this.imageLink;
    cardImage.alt = this.text;
    cardTitle.textContent = this.text;
    // add event listeners
    this._addListeners(newCard, cardImage);
    // output the updated card clone
    return newCard;
  }
}
