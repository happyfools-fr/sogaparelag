import React, { Component } from 'react';

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
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </React.Fragment>
    );
  };
}

export default Auth;
