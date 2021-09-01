import {API_URL, RES_PER_PAGE} from './config'
import {getJSON} from './helper'



import 'babel-polyfill';
import { async } from 'regenerator-runtime';


export const state = {
    recipe: {},
    search: {
        query:'',
        results:[],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
}


export const loadRecipe = async function (id) {
    try{
        
        const data = await getJSON(`${API_URL}${id}`);
      
          const  { recipe } = data.data;
          state. recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
          }; //formatting recipe object keys
    
        if(state.bookmarks.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true
        else state.recipe.bookmarked = false;

    }

    catch(err){
        // tem
        console.error(err)
        throw err;
    }
    
}

export const loadSearchResults = async function (query){
    try{

        state.search.query = query;
        const data = await getJSON (`${API_URL}?search=${query}`)
        console.log(data)
        state.search.results = data.data.recipes.map(recipe =>  {
            return {
                id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url}
           
          })

          state.search.page = 1
    }
    catch (err){
        throw err;

    }
}

export const getSearchResultsPage = function (page =state.search.page){
    state.search.page = page;
    const start = (page-1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings

        // newQt = oldQt * newServings / oldServings
    });

    state.recipe.servings = newServings;
}

const persistBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe){
    // add bookmark
    state.bookmarks.push(recipe);

    //mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks()
}

export const deleteBookmark = function(id){
    // delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1)

    //mark current recipe as bookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks()

}

const init = function(){
    const storage = localStorage.getItem('bookmarks')
    if (storage) state.bookmarks = JSON.parse(storage);
}

init()