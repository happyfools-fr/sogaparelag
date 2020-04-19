
import { v1 as uuidv1 } from 'uuid';
import * as firebase from 'firebase';
import firebaseApp from '../../../firebaseApp';

import GameState from './GameState';
import Player from './Player';
import PlayerStateInGame from './PlayerStateInGame';

const db = firebase.firestore(firebaseApp);

class Game {
  constructor() {
    this._id = uuidv1();
    this.slugname = createSlugname();
    this.players = [];
    this.playerOrder = [];
    this.history = [];
    this.currentState = GameState.getInitialGameState();
  }

  static addNewPlayer(game, player, playerState) {
    if (!game.players.includes(player._id)) {
        const updatedGame = JSON.parse(JSON.stringify(game));
        const updatedPlayers = updatedGame.players.slice().concat([player._id])
        updatedGame.players = updatedPlayers;
        const updatedPlayerOrder = updatedGame.playerOrder.slice().concat([player._id])
        updatedGame.playerOrder = updatedPlayerOrder;
        const updatedCurrentState = JSON.parse(JSON.stringify(updatedGame.currentState));
        updatedCurrentState.playerStatesInGame = updatedGame.currentState.playerStatesInGame.slice().concat([{...playerState}]);
        updatedCurrentState.currentPlayerId = updatedPlayerOrder[0];
        if (game.players.length === 0){
          updatedCurrentState.nextPlayerId = updatedPlayerOrder[0];
        } else {
          updatedCurrentState.nextPlayerId = updatedPlayerOrder[1];
        }
      updatedGame.currentState = updatedCurrentState;
      return Game.pushOrUpdateRecord(updatedGame);
    } else {
      alert("You are already a player in this game");
      return game;
    }
  };
  
  static async getGameSnapshotByGameId(gameId){
    const gameSnapshot = await db.collection("game").doc(gameId).get();
    return gameSnapshot;
  }

  static async getGameIdBySlugname(gameSlugname) {
    const query = db.collection("game").where("slugname", "==", gameSlugname).limit(1);
    let gameId;
    await query.get()
        .then((querySnapshot) => {gameId = querySnapshot.docs[0].id})
        .catch((e) => {console.log(e);});
    return gameId;
  }

  static pushOrUpdateRecord(game) {
    db.collection("game").doc(game._id).set({
      ...game
    },
    {
      merge: true,
    }
  );
    // .then(function() {
    //     console.log("Successfully written!");
    //     alert("Game added to firestore: " + JSON.stringify(game));
    //     return game;
    // })
    // .catch(function(error) {
    //     console.error("Error writing: ", error);
    // });
    return game;
  };


  static createAndPushNewGame(user) {
    const game = new Game();
    const player = Player.createAndPushPlayer(user);
    const playerStateInGame = PlayerStateInGame.getInitialPlayerStateInGame(player);
    const updatedGame = Game.addNewPlayer(game, player, playerStateInGame);
    return Game.pushOrUpdateRecord(updatedGame);
  }
  
  static pushUpdateGameState(game) {
    const updatedHistory = game.history.slice().concat([
      { _id: 'history ' + Math.random().toString() }
    ]);
    const updatedGame = JSON.parse(JSON.stringify(game));
    updatedGame.history = updatedHistory;
    db.collection("game").doc(game._id).set({
      history: updatedGame.history,
    }, 
    { 
      merge: true 
    })
    .then(function() {
        console.log("Successfully written!");
        return updatedGame;
    })
    .catch(function(error) {
        console.error("Error writing: ", error);
    });
  };
  
  static startFirstRound(game) {
    const updatedGame = JSON.parse(JSON.stringify(game));
    updatedGame.currentState.isStarted = !updatedGame.currentState.isStarted;
    db.collection("game").doc(game._id).set({
      currentState: updatedGame.currentState,
    }, 
    { 
      merge: true 
    }
  )
    .then(function() {
        console.log("Successfully written!");
        return updatedGame;
    })
    .catch(function(error) {
        console.error("Error writing: ", error);
    });
  };
}

function createSlugname() {
    const json = require('../../../assets/words.json');
    const words = json["words"];
    const random = Math.round(Math.random() * words.length / 2)
    return words[random] + "-" + words[random * 2]
}

export default Game;
