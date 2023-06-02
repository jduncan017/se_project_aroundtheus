// FUNCTIONS
function checkInputValidity(input) {
  return input.validity.valid;
}

function checkFormValidity(inputElements) {
  return inputElements.every((input) => checkInputValidity(input));
}

function createInputArray(form, config) {
  const inputElements = Array.from(form.querySelectorAll(config.inputSelector));
  return inputElements;
}

function toggleInputErrorDisplay(form, input, config) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = input.validationMessage;
  if (checkInputValidity(input)) {
    errorMessage.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    errorMessage.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
}

function toggleButtonState(form, inputElements, config) {
  const button = form.querySelector(config.submitButtonSelector);
  if (checkFormValidity(inputElements)) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputElements = createInputArray(form, config);
  inputElements.forEach((input) => {
    input.addEventListener("input", () => {
      toggleInputErrorDisplay(form, input, config);
      toggleButtonState(form, inputElements, config);
      // ^ toggleButtonState from index.js
    });
  });
}

function enableValidation(config) {
  const modalForms = Array.from(document.querySelectorAll(config.formSelector));
  modalForms.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(config);
// config object defined in config.js
