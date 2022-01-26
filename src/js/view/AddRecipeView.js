import icons from '../../img/icons.svg';
import View from './View.js';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _sucMessage = 'Successful Updated new Recipe . Have fun.';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _toggleWinodw() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._openBtn.addEventListener('click', this._toggleWinodw.bind(this));
  }
  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this._toggleWinodw.bind(this));
    // this._window.addEventListener('click', this._toggleWinodw.bind(this));
    this._closeBtn.addEventListener('click', this._toggleWinodw.bind(this));
  }
  addHandlerForm(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
