import React from 'react';

import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController {

    constructor(database) {
        this._database = database;
    };


    gameConverter = {
        toFirestore: (game) => {
            return {}
        },
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options);
          return new Game()
        }
    }



    /** Asynchronously connects to database and creates a game document
    * @returns {Game} newGame - newly created Game
    */
    async create() {
        let game = new Game();
        this._database.collection("game").doc(game.id).set(game)
            withConverter(gameConverter)
            .then(
                () => {console.log("Game successfully created");}
            )
            .catch(
                (e) => {console.log("Error creating game:", e);}
            );
        return game;
    };


    /** Asynchronously connects to database and gets a Game from ID
    * @params {uuid} gameId - game ID
    * @returns {Game} game - Game
    */
    async getById(gameId) {
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
    async getBySlugname(gameSlugname) {
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
    * @params {Game} newGame - new version of the Game
    * @returns {Game} newGame - new version of the Game
    */
    async update(newGame) {
        const query = this._database.collection("game").doc(game.id).update()
            .then(
                () => {console.log("Game successfully updated!");}
            )
            .catch(
                (e) => {console.log("Error updating game :", e);}
            )
        return newGame;
    };


    /** Asynchronously connects to database and deletes a game
    * @params {Game} game - old version of the Game
    * @returns {Boolean} isDeleted - always true
    */
    async delete(game) {
        const query = this._database.collection("game").doc(game.id).delete()
            .then(
                () => {console.log("Game successfully deleted!");}
            )
            .catch(
                (e) => {console.log("Error deleting game :", e);}
            )
        return true;
    }


    /** Asynchronously listens to a single game
    *
    * Usage :
    *   To subscribe to listener :
    *       const unsubscribe = GameController.getListener(game, handleSnapshot);
    *   To unsubscribe :
    *       unsubscribe();
    *
    * @params {Game} game - old version of the Game
    * @params {(snapshot) => void} handleSnapshot -
    * @returns {DocumentSnapshot} gameSnapshot -
    */
    async listen(game, handleSnapshot) {
        return this._database.collection("game").doc(game.id)
                .onSnapshot(
                    (snapshot) => {handleSnapshot(snapshot)}
                );
    };
}

export default GameController;
