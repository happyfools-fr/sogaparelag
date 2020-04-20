import React, { Component } from 'react';
// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Jumbotron, 
  Table, 
}  from 'react-bootstrap';
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

const db = firebase.firestore(firebaseApp);

export default class PlayerStateTable extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      player: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.onListenForPlayer();
  }

  onListenForPlayer = () => {
    this.setState({ loading: true });
    this.unsubscribe = db.doc(`player/${this.props.user.uid}`)
      .onSnapshot(snapshot => {
        if (snapshot) {
          let player = [];
          player = snapshot.data();
          this.setState({
            player: player,
            loading: false,
          });
        } else {
          this.setState({ player: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  createJumbotron(game) {
    const player = this.state.player;
    const playerStateInGame = game && player ? game.currentState.playerStatesInGame.filter(
      playerStateInGame => playerStateInGame.playerId === player._id)[0] : "No playerStateInGame";
    if (!game.currentState.isStarted || !player){
      return (
          <Jumbotron>
            <h1>Your Current State as a Player</h1>
            <p>
              A simple jumbotron-style component to display the player's state info.
            </p>
            <h2>Game has not started yet!</h2>
        </Jumbotron>
       );
    } else {
      return (
          <Jumbotron>
            <h1>Your Current State as a Player</h1>
            <p>
              A simple jumbotron-style component to display the player's state info.
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Player ID</th>
                  <th>Player Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{player ? player._id : "" }</td>
                  <td>{player ? player.nickname.toUpperCase() : ""}</td>
                </tr>
              </tbody>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sick</th>
                <th>Dead</th>
                <th>Hand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{playerStateInGame ? playerStateInGame.isSick.toString() : ""}</td>
                <td>{playerStateInGame ? playerStateInGame.isDead.toString() : ""}</td>
                <td>{playerStateInGame ? playerStateInGame.currentHand : ""}</td>
              </tr>
            </tbody>
          </Table>
        </Jumbotron>
       );
     }
 }
 
  render() {
    return (
      <React.Fragment>
        { 
          this.createJumbotron(this.props.game) 
        }
      </React.Fragment>
  )};
}
