// imports
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";

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
export const formValidators = {};

export function renderCard(cardData) {
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
