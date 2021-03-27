import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { CurrentUserContextProvider } from './contexts/CurrentUserContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserContextProvider>
        <App />
      </CurrentUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
