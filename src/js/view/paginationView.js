import View from './View.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const totalPages = Math.ceil(
      this._data.result.length / this._data.numPerPage
    );
    // console.log(curPage, totalPages);

    //page 1 and other pages
    if (curPage == 1 && totalPages > 1)
      return `
    <button data-goto =${
      curPage + 1
    }  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;

    // page middle and other pagees
    if (curPage > 1 && totalPages > curPage)
      return `
 <button data-goto =${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto =${
            curPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
 `;
    //Last page
    if (curPage === totalPages && totalPages > 1)
      return `
 <button data-goto =${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
 `;
    //Page 1 and no other pages
    return ``;
  }
}

export default new PaginationView();
