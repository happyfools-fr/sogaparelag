import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import * as firebase from 'firebase';

class LandingPage extends Component {

  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }

  render() {
    return (
      <React.Fragment>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Wanna play games?</h1>
          <h1>Speed of light: {this.state.speed}</h1>
      </React.Fragment>
    );
  };
}

export default LandingPage;
