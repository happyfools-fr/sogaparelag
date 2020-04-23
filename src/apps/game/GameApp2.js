// React imports
import React, { useState } from 'react';

import GameMenu from './GameMenu'
import GameView from './views/GameView'
import Game from './model/Game';
import GameController from './controller/GameController'

import * as firebase from 'firebase';
import firebaseApp from '../../firebaseApp';
const db = firebase.firestore(firebaseApp);

export default function GameApp2(props) {

    const [currentGame, setCurrentGame] = useState(undefined);

    const gameController = GameController(db);

    const match = this.props.match;

    if (match && match.params && match.params.gameSlugname) {
        const slugname = match.params.gameSlugname;
        setCurrentGame(gameController.getBySlugname(slugname));
    };

    let listener;

    // Similar to componentDidMount
    useEffect(() => {
        setListener(gameController.listen(currentGame, setCurrentGame));
        return function cleanup() {listener()};
    });

    if (currentGame) {
        return (<GameView user={props.user} game={currentGame} />);
    } else {
        return (
            <GameMenu
                user={props.user}
                handleClickCreateNewGame={
                    () => {setCurrentGame(gameController.create())}
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
