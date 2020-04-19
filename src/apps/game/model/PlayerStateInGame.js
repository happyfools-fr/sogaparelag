
import { v1 as uuidv1 } from 'uuid';
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

const db = firebase.firestore(firebaseApp);

class PlayerStateInGame {
  constructor(gameId, isSick, isDead, currentHand) {
    this._id = uuidv1();
    this.gameId = gameId;
    this.isSick = isSick;
    this.isDead = isDead;
    this.currentHand = currentHand;
  }

  // static pushOrUpdateRecord(playerStateInGame) {
  //   db.collection("playerStateInGame").doc(playerStateInGame._id).set({
  //     _id: playerStateInGame._id,
  //     gameId: playerStateInGame.gameId,
  //     isSick: playerStateInGame.isSick,
  //     isDead: playerStateInGame.isDead,
  //     currentHand: playerStateInGame.currentHand,
  //   })
  //   .then(function() {
  //       console.log("PlayerStateInGame successfully written!");
  //       return playerStateInGame;
  //   })
  //   .catch(function(error) {
  //       console.error("Error writing User: ", error);
  //   });
  // }
  static pushOrUpdateRecord(playerStateInGame) {
    db.collection("playerStateInGame").doc(playerStateInGame._id).set({
      _id: playerStateInGame._id,
      gameId: playerStateInGame.gameId,
      isSick: playerStateInGame.isSick,
      isDead: playerStateInGame.isDead,
      currentHand: playerStateInGame.currentHand,
    });
    return playerStateInGame;
  }

  static getInitialPlayerStateInGame(game) {
    const playerStateInGame = new PlayerStateInGame(
      game._id,
      false,
      false,
      "4 cards in hand"
    )
    return PlayerStateInGame.pushOrUpdateRecord(playerStateInGame);
  }
}

export default PlayerStateInGame;
