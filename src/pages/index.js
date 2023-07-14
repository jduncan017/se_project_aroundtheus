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

const profileFormSubmitBtn = document.querySelector("#profile-submit-button");
const imageFormSubmitBtn = document.querySelector("#image-submit-button");
const confirmDeleteBtn = document.querySelector("#confirm-delete-button");
const pictureSubmitBtn = document.querySelector("#picture-submit-button");

/* --------------------------------------- */
/*          VARIABLES DEFINITIONS          */
/* --------------------------------------- */
export const cardTemplate =
  document.querySelector("#cards").content.firstElementChild;
const formElements = Array.from(
  document.querySelectorAll(settings.formSelector)
);
const formValidators = {};

let cardsSection = null;
let userId = null;

// FUNCTIONS
function renderCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    cardTemplate,
    placeholderImage,
    handleCardClick,
    confirmDeletePopup,
    duplicateCardsArray,
    api
  );
  return card.createCard();
}

/* --------------------------------------- */
/*           FETCH SITE DATA               */
/* --------------------------------------- */
const api = new userApi({
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "c1d3050f-9f71-48b4-9235-936056aa4e95",
    "Content-Type": "application/json",
  },
});

const userInfoSelector = {
  userNameSelector: ".profile__name-title",
  userAboutSelector: ".profile__about",
  userPictureSelector: ".profile__picture",
};
const userInfo = new UserInfo(userInfoSelector);

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
    console.error(error);
  });

/* --------------------------------------- */
/*         CONFIRM DELETE POPUP            */
/* --------------------------------------- */
// Variables:
function confirmDelete(cardId) {
  confirmDeleteBtn.textContent = "Deleting...";
  removeFromImageLinksArray(cardId);
  api
    .deleteCard(cardId)
    .then(() => {
      const cardElement = document.getElementById(cardId);
      cardElement.remove();
      confirmDeleteBtn.textContent = "Yes";
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Popup Creation:
const confirmDeletePopup = new PopupConfirm(
  "#confirm-delete-popup",
  confirmDelete
);
confirmDeletePopup.setEventListeners();

/* --------------------------------------- */
/*           INITIAL RENDERING             */
/* --------------------------------------- */
// add validation to all forms
formElements.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

/* --------------------------------------- */
/*        PROFILE PICTURE EDIT FORM      */
/* --------------------------------------- */
// Variables:
const editProfilePictureBtn = document.querySelector(
  ".profile__picture-overlay"
);
const profilePicture = document.querySelector(".profile__picture");

// Popup Creation:
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

// Form submission handler.
function handlePictureFormSubmit(inputs) {
  pictureSubmitBtn.textContent = "Saving...";
  api
    .updateUserPicture({ avatar: inputs.link })
    .then((res) => {
      profilePicture.src = res.avatar;
      editProfilePictureForm.close();
      pictureSubmitBtn.textContent = "Save";
    })
    .catch((err) => {
      console.error(err);
    });
}

/* --------------------------------------- */
/*           PROFILE EDIT FORM             */
/* --------------------------------------- */
// Variables:
const editProfileBtn = document.querySelector(".profile__name-button");

const editProfileForm = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);
editProfileForm.setEventListeners();

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  formValidators["edit-profile-form"].resetValidation();
  const data = userInfo.getUserInfo();
  editProfileForm.setInputValues(data);
  editProfileForm.open();
});

// Form submission handler.
function handleProfileFormSubmit(inputs) {
  profileFormSubmitBtn.textContent = "Saving...";
  api
    .updateUserInfo({ name: inputs.name, about: inputs.about })
    .then((newUserData) => {
      userInfo.setUserInfo({
        name: newUserData.name,
        about: newUserData.about,
      });
      editProfileForm.close();
      ProfileFormSubmitBtn.textContent = "Save";
    })
    .catch((err) => {
      console.error(err);
    });
}

/* --------------------------------------- */
/*             ADD IMAGE FORM              */
/* --------------------------------------- */
// Variables:
const addImageBtn = document.querySelector(".profile__add-button");

// Popup Creation:
const addImagePopup = new PopupWithForm(
  "#add-image-popup",
  handleImageFormSubmit
);
addImagePopup.setEventListeners();

// Functionality for the image add button
addImageBtn.addEventListener("click", () => {
  formValidators["add-image-form"].resetValidation();
  addImagePopup.open();
});

// function for submitting images
function handleImageFormSubmit(inputs) {
  imageFormSubmitBtn.textContent = "Saving...";
  api.addCard({ name: inputs.name, link: inputs.link }).then((res) => {
    const newCard = renderCard(res);
    cardsSection.prependItem(newCard);
    addImagePopup.close();
    imageFormSubmitBtn.textContent = "Save";
  });
}

// function for opening image popups
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

/* --------------------------------------- */
/*      SHOW DUPLICATES FUNCTIONALITY      */
/* --------------------------------------- */
// array for remembering duplicates
let duplicateCardsArray = [];

// Add an event listener for the checkbox
const showDuplicatesCheckbox = document.querySelector(
  "#show-duplicates-checkbox"
);
showDuplicatesCheckbox.addEventListener("change", (event) => {
  duplicateCardsArray.forEach((cardId) => {
    const card = document.getElementById(cardId);
    if (event.target.checked) {
      card.classList.remove("card_invisible");
    } else {
      card.classList.add("card_invisible");
    }
  });
});

// function deletes cards from duplicates array when they are deleted from the server
function removeFromImageLinksArray(cardId) {
  // variable definitions
  const card = document.getElementById(cardId);
  const cardImage = card.querySelector(".card__image");
  // remove from duplicateCardsArray
  duplicateCardsArray = duplicateCardsArray.filter((id) => id !== cardId);
  console.log(card);
  console.log(cardImage.src);
  Card.cardImageLinks = Card.cardImageLinks.filter((imageLink) => {
    return imageLink !== cardImage.src;
  });
}
