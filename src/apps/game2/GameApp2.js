// React imports
import React, { useState, useEffect } from 'react';

import GameMenu from '../game/GameMenu'
import GameView from '../game/views/GameView'
//import Game from './model/Game';
import GameController from '../game/controller/GameController'

// import * as firebase from 'firebase';
import Firebase from '../../components/firebase/index';
const fb = new Firebase();
const db = fb.ft;

export default function GameApp(props) {

    // const db = props.firebase.ft;
    const gameController = new GameController(db);

    const [listener, setListener] = useState(() => {});
    const [currentGame, setCurrentGame] = useState(undefined);

    const match = props.match;

    if (match && match.params && match.params.gameSlugname && !currentGame) {
        const slugname = match.params.gameSlugname;
        setCurrentGame(gameController.getBySlugname(slugname));
    };

    useEffect(
        () => {
            // Similar to componentDidMount
            currentGame && setListener(gameController.listen(currentGame, setCurrentGame)) ;
            console.log("onEffect");
        },
        []
    );

    /*useEffect(
        () => {
            // Similar to componentWillUnmount
            console.log("onCleanup");
            return listener;
        },
        [listener],
    )*/

    if (currentGame && !gameController.isLoading()) {
        return (
            <GameView user={props.user} game={currentGame} />
        );
    } else {
        return (
            <GameMenu
                user={props.user}
                handleClickCreateNewGame={
                    () => {
                        const game = gameController.create()
                        setCurrentGame(game)
                        alert('New game created, share this: ' + window.location.origin + '/game/' + currentGame.slugname);
                    }
                }
                handleJoinGameSubmit={
                    (submit, slugname) => {
                        submit.preventDefault();
                        const game = gameController.getBySlugname(slugname);
                        setCurrentGame(game);
                    }
                }
            />
        );
    };

}
