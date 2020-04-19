import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

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
            ? <h1>Hello {user.displayName}!</h1>
            : <h1>Log in</h1>
        }
        {
          user
            ? <Button onClick={signOut}>Sign out</Button>
            : <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        }
      </React.Fragment>
    );
  };
}

export default Auth;
