import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/Auth';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBt_7TYAZmIQ5xZtNTOE88FF23bazvn4-E",
  authDomain: "galerapagos-f5bd9.firebaseapp.com",
  databaseURL: "https://galerapagos-f5bd9.firebaseio.com",
  projectId: "galerapagos-f5bd9",
  storageBucket: "galerapagos-f5bd9.appspot.com",
  messagingSenderId: "537433033375",
  appId: "1:537433033375:web:664c64c8066139e397f0aa",
  measurementId: "G-02X58B4KQV"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Auth />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
