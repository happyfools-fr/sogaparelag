<<<<<<< HEAD
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import * as firebase from 'firebase';

class Auth extends Component {
    
    // auth = firebase.Auth();

    render() {
        return (
            <div>
                <div>
                     <input type='email' placeholder='Email' />
                </div>
                <div>
                    <input type='password' placeholder='Password' />
                </div>
                <div>
                    <Button variant="primary">Log in</Button>
                    <Button variant="secondary">Sign up</Button>
                </div>
                <div>
                    <Button variant="secondary"> Log in with Google</Button>
                </div>
            </div>
        );
    }
}
=======
import React from 'react';

function Auth() {
    return "<input type='email' placeholder='Email'>" ;
};
>>>>>>> a58c0ce22061d095041b20eb311d07e4b4f0cb0a

export default Auth;