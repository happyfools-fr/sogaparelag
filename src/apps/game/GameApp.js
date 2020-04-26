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

  console.log(currentSlugname);
  console.log(currentWaitingRoom);

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

  const onJoinCurrentWaitingRoom = () => {
    console.log(currentWaitingRoom)
    if (currentWaitingRoom.addLoggedInUser(props.user)) {
        waitingRoomController.push(currentWaitingRoom);
        setCurrentWaitingRoom(currentWaitingRoom)
    } else {
        alert(`Could not add user to game name ${currentSlugname}!`);
    }
  }

  /*if(currentSlugname && !currentWaitingRoom){
    onJoinBySlugname(currentSlugname, user);
}*/

  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      setCurrentSlugname(waitingRoom.slugname);
      setCurrentWaitingRoom(waitingRoom);
      onJoinCurrentWaitingRoom();
  }

  const handleJoinGameSubmit = (slugname, submit) =>  {
      submit.preventDefault();
      setCurrentSlugname(slugname);
      setCurrentWaitingRoom(waitingRoomController.getBySlugname(slugname))
      onJoinCurrentWaitingRoom();
  }

  const handleStartGame = (click) => {
    currentWaitingRoom.startGame();
    waitingRoomController.push(currentWaitingRoom);
    setCurrentWaitingRoom(currentWaitingRoom)
    alert(`Game started for room: ${currentWaitingRoom.slugname}`);
  }


  const game = currentWaitingRoom ? currentWaitingRoom.currentGame : undefined;

  if (!currentSlugname && !game) {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={firebaseService}
          />
      );
  }

  if (currentSlugname && !currentWaitingRoom) {
      return(<div />);
  }

  if (currentWaitingRoom && !game) {
    return (
        <WaitingRoomView
            gameSlugname={currentSlugname}
            players={currentWaitingRoom._loggedInUsers}
            onClick={handleStartGame}
        />
    );
  }
  if (game) {
      return (
        <GameView
          game={game}
          user={user}
          firebaseService={firebaseService}
          />
        );
  }
}
