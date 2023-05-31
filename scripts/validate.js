// Configuration object is imported from config.js
const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
} = config;

// GLOBAL VARIABLES
const modalForms = Array.from(document.querySelectorAll(formSelector));

// FUNCTIONS
function checkInputValidity(input) {
  return input.validity.valid;
}

function toggleInputErrorDisplay(form, input) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = input.validationMessage;
  if (checkInputValidity(input)) {
    errorMessage.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
    return;
  }
  errorMessage.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

function toggleButtonState(form, inputElements) {
  const button = form.querySelector(submitButtonSelector);
  const isValid = inputElements.every((input) => checkInputValidity(input));
  if (isValid) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
    return;
  }
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function setEventListeners(form) {
  const inputElements = Array.from(form.querySelectorAll(inputSelector));
  toggleButtonState(form, inputElements);
  inputElements.forEach((input) => {
    input.addEventListener("input", () => {
      toggleInputErrorDisplay(form, input);
      toggleButtonState(form, inputElements);
    });
  });
}

function enableValidation() {
  modalForms.forEach((form) => {
    setEventListeners(form);
  });
}

enableValidation();
