/* --------------------------------------- */
/*                 IMPORTS                 */
/* --------------------------------------- */
import { initialCards, settings } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";
import "../favicon.ico";

/* --------------------------------------- */
/*          VARIABLES DEFINITIONS          */
/* --------------------------------------- */
export const cardTemplate =
  document.querySelector("#cards").content.firstElementChild;
const formElements = Array.from(
  document.querySelectorAll(settings.formSelector)
);
const formValidators = {};

// FUNCTIONS
function renderCard(cardData) {
  const card = new Card(
    cardData.title,
    cardData.link,
    cardTemplate,
    handleCardClick
  );
  return card.createCard();
}

/* --------------------------------------- */
/*           INITIAL RENDERING             */
/* --------------------------------------- */
const cardsSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
cardsSection.renderItems();

// add validation to all forms
formElements.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

/* --------------------------------------- */
/*           PROFILE EDIT POPUP            */
/* --------------------------------------- */
// Variables:
const editProfileBtn = document.querySelector(".profile__name-button");

// Popup Creation:
const userInfoData = {
  userNameSelector: ".profile__name-title",
  userJobSelector: ".profile__job",
};
const userInfo = new UserInfo(userInfoData);

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
  userInfo.setUserInfo({
    name: inputs.name,
    job: inputs.job,
  });
}

/* --------------------------------------- */
/*             ADD IMAGE POPUP             */
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
  const card = renderCard(inputs);
  cardsSection.addItem(card);
  // reset form inputs
}

// function for opening image popups
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}
