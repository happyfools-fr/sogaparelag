// React imports
import React, { useState, useEffect } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'
import WaitingRoomView from './views/WaitingRoomView'

export default function GameApp(props) {

  const user = props.user;
  const firebaseService = props.firebaseService;

  const [currentSlugname, setCurrentSlugname] = useState(props.slugname);

  const waitingRoomController = new WaitingRoomController(firebaseService.ft)
  const [currentWaitingRoom, setCurrentWaitingRoom] = useState();
  const [currentWaitingRoomId, setCurrentWaitingRoomId] = useState(
      (currentWaitingRoom) ? currentWaitingRoom._id : undefined
  );

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
    currentWaitingRoom.startGame();
    waitingRoomController.update(currentWaitingRoom);
    setCurrentWaitingRoom(currentWaitingRoom)
    setCurrentWaitingRoomId(currentWaitingRoom._id);
    alert(`Game started for room: ${currentWaitingRoom.slugname}`);
  }


  const game = currentWaitingRoom ? currentWaitingRoom.currentGame : undefined;

  if (!currentSlugname) {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={firebaseService}
          />
      );
  } else if (currentSlugname && currentWaitingRoom) {
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
  } else if (game) {
      return (
        <GameView
          game={game}
          user={user}
          firebaseService={firebaseService}
          />
        );
  } else {
    return (<div />);
  }
}
