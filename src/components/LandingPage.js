import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./Auth"

class LandingPage extends Component {

  render() {
    return (
      <React.Fragment>
          <h1>Wanna play games?</h1>
          <Auth 
            user={this.props.user}
            signOut={this.props.signOut}
            signInWithGoogle={this.props.signInWithGoogle}
          />
      </React.Fragment>
    );
  };
}

export default LandingPage;
