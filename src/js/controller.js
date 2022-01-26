import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import AddRecipeView from './view/AddRecipeView.js';
import { ADD_WINDOW_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

//Control Recipe
const controlRecipe = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    //0
    resultView.update(model.getResultsPage(1));
    //1Load Recipe
    await model.loadRecipe(id);

    //2 Render Recipe
    recipeView.render(model.state.recipe);

    //update bookmark again
    bookmarkView.update(model.state.bookmark);
  } catch (err) {
    console.error(`${err} 😒😒😒😒😒`);
    recipeView.renderError();
  }
};
//ControlSearchResults
const controlSearch = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.searchRecipe(`${query}`);

    // console.log(model.state.search.result);
    resultView.render(model.getResultsPage(model.state.search.page));

    //render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (goto) {
  resultView.render(model.getResultsPage(goto));

  //render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (serving) {
  model.updateServings(serving);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); //Update the only changes parts
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmark);
};
const controlBookmarkLocal = function () {
  model.init();
  bookmarkView.render(model.state.bookmark);
};
const controlAddRecipe = async function (recipe) {
  try {
    AddRecipeView.renderSpinner();
    await model.uploadRecipe(recipe);
    recipeView.render(model.state.recipe);
    bookmarkView.render(model.state.bookmark);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    AddRecipeView.renderSuccess();

    setTimeout(() => {
      AddRecipeView._toggleWinodw();
    }, ADD_WINDOW_SEC);
   
  } catch (err) {
    AddRecipeView.renderError(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerServing(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  bookmarkView.addHandlerBookmark(controlBookmarkLocal);
  AddRecipeView.addHandlerForm(controlAddRecipe);
};
init();
