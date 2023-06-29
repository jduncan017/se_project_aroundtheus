// imports
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import "./index.css";
import "../favicon.ico";

// Initial arrays:
const initialCards = [
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input-invalid",
  errorClass: "popup__error_visible",
};

// VARIABLES
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

// INITIAL CARDS RENDERING
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

// PROFILE EDIT popup:
// Variables:
const editProfilePopup = document.querySelector("#edit-popup");
const editProfileBtn = document.querySelector(".profile__name-button");
const profileNameInput = editProfilePopup.querySelector("#name");
const profilejobInput = editProfilePopup.querySelector("#job");

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

// Function prefills form values:
function fillProfileForm() {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.userName;
  profilejobInput.value = data.userJob;
}

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  fillProfileForm();
  editProfileForm.open();
});

// Form submission handler.
function handleProfileFormSubmit(inputs) {
  userInfo.setUserInfo({
    name: inputs.name,
    job: inputs.job,
  });

  // reset form inputs
  formValidators["edit-profile-form"].resetValidation();
}

// ADD IMAGE POPUP:
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
  addImagePopup.open();
});

// function for submitting images
function handleImageFormSubmit(inputs) {
  const card = renderCard(inputs);
  cardsSection.addItem(card);
  // reset form inputs
  formValidators["add-image-form"].resetValidation();
}

// function for opening image popups
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}
