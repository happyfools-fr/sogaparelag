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
      inputValueGameSlugname: '',
      currentGame: null,
      currentGameId: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(change) {
    this.setState({inputValueGameSlugname: change.target.value});
  }
  
  handleSubmit(submit) {
    submit.preventDefault();
    this.onJoinGame();
    alert('The name of a active game was submitted: ' + this.state.inputValueGameSlugname);
  }
  
  async updateGameId(gameId) {
    const gameSnapshot = await Game.getGameSnapshotByGameId(gameId);
    if(gameSnapshot.exists) {
      this.setState({
        inputValueGameSlugname: this.inputValueGameSlugname,
        currentGameId: gameId,
        currentGame: gameSnapshot.data(),
      });
      return true;
    } else {
      return false;
    }
  }

  async updateGameSlugname() {
    const gameSlugname = this.state.inputValueGameSlugname;
    const gameId = await Game.getGameIdBySlugname(gameSlugname);
    const updated = await this.updateGameId(gameId);
    return updated;
  }
  
  async onJoinGame(){
    const updated = await this.updateGameSlugname();
    console.log(updated);
    if (updated){
      const user = this.props.user;
      const game = this.state.currentGame;
      const playerStateInGame = PlayerStateInGame.getInitialPlayerStateInGame(game);
      const player = Player.createAndPushPlayerWithState(user, playerStateInGame);
      const updatedGame = Game.addPlayer(game, player);
      return Game.pushOrUpdateRecord(updatedGame);
    } else {
      alert("Provided Gamed Id is not recognized! Please Amend...");
    }
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
                Game Name: 
                <input type="text" value={this.state.inputValueGameSlugname} onChange={this.handleChange} />
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
