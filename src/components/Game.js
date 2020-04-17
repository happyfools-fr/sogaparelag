
import { v1 as uuidv1 } from 'uuid';
import * as firebase from 'firebase';
import firebaseApp from './firebaseApp';
const db = firebase.firestore(firebaseApp);

class Game {
  constructor(slugname) {
    this._id = uuidv1();
    this.slugname = 'gameslugprefix-' + slugname;
    this.players = [];
    this.playerOrder = [];
    this.history = [{}];
  }
  
  static addPlayer(game, player) {
    const updatedGame = JSON.parse(JSON.stringify(game));
    const players = updatedGame.players.slice().concat([player._id])
    updatedGame.players = players;
    const playerOrder = updatedGame.playerOrder.slice().concat([player._id])
    updatedGame.players = playerOrder;
    
    return Game.pushOrUpdateRecord(updatedGame);
  };
  
  static createGameWithInitialPlayer(slugname, player){
    const newGame = new Game(slugname);
    return Game.addPlayer(newGame, player);
  };
  
  static pushOrUpdateRecord(game) {
    db.collection("game").doc(game._id).set({
      _id: game._id,
      slugname: game.slugname,
      players: game.players,
      playerOrder: game.playerOrder,
      history: game.history,
    })
    .then(function() {
        console.log("Successfully written!");
        alert("Game added to firestore: " + JSON.stringify(game));
        return game;  
    })
    .catch(function(error) {
        console.error("Error writing: ", error);
    });
    return game;
  };
}


export default Game;