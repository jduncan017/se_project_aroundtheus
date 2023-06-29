export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this.userNameElement = document.querySelector(userNameSelector);
    this.userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      userName: this.userNameElement.textContent,
      userJob: this.userJobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = job;
  }
}
