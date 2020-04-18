import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from './firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';
import Game from './apps/Game';
import GameApp from './apps/GameApp';
import PlayerStateInGame from './apps/PlayerStateInGame';
import Player from './apps/Player';

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
      inputValueGameId: '',
      currentGame: null,
      currentGameId: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({inputValueGameId: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.onJoinGame();
    alert('A current GameId was submitted: ' + this.state.inputValueGameId);
  }
  
  async updateGameId() {
    const gameId = this.state.inputValueGameId;
    const gameSnapshot = await Game.getGameSnapshotByGameId(gameId);
    if(gameSnapshot.exists) {
      this.setState({
        inputValueGameId: gameId,
        currentGameId: gameId,
        currentGame: gameSnapshot.data(),
      });
    } else {
      alert("Provided Gamed Id is not recognized! Please Amend...");
    }
  }
  
  async onJoinGame(){
    await this.updateGameId();
    const user = this.props.user;
    const game = this.state.currentGame;
    const playerStateInGame = PlayerStateInGame.getInitialPlayerStateInGame(game);
    const player = Player.createAndPushPlayerWithState(user, playerStateInGame);
    const updatedGame = Game.addPlayer(game, player);
    return Game.pushOrUpdateRecord(updatedGame);
  }


  // {
  //   user && game===null
  //   ? (
  //     <React.Fragment>
  //     <form>
  //       <label for="gameid">Game ID to join:
  //       <input type='text' name='gameid' value={this.state.currentGameId} onChange={evt => this.onJoinGame(evt)}/>
  //       </label>
  //     </form>
  //     </React.Fragment>
  //   )
  //   : <div></div>
  // }
  

  render() {
    const user = this.props.user;
    const game = this.state.currentGame;
    return (
      <React.Fragment>
        {
          user && game===null
          ? (
            <React.Fragment>
            <form onSubmit={this.handleSubmit}>
              <label>
                Game ID: 
                <input type="text" value={this.state.inputValueGameId} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            </React.Fragment>
          )
          : <div></div>
        }
        {
          user && game===null
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
          this.state.currentGameId || this.state.currentGame
          ? <GameApp gameId={this.state.currentGameId} user={user}/>
          : <div></div>
        }
      </React.Fragment>
    );
  };
}

export default createComponentWithAuth(GameMenu);
