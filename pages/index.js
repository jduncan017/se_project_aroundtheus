// imports
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

// Initial arrays:
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input-invalid",
  errorClass: "modal__error_visible",
};

// VARIABLES
export const cardTemplate =
  document.querySelector("#cards").content.firstElementChild;
const formElements = Array.from(
  document.querySelectorAll(settings.formSelector)
);
const cardsList = document.querySelector(".cards__list");
const formValidators = {};

function renderCard(cardData) {
  const card = new Card(cardData.name, cardData.link, cardTemplate);
  const newCard = card.createCard(cardData);
  cardsList.prepend(newCard);
}

// initialize the page with cards
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

// add validation to all forms
formElements.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");
  formValidators[formName] = validator;
  validator.enableValidation();
});

// PROFILE EDIT MODAL:
// Variables:
const editProfileModal = document.querySelector("#edit-modal");
const editProfileBtn = document.querySelector(".profile__name-button");
const profileFormElement = document.forms["edit-profile-form"];
const profileName = document.querySelector(".profile__name-title");
const profileNameInput = editProfileModal.querySelector("#name");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = editProfileModal.querySelector("#description");

// Function prefills form values:
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(editProfileModal);
});

// Form submission handler.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
  // reset form inputs
  formValidators["edit-profile-form"].resetValidation();
}

// Sumbit Button Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ADD IMAGE MODAL:
// Variables:
const addImageModal = document.querySelector("#add-image-modal");
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormElement = document.forms["add-image-form"];

// Functionality for the image add button
addImageBtn.addEventListener("click", () => {
  openModal(addImageModal);
});

// function for submitting images
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const imageTitleInput = evt.target.title;
  const imageLinkInput = evt.target.link;
  const imageData = {
    name: imageTitleInput.value,
    link: imageLinkInput.value,
  };
  renderCard(imageData);
  imageFormElement.reset();
  closeModal(addImageModal);
  // reset form inputs
  formValidators["add-image-form"].resetValidation();
}

// event listener to submit image
imageFormElement.addEventListener("submit", handleImageFormSubmit);
