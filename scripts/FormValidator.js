import {
  createInputArray,
  enableButton,
  disableButton,
} from "../utils/utils.js";

export class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _checkInputValidity(input) {
    return input.validity.valid;
  }

  _checkFormValidity(inputElements) {
    return inputElements.every((input) => this._checkInputValidity(input));
  }

  _toggleInputErrorDisplay(form, input) {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    if (this._checkInputValidity(input)) {
      errorMessage.classList.remove(this.settings.errorClass);
      input.classList.remove(this.settings.inputErrorClass);
    } else {
      errorMessage.classList.add(this.settings.errorClass);
      input.classList.add(this.settings.inputErrorClass);
    }
  }

  _toggleButtonState(form, inputElements) {
    const button = form.querySelector(this.settings.submitButtonSelector);
    if (this._checkFormValidity(inputElements)) {
      enableButton(button);
    } else {
      disableButton(button);
    }
  }

  _setEventListeners(form) {
    const inputElements = createInputArray(form);
    inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleInputErrorDisplay(form, input);
        this._toggleButtonState(form, inputElements);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this.formElement);
  }
}
