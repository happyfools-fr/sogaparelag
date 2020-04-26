import Controller from './Controller'
import PlayerController from './PlayerController'
import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("game", database);
        this.playerController = new PlayerController(database);
    };


    /**
    * To be define in subClass
    */
    _getObjectId(game) {
        return game._id;
    }

    _objectToFirestoreDoc(game) {
        console.log("_objectToFirestoreDoc game", game);
        console.log("_objectToFirestoreDoc game._gameTable", game._gameTable);

        let doc = {
            _id: game._id,
            players: game._gameTable.players.map(
              player => {
                return this.playerController._objectToFirestoreDoc(player);
              }
            ),
            history: game.history,
            //todo
            currentState: null,
        };
        console.log("_objectToFirestoreDoc game as doc", doc);

        return doc;
    }

    /**
    *
    */
    _createObject(data) {
        let game = new Game();
        game._id = data._id;
        game._gameTable.players = data.players.map(
          datum => {
            return this.playerController._createObject(datum);
          }
        );
        game.history = data.history;
        //todo
        game.currentState = null;
        return game;
    }
}

export default GameController;
