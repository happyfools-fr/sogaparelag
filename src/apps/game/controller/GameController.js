import Controller from './Controller'
import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("game", database);
    };


    /**
    * To be define in subClass
    */
    _getObjectId(game) {
        return game._id;
    }

    /**
    *
    */
    _createObject(data) {
        let game = new Game();
        game._id = data._id;
        game.slugname = data.slugname;
        game.players = data.players;;
        game.playerOrder = data.playerOrder;;
        game.history = data.history;;
        game.currentState = data.currentState;;
        return game;
    }
}

export default GameController;
