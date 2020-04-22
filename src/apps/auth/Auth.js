import { withFirebase, createComponentWithFirebaseAuth } from '../../components/firebase/index';
import React, { Component } from 'react';
import {
  Jumbotron, 
  Button
}  from 'react-bootstrap';

class Auth extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    if (user) {
        return (
            <Jumbotron>
                <h2>Hello {user.displayName}!</h2>
                <Button onClick={signOut}>Sign out</Button>
            </Jumbotron>
        );
    } else {
        return (
            <Jumbotron>
                <h2>Log in</h2>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </Jumbotron>
        )
        
    };
  };
}

export default withFirebase(Auth);
