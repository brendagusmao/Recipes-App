import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <GoogleOAuthProvider
      clientId="126504122195-3q8on4u0b39j3otgdokhggs7uks27u8h.apps.googleusercontent.com"
    >
      <BrowserRouter>
        <div className="Login">
          <App />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
