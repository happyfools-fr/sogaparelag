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
  const [hasJoined, setHasJoined] = useState(false);

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
            console.log("1 useEffect user", user);
            console.log("1 useEffect currentWaitingRoomId", currentWaitingRoomId);
            console.log("1 useEffect currentWaitingRoom", currentWaitingRoom);

            if (user && currentWaitingRoom && !hasJoined) {onJoinCurrentWaitingRoom();}
            return unsubscribe;
        } else {
            const unsubscribe = waitingRoomController
                        .listen(currentWaitingRoomId, setCurrentWaitingRoom);
            console.log("2 useEffect user", user);
            console.log("2 useEffect currentWaitingRoomId", currentWaitingRoomId);
            console.log("2 useEffect currentWaitingRoom", currentWaitingRoom);

            if (user && currentWaitingRoom && !hasJoined) {onJoinCurrentWaitingRoom();}
            return unsubscribe;
        };
      },
      [
        currentSlugname, currentWaitingRoomId,
        waitingRoomController, setCurrentWaitingRoom,
        hasJoined, setHasJoined,
      ]
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
    console.log(currentWaitingRoom);
    let op = false;
    console.log(" onJoinCurrentWaitingRoom Before op currentWaitingRoom ", currentWaitingRoom);
    if (currentWaitingRoom && !hasJoined) {
        console.log(" onJoinCurrentWaitingRoom user to add ", user);
        op = currentWaitingRoom.addLoggedInUser(user);
        if (op) {
          console.log("op onJoinCurrentWaitingRoom");
          waitingRoomController.push(currentWaitingRoom);
          setCurrentWaitingRoom(currentWaitingRoom);
          setHasJoined(true);
        }
    }
    if (!op) {
        alert(`Could not add user to game name ${currentSlugname}!`);
    }
  }

  /*if(currentSlugname && !currentWaitingRoom){
    onJoinBySlugname(currentSlugname, user);
}*/

  // const onJoinBySlugname = (slugname) => {
  //   setCurrentSlugname(slugname);
  //   setCurrentWaitingRoom(waitingRoomController.getBySlugname(slugname))
  //   onJoinCurrentWaitingRoom();
  // }


  const handleClickCreateNewGame = (click) => {
      let waitingRoom = new WaitingRoom();
      alert('New game created, share this: ' + window.location.origin + '/game/' + waitingRoom.slugname);
      setCurrentSlugname(waitingRoom.slugname);
      setCurrentWaitingRoom(waitingRoom);
      setCurrentWaitingRoomId(waitingRoom._id);

      // onJoinCurrentWaitingRoom();
  }

  const handleJoinGameSubmit = (slugname, submit) =>  {
      submit.preventDefault();
      setCurrentSlugname(slugname);
      // const waitingRoom = waitingRoomController.getBySlugname(slugname);
      waitingRoomController.getBySlugnameAsync(slugname)
      .then( object => {
        console.log("Then handleJoinGameSubmit.object ", object);
        setCurrentWaitingRoom(object);
        setCurrentWaitingRoomId(object._id);
      })
      // .then( () => {
      //   console.log("currentWaitingRoom in handleJoinGameSubmit ", currentWaitingRoom);
      // })
      .catch((err) => {
        console.log("error in Promise handleJoinGameSubmit.waitingRoom");
        alert(err);
      })

      // onJoinCurrentWaitingRoom();
  }

  const handleStartGame = (click) => {
    currentWaitingRoom.startGame();
    waitingRoomController.push(currentWaitingRoom);
    setCurrentWaitingRoom(currentWaitingRoom)
    setCurrentWaitingRoomId(currentWaitingRoom._id);
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
  } else if (hasJoined && currentWaitingRoom && !game) {
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
    return (<div>currentSlugname && !currentWaitingRoom</div>);
  }

  // if (currentSlugname && !currentWaitingRoom) {
  //     // onJoinBySlugname(currentSlugname, user);
  //     return (<div>currentSlugname && !currentWaitingRoom</div>);
  // }


}
