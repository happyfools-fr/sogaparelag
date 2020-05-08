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

    const showNight = () => {
        return (game.pollWater || game.pollFood)
    }

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
            if (showNight()) {
                return (
                    <NightView
                        slugname={props.slugname}
                        game={game}
                        thisPlayer = {thisPlayer}
                        updateGameAndPlayers = {updateGameAndPlayers}
                        firebaseService = {props.firebaseService}
                    />
                )
            } else {
                return(
                    <DayView
                        slugname={props.slugname}
                        game={game}
                        thisPlayer = {thisPlayer}
                        updateGameAndPlayers = {updateGameAndPlayers}
                        firebaseService = {props.firebaseService}
                    />
                )
            }
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
