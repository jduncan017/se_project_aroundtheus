// MODAL FUNCATIONALITY
// GENERAL MODAL FUNCTIONS:
// Open Functionality
export function openModal(modal) {
  modal.classList.add("modal_opened");
  addModalListeners(modal);
}

// Close modal functionality:
export function closeModal(modal) {
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
