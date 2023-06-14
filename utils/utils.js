// imports
import { renderCard, formValidators } from "../pages/index.js";

// MODAL FUNCATIONALITY
// GENERAL MODAL FUNCTIONS:
// Open Functionality
export function openModal(modal, formClassName) {
  modal.classList.add("modal_opened");
  addModalListeners(modal);
  // reset form inputs
  formValidators[formClassName].resetValidation();
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
  if (event.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

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
  openModal(editProfileModal, "edit-profile-form");
});

// Form submission handler.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

// Sumbit Button Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ADD IMAGE MODAL:
// Variables:
const addImageModal = document.querySelector("#add-image-modal");
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormElement = document.forms["add-image-form"];

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
  openModal(addImageModal, "add-image-form");
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
}

// event listener to submit image
imageFormElement.addEventListener("submit", handleImageFormSubmit);
