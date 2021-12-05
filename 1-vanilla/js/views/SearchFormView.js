import View from './View.js';
import { qs } from '../helpers.js';

export default class SearchFormView extends View {
    constructor() {
        super(qs('#search-form-view'));

        this.resetElement = qs("[type=reset]", this.element) // scope: this.element
        this.showResetButton(true);
    }

    showResetButton(visible = true){
        this.resetElement.style.display = visible ? "block" : "none";
    }
}