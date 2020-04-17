import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import * as firebase from 'firebase';
import firebaseApp from './components/firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';
import Auth from './components/Auth'
import GameMenu from './components/GameMenu'
import LandingPage from './components/LandingPage'

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
      <div className="App">
        <header className="App-header">
          <LandingPage />
          <Auth
            user={user}
            signOut={signOut}
            signInWithGoogle={signInWithGoogle}
          />
          <GameMenu user={user}/>
        </header>

        <footer>
          <b>Sogaparelag</b> project, a HappyFools.fr initiative
        </footer>
      </div>
    );
  };
}

export default createComponentWithAuth(App);
