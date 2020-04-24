import React, { Component } from 'react';

import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Col, Row } from 'react-bootstrap';

// Component imports
import GameLogSidebar from '../components/GameLogSidebar';

// Model imports
import Game from '../model/Game';

// Controller imports
import GameController from '../controller/GameController';


// View imports
import TurnView from './TurnView';
import WaitingRoomView from './WaitingRoomView';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';


const db = firebase.firestore(firebaseApp);

export default class GameView extends Component {

    /* Here we assume that game exists and is not undefined */

    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            showModal : this.props.game.currentState.currentPlayerId === this.props.user.uid,
            loading : false,
        };

        this.handleEndOfAction = this.handleEndOfAction.bind(this)
        this.setGameInState = this.setGameInState.bind(this)
        this.setShowModal = this.setShowModal.bind(this)
    }

    componentDidMount() {
        this.onListenForGame();
    }

    setGameInState(game) {
        this.setState({
            game : game,
            showModal : this.state.showModal,
            loading : !this.loading,
        })
    }

    setShowModal(showModal) {
        this.setState({
            game : this.state.game,
            showModal : showModal,
            loading : this.loading,
        })
    }

    onListenForGame() {
        this.setState({
            showModal: false,
            loading: true,
        });
        const gameController = new GameController(db)
        this.unsubscribe = gameController.listen(this.props.game, this.setGameInState)
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleEndOfAction(action) {
        this.setState({
            game: this.state.game,
            showModal : false,
            loading : this.state.loading,

        });
        Game.pushUpdateGameState(this.state.game);
        alert(action + ": Game.updateGameState");
    };

    render() {
        const game = this.state.game;
        if (!game.currentState.isStarted) {
            return (
                <WaitingRoomView
                    game={game}
                    onClick={() => {Game.startFirstRound(game); alert("Game.startFirstRound");}}
                />)
        } else {
            const currentState = game.currentState;
            return (
                <Container>
                    <Row>
                        <Col>
                            <Card border="light">
                                <Card.Body>
                                <Card.Title>Welcome to Island of {game.slugname} </Card.Title>
                                <GameTableView className='mt-5' game={game}
                                    currentPlayerNickname={currentState.currentPlayerId}
                                    nextPlayerNickname={currentState.nextPlayerId}
                                />
                                </Card.Body>
                            </Card>
                            <AllPlayersView game={this.state.game} />
                            <TurnView
                                show={this.state.showModal}
                                handleAction={
                                    (action) => {
                                        this.setShowModal(false);
                                        alert(action + ": Game.updateGameState");
                                    }
                                }
                            />
                        </Col>
                        <Col sm={3}>
                            <GameLogSidebar game={game} />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}
