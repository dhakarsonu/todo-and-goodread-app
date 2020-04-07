import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react' // eslint-disable-line
import App from './App';
import store from './store';
import history from './history';

const ENTRY_POINT = document.querySelector('#root');

const render = () => {
  ReactDOM.render(<App store={store} history={history} />, ENTRY_POINT);
};

const renderError = (error) => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

const devRender = () => {
  if (module.hot) {
    module.hot.accept('./App.js', () => render());
  }

  render();
};

try {
  devRender();
} catch (error) {
  console.error(error);
  renderError(error);
}
