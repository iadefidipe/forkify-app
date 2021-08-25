import {API_URL} from './config'

import 'babel-polyfill';


export const state = {
    recipe: {}
}


export const loadRecipe = async function (id) {
    try{

        const response = await fetch(
            `${API_URL}/${id}`
          ); //* making an ajax call to the API
          const data = await response.json();
      
          if (!response.ok) throw new Error(`${data.message} (${response.status})`); //catching error in the fetch
      
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
    
          console.log(state.recipe)

    }

    catch(err){
        alert(err)
    }
    
}