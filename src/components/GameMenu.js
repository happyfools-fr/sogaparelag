import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from './firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';
import Game from './apps/Game';
import GameApp from './apps/GameApp';

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

/** Create the FirebaseAuth component wrapper */
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});


class GameMenu extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentGame: null,
      currentGameId: null,
    };
  }

  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
        {
          user
          ? (
            <button onClick={()=> alert('Join a Game')}>Join a Game</button>
          )
          : <div></div>
        }
        {
          user
          ? (
            <button onClick={
              () => {
              const game = Game.createAndPushNewGame(user);
              this.setState({
                currentGame: game,
                currentGameId: game._id,
              });
            }
          }>Start a Game</button>
          )
          : <div></div>
        }
        {
          this.state.currentGame
          ? <GameApp gameId={this.state.currentGameId} user={user}/>
          : <div></div>
        }
      </React.Fragment>
    );
  };
}

export default createComponentWithAuth(GameMenu);
