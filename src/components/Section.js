export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }

  renderItems() {
    this.items.forEach((item) => {
      this.appendItem(this.renderer(item));
    });
  }

  appendItem(element) {
    this.container.append(element);
  }

  prependItem(element) {
    this.container.prepend(element);
  }
}
