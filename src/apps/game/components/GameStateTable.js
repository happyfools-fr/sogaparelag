// React imports
import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

// Model
import Game from '../model/Game';

// Views
import WaitingRoomView from '../views/WaitingRoomView';
import GameTableView from "../views/GameTableView";

class GameStateTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPlayerNickname: "currentPlayerNickname undefined",
      nextPlayerNickname: "nextPlayerNickname undefined",
      loading: false,
    };
    this.onClickNotStarted = this.onClickNotStarted.bind(this);

  }

  componentDidMount() {
    this.onListenForCurrentPlayer();
    this.onListenForNextPlayer();
  }

  onListenForCurrentPlayer = () => {
    this.setState({ loading: true });
    this.unsubscribeForCurrentPlayer = this.props.firebaseService.ft.collection(`player`).doc(this.props.game.currentState.currentPlayerId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let currentPlayerNickname;
          currentPlayerNickname = snapshot.data().nickName;
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
    this.unsubscribeForNextPlayer = this.props.firebaseService.ft.collection(`player`).doc(this.props.game.currentState.nextPlayerId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let nextPlayerNickname;
          nextPlayerNickname = snapshot.data().nickName;
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

    async onClickNotStarted() {
      const game = await this.props.game;
      await Game.startFirstRound(this.props.firebaseService.ft, game);
      alert("Game.startFirstRound");
    };

  render() {
    const game = this.props.game;
    const firebaseService= this.props.firebaseService;
    return (
        <Card border="light">
            <Card.Body>
            <Card.Title>Welcome to Island of {game.slugname} </Card.Title>
            {
                !game.currentState.isStarted ?
                    <WaitingRoomView game={game} 
                    onClick={this.onClickNotStarted}
                    firebaseService={firebaseService} />
                :
                    <GameTableView className='mt-5' game={game}
                        currentPlayerNickname={this.state.currentPlayerNickname}
                        nextPlayerNickname={this.state.nextPlayerNickname}
                        firebaseService={firebaseService}
                    />
            }
            </Card.Body>
        </Card>

    );
  };
}

export default  withFirebase(GameStateTable);