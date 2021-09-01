import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipies found for your query! Please try again `;
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result=> previewView.render(result, false) ).join('');
  }
}

export default new ResultView();
