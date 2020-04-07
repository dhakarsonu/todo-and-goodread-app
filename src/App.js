import { PropTypes } from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Todo from './components/todo'
import GoodReads from './components/goodReads'
import './styles/index.css';

const App = ({ store, history }) => (
  <Provider store={store}>
      <Router history={history}>
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/" component={Todo} />
        <Route exact path="/goodreads" component={GoodReads} />
      </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;
