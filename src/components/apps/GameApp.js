import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseApp from '../firebaseApp';
import Game from './Game';
import ActionApp from './ActionApp';

const db = firebase.firestore(firebaseApp);

class GameApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      game: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.onListenForGame();
  }

  onListenForGame = () => {
    this.setState({ loading: true });
    this.unsubscribe = db.doc(`game/${this.props.gameId}`)
      .onSnapshot(snapshot => {
        if (snapshot) {
          let games = [];
          games.push({ ...snapshot.data() });
          this.setState({
            game: games[0],
            loading: false,
          });
        } else {
          this.setState({ game: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const user = this.props.user;
    const game = this.state.game;
    const currentState = game ? game.currentState : "No currentState";
    const currentPlayerId = game ? currentState.currentPlayerId : "No currentPlayerId";

    return (
      <React.Fragment>
        {
          game
          ? <pre>Game: {JSON.stringify(game, undefined, 2)}</pre>
          : <div>No game info</div>
        }
        {
          currentPlayerId === user.uid
          ? (
            true
            ?  <h2 id='player-turn'>Your turn boo {user.displayName}!</h2>
            : <h2 id='player-turn'>Not your turn {user.displayName}!</h2>
          )
          : <div></div>
        }
        {
          currentState
          ? (
            currentPlayerId === user.uid
            ?  (
              <ActionApp game={game}/>
            )
            : <div></div>
          )
          : <div></div>
        }
        {
          game
          ? (
            <div>
              <h1 id='title'>Your game: {game.slugname}</h1>
              <table id='current-game'>
                 <tbody>
                  <tr key='round-info '>
                    <td>Round #{currentState.roundNumber}</td>
                  </tr>
                  <tr key='actions-info '>
                   <td>Total nb of moves #{game.history.length}</td>
                  </tr>
                  <tr key='total-player-info'>
                    <td>Nb players: {game.players.length}</td>
                  </tr>
                  <tr key='current-player-id-info'>
                    <td>Current player ID: {currentPlayerId}</td>
                  </tr>
                  <tr key='current-player-nickname-info'>
                     <td>Current player user name: {user.displayName}</td>
                  </tr>
                  <tr key='water-supply-info'>
                    <td>Water supply: {currentState.waterSupply}</td>
                  </tr>
                  <tr key='food-supply-info'>
                    <td>Food supply: {currentState.foodSupply}</td>
                  </tr>
                 </tbody>
              </table>

            </div>
          )
          : <div>No game info</div>
        }

      </React.Fragment>
    );
  };
}

export default GameApp;
