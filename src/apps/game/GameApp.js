// React imports
import React, { useState, useEffect } from 'react';

import GameMenuView from './views/GameMenuView';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'

import WaitingRoomApp from './WaitingRoomApp'

export default function GameApp(props) {

  const waitingRoomController = new WaitingRoomController(props.firebaseService.ft);

  const [waitingRoomId, setWaitingRoomId] = useState();

  const [slugname, setSlugname] = useState(props.slugname);

  useEffect(
      () => {
        const unsubscribe = waitingRoomController
                    .listenOnSlugname(slugname,
                        (waitingRoom) => {setWaitingRoomId(waitingRoom._id);
                    });
        return unsubscribe;
      },
      [slugname, setWaitingRoomId]
  );


  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      waitingRoomController.push(waitingRoom);
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      setSlugname(waitingRoom.slugname);
      setWaitingRoomId(waitingRoom._id);
  }


  const handleJoinGameSubmit = (slugname, submit) =>  {
      submit.preventDefault();
      setSlugname(slugname.toLowerCase());
  }

  if (waitingRoomId) {
      return (
          <WaitingRoomApp
            user={props.user}
            slugname = {slugname}
            waitingRoomId={waitingRoomId}
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
