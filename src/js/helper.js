// the goal of this file is contain functions that we use over and over in our project
// This is promisifyin a setTimeout callback function

import 'babel-polyfill';

import { TIMEOUT_SEC } from './config';


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON = async function(url) {

    try{
        const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //* making an ajax call to the API
      const data = await response.json();

      if (!response.ok) throw new Error(`${data.message} (${response.status})`); //catching error in the fetch
      return data
    }
    catch(err){
        throw err;
    }
    
  
}