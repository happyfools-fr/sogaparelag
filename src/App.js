// React imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Firebase imports
import * as firebase from 'firebase';
import firebaseApp from './components/firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Relative imports
import Auth from './components/Auth'
import GameMenu from './components/GameMenu'
import LandingPage from './components/LandingPage'
import About from './components/About'

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
    <Router>
        <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="#home">Happy Fools</Navbar.Brand>
            <Nav justify classname="mr-auto">
                <Nav.Link>
                    <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/about">About</Link>
                </Nav.Link>               
                <Nav.Link disabled={!user}>
                    <Link to="/game" >Game</Link>
                </Nav.Link>
            </Nav>
            <Nav className="justify-content-end ml-auto">
                <Nav.Link>
                    {
                        user ?
                        <Link to="/login">Account</Link>
                        :
                        <Link to="/login">Log in</Link>
                    }
                </Nav.Link>               
            </Nav>
        </Navbar>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Auth
              user={user}
              signOut={signOut}
              signInWithGoogle={signInWithGoogle}
            />
          </Route>
          {
            user
            ? (
              <Route path="/game">
                <GameMenu user={user} />
              </Route>
            )
            : (<div></div>)
          }
        </Switch>
      </div>
      <Navbar fixed="bottom">
        <b>Sogaparelag</b> project, a HappyFools.fr initiative
      </Navbar>
    </Router>
    );
  }
}

export default createComponentWithAuth(App);
