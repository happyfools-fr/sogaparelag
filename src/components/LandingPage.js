import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

class LandingPage extends Component {

  render() {
    return (
      <React.Fragment>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Wanna play games?</h1>
      </React.Fragment>
    );
  };
}

export default LandingPage;
