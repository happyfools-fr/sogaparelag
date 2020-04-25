import React, {Component} from 'react';
import {
  Jumbotron, 
  Button
}  from 'react-bootstrap';

export default class Auth extends Component {

  render() {
    const { user, requestLogin, requestLogout } = this.props;
    return (
      user.loggedIn
      ? (
            <Jumbotron>
                <h2>Hello {user.info.displayName}!</h2>
                <Button onClick={requestLogout}>Sign out</Button>
            </Jumbotron>
          )
        : (
              <Jumbotron>
                  <h2>Log in</h2>
                  <Button onClick={requestLogin}>Sign in with Google</Button>
              </Jumbotron>
          )
        );
      }
}