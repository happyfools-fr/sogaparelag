import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./config.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Auth />
  </React.StrictMode>,
  document.getElementById('root')
);