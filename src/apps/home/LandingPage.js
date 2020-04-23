import { withFirebase } from '../../components/firebase/index';

import React, { Component } from 'react';
import {
  Jumbotron, 
}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "../auth/Auth"

class LandingPage extends Component {

  render() {
    return (
      <Jumbotron>
          <h1>Wanna play games?</h1>
      <Auth 
            user={this.props.user}
            signOut={this.props.signOut}
            signInWithGoogle={this.props.signInWithGoogle}
        />
     </Jumbotron>

    );
  };
}

export default withFirebase(LandingPage);
