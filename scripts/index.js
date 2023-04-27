// card templates:
// delclaring array:
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// selecting the card template & list(parent):
const cardTemplate = document.querySelector("#cards").content;
const cardsList = document.querySelector(".cards__list");

// function declaration for getting card data:
function getCardElement(data) {
  // clone the template
  let newCard = cardTemplate.cloneNode(true);
  // select the elements
  let cardImage = newCard.querySelector(".card__image");
  let cardTitle = newCard.querySelector(".card__title");
  // add content
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return newCard;
}

// iterating through cards data array:
for (let i = 0; i < initialCards.length; i++) {
  let cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}

// Add functionality for the edit profile edit button
const editProfile = document.querySelector(".profile__name-button");
const closeModal = document.querySelector(".modal__close-button");
const modal = document.querySelector(".modal");

editProfile.addEventListener("click", function () {
  let profileName = document.querySelector(".profile__name-title").textContent;
  let profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  modal.classList.add("modal_opened");
  modal.querySelector("#name").value = profileName;
  modal.querySelector("#description").value = profileDescription;
});

closeModal.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

// find the form in the DOM
const profileFormElement = document.querySelector(".edit-profile-form");

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

// find the profile elements in the DOM
const profileName = document.querySelector(".profile__name-title");
const profileJob = document.querySelector(".profile__description");

// the form submission handler.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modal.classList.remove("modal_opened");
}

// connect the handler to the form:
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
