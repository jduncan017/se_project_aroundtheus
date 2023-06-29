export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this.userNameElement = document.querySelector(userNameSelector);
    this.userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this.userNameElement.textContent,
      job: this.userJobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this.userNameElement.textContent = name;
    this.userJobElement.textContent = job;
  }
}
