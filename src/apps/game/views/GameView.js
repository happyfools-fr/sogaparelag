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


function GameView(props) {

    const gameId = props.gameId;
    const user = props.user;

    const gameController = new GameController(props.firebaseService.ft)
    const [game, setGame] = useState();

    useEffect(
        () => {
            const unsubscribe = gameController.listen(gameId, setGame);
            return unsubscribe;
        },
        [gameId, setGame]
    );

    const playerController = new PlayerController(props.firebaseService.ft)
    let thisPlayer = playerController.get(user.id);

    function setShowBoolean(game, user)
    {
        thisPlayer = game._gameTable.players.filter(p => p.id === user.id)[0];

        if (!thisPlayer) {return}

        const shouldShowPoll = (game.pollWater || game.pollFood)
        const shouldShowAction = (thisPlayer.id === game.currentPlayerId) && !thisPlayer.isSick
        const shouldShowSick = (thisPlayer.id === game.currentPlayerId) && thisPlayer.isSick

        if (!poll.show && shouldShowPoll) {
            setPoll( {
                show : true,
                type : (game.pollWater) ? "drink" : "eat",
                endValidation : (thisPlayer.id === game.headPlayerId) && (game.waterVoteEnded || game.footVoteEnded),
            })
        } else if (!showAction && shouldShowAction){
            setShowAction(true)
        } else if (shouldShowSick && !showSick.show) {
            setShowSick({show: true, click: 0})
        } else if (!shouldShowSick && showSick.show) {
            setShowSick({show: false, click: 0})
        }
    }

    (game && user && !showDead && (!showSick.show || showSick.click) && !poll.endValidation) && setShowBoolean(game, user);


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
        if(!game._endOfGame){
            if (day) {
                <DayView />
            } else {
                <NightView />
            }
        } else if (game._win){
            return (
              <SavedView
                players={game._gameTable.players}
                slugname={props.slugname}
              />
            );
        } else {
            return (
              <GameOverView
                slugname={props.slugname}
              />
            );
        }
    } else {
        return(<div />)
    }
}


export default GameView;
