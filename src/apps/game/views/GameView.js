// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

// Component imports
import GameHistoryView from './GameHistoryView';

// Controller imports
import GameController from '../controller/GameController';
import PlayerController from '../controller/PlayerController';

// View imports
import TurnModal from './TurnModal';
import GameTableView from './GameTableView';
import AllPlayersView from './AllPlayersView';

import {RoundAction} from '../model/RoundManager'


/**
* @params (Game) game
* @params {LoggedInUser} user
* @params {FirebaseService} firebaseService
*/
function GameView(props) {

    const gameId = props.gameId;

    const gameController = new GameController(props.firebaseService.ft)
    const [game, setGame] = useState();

    const playerController = new PlayerController(props.firebaseService.ft)

    const show = (game) ? game.currentPlayerId === props.user.id : false;


    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );



    const handleAction = (action, show) => {
      
        const player = game._gameTable.currentPlayer;
        // const listPotentialActionsToPerform = player.getListPotentialActionsToPerform(game)
        console.log("Selected action = ", action)
        alert("You have chosen to go to "+ action);
        // game.history.push(props.user.nickname + " went for " + action);
        // game._waterManager.collect();

        let updatedGame = player.performAction(game, action, 0)
        // Post save
        gameController.update(updatedGame);
        // Update all players if needed
        updatedGame._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        // Update game in waiting room if needed
        //???
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
                        <TurnModal
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
