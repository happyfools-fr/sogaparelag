// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

// Component imports
import GameHistoryView from './GameHistoryView';

// Controller imports
import GameController from '../controller/GameController';

// View imports
import TurnView from './TurnView';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';


/**
* @params (Game) game
* @params {LoggedInUser} user
* @params {FirebaseService} firebaseService
*/
function GameView(props) {

    const gameId = props.gameId;

    const gameController = new GameController(props.firebaseService.ft)
    const [game, setGame] = useState();


    const show = (game) ? game.currentPlayerId === props.user.id : false;


    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );


    const handleAction = (action, show) => {
        alert(action + ": Game.updateGameState");
        game.history.push(props.user.nickname + " went for " + action);
        game.currentPlayerId = "Tjll6gANvoZhoH7lCRO7xtkBy4M2";
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
                            show={show}
                            onAction={handleAction}
                        />
                    </Col>
                    <Col sm={3}>
                        <GameHistoryView game={game} />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return(<div />)
    }
}


export default GameView;
