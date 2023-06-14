export class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
    this.button = formElement.querySelector(this.settings.submitButtonSelector);
    this.inputElements = Array.from(
      formElement.querySelectorAll(this.settings.inputSelector)
    );
  }

  _setEventListeners() {
    this.inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleInputErrorDisplay(this.formElement, input);
        this._toggleButtonState(this.inputElements);
      });
    });
  }

  _checkInputValidity(input) {
    return input.validity.valid;
  }

  _checkFormValidity(inputElements) {
    return inputElements.every((input) => this._checkInputValidity(input));
  }

  _hideError(input, errorMessage) {
    errorMessage.classList.remove(this.settings.errorClass);
    input.classList.remove(this.settings.inputErrorClass);
  }

  _showError(input, errorMessage) {
    errorMessage.classList.add(this.settings.errorClass);
    input.classList.add(this.settings.inputErrorClass);
  }

  _toggleInputErrorDisplay(form, input) {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    if (this._checkInputValidity(input)) {
      this._hideError(input, errorMessage);
    } else {
      this._showError(input, errorMessage);
    }
  }

  _enableButton(button) {
    button.classList.remove(this.settings.inactiveButtonClass);
    button.disabled = false;
  }

  _disableButton(button) {
    button.classList.add(this.settings.inactiveButtonClass);
    button.disabled = true;
  }

  _toggleButtonState() {
    if (this._checkFormValidity(this.inputElements)) {
      this._enableButton(this.button);
    } else {
      this._disableButton(this.button);
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this.inputElements.forEach((inputElement) => {
      const errorMessage = this.formElement.querySelector(
        `#${inputElement.id}-error`
      );
      this._hideError(inputElement, errorMessage);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
