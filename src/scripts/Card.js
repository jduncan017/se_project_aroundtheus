// imports
export class Card {
  constructor(text, imageLink, templateElement, handleCardClick) {
    this.text = text;
    this.imageLink = imageLink;
    this.newCard = templateElement.cloneNode(true);
    this.cardImage = this.newCard.querySelector(".card__image");
    this.cardTitle = this.newCard.querySelector(".card__title");
    this.handleCardClick = handleCardClick;
  }

  _addListeners(newCard, cardImage) {
    const cardLikeBtn = newCard.querySelector(".card__like-button");
    const cardTrashBtn = newCard.querySelector(".card__trash-button");
    // Add event listeners to toggle like button:
    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle("card__like-button_active");
    });
    // Add event listeners to delete card with trash button:
    cardTrashBtn.addEventListener("click", () => {
      const parentCard = cardTrashBtn.parentElement;
      parentCard.remove();
    });
    // Add event listeners for image popups:
    cardImage.addEventListener("click", () => {
      this.handleCardClick(this.imageLink, this.text);
    });
  }

  createCard() {
    // add content to each element
    this.cardImage.src = this.imageLink;
    this.cardImage.alt = this.text;
    this.cardTitle.textContent = this.text;
    // add event listeners
    this._addListeners(this.newCard, this.cardImage);
    // output the updated card clone
    return this.newCard;
  }
}
