import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from './firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';
import { v1 as uuidv1 } from 'uuid';
import Game from './Game';

const db = firebase.firestore(firebaseApp);

function Player(user) {
  this._id = user.uid;
  this.knickname = user.displayName;
  this.currentPlayerStateInGame = null;
}

function pushOrUpdateRecord(player) {
  db.collection("player").doc(player._id).set({
    _id: player._id,
    knickname: player.knickname,
    currentPlayerStateInGame: player.currentPlayerStateInGame,
  })
  .then(function() {
      console.log("Player successfully written!");
      // alert("Successfully added the Player to firestore!");
      return player;
  })
  .catch(function(error) {
      console.error("Error writing User: ", error);
  });
}


function startNewGame(user) {
  console.log(user.toString());
  const player = new Player(user);
  pushOrUpdateRecord(player);
  return Game.createGameWithInitialPlayer(uuidv1(), player);
}

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
  
  constructor(){
    super();
    this.state = {
      currentGame: null,
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
              const game = startNewGame(user);
              this.setState({
                currentGame: game,
              });
              alert(game)
            }
          }>Start a Game</button>
          )
          : <div></div>
        }
        {
          this.state.currentGame 
          ? <pre>Created Game: {JSON.stringify(this.state.currentGame, undefined, 2)}</pre> 
          : <div>No game yet ;-)</div>
        }
      </React.Fragment>
    );
  };
}

export default createComponentWithAuth(GameMenu);
