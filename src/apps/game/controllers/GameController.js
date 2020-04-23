import React from 'react';

import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController {

    constructor(database) {
        this._database = database;
    };

    gameConverter = {
        toFirestore: function(game) {
            return {}
        },
        fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Game()
        }
    }



    /** Asynchronously connects to database and creates a game document
    * @returns {Game} newGame - newly created Game
    */
    async createGame() {
        let game;
        this._database.collection("game").doc(game.id).set(game)
            .then(
                () => {console.log("Game successfully created");}
            )
            .catch(
                (e) => {console.log("Error creating game:", e);}
            );
        return this._loads(game);
    };


    /** Asynchronously connects to database and gets a Game from ID
    * @params {uuid} gameId - game ID
    * @returns {Game} game - Game
    */
    async getGameById(gameId) {
        let game;
        const query = this._databass.collection("games").doc(gameId);
        query.get().withConverter(gameConverter).then(
            (doc) => {(doc.exists) ?
                game = doc.data()
                : console.log("No game with ID: ", gameId)
            }
        )
        .catch(
            (e) => {console.log("Error getting game:", e);}
        );
        return game;
    };


    /** Asynchronously connects to database and gets a Game from its slugname
    * @params {string} gameSlugname - game slugname
    * @returns {Game} game - Game
    */
    async getGameBySlugname(gameSlugname) {
        let game;
        const query = db.collection("game").where("slugname", "==", gameSlugname).limit(1);
        query.get().withConverter(gameConverter).then(
            (querySnapshot) => { game = querySnapshot.docs.map(x => x.data())[0] }
        )
        .catch(
            (e) => { console.log("Error getting ID from slugname:", e);
        );
        return game;
    };


    /** Asynchronously connects to database and updates a Game from ID
    * @params {Game} game - old version of the Game
    * @params {Object} updates - an objects of fields to be updated and their new value
    * @returns {Game} updatedGame - Game with updates
    */
    async updateGame(game) {
        return updatedGame;
    };


    /** Asynchronously connects to database and deletes a game
    * @params {Game} game - old version of the Game
    * @returns {Boolean} isDeleted - always true
    */
    async deleteGame(game) {
        return true;
    }

    /** Asynchronously listens to any database update on a game
    * @params {Game} game - old version of the Game
    * @returns {?} gameListener
    */
    async listen(game) {
        return ;
    }
}

export default GameController;
