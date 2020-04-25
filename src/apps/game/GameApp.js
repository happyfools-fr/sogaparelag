// React imports
import React, { useState, useEffect, useCallback } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import Game from './model/Game';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'

export default function GameApp(props) {

  const user = props.user;
  const providedSlugname = props.slugname;
  const firebaseService = props.firebaseService;
  const waitingRoomController = new WaitingRoomController(firebaseService)

  const [currentWaitingRoom, setCurrentWaitingRoom] = useState();
  const [currentSlugname, setCurrentSlugname] = useState(providedSlugname);
  const [error, setError] = useState('');

  // if(currentSlugname && !currentWaitingRoom){
  //   return waitingRoomController.onJoinBySlugname(currentSlugname, user);
  // }

  useEffect(
      () => {
        if(currentSlugname && !currentWaitingRoom){
          return waitingRoomController.onJoinBySlugname(currentSlugname, user);
        }
        //Update WaitingRoom using provided slugname
        if (currentSlugname){
          let unsubscribe = waitingRoomController.listenOnSlugname(currentSlugname, (
            waitingRoom => {
              setCurrentWaitingRoom(waitingRoom);
          }));
          console.log("onEffect: currentSlugname");
          return () => {unsubscribe()};
        }
      },
      [currentSlugname]
  );
  
  useEffect(
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
  );

  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      waitingRoom.addLoggedInUsers(user);
      waitingRoomController.update(waitingRoom);
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      return waitingRoom;
  }

  const handleJoinGameSubmit = (submittedSlugName, submit) =>  {
      submit.preventDefault();
      let waitingRoom = waitingRoomController.getBySlugname(submittedSlugName);
      let op = waitingRoom && waitingRoom.addLoggedInPlayer(user);
      if(!op){
        alert(`Could not add user to game name ${submittedSlugName}!`);
      }
      waitingRoomController.update(waitingRoom);
      return waitingRoom;
  }

  const game = currentWaitingRoom ? currentWaitingRoom.currentGame : null;
  if (!currentWaitingRoom) {
      return (
          <GameMenuView
              handleClickCreateNewGame={handleClickCreateNewGame}
              handleJoinGameSubmit={handleJoinGameSubmit}
              firebaseService={firebaseService}  
          />
      );
  } else {
      return ( 
        <GameView 
          game={game} 
          user={user} 
          firebaseService={firebaseService} 
          /> 
        );
  };

}
