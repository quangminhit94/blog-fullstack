import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import { createStore } from 'redux'
import App from './App'

let store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));

