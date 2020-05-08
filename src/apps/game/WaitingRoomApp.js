// React imports
import React, { useState, useEffect } from 'react';

import GameView from './views/GameView';
import WaitingRoomView from './views/WaitingRoomView'

import WaitingRoomController from './controller/WaitingRoomController'
import GameController from './controller/GameController'
import PlayerController from './controller/PlayerController'


export default function WaitingRoomApp(props) {

    const waitingRoomId = props.waitingRoomId;

    const waitingRoomController = new WaitingRoomController(props.firebaseService.ft);

    const [waitingRoom, setWaitingRoom] = useState();

    const gameController = new GameController(props.firebaseService.ft);

    const playerController = new PlayerController(props.firebaseService.ft);

    useEffect(
        () => {
            const unsubscribe = waitingRoomController
                        .listen(waitingRoomId, setWaitingRoom);
            return unsubscribe;
        },
        [waitingRoomId, setWaitingRoom]
    );


    const onJoinWaitingRoom = () => {
        if (waitingRoom && waitingRoom.addLoggedInUser(props.user)) {
            waitingRoomController.push(waitingRoom);
        } else {
            console.log('Player' + props.user.nickname +' has already joined' + waitingRoom.slugname);
        }
    }


    const handleStartGame = (click) => {
        waitingRoom.startGame();
        gameController.push(waitingRoom._currentGame);
        waitingRoom._currentGame._gameTable.players.map(
            (player) => playerController.push(player)
        );
        waitingRoomController.update(waitingRoom);
    }


    if(waitingRoom) {
        if (waitingRoom._currentGame) {
            return (
                <GameView
                slugname={waitingRoom.slugname}
                isCreator={props.user.id == waitingRoom.creatorId}
                gameId={waitingRoom._currentGame._id}
                user={props.user}
                firebaseService={props.firebaseService}
                handleClickCreateNextGame={props.handleClickCreateNextGame}
                />
            );
        } else {
            if (!waitingRoom.hasJoined(props.user)){
                onJoinWaitingRoom();
            }
            return (
                <WaitingRoomView
                slugname={waitingRoom.slugname}
                players={waitingRoom._loggedInUsers}
                onClick={handleStartGame}
                />
            );
        }
    } else {
        return (<div />)
    }
}
