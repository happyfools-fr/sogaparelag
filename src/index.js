import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD

import "./config.js";
=======
import Auth from './components/Auth';
import * as serviceWorker from './serviceWorker';
>>>>>>> a58c0ce22061d095041b20eb311d07e4b4f0cb0a

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Auth />
  </React.StrictMode>,
  document.getElementById('root')
);