import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export const createComponentWithFirebaseAuth = Component => props => (
    <FirebaseContext.Consumer>
        {
            firebase => withFirebaseAuth(
                <Component
                    {...props}
                    firebase={firebase}
                    provider={firebase.authProviders}
                    firebaseAppAuth={firebase.auth}
                />)
        }
    </FirebaseContext.Consumer>
);


export default FirebaseContext;
