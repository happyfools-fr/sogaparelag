import React, { Component } from 'react';
import logo from './assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './components/Auth';
import * as firebase from 'firebase';
import './css/style.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      speed: 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child('speed');
    const xaxisRef = speedRef.child('xaxis');
    xaxisRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <b>Sogaparelag</b> project, a HappyFools.fr initiative
          </p>
          <p> Coucou Nico ! </p>
          <h1>Speed = {this.state.speed}</h1>
          <Auth />
        </header>
      </div>
    );
  }
}

export default App;
