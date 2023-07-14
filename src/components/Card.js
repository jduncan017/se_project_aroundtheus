export class Card {
  static cardImageLinks = [];

  constructor(
    { name, link, owner, _id, likes },
    userId,
    templateElement,
    placeholderImage,
    handleCardClick,
    confirmPopup,
    duplicateCardsArray,
    api
  ) {
    this.text = name;
    this.imageLink = link;
    this.ownerId = owner._id;
    this.cardId = _id;
    this.cardLikesArray = likes;
    this.userId = userId;
    this.newCard = templateElement.cloneNode(true);
    this.cardImage = this.newCard.querySelector(".card__image");
    this.cardTitle = this.newCard.querySelector(".card__title");
    this.cardLikesCounter = this.newCard.querySelector(".card__likes-counter");
    this.placeholderImage = placeholderImage;
    this.handleCardClick = handleCardClick;
    this.confirmPopup = confirmPopup;
    this.cardLikeBtn = this.newCard.querySelector(".card__like-button");
    this.cardTrashBtn = this.newCard.querySelector(".card__trash-button");
    this.cardSelector = this.cardTrashBtn.parentElement;
    this.duplicateCardsArray = duplicateCardsArray;
    this.api = api;
  }

  _addListeners() {
    // Add event listeners to toggle like button:
    this.cardLikeBtn.addEventListener("click", () => {
      this.cardLikeBtn.classList.toggle("card__like-button_active");
      this.toggleLike();
    });
    // Add event listeners to delete card with trash button:
    this.cardTrashBtn.addEventListener("click", () =>
      this.confirmPopup.open(this.cardId)
    );
    // Add event listeners for image popups:
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this.cardImage.src, this.text);
    });
  }

  _setInitialState() {
    // add event listeners
    this._addListeners();

    // set trash icon visibility
    if (!(this.ownerId === this.userId)) {
      this.cardTrashBtn.classList.add("card__trash-button_invisible");
    }
    // set like button initial state
    if (this.cardLikesArray.some((user) => user._id === this.userId)) {
      this.cardLikeBtn.classList.add("card__like-button_active");
    } else {
      this.cardLikeBtn.classList.remove("card__like-button_active");
    }
    // update likes counter
    this.updateLikes();
  }

  _checkForDuplicates() {
    const showDuplicatesCheckbox = document.querySelector(
      "#show-duplicates-checkbox"
    );
    // check if card image is a duplicate
    if (Card.cardImageLinks.includes(this.imageLink)) {
      // check if duplicates should be shown
      if (!showDuplicatesCheckbox.checked) {
        this.newCard.classList.add("card_invisible");
      }
      // add to duplicateCardsArray
      this.duplicateCardsArray.push(this.newCard.id);
    } else {
      Card.cardImageLinks.push(this.imageLink);
    }
  }

  createCard() {
    // add content to each element
    this.cardImage.src = this.imageLink;
    this.cardImage.onerror = () => {
      this.cardImage.src = this.placeholderImage;
    };
    this.cardImage.alt = this.text;
    this.cardTitle.textContent = this.text;
    this.newCard.id = this.cardId;

    // check for card duplicates and initialize card state
    this._checkForDuplicates();
    this._setInitialState();

    // output the updated card clone
    return this.newCard;
  }

  toggleLike() {
    const method = this.cardLikeBtn.classList.contains(
      "card__like-button_active"
    )
      ? "likeCard"
      : "unlikeCard";

    this.api[method](this.cardId)
      .then((card) => {
        this.cardLikesArray = card.likes;
        this.updateLikes();
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        this.cardLikeBtn.classList.toggle("card__like-button_active");
      });
  }

  updateLikes() {
    this.cardLikesCounter.textContent = this.cardLikesArray.length;
  }

  removeFromImageLinks() {
    const index = Card.cardImageLinks.indexOf(this.imageLink);
    if (index > -1) {
      Card.cardImageLinks.splice(index, 1);
    }
  }
}
