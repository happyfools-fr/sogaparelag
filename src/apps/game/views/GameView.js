// Firebase imports
import {withFirebase} from '../../../components/firebase/index'
// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Col, Row } from 'react-bootstrap';

// Component imports
import GameLogSidebar from '../components/GameLogSidebar';

// Controller imports
import GameController from '../controller/GameController';

// Import model
import Game from '../model/Game'

// View imports
import TurnView from './TurnView';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';
import WaitingRoomView from './WaitingRoomView';


function GameView(props) {
    const [game, setGame] = useState(props.game);
    const [showModal, setShowModal] = useState(
        (game.currentState && game.currentState.currentPlayerId)
        ? game.currentState.currentPlayerId === props.user.uid
        : false
    );

    const db = props.firebase.ft;
    const gameController = new GameController(db)

    useEffect(
        () => {
            const unsubscribe = gameController.listen(game, setGame);
            return unsubscribe;
        },
        [gameController, game, setGame]
    );

    const currentState = game.currentState;

    if (currentState && currentState.isStarted) {
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
                        <AllPlayersView game={game} />
                        <TurnView
                            show={showModal}
                            handleAction={
                                (action) => {
                                    setShowModal(false);
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
    } else {
         return (
            <WaitingRoomView
                gameSlugname={game.slugname}
                players={game.players}
                onClick={
                    () => {Game.startFirstRound(game); alert("Game.startFirstRound");}
                }
            />
        );
    }
}

export default withFirebase(GameView);
