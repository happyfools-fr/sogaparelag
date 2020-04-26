// React imports
import React, { useState, useEffect } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'
import GameController from './controller/GameController'
import WaitingRoomView from './views/WaitingRoomView'

import WaitingRoomApp from './WaitingRoomApp'

export default function GameApp(props) {

  const [currentSlugname, setCurrentSlugname] = useState(props.slugname);

  const waitingRoomController = new WaitingRoomController(props.firebaseService.ft);

  const [currentWaitingRoom, setCurrentWaitingRoom] = useState();
  const [currentWaitingRoomId, setCurrentWaitingRoomId] = useState(
      (currentWaitingRoom) ? currentWaitingRoom._id : undefined
  );

  useEffect(
      () => {
        const unsubscribe = waitingRoomController
                    .listenOnSlugname(currentSlugname, setCurrentWaitingRoom);
        return unsubscribe;
      },
      [
        currentSlugname,
        waitingRoomController, setCurrentWaitingRoom,
      ]
  );


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

  if (currentWaitingRoom) {
      return (
          <WaitingRoomApp
            user={props.user}
            waitingRoom={currentWaitingRoom}
            firebaseService={props.firebaseService}
          />
        )
  } else {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={props.firebaseService}
          />
      );
  }
}
