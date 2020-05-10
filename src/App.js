// React imports
import React, { useState, useEffect, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Relative imports
import Auth from './apps/auth/Auth'
import LandingPage from './apps/home/LandingPage'
import About from './apps/about/About'
import GameApp from './apps/game/GameApp'
import LoggedInUser from './apps/game/model/LoggedInUser'

// Imports for test
import PollModal from './apps/game/views/PollModal'
import DeadModal from './apps/game/views/DeadModal'
import SavedView from './apps/game/views/SavedView'
import ActionModal from './apps/game/views/ActionModal'
import ActionResultModal from './apps/game/views/ActionResultModal'

//Firebase
import FirebaseService from './components/firebase/index';
const firebaseServiceInstance = new FirebaseService();


export default function App() {

  const firebaseService = firebaseServiceInstance;
  const [user, setUser] = useState({ loggedIn: false, info: null });
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribeAuthStateChange = firebaseService.onAuthStateChange(
        (user) => {
            (user)
            ? setUser({loggedIn: true, info: user})
            : setUser({loggedIn: false, info: null})
        }
    );
    return unsubscribeAuthStateChange;
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

  const requestLogin = useCallback(login, [login]);

  const requestLogout = useCallback(logout, [logout]);


  function ProtectedGameAppWithSlugname({user, firebaseService}) {
    let match = useRouteMatch("/game/:gameSlugname");
    let slugname = match ? match.params.gameSlugname : null;
    let loggedInUser = user.info ? new LoggedInUser(user.info.uid, user.info.displayName, user.info.photoURL) : null;

    return (
      user.loggedIn
      &&
      <GameApp
        user={loggedInUser}
        slugname={slugname}
        firebaseService={firebaseService}
        />
    );
  }

  return (
    <Router>
      <div>{error ? error : ""}</div>

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
            <ProtectedGameAppWithSlugname user={user} firebaseService={firebaseService} />
          </Route>

          {/* For testing only*/}
          <Route path='/dead'><DeadModal /></Route>
          <Route path='/poll'><PollModal /></Route>
          <Route path='/action'><ActionModal /></Route>
          <Route path='/action-result'><ActionResultModal /></Route>
          <Route path='/saved'><SavedView /></Route>

          <Route exact path='/'><LandingPage /></Route>
          <Route><LandingPage /></Route>
      </Switch>
      <Navbar sticky="bottom">
          <b>Sogaparelag</b>&nbsp;project, a HappyFools.fr initiative in 2020.
      </Navbar>
  </Router>
  );

}
