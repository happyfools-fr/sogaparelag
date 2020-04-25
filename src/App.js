// React imports
import React, { useState, useEffect, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useRouteMatch,
} from "react-router-dom";

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// Relative imports
import Auth from './apps/auth/Auth'
import LandingPage from './apps/home/LandingPage'
import About from './apps/about/About'

//Firebase
import FirebaseService from './components/firebase/index';
import * as firebase from 'firebase';
const firebaseServiceInstance = new FirebaseService();

// import GameApp from './apps/game/GameApp'

export default function App() {

  const [firebaseService, setFirebaseService] = useState(firebaseServiceInstance);
  const [user, setUser] = useState({ loggedIn: false, info: null });
  const [error, setError] = useState('');
      
  useEffect(() => {
    const unsubscribeAuthStateChange = firebaseService.onAuthStateChange((user) => {
      user ? setUser({loggedIn: true, info: user}) : setUser({loggedIn: false, info: null})
    });
    return () => {
      unsubscribeAuthStateChange();
    };
  }, []);

  const login = () => {
    firebaseService.authenticateWithGoogle()
     .catch( error => {
       setError("error-login");
     });
  }
  
  const logout = () => {
    firebaseService.onSignOut()
    .catch( error => {
      setError("error-logout");
    });
  }
  const requestLogin = useCallback(() => {
    login();
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);
  
  function ProtectedGameAppWithSlugname({user}) {
    let match = useRouteMatch("/game/:gameSlugname");
    let slugname = match ? match.params.gameSlugname : null;
    return (
      user.loggedIn && slugname 
      ? <GameAppWithSlugname user={user} slugname={slugname}/> 
      : <div>Placeholder for the GameApp</div>
    );
  }
  
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <i className="fas fa-laugh-beam" />
            &nbsp;
            Happy Fools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/game">Game</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="justify-content-end ml-auto">
          <Nav.Link href="/login">{user.loggedIn ? "Account" : "Log in"}</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
          <Route path='/home'><LandingPage /></Route>
          <Route path='/about'><About /></Route>
          <Route path='/login'>
              <Auth user={user} requestLogin={requestLogin} requestLogout={requestLogout} />
          </Route>
          <Route path='/game'>
            <ProtectedGameAppWithSlugname user={user} />
          </Route>
          <Route exact path='/'><LandingPage /></Route>
          <Route><LandingPage /></Route>
      </Switch>
      <Navbar className='mt-3' sticky="bottom">
          <b>Sogaparelag</b>&nbsp;project, a HappyFools.fr initiative in 2020.
      </Navbar>
  </Router>
  );

}

function GameAppWithSlugname({user, slugname}) {
    return (
      //<GameApp user={user} slugname={slugname}/> : <div></div>
      <div>Slugname: {slugname}, user: {user.info.displayName}</div>
    );
}





