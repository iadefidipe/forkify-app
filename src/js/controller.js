import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

import 'babel-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

if (module.hot){
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// creating a generic function for the spinner

// creating an async function that will fetch our recipe the API
const controlRecipies = async function () {
  try {
    //success

    const id = window.location.hash.slice(1); //? window.location refers to the whole url, this how you get the hash
    if (!id) return;

    // TODO render spinner
    recipeView.renderSpinner();

    // TODO loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // TODO rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    //error
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try{

    resultView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search resaults
    await model.loadSearchResults(query)

    // 30 render results

    resultView.render(model.state.search.results)
  }
  catch(err){
    resultView.renderError();
  }
}


const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearch);
};

init();

// recipeView.addHandelerRender(controlRecipies)
// window.addEventListener('hashchange', controlRecipies) //listening for hash changeevent
