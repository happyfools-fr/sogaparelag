import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController {

    constructor(database) {
        this._database = database;
        this._loading = false;
        this._gameConverter = {
            toFirestore: this._toFirestore,
            fromFirestore: this._fromFirestore
        }
    };


    _toFirestore(game) {
        return {
            _id: game._id,
            slugname: game.slugname,
            players: game.players,
            playerOrder: game.playerOrder,
            history: game.history,
            currentState: game.currentState,
        }
    }


    _fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Game(data._id, data.slugname, data.players, data.playerOrder, data.history, data.currentState);
    }


    /** Asynchronously connects to database and creates a game document
    * @returns {Game} newGame - newly created Game
    */
    async create() {
        let game = new Game();
        await this._database.collection("game")
            .withConverter(this._gameConverter)
            .doc(game._id)
            .set(game)
            .then(
                () => { console.log("Game successfully created") }
            )
            .catch(
                (e) => { console.log("Error creating game:", e) }
            );
        return game;
    };


    /** Asynchronously connects to database and gets a Game from ID
    * @params {uuid} gameId - game ID
    * @returns {Game} game - Game
    */
    async getById(gameId) {
        let game;
        await this._databass.collection("games")
            .withConverter(this._gameConverter)
            .doc(gameId)
            .get()
            .then(
                (doc) => {(doc.exists) ?
                    game = doc.data()
                    : console.log("No game with ID: ", gameId)
                }
            )
            .catch(
                (e) => { console.log("Error getting game:", e) }
            );
        return game;
    };


    /** Asynchronously connects to database and gets a Game from its slugname
    * @params {string} gameSlugname - game slugname
    * @returns {Game} game - Game
    */
    async getBySlugname(gameSlugname) {
        let game;
        await this._database.collection("game")
            .withConverter(this._gameConverter)
            .where("slugname", "==", gameSlugname).limit(1)
            .get()
            .then(
                (querySnapshot) => { game = querySnapshot.docs.map(x => x.data())[0] }
            )
            .catch(
                (e) => { console.log("Error getting ID from slugname:", e) }
            );
        return game;
    };


    /** Asynchronously connects to database and updates a Game from ID
    * @params {Game} newGame - new version of the Game
    * @returns {Game} newGame - new version of the Game
    */
    async update(newGame) {
        await this._database.collection("game")
            .withConverter(this._gameConverter)
            .doc(newGame._id)
            .update()
            .then(
                () => { console.log("Game successfully updated!") }
            )
            .catch(
                (e) => { console.log("Error updating game :", e) }
            )
        return newGame;
    };


    /** Asynchronously connects to database and deletes a game
    * @params {Game} game - old version of the Game
    * @returns {Boolean} isDeleted - always true
    */
    async delete(game) {
        await this._database.collection("game").doc(game._id).delete()
            .then(
                () => { console.log("Game successfully deleted!") }
            )
            .catch(
                (e) => { console.log("Error deleting game :", e) }
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
        this._loading = true;
        const listener = await this._database.collection("game")
            .doc(game._id)
            .onSnapshot(
                (snapshot) => {
                    if (snapshot) {
                        handleSnapshot(snapshot.data());
                    } else {
                        handleSnapshot(null);
                    }
                    this._loading = false;
                }
            );
        return listener;
    };

    isLoading() {
        return this._loading;
    }
}

export default GameController;
