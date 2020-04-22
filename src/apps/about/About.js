import React, { Component } from 'react';
import { withFirebase } from '../../components/firebase/index';

import {
  Jumbotron, 
}  from 'react-bootstrap';
class About extends Component {
  render() {
    return (
        <Jumbotron>
            <h2>About</h2>
            <h3>Quarantine distraction. Maggle</h3>
        </Jumbotron>
    );
  }
}

export default withFirebase(About);
