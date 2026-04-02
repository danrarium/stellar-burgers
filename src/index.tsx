import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
<<<<<<< Updated upstream
import { Provider } from 'react-redux';
=======
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';
>>>>>>> Stashed changes
import App from './components/app/app';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< Updated upstream
      <App />
=======
      <BrowserRouter>
        <App />
      </BrowserRouter>
>>>>>>> Stashed changes
    </Provider>
  </React.StrictMode>
);
