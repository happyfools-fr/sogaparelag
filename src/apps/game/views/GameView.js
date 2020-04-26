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
* @params {LoggedInUser} user
* @params {FirebaseService} firebaseService
*/
function GameView(props) {

    const gameSlugname = props.gameSlugname;
    // const [game, setGame] = useState(props.game);
    // const [gameId, setGameId] = useState(props.game._id);
    const [game, setGame] = useState();
    const [gameId, setGameId] = useState(props.gameId);
    const [showModal, setShowModal] = useState(
        (game && game.currentPlayerId)
        ? game.currentPlayerId === props.user.id
        : false
    );

    const firebaseService = props.firebaseService;
    const db = firebaseService.ft;
    const gameController = new GameController(db)

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
                        <Card.Title>Welcome to Island of {gameSlugname} </Card.Title>
                        <GameTableView className='mt-5' game={game}
                            currentPlayerNickname={`place holder for currentPlayerNickname`}
                            nextPlayerNickname={`place holder for next Player`}
                        />
                        </Card.Body>
                    </Card>
                    <AllPlayersView game={game} firebaseService={props.firebaseService}/>
                    <TurnView
                        show={showModal}
                        onAction={handleAction}
                    />
                </Col>
                <Col sm={3}>
                    game ? <GameLogSidebar game={game} /> : <div>Placeholder for GameLogSidebar</div>
                </Col>
            </Row>
        </Container>
    );
}


export default GameView;
