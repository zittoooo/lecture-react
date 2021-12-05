const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView.on("@submit", (event) =>
      this.search(event.detail.value)
    );
    // TODO

    this.searchFormView.on("@reset", (event) =>
      this.remove()
    );
  }

  search(searchKeyword) {
    console.log(tag, "search", searchKeyword);
  }

  remove() {
    console.log(tag, "remove");
  }
}
