export class Card {
  static cardImageLinks = [];

  constructor(
    { name, link, owner, _id, likes },
    userId,
    templateElement,
    placeholderImage,
    handleCardClick,
    handleTrashClick,
    duplicateCardsArray,
    handleLikeClick
  ) {
    this._text = name;
    this._imageLink = link;
    this._ownerId = owner._id;
    this._cardId = _id;
    this._cardLikesArray = likes;
    this._userId = userId;
    this._newCard = templateElement.cloneNode(true);
    this._cardImage = this._newCard.querySelector(".card__image");
    this._cardTitle = this._newCard.querySelector(".card__title");
    this._cardLikesCounter = this._newCard.querySelector(
      ".card__likes-counter"
    );
    this._placeholderImage = placeholderImage;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._cardLikeBtn = this._newCard.querySelector(".card__like-button");
    this._cardTrashBtn = this._newCard.querySelector(".card__trash-button");
    this._cardSelector = this._cardTrashBtn.parentElement;
    this._duplicateCardsArray = duplicateCardsArray;
    this._handleLikeClick = handleLikeClick;
  }

  /* --------------------------------------- */
  /*             PUBLIC METHODS              */
  /* --------------------------------------- */

  getId() {
    return this._cardId;
  }

  setLikes(likes) {
    this._cardLikesArray = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._cardLikesArray.some((user) => user._id === this._userId);
  }

  createCard() {
    this._cardImage.src = this._imageLink;
    this._cardImage.onerror = () => {
      this._cardImage.src = this._placeholderImage;
    };
    this._cardImage.alt = this._text;
    this._cardTitle.textContent = this._text;
    this._newCard.id = this._cardId;

    this._checkForDuplicates();
    this._setInitialState();

    return this._newCard;
  }

  removeFromImageLinks() {
    const index = Card.cardImageLinks.indexOf(this._imageLink);
    if (index > -1) {
      Card.cardImageLinks.splice(index, 1);
    }
  }

  /* --------------------------------------- */
  /*             PRIVATE METHODS             */
  /* --------------------------------------- */

  _addListeners() {
    this._cardLikeBtn.addEventListener("click", () => {
      this._cardLikeBtn.classList.toggle("card__like-button_active");
      this._handleLikeClick(this);
    });

    this._cardTrashBtn.addEventListener("click", () =>
      this._handleTrashClick(this)
    );

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardImage.src, this._text);
    });
  }

  _checkForDuplicates() {
    const showDuplicatesCheckbox = document.querySelector(
      "#show-duplicates-checkbox"
    );

    if (Card.cardImageLinks.includes(this._imageLink)) {
      if (!showDuplicatesCheckbox.checked) {
        this._newCard.classList.add("card_invisible");
      }

      this._duplicateCardsArray.push(this._newCard.id);
    } else {
      Card.cardImageLinks.push(this._imageLink);
    }
  }

  _setInitialState() {
    this._addListeners();

    if (!(this._ownerId === this._userId)) {
      this._cardTrashBtn.remove();
    }

    this._renderLikes();
  }

  _renderLikes() {
    this._cardLikesCounter.textContent = this._cardLikesArray.length;

    if (this.isLiked()) {
      this._cardLikeBtn.classList.add("card__like-button_active");
    } else {
      this._cardLikeBtn.classList.remove("card__like-button_active");
    }
  }
}
