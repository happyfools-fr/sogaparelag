// React imports
import React, { useState, useEffect } from 'react';

// Controller imports
import GameController from '../controller/GameController';
import PlayerController from '../controller/PlayerController';

// View imports
import DayView from './DayView';
import NightView from './NightView';
import SavedView from './SavedView';
import GameOverView from './GameOverView';
import GameHistoryView from './GameHistoryView';


import { Container, Col, Row } from 'react-bootstrap';

export default function GameView (props) {

    const gameId = props.gameId;
    const user = props.user;

    const gameController = new GameController(props.firebaseService.ft);
    const [game, setGame] = useState();

    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );

    const playerController = new PlayerController(props.firebaseService.ft)

    const updateGameAndPlayers = () => {
        game._gameTable.players.forEach((p, i) => {
          playerController.update(p)
        });
        game._gameTable.killedPlayers.forEach((p, i) => {
          playerController.update(p)
        });
        gameController.update(game);
    }

    if (game) {

        const thisPlayer = game._gameTable.getPlayerFromId(user.id)

        if(!game._endOfGame){
            if (game._gameTable.endOfRound) {
                if (thisPlayer.id === game.currentPlayerId && game.startNight) {
                    game.onActionRoundEnded()
                    updateGameAndPlayers()
                }
            } else {
                if (thisPlayer.id === game.currentPlayerId && game.startDay) {
                    game.onRoundStarts()
                    updateGameAndPlayers()
                }

            }
            return (
                <Container fluid>
                    <Row>
                        <Col className="p-2">
                            {
                                (game._gameTable.endOfRound)
                                ? <NightView
                                    slugname={props.slugname}
                                    className='mt-5'
                                    game={game}
                                    thisPlayer = {thisPlayer}
                                    updateGameAndPlayers = {updateGameAndPlayers}
                                    firebaseService = {props.firebaseService}
                                />
                                : <DayView
                                slugname={props.slugname}
                                game={game}
                                thisPlayer = {thisPlayer}
                                updateGameAndPlayers = {updateGameAndPlayers}
                                firebaseService = {props.firebaseService}
                                />
                            }
                        </Col>
                        <Col sm={4} className="p-2">
                            <GameHistoryView game={game} />
                        </Col>
                    </Row>
                </Container>
            );
        } else if (game._win){
            return (
              <SavedView
                players={game._gameTable.players}
                slugname={props.slugname}
                isCreator={props.isCreator}
                handleClickCreateNextGame={props.handleClickCreateNextGame}
              />
            );
        } else {
            return (
              <GameOverView
                slugname={props.slugname}
                isCreator={props.isCreator}
                handleClickCreateNextGame={props.handleClickCreateNextGame}
              />
            );
        }
    } else {
        return(<div />)
    }
}
