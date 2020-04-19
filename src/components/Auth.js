import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Auth extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    if (user) {
        return (
            <div>
                <h1>Hello {user.displayName}!</h1>
                <Button onClick={signOut}>Sign out</Button>
            </div>
        );

    } else {
        return (
            <div>
                <h1>Log in</h1>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
        )
        
    };
  };
}

export default Auth;
