export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userPictureSelector }) {
    this.userNameElement = document.querySelector(userNameSelector);
    this.userAboutElement = document.querySelector(userAboutSelector);
    this.userPictureElement = document.querySelector(userPictureSelector);
  }

  getUserInfo() {
    return {
      name: this.userNameElement.textContent,
      about: this.userAboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this.userNameElement.textContent = name;
    this.userAboutElement.textContent = about;
  }

  setUserPicture({ avatar }) {
    this.userPictureElement.src = avatar;
  }
}
