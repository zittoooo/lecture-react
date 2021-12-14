import { on, qs } from "../helpers.js";
import { qs, on } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);
    this.inputElement = qs("[type=text]", this.element);

    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyup());
    this.on("submit", (event) => this.handleSubmit(event));
    // TODO
    on(this.resetElement, "click", () => this.handleReset());
    // this.on("reset", () => this.handleReset());
  }

  handleKeyup() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
    // TODO
    if (value.length <= 0) {
      this.handleReset();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.inputElement;
    // console.log("submit");
    this.emit("@submit", { value });
  }

  handleReset() {
    console.log(tag, "handleReset");
    // this.inputElement.value="";
    this.emit("@reset" , 1);
  }

  handleSubmit(event) {
      event.preventDefault();
      console.log(tag, "handleSubmit");
      const {value} = this.inputElement;
      this.emit("@submit", {value}); // 이벤트이름, data(검색어) 전달
  }

}
