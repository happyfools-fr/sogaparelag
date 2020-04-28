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

  const [currentWaitingRoom, setCurrentWaitingRoom] = useState(props.waitingRoom);
  const [currentWaitingRoomId, setCurrentWaitingRoomId] = useState(props.waitingRoom._id);

  const gameController = new GameController(props.firebaseService.ft);
  const [currentGameId, setCurrentGameId] = useState(
      (currentWaitingRoom) ? currentWaitingRoom._currentGameId : undefined
  );

  useEffect(
      () => {
        const unsubscribe = waitingRoomController
                    .listen(currentWaitingRoomId, setCurrentWaitingRoom);
        return unsubscribe;
      },
      [
        currentWaitingRoomId,
        waitingRoomController, setCurrentWaitingRoom,
      ]
  );



  const onJoinCurrentWaitingRoom = () => {
    if (currentWaitingRoom && currentWaitingRoom.addLoggedInUser(props.user)) {
        waitingRoomController.push(currentWaitingRoom);
        setCurrentWaitingRoom(currentWaitingRoom);
    } else {
        console.log('Player' + props.user.nickname +' has already joined' + currentWaitingRoom.slugname);
    }
  }


  const handleStartGame = (click) => {
    const newGame = currentWaitingRoom.startGame();
    console.log("handleStartGame.newGame before push2", newGame)
    gameController.push(newGame);
    waitingRoomController.update(currentWaitingRoom);
    setCurrentWaitingRoom(currentWaitingRoom)
    setCurrentWaitingRoomId(currentWaitingRoom._id);
    setCurrentGameId(newGame._id);
    alert(`Game started for room: ${currentWaitingRoom.slugname}`);
  }

  if (currentWaitingRoom && !currentGameId) {
      setCurrentGameId(currentWaitingRoom._currentGameId);
  }

  // if (!currentSlugname && !currentGameId) {
  //     return (
  //         <GameMenuView
  //             handleClickCreateNewGame={handleClickCreateNewGame}
  //             handleJoinGameSubmit={handleJoinGameSubmit}
  //             firebaseService={firebaseService}
  //         />
  //     );
  // } else


  if (!currentGameId) {
        console.log("WaitingRoomView", currentWaitingRoom._id);
        if (!currentWaitingRoom.hasJoined(props.user)){
            onJoinCurrentWaitingRoom();
        }
        return (
            <WaitingRoomView
                gameSlugname={currentWaitingRoom.slugname}
                players={currentWaitingRoom._loggedInUsers}
                onClick={handleStartGame}
            />
        );
  } else {
      console.log("currentGameId before GameView", currentGameId);
      return (
        <GameView
          gameSlugname={currentWaitingRoom.slugname}
          gameId={currentGameId}
          user={props.user}
          firebaseService={props.firebaseService}
          />
        );
  }
}
