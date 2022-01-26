import View from './View.js';
import icons from '../../img/icons.svg';
class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;
  _errMessage = 'No bookmark yet .Plz find recipe and bookmark it';
  _sucMessage = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', e => {
      handler();
    });
  }
  _generateMarkup() {
    return this._data.map(item => {
      const id = window.location.hash.slice(1);
      return `
        <li class="preview">
        <a class="preview__link ${
          item.id === id ? 'preview__link--active' : ''
        } " href="#${item.id}">
          <figure class="preview__fig">
            <img src="${item.image}" alt="${item.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title}</h4>
            <p class="preview__publisher">${item.publisher}</p>
            <div class="preview__user-generated ${item.key ? '' : 'hidden'}">
            
              <svg>
                <use href="${icons}#icon-user"></use>
             </svg>
           
            </div>
          </div>
        </a>
      </li>
        `;
    });
  }
}

export default new bookmarkView();
