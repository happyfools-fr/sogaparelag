// React imports
import React, { Component } from 'react';

// Firebase imports
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';
import withFirebaseAuth from 'react-with-firebase-auth';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Relative imports
import Game from './model/Game';
import GameApp from './GameApp';
import PlayerStateInGame from './model/PlayerStateInGame';
import Player from './model/Player';

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

  handleClick(click, user) {
    const game = Game.createAndPushNewGame(user);
    this.setState({
      currentGame: game,
      currentGameId: game._id,
    });
    alert('New game created, share this : ' + game.slugname)
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
    let updated;
    if (gameId){
      updated = await this.updateGameId(gameId);
    } else {
      updated = false;
    }
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

  render() {
    const user = this.props.user;
    const game = this.state.currentGame;
    if (user && game === null) {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Join a game</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Enter game name" 
                        value={this.state.inputValueGameSlugname}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Join
                </Button>
                </Form>
                <Button onClick={(click) => {this.handleClick(click,user)}}>Start a new game</Button>
                {
                this.state.currentGameId || this.state.currentGame
                    ? <GameApp gameId={this.state.currentGameId} user={user}/>
                    : <div></div>
                }
            </div>
        );
    } else {
        if (game !== null) {
            return(
                <div>
                    {
                    this.state.currentGameId || this.state.currentGame
                    ? <GameApp gameId={this.state.currentGameId} user={user}/>
                    : <div></div>
                    }
                </div>
            )
        } else {
            return (<div></div>);
        }
    }
  };
}

export default createComponentWithAuth(GameMenu);
