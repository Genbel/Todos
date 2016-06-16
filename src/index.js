import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import Root from './components/Root'
import ConfigureStore from './configureStore';
import { fetchTodos } from './api';

fetchTodos('all').then(todos =>
    console.log(todos)
);

const store = ConfigureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
)
