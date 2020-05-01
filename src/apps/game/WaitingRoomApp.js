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
            setWaitingRoom(waitingRoom);
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
        setWaitingRoom(waitingRoom);
        alert(`Game started for room: ${waitingRoom.slugname}`);
        // waitingRoom.startGame();
        // gameController.push(waitingRoom._currentGame);
        // waitingRoom._currentGame._gameTable.players.forEach(
        //     (player) => playerController.push(player)
        // );
        // waitingRoomController.update(waitingRoom)
        // .then(() => {
        //   setWaitingRoom(waitingRoom);
        //   alert(`Game started for room: ${waitingRoom.slugname}`);
        // })
        // .then( () => {
        //   console.log("waitingRoom._currentGame", JSON.stringify(waitingRoom._currentGame));
        //   alert(`Game started for room: ${JSON.stringify(waitingRoom._currentGame)}`);
        // });
    }


    if(waitingRoom) {
        if (waitingRoom._currentGame) {
          alert("waitingRoom._currentGame");
            return (
                <GameView
                slugname={waitingRoom.slugname}
                gameId={waitingRoom._currentGame._id}
                user={props.user}
                firebaseService={props.firebaseService}
                />
            );
        } else {
          alert("!waitingRoom._currentGame");
            if (!waitingRoom.hasJoined(props.user)){
              alert("!waitingRoom.hasJoined(props.user)");

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
