// React imports
import React, { useState, useEffect } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'
import GameController from './controller/GameController'
import WaitingRoomView from './views/WaitingRoomView'

export default function WaitingRoomApp(props) {

    const waitingRoomController = new WaitingRoomController(props.firebaseService.ft);
    const [waitingRoomId, setWaitingRoomId] = useState(props.waitingRoomId);
    const [waitingRoom, setWaitingRoom] = useState();

    const gameController = new GameController(props.firebaseService.ft);

    const slugname = props.slugname

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
            setWaitingRoom(waitingRoom);
        } else {
            console.log('Player' + props.user.nickname +' has already joined' + waitingRoom.slugname);
        }
    }


    const handleStartGame = (click) => {
        const newGame = waitingRoom.startGame();
        gameController.push(newGame);
        waitingRoomController.update(waitingRoom);
        setWaitingRoom(waitingRoom)
        alert(`Game started for room: ${waitingRoom.slugname}`);
    }


    if(waitingRoom) {
        if (waitingRoom._currentGameId) {
            return (
                <GameView
                slugname={waitingRoom.slugname}
                gameId={waitingRoom._currentGameId}
                user={props.user}
                firebaseService={props.firebaseService}
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
