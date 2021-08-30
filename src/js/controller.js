import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';


import 'babel-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

// if (module.hot){
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// creating a generic function for the spinner

// creating an async function that will fetch our recipe the API
const controlRecipies = async function () {
  try {
    //success

    const id = window.location.hash.slice(1); //? window.location refers to the whole url, this how you get the hash
    if (!id) return;
    //TODO: update results view to mark selected result page
    resultView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)


    

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
    console.error(err)
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

    // resultView.render(model.state.search.results)
    resultView.render(model.getSearchResultsPage())

    //render initial pagination buttons
    paginationView.render(model.state.search);


  }
  catch(err){
    resultView.renderError();
  }
}

const controlPagination = function(goToPage){
  // resultView.render(model.state.search.results)
  resultView.render(model.getSearchResultsPage(goToPage))

  //render initial pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  // update recipe serving in the state
  model.updateServings(newServings)

  //render recipe
  recipeView.update(model.state.recipe);
  
}

const controlAddBookmark = function(){
  //Add or remove bookmarks
  if(!model.state.recipe.bookmarked) 
  model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe)

  // render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  
};

init();

// recipeView.addHandelerRender(controlRecipies)
// window.addEventListener('hashchange', controlRecipies) //listening for hash changeevent
