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
        }
      },
      [currentSlugname, currentWaitingRoomId, waitingRoomController, setCurrentWaitingRoom]
  );

 /* useEffect(
      () => {
          // Listen to WaitingRoom updates
          if (currentWaitingRoom) {
            let unsubscribe = waitingRoomController.listen(currentWaitingRoom, (
              waitingRoom => {
                setCurrentWaitingRoom(waitingRoom);
                if (currentSlugname !== waitingRoom.slugname){
                  setCurrentSlugname(waitingRoom.slugname);
                }
          }));
          console.log("onEffect: currentWaitingRoom");
          return () => {unsubscribe()};
          }
      },
      [currentWaitingRoom]
  );*/

  const onJoinBySlugname = (submittedSlugName) => {
    setCurrentSlugname(submittedSlugName);
    if (currentWaitingRoom.addLoggedInUser(props.user)) {
        waitingRoomController.update(currentWaitingRoom);
    } else {
        alert(`Could not add user to game name ${submittedSlugName}!`);
    }
  }

  if(currentSlugname && !currentWaitingRoom){
    return onJoinBySlugname(currentSlugname, user);
  }

  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      waitingRoom.addLoggedInUser(user);
      waitingRoomController.push(waitingRoom);
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
  }

  const handleJoinGameSubmit = (submittedSlugName, submit) =>  {
      submit.preventDefault();
      onJoinBySlugname(submittedSlugName);
  }

  const handleStartGame = (click) => {
    currentWaitingRoom.startGame();
    waitingRoomController.push(currentWaitingRoom);
    alert(`Game started for room: ${currentWaitingRoom.slugname}`);
    return currentWaitingRoom;
  }


  const game = currentWaitingRoom ? currentWaitingRoom.currentGame : undefined;

  if (!currentWaitingRoom) {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={firebaseService}
          />
      );
  } else {
    if(game){
      return (
        <GameView
          game={game}
          user={user}
          firebaseService={firebaseService}
          />
        );
    } else {
      return (
        <WaitingRoomView
            gameSlugname={currentSlugname}
            players={currentWaitingRoom._loggedInUsers}
            onClick={handleStartGame}
        />
      )
    }
  };

}
