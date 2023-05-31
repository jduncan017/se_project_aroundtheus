// Initial image array:
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

// Card Variables:
const cardTemplate = document.querySelector("#cards").content.firstElementChild;
const cardsList = document.querySelector(".cards__list");
const imageModal = document.querySelector("#image-modal");
const imageModalTitle = imageModal.querySelector(".image-modal__title");

// function for rendering card data:
function renderCard(cardData) {
  cardsList.prepend(cardData);
}

// function for adding all of the event listeners:
function addListeners(card, newCard, cardImage) {
  const cardLikeBtn = newCard.querySelector(".card__like-button");
  const cardTrashBtn = newCard.querySelector(".card__trash-button");
  // Add event listeners to toggle like button:
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  });
  // Add event listeners to delete card with trash button:
  cardTrashBtn.addEventListener("click", () => {
    const parentCard = cardTrashBtn.parentElement;
    parentCard.remove();
  });
  // Add event listeners for image modals:
  cardImage.addEventListener("click", () => {
    const modalImage = imageModal.querySelector(".image-modal__image");
    modalImage.src = card.link;
    modalImage.alt = card.name;
    imageModalTitle.textContent = card.name;
    openModal(imageModal);
  });
}

// function for creating a card:
function createCard(card) {
  // clone the template
  const newCard = cardTemplate.cloneNode(true);
  // select the elements
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  // add content to each element
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  // add event listeners
  addListeners(card, newCard, cardImage);
  // output the updated card clone
  return newCard;
}

// Function for adding images to page
function addImages(imageData) {
  imageData.forEach((card) => {
    const newCard = createCard(card);
    // append to HTML
    renderCard(newCard);
  });
}

// add initial images to page:
addImages(initialCards);

// MODAL FUNCATIONALITY
// Modal variable definitions:
// (specific defniitions listed under each modal)
const editProfileModal = document.querySelector("#edit-modal");
const addImageModal = document.querySelector("#add-image-modal");

// GENERAL MODAL FUNCTIONS:
// Open Functionality
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Close modal functionality:
const closeModalButtons = document.querySelectorAll(".modal__close-button");
const modalOverlay = document.querySelectorAll(".modal");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

modalOverlay.forEach((overlay) => {
  overlay.addEventListener("mousedown", (event) => {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(overlay);
    }
  });
});

// PROFILE EDIT MODAL:
// Variables:
const editProfileBtn = document.querySelector(".profile__name-button");
const profileFormElement = document.querySelector("#edit-profile-form");
const profileEditCloseBtn = editProfileModal.querySelector(
  ".modal__close-button"
);

// Function prefills form values:
function fillProfileForm() {
  const profileName = document.querySelector(
    ".profile__name-title"
  ).textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  editProfileModal.querySelector("#name").value = profileName;
  editProfileModal.querySelector("#description").value = profileDescription;
}

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  fillProfileForm();
  openModal(editProfileModal);
});

// Form submission handler.
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const profileNameInput = profileFormElement.querySelector("#name");
  const profileJobInput = profileFormElement.querySelector("#description");
  const profileName = document.querySelector(".profile__name-title");
  const profileJob = document.querySelector(".profile__description");
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closeModal(editProfileModal);
};

// Sumbit Button Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ADD IMAGE MODAL:
// Variables:
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormElement = document.querySelector("#add-image-form");
const button = imageFormElement.querySelector(".modal__submit-button");

// Functionality for the image add button
addImageBtn.addEventListener("click", function () {
  openModal(addImageModal);
});

// function for submitting images
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const imageTitleInput = evt.target.title;
  const imageLinkInput = evt.target.link;
  const imageData = [
    {
      name: imageTitleInput.value,
      link: imageLinkInput.value,
    },
  ];
  addImages(imageData);
  imageFormElement.reset();
  closeModal(addImageModal);
  button.classList.add("modal__submit-button_disabled");
  button.disabled = true;
}

// event listener to submit image
imageFormElement.addEventListener("submit", handleImageFormSubmit);
