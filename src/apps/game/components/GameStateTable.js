import React, { Component } from 'react';

// Firebase imports
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

import {Jumbotron} from 'react-bootstrap';

// Model
import Game from '../model/Game';

// Views
import WaitingRoomView from '../views/WaitingRoomView';
import GameTableView from "../views/GameTableView";

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
 
  render() {
    const game = this.props.game;

    return (
        <Jumbotron>
            <h3>Welcome to Island of {game.slugname} </h3>
            {
                !game.currentState.isStarted ?
                    <WaitingRoomView game={game} onClick={this.onClickNotStarted} />
                :
                    <GameTableView game={game}
                        currentPlayerNickname={this.state.currentPlayerNickname}
                        nextPlayerNickname={this.state.nextPlayerNickname}
                    />
            }
        </Jumbotron>

    );
  };
}
