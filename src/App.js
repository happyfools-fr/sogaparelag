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
import firebaseApp from './firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Relative imports
import Auth from './components/apps/auth/Auth'
import GameMenu from './components/apps/game/GameMenu'
import LandingPage from './components/apps/home/LandingPage'
import About from './components/apps/about/About'

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
            <Navbar.Brand href="/">Happy Fools</Navbar.Brand>
            <Nav justify classname="mr-auto">
                <Nav.Link>
                    <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link to="/about">About</Link>
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
            {
                user
                ? (<GameMenu user={user} />)
                : (
                    <LandingPage 
                        user={user}
                        signOut={signOut}
                        signInWithGoogle={signInWithGoogle}
                    />
                )
            }
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


        </Switch>
      </div>
      <Navbar sticky="bottom">
        <b>Sogaparelag</b> project, a HappyFools.fr initiative
      </Navbar>
    </Router>
    );
  }
}

export default createComponentWithAuth(App);
