import * as model from './model.js';
import recipeView from './views/recipeView.js'

import 'babel-polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

// const recipeContainer = document.querySelector('.recipe');



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
    alert(err);
  }
};

const init = function (){
  recipeView.addHandelerRender(controlRecipies);
}

init()

// recipeView.addHandelerRender(controlRecipies)
// window.addEventListener('hashchange', controlRecipies) //listening for hash change event
