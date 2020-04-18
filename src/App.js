import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import * as firebase from 'firebase';
import firebaseApp from './components/firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';
import Auth from './components/Auth'
import GameMenu from './components/GameMenu'
import LandingPage from './components/LandingPage'
import About from './components/About'

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

/** Create the FirebaseAuth component wrapper */
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

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
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }

render() {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = this.props;

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {
            user
            ? (
              <li>
              <Link to="/game">Game</Link>
              </li>
            )
            : (<div></div>)
          }
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Auth
              user={user}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
            />
          </Route>
          {
            user
            ? (
              <Route path="/game">
                <GameMenu user={user} />
              </Route>
            )
            : (<div></div>)
          }
        </Switch>
      </div>
    </Router>
    );
  }
}

export default createComponentWithAuth(App);
