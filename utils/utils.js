// imports
import { settings } from "../pages/index.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { cardTemplate } from "../pages/index.js";

// MODAL FUNCATIONALITY
// GENERAL MODAL FUNCTIONS:
// Open Functionality
export function openModal(modal) {
  modal.classList.add("modal_opened");
  addModalListeners(modal);
}

// Close modal functionality:
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  removeModalListeners(modal);
}

function closeModalOnClick(event) {
  const modal = event.target.closest(".modal");
  closeModal(modal);
}

function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

function closeModalOnEsc(event) {
  const currentModal = document.querySelector(".modal_opened");
  if (event.key === "Escape" && currentModal) {
    closeModal(currentModal);
  }
}

// PROFILE EDIT MODAL:
// Variables:
const editProfileModal = document.querySelector("#edit-modal");
const editProfileBtn = document.querySelector(".profile__name-button");
const profileFormElement = document.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__name-title");
const profileDescription = document.querySelector(".profile__description");

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(editProfileModal, settings);
});

// Function prefills form values:
function fillProfileForm() {
  editProfileModal.querySelector("#name").value = profileName.textContent;
  editProfileModal.querySelector("#description").value =
    profileDescription.textContent;
}

// Form submission handler.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileNameInput = profileFormElement.querySelector("#name");
  const profileJobInput = profileFormElement.querySelector("#description");
  const profileName = document.querySelector(".profile__name-title");
  const profileJob = document.querySelector(".profile__description");
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closeModal(editProfileModal);

  // disable the submit button
  const submitBtn = profileFormElement.querySelector("#submit-button");
  const formValidatorInstance = new FormValidator(settings, imageFormElement);
  formValidatorInstance.disableButton(submitBtn);
}

// Sumbit Button Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ADD IMAGE MODAL:
// Variables:
const addImageModal = document.querySelector("#add-image-modal");
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormElement = document.querySelector("#add-image-form");
const imageSubmitBtn = imageFormElement.querySelector(".modal__submit-button");

function addModalListeners(modal) {
  const closeButton = modal.querySelector(".modal__close-button");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", closeModalOnEsc);
  closeButton.addEventListener("click", closeModalOnClick);
}

function removeModalListeners(modal) {
  const closeButton = modal.querySelector(".modal__close-button");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalOnEsc);
  closeButton.removeEventListener("click", closeModalOnClick);
}

// Functionality for the image add button
addImageBtn.addEventListener("click", () => {
  openModal(addImageModal, settings);
  const formValidatorInstance = new FormValidator(settings, imageFormElement);
  formValidatorInstance.disableButton(imageSubmitBtn);
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
  const card = new Card(imageData.name, imageData.link, cardTemplate);
  card.renderCard(imageData);
  imageFormElement.reset();
  closeModal(addImageModal);
}

// event listener to submit image
imageFormElement.addEventListener("submit", handleImageFormSubmit);

// GENERAL FUNCTIONS
export function createInputArray(form) {
  const inputElements = Array.from(
    form.querySelectorAll(settings.inputSelector)
  );
  return inputElements;
}
