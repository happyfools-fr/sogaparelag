import { v1 as uuidv1 } from 'uuid';

import GameState from './GameState';
import Player from './Player';

class Game {
    constructor() {
        this._id = uuidv1();
        this.slugname = createSlugname();
        this.players = [];
        this.playerOrder = [];
        this.history = [];
        this.currentState = GameState.getInitialGameState();
    }
    
    get id()
    {
        return this._id;
    }
    
    // fetch = (fb) => {return fb.getDocSync('game', this)};
    // push = (fb) => {return fb.setDocSync('game', this)};
    // 
    // 
    // 
    // 
    // addPlayer = (fb, player) => {
    //   if(!this.players.includes(player.id)){
    //     this.players = this.players.slice().concat([player.id]);
    //     this.playerOrder = this.playerOrder.slice().concat([player.id]);
    //     this.currentState.playerStatesInGame = this.currentState.playerStatesInGame.slice().concat([{ ...player }]);
    //     this.currentPlayerId = this.playerOrder[0];
    //     if (this.players.length === 0) {
    //         t.nextPlayerId = updatedPlayerOrder[0];
    //     } else {
    //         updatedCurrentState.nextPlayerId = updatedPlayerOrder[1];
    //     }
    //   }else{
    // 
    //   }
    // }
    
    
    static addNewPlayer(db, game, player, playerState) {
        if (!game.players.includes(player.id)) {
            const updatedGame = JSON.parse(JSON.stringify(game));
            const updatedPlayers = updatedGame.players.slice().concat([player.id])
            updatedGame.players = updatedPlayers;
            const updatedPlayerOrder = updatedGame.playerOrder.slice().concat([player.id])
            updatedGame.playerOrder = updatedPlayerOrder;
            const updatedCurrentState = JSON.parse(JSON.stringify(updatedGame.currentState));
            updatedCurrentState.playerStatesInGame = updatedGame.currentState.playerStatesInGame.slice().concat([{ ...playerState }]);
            updatedCurrentState.currentPlayerId = updatedPlayerOrder[0];
            if (game.players.length === 0) {
                updatedCurrentState.nextPlayerId = updatedPlayerOrder[0];
            } else {
                updatedCurrentState.nextPlayerId = updatedPlayerOrder[1];
            }
            updatedGame.currentState = updatedCurrentState;
            return Game.pushOrUpdateRecord(db, updatedGame);
        } else {
            console.log("You are already a player in this game");
            return game;
        }
    };

    static async getGameSnapshotByGameId(db, gameId) {
        const gameSnapshot = await db.collection("game").doc(gameId).get();
        return gameSnapshot;
    }

    static async getGameBySlugname(db, gameSlugname) {
        const query = db.collection("game").where("slugname", "==", gameSlugname);
        let game;
        await query.get()
            .then((querySnapshot) => { game = querySnapshot.docs.map(x => x.data())[0] })
            .catch((e) => { console.log(e); });
        return game;
    }

    static async pushOrUpdateRecord(db, game) {
        console.log(JSON.stringify(game));
        await db.collection("game").doc(game._id).set({
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

    static createAndAddPlayerToGame(db, game, user) {
        const player = Player.createAndPushPlayer(db, user);
        const updatedGame = Game.addNewPlayer(db, game, player, player);
        return updatedGame;
    }

    static createAndPushNewGame(db, user) {
        const game = new Game();
        console.log("new game is created",game);
        const updatedGame = Game.createAndAddPlayerToGame(db, game, user);
        return Game.pushOrUpdateRecord(db, updatedGame);
    }

    static pushUpdateGameState(db, game) {
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
            .then(function () {
                console.log("Successfully written!");
                return updatedGame;
            })
            .catch(function (error) {
                console.error("Error writing: ", error);
            });
    };

    static startFirstRound(db, game) {
        const updatedGame = JSON.parse(JSON.stringify(game));
        updatedGame.currentState.isStarted = !updatedGame.currentState.isStarted;
        db.collection("game").doc(game._id).set({
            currentState: updatedGame.currentState,
        },
            {
                merge: true
            }
        )
            .then(function () {
                console.log("Successfully written!");
                return updatedGame;
            })
            .catch(function (error) {
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
