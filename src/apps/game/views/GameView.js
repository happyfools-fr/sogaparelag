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

// View imports
import TurnView from './TurnView';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';
//import WaitingRoomView from './WaitingRoomView';

/**
* @params (Game) game
* @params {LoggedInUsers} user
* @params {FirebaseService} firebaseService
*/
function GameView(props) {
    const [game, setGame] = useState(props.game);
    const [gameId, setGameId] = useState(props.game._id)
    const [showModal, setShowModal] = useState(
        (game.currentPlayerId)
        ? game.currentPlayerId === props.user.uid
        : false
    );

    // const db = props.firebase.ft;
    const db = props.firebaseService.ft;
    const gameController = new GameController(db);

    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameController, gameId, setGame]
    );

    const handleAction = (action) => {
        setShowModal(false);
        alert(action + ": Game.updateGameState");
        game.history.push(props.user.nickname + " went for " + action);
        gameController.update(game);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card border="light">
                        <Card.Body>
                        <Card.Title>Welcome to Island of {game.slugname} </Card.Title>
                        <GameTableView className='mt-5' game={game}
                            currentPlayerNickname={game.currentPlayerId}
                            nextPlayerNickname={game.nextPlayerId}
                        />
                        </Card.Body>
                    </Card>
                    <AllPlayersView game={game} />
                    <TurnView
                        show={showModal}
                        onAction={handleAction}
                    />
                </Col>
                <Col sm={3}>
                    <GameLogSidebar game={game} />
                </Col>
            </Row>
        </Container>
    );
}
/*
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
}*/

export default withFirebase(GameView);
