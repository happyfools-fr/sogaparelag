import React, { Component } from 'react';

// Firebase imports
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

// Styles imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron, Table}  from 'react-bootstrap';

// Model
import Game from '../model/Game';

// Views
import WaitingRoomView from '../views/WaitingRoomView';

const db = firebase.firestore(firebaseApp);

export default class GameStateTable extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentPlayerNickname: "currentPlayerNickname undefined",
      nextPlayerNickname: "nextPlayerNickname undefined",
      loading: false,
    };  
  }

  componentDidMount() {
    this.onListenForCurrentPlayer();
    this.onListenForNextPlayer();
  }

  onListenForCurrentPlayer = () => {
    this.setState({ loading: true });
    this.unsubscribeForCurrentPlayer = db.collection(`player`).doc(this.props.game.currentState.currentPlayerId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let currentPlayerNickname;
          currentPlayerNickname = snapshot.data().nickname;
          this.setState({
            currentPlayerNickname: currentPlayerNickname,
            loading: false,
          });
        } else {
          this.setState({ 
            currentPlayerNickname: null, 
            loading: false 
          });
        }
      });
  };

  onListenForNextPlayer = () => {
    this.setState({ loading: true });
    this.unsubscribeForNextPlayer = db.collection(`player`).doc(this.props.game.currentState.nextPlayerId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let nextPlayerNickname;
          nextPlayerNickname = snapshot.data().nickname;
          this.setState({
            nextPlayerNickname: nextPlayerNickname,
            loading: false,
          });
        } else {
          this.setState({ 
            nextPlayerNickname: null, 
            loading: false 
          });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribeForCurrentPlayer();
    this.unsubscribeForNextPlayer();
  };

    onClickNotStarted(game) {
        Game.startFirstRound(game);
        alert("Game.startFirstRound");
    };
  
  createJumbotron(game) {
    if (!game.currentState.isStarted){

        return ( <WaitingRoomView game={game} onClick={this.onClickNotStarted} />);

    } else {
      return (
        <Jumbotron>
          <h1>{game.slugname.toUpperCase()} </h1>
          <p>
            A simple jumbotron-style component to display the game state info.
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Round #</th>
                <th>Total Moves #</th>
                <th>Current Player</th>
                <th>Next Player</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{game.currentState.roundNumber}</td>
                <td>{game.history.length}</td>
                <td>{this.state.currentPlayerNickname}</td>
                <th>{this.state.nextPlayerNickname}</th>
              </tr>
            </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total Water Supply</th>
              <th>Total Food Supply</th>
              <th>Total Wood Supply</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{game.currentState.waterSupply}</td>
              <td>{game.currentState.foodSupply}</td>
              <td>{game.currentState.woodSupply}</td>
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

  )}
}
