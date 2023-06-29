export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = document.querySelector(selector);
  }

  renderItems() {
    this.items.forEach((item) => {
      this.addItem(this.renderer(item));
    });
  }

  addItem(element) {
    this.selector.prepend(element);
  }
}
