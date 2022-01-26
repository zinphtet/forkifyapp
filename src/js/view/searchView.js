class SearchView {
  _form = document.querySelector('.search');
  _input = document.querySelector('.search__field');

  getQuery() {
    const query = this._input.value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._input.value = '';
  }
  addHandlerSearch(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
