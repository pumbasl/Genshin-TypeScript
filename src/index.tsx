import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);