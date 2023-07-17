/* --------------------------------------- */
/*                 IMPORTS                 */
/* --------------------------------------- */
import userApi from "../components/Api.js";
import { settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
import "../favicon.ico";
import placeholderImage from "../images/No-Image-Placeholder.png";

/* --------------------------------------- */
/*        FILE VARIABLE DEFINITIONS        */
/* --------------------------------------- */
const formValidators = {};

let cardsSection = null;
let userId = null;

function renderLoading(buttonSelector, message) {
  buttonSelector.textContent = message;
}

/* --------------------------------------- */
/*           INITIAL RENDERING             */
/* --------------------------------------- */
// variable definitions
export const cardTemplate =
  document.querySelector("#cards").content.firstElementChild;
const formElements = Array.from(
  document.querySelectorAll(settings.formSelector)
);

// add validation to all forms
formElements.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

// FUNCTIONS
function renderCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    cardTemplate,
    placeholderImage,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
  );
  return card.createCard();
}

/* --------------------------------------- */
/*           FETCH SITE DATA               */
/* --------------------------------------- */
// Variables:
const userInfoSelector = {
  userNameSelector: ".profile__name-title",
  userAboutSelector: ".profile__about",
  userPictureSelector: ".profile__picture",
};

// Create Classes:
const userInfo = new UserInfo(userInfoSelector);
const api = new userApi({
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "c1d3050f-9f71-48b4-9235-936056aa4e95",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCardsArray]) => {
    userInfo.setUserPicture({ avatar: userData.avatar });
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userId = userData._id;

    cardsSection = new Section(
      { items: initialCardsArray, renderer: renderCard },
      ".cards__list"
    );
    cardsSection.renderItems();
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

/* --------------------------------------- */
/*         CONFIRM DELETE POPUP            */
/* --------------------------------------- */
// Variables:
const confirmDeleteBtn = document.querySelector("#confirm-delete-button");

function handleTrashClick(cardInstance) {
  confirmDeletePopup.open();
  confirmDeletePopup.setAction(
    () => {
      return api
        .deleteCard(cardInstance.getId())
        .then(() => {
          const cardElement = document.getElementById(cardInstance.getId());
          cardElement.remove();
          confirmDeletePopup.close();
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    },
    confirmDeleteBtn,
    renderLoading
  );
}

// Create Popup:
const confirmDeletePopup = new PopupConfirm("#confirm-delete-popup");
confirmDeletePopup.setEventListeners();

/* --------------------------------------- */
/*        PROFILE PICTURE EDIT FORM      */
/* --------------------------------------- */
// Variables:
const pictureSubmitBtn = document.querySelector("#picture-submit-button");
const editProfilePictureBtn = document.querySelector(
  ".profile__picture-overlay"
);

// Create Popup:
const editProfilePictureForm = new PopupWithForm(
  "#edit-profile-picture-popup",
  handlePictureFormSubmit
);
editProfilePictureForm.setEventListeners();

// Functionality for the profile picture button
editProfilePictureBtn.addEventListener("click", function () {
  formValidators["edit-profile-picture-form"].resetValidation();
  editProfilePictureForm.open();
});

// Handle Form Submission:
function handlePictureFormSubmit(inputs) {
  renderLoading(pictureSubmitBtn, "Saving...");
  api
    .updateUserPicture({ avatar: inputs.link })
    .then(() => {
      editProfilePictureForm.close();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    })
    .finally(() => {
      renderLoading(pictureSubmitBtn, "Save");
    });
}

/* --------------------------------------- */
/*           PROFILE EDIT FORM             */
/* --------------------------------------- */
// Variables:
const profileFormSubmitBtn = document.querySelector("#profile-submit-button");
const editProfileBtn = document.querySelector(".profile__name-button");

const editProfileForm = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
editProfileForm.setEventListeners();

// Edit Button Functionality:
editProfileBtn.addEventListener("click", function () {
  formValidators["edit-profile-form"].resetValidation();
  const data = userInfo.getUserInfo();
  editProfileForm.setInputValues(data);
  editProfileForm.open();
});

// Handle Form Submission:
function handleProfileFormSubmit(inputs) {
  renderLoading(profileFormSubmitBtn, "Saving...");
  api
    .updateUserInfo({ name: inputs.name, about: inputs.about })
    .then((newUserData) => {
      userInfo.setUserInfo({
        name: newUserData.name,
        about: newUserData.about,
      });
      editProfileForm.close();
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    })
    .finally(() => {
      renderLoading(profileFormSubmitBtn, "Save");
    });
}

/* --------------------------------------- */
/*             ADD IMAGE FORM              */
/* --------------------------------------- */
// Variables:
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormSubmitBtn = document.querySelector("#image-submit-button");

// Create Popup:
const addImagePopup = new PopupWithForm(
  "#add-image-popup",
  handleImageFormSubmit
);
addImagePopup.setEventListeners();

// Add Button Functionality:
addImageBtn.addEventListener("click", () => {
  formValidators["add-image-form"].resetValidation();
  addImagePopup.open();
});

// Handle Form Submission:
function handleImageFormSubmit(inputs) {
  renderLoading(imageFormSubmitBtn, "Saving...");
  api
    .addCard({ name: inputs.name, link: inputs.link })
    .then((res) => {
      const newCard = renderCard(res);
      cardsSection.prependItem(newCard);
      addImagePopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(imageFormSubmitBtn, "Save");
    });
}

// Create Popup:
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

/* --------------------------------------- */
/*        Like Button Functionality        */
/* --------------------------------------- */
function handleLikeClick(card) {
  const method = card.isLiked() ? "unlikeCard" : "likeCard";

  api[method](card.getId())
    .then((resCard) => {
      card.setLikes(resCard.likes);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}
