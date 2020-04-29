import Controller from './Controller'
import Game from '../model/Game'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("game", database);
    };

    _getObjectId(game) {
        return game._id;
    }

    _createObject(data) {
        return Game.fromDoc(data);
    }
}

export default GameController;
