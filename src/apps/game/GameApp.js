// React imports
import React, { useState, useEffect, useCallback } from 'react';

import GameView from './views/GameView';
import GameMenuView from './views/GameMenuView';
import Game from './model/Game';
import WaitingRoom from './model/WaitingRoom'
import WaitingRoomController from './controller/WaitingRoomController'
import WaitingRoomView from './views/WaitingRoomView'

export default function GameApp(props) {

  const user = props.user;
  const providedSlugname = props.slugname;
  const firebaseService = props.firebaseService;
  const waitingRoomController = new WaitingRoomController(firebaseService.ft)

  const [currentWaitingRoom, setCurrentWaitingRoom] = useState();
  const [currentSlugname, setCurrentSlugname] = useState(providedSlugname);
  const [error, setError] = useState('');

  useEffect(
      () => {
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
  
  const onJoinBySlugname = (submittedSlugName, providedUser) => {
    const waitingRoom = waitingRoomController.getBySlugname(submittedSlugName);
    let op;
    if (waitingRoom) {
      op = waitingRoom.addLoggedInUser(providedUser);
    }
    if(!op){
      alert(`Could not add user to game name ${submittedSlugName}!`);
    }
    waitingRoomController.update(waitingRoom);
    setCurrentWaitingRoom(currentWaitingRoom);
    return waitingRoom;
  }
  
  if(currentSlugname && !currentWaitingRoom){
    return onJoinBySlugname(currentSlugname, user);
  }

  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      waitingRoom.addLoggedInUser(user);
      console.log(waitingRoom);
      waitingRoomController.push(waitingRoom);
      setCurrentWaitingRoom(currentWaitingRoom);
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      return waitingRoom;
  }

  const handleJoinGameSubmit = (submittedSlugName, submit) =>  {
      submit.preventDefault();
      onJoinBySlugname(submittedSlugName, submit);
  }
  
  const handleStartGame = (click) => {
    currentWaitingRoom.startGame();
    waitingRoomController.push(currentWaitingRoom);
    alert(`Game started for room: ${currentWaitingRoom.slugname}`);
    setCurrentWaitingRoom(currentWaitingRoom);
    return currentWaitingRoom;
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
        <WaitingRoomView gameSlugname={currentSlugname} onClick={handleStartGame}/>
      )
    }
  };

}
