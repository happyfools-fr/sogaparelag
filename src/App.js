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
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Relative imports
import Auth from './apps/auth/Auth'
// import GameMenu from './apps/game/GameMenu'
import GameApp from './apps/game/GameApp'
import LandingPage from './apps/home/LandingPage'
import About from './apps/about/About'

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

    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

        return (
            <Router>
                <Navbar sticky="top" bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        <i class="fas fa-laugh-beam" />
                        &nbsp;
                        Happy Fools
                    </Navbar.Brand>
                    <Nav justify classname="mr-auto">
                        <Nav.Link>
                            <Link to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/game">Game</Link>
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
                                <LandingPage
                                    user={user}
                                    signOut={signOut}
                                    signInWithGoogle={signInWithGoogle}
                                />
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
                        {
                            <Route
                                exact path="/game"
                                render={(props) => {
                                    if (user) {
                                        return (<GameApp {...props} user={user} addUserToGame={false} />);
                                    } else {
                                        return (<Auth
                                            user={user}
                                            signOut={signOut}
                                            signInWithGoogle={signInWithGoogle}
                                        />);
                                    }
                                }

                                }
                            >
                            </Route>
                        }
                        {
                            <Route
                                path="/game/:gameSlugname"
                                render={(props) => {
                                    if (user) {
                                        return (<GameApp {...props} user={user} addUserToGame={true} />);
                                    } else {
                                        return (<Auth
                                            user={user}
                                            signOut={signOut}
                                            signInWithGoogle={signInWithGoogle}
                                        />);
                                    }
                                }
                                }
                            >
                            </Route>
                        }
                    </Switch>
                </div>
                <Navbar sticky="bottom">
                    <b>Sogaparelag</b>&nbsp;project, a HappyFools.fr initiative in 2020.
      </Navbar>
            </Router>
        );
    }
}

export default createComponentWithAuth(App);
