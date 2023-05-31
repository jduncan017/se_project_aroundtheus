const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input-invalid",
  errorClass: "modal__error_visible",
};

// GLOBAL VARIABL ES
const modalForms = Array.from(document.querySelectorAll(config.formSelector));

// FUNCTIONS
function checkInputValidity(input) {
  if (input.validity.valid) {
    return true;
  }
  return false;
}

function toggleInputErrorDisplay(form, input, { inputErrorClass, errorClass }) {
  let errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = input.validationMessage;
  if (checkInputValidity(input)) {
    errorMessage.classList.remove(errorClass);
    return input.classList.remove(inputErrorClass);
  }
  errorMessage.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

function toggleButtonState(
  form,
  inputElements,
  { submitButtonSelector, inactiveButtonClass }
) {
  const button = form.querySelector(submitButtonSelector);
  const isValid = inputElements.every((input) => {
    return checkInputValidity(input);
  });
  if (isValid) {
    button.classList.remove(inactiveButtonClass);
    return (button.disabled = false);
  }
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function setEventListeners(form) {
  const inputElements = Array.from(form.querySelectorAll(config.inputSelector));
  inputElements.forEach((input) => {
    input.addEventListener("input", (event) => {
      event.preventDefault();
      toggleInputErrorDisplay(form, input, config);
      toggleButtonState(form, inputElements, config);
    });
  });
}

function enableValidation() {
  const formElements = Array.from(
    document.querySelectorAll(config.formSelector)
  );
  formElements.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation();
