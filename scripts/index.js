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
const modalContainer = imageModal.querySelector(".image-modal__container");
const modalTitle = imageModal.querySelector(".image-modal__title");

// Function for adding images to page
const addImages = (imageData) => {
  imageData.forEach((card) => {
    // clone the template
    const newCard = cardTemplate.cloneNode(true);
    // select the elements
    const cardImage = newCard.querySelector(".card__image");
    const cardTitle = newCard.querySelector(".card__title");
    const cardLikeBtn = newCard.querySelector(".card__like-button");
    const cardTrashBtn = newCard.querySelector(".card__trash-button");

    // add content to the elements
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
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
      imageModal.querySelector(".image-modal__title").textContent = card.name;
      imageModal.classList.add("modal_opened");
    });

    // append to HTML
    cardsList.prepend(newCard);
  });
};

// add initial images to page:
addImages(initialCards);

// MODAL FUNCATIONALITY
// Modal variable definitions:
// (specific defniitions listed under each modal)
const editModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-image-modal");

// GENERAL MODAL FUNCTIONS:
// Open Functionality
const openModal = (modal) => {
  modal.classList.add("modal_opened");
};

// Close button functionality:
const closeButtons = document.querySelectorAll(".modal__close-button");

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
};

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// PROFILE EDIT MODAL:
// Variables:
const editProfileBtn = document.querySelector(".profile__name-button");
const profileFormElement = document.querySelector("#edit-profile-form");
const profileEditCloseBtn = editModal.querySelector(".modal__close-button");

// Functionality for the edit profile button
editProfileBtn.addEventListener("click", function () {
  const profileName = document.querySelector(
    ".profile__name-title"
  ).textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  openModal(editModal);
  editModal.querySelector("#name").value = profileName;
  editModal.querySelector("#description").value = profileDescription;
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
  closeModal(editModal);
};

// Sumbit Button Listener
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ADD IMAGE MODAL:
// Variables:
const addImageBtn = document.querySelector(".profile__add-button");
const imageFormElement = document.querySelector("#add-image-form");

// Functionality for the image add button
addImageBtn.addEventListener("click", function () {
  openModal(addModal);
});

// function for submitting images
const handleImageFormSubmit = (evt) => {
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
  imageTitleInput.value = "";
  imageLinkInput.value = "";
  closeModal(addModal);
};

// event listener to submit image
imageFormElement.addEventListener("submit", handleImageFormSubmit);
