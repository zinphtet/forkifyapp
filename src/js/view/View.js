import icons from '../../img/icons.svg';

export default class View {
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const recipeMarkup = this._generateMarkup();

    this._clearRecipeContainer();
    this._parentElement.insertAdjacentHTML('afterbegin', recipeMarkup);
  }
  _clearRecipeContainer() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const spinnerMarkup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clearRecipeContainer();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }
  update(data) {
   
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderError(message = this._errMessage) {
    const errMarkup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearRecipeContainer();
    this._parentElement.insertAdjacentHTML('afterbegin', errMarkup);
  }
  renderSuccess(message = this._sucMessage) {
    const sucMarkup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearRecipeContainer();
    this._parentElement.insertAdjacentHTML('afterbegin', sucMarkup);
  }
}
