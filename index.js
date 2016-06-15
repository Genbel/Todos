import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

// Sometimes we want to have a initial state already
// Filled with something.
// We if we set in the create store as a second argument,
// we can pass there the initial state filled with something
const persistedState = loadState();

const store = createStore(todoApp, persistedState);

// When the store change it will trigger subscribe and it will save in the localStoreage
store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
}), 1000);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
