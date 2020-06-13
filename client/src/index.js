import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(rootReducer, persistedState, composeWithDevTools(
  applyMiddleware()
));

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

