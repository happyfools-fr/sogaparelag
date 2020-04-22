import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as libfirebase from 'firebase';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export const createComponentWithFirebaseAuth = Component => props => (
    <FirebaseContext.Consumer>
        {
            firebase => {
                var providers = { 
                      googleProvider: new libfirebase.auth.GoogleAuthProvider()
                }
                var firebaseAppAuth = firebase.auth;
                var NewComponent = withFirebaseAuth({providers, firebaseAppAuth})(Component);
                return (
                <NewComponent
                    {...props}
                    firebase={firebase}
                />);
            }
        }
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
