import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from './firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

/** Create the FirebaseAuth component wrapper */
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

class Auth extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
      <React.Fragment>
        {
          user
            ? <h1>Hello, {user.displayName}</h1>
            : <h1>Log in</h1>
        }
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </React.Fragment>
    );
  };
}

export default createComponentWithAuth(Auth);
