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

    const gameController = new GameController(props.firebaseService.ft)
    const [gameId, setGameId] = useState(props.gameId);
    const [game, setGame] = useState();


    const [showModal, setShowModal] = useState(
        (game && game.currentPlayerId)
        ? game.currentPlayerId === props.user.id
        : false
    );



    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );


    const handleAction = (action) => {
        setShowModal(false);
        alert(action + ": Game.updateGameState");
        game.history.push(props.user.nickname + " went for " + action);
        gameController.update(game);
    };

    if (game) {
        return (
            <Container>
                <Row>
                    <Col>
                        <GameTableView className='mt-5' slugname={props.slugname} game={game}/>
                        <AllPlayersView players={game._gameTable.players} currentPlayerId={game.currentPlayerId}
                                    headPlayer={game._gameTable.headPlayer._id}
                                    firebaseService={props.firebaseService}/>
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
    } else {
        return(<div />)
    }
}


export default GameView;
