// React imports
import React, { useState, useEffect } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'
import GameController from './controller/GameController'
import WaitingRoomView from './views/WaitingRoomView'

export default function GameApp(props) {

  const user = props.user;
  const firebaseService = props.firebaseService;

  const [currentSlugname, setCurrentSlugname] = useState(props.slugname);

  const waitingRoomController = new WaitingRoomController(firebaseService.ft);
  const gameController = new GameController(firebaseService.ft);

  const [currentWaitingRoom, setCurrentWaitingRoom] = useState();
  const [currentWaitingRoomId, setCurrentWaitingRoomId] = useState(
      (currentWaitingRoom) ? currentWaitingRoom._id : undefined
  );
  const [currentGameId, setCurrentGameId] = useState();
  //const [error, setError] = useState('');

  useEffect(
      () => {
        if (!currentWaitingRoomId) {
            const unsubscribe = waitingRoomController
                        .listenOnSlugname(currentSlugname, setCurrentWaitingRoom);
            return unsubscribe;
        } else {
            const unsubscribe = waitingRoomController
                        .listen(currentWaitingRoomId, setCurrentWaitingRoom);
            return unsubscribe;
        };
      },
      [
        currentSlugname, currentWaitingRoomId,
        waitingRoomController, setCurrentWaitingRoom,
      ]
  );



  const onJoinCurrentWaitingRoom = () => {
    if (currentWaitingRoom && currentWaitingRoom.addLoggedInUser(user)) {
        waitingRoomController.push(currentWaitingRoom);
        setCurrentWaitingRoom(currentWaitingRoom);
    } else {
        console.log('Player' + props.user.nickname +' has already joined' + currentSlugname);
    }
  }



  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      waitingRoomController.push(waitingRoom);
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      setCurrentWaitingRoom(waitingRoom);
      setCurrentSlugname(waitingRoom.slugname);
      setCurrentWaitingRoomId(waitingRoom._id);
      console.log(currentWaitingRoom)
  }

  const handleJoinGameSubmit = (slugname, submit) =>  {
      submit.preventDefault();
      setCurrentSlugname(slugname);
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


  // const game = currentWaitingRoom ? currentWaitingRoom.currentGame : undefined;
  const gameId = currentWaitingRoom ? currentWaitingRoom._currentGame : undefined;
  if (!currentSlugname && !currentGameId) {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={firebaseService}
          />
      );
  } else if (currentSlugname && currentWaitingRoom && !currentGameId) {
        if (!currentWaitingRoom.hasJoined(props.user)){
            onJoinCurrentWaitingRoom();
        }
        return (
            <WaitingRoomView
                gameSlugname={currentSlugname}
                players={currentWaitingRoom._loggedInUsers}
                onClick={handleStartGame}
            />
        );
  } else if (currentGameId) {
      console.log("currentGameId before GameView", currentGameId);
      return (
        <GameView
          // game={game}
          gameSlugname={currentSlugname}
          gameId={currentGameId}
          user={user}
          firebaseService={firebaseService}
          />
        );
  } else {
    return (<div />);
  }
}
