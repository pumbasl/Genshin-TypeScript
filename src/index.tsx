import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);