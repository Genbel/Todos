import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom'
import Root from './components/Root'
import ConfigureStore from './configureStore';

const store = ConfigureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
)
