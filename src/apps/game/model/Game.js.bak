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

    fetch = (fb) => {return fb.getDocSync('game', this)};
    push = (fb) => {return fb.setDocSync('game', this)};

    static async addNewPlayer(db, game, player, playerState) {
        console.log("addNewPlayer ", player, playerState);
        if (!game.players.includes(player.id)) {
            const updatedGame = JSON.parse(JSON.stringify(game));
            console.log("addNewPlayer/if: updatedGame ", updatedGame);
            console.log("addNewPlayer/if: game ", game);
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
            const up = await Game.pushOrUpdateRecord(db, updatedGame);
            return up;
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
        console.log("In pushOrUpdateRecord", JSON.stringify(game));
        await db.collection("game").doc(game._id).set(
            game
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

    static async createAndAddPlayerToGame(db, game, user) {
        const player = await Player.createAndPushPlayer(db, user);
        console.log(player);
        const updatedGame = await Game.addNewPlayer(db, game, player, player);
        return updatedGame;
    }

    static async createAndPushNewGame(db, user) {
        const game = new Game();
        console.log("new game is created ", game);
        console.log("USER = ", JSON.stringify(user));
        const updatedGame = await Game.createAndAddPlayerToGame(db, game, user);
        console.log("updatedGame ", updatedGame);
        const pushed = await Game.pushOrUpdateRecord(db, updatedGame);
        console.log("Pushed ",  pushed);
        return pushed;
    }

    static async startFirstRound(db, game) {
        console.log("startFirstRound: game = ", game);
        game.currentState.isStarted = !game.currentState.isStarted;
        await db.collection("game").doc(game._id).set({
            currentState: game.currentState,
        },
            {
                merge: true
            }
        );
        return game;
    };
}

function createSlugname() {
    const json = require('../../../assets/words.json');
    const words = json["words"];
    const random = Math.round(Math.random() * words.length / 2)
    return words[random] + "-" + words[random * 2]
}

export default Game;
