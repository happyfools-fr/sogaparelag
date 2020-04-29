import Controller from './Controller'
import Player from '../model/Player'

/** This class handles game CRUD and the database **/
class PlayerController extends Controller{

    constructor(database) {
        super("player", database);
    };

    /**
    * To be define in subClass
    */
    _getObjectId(player) {
        return player.userId;
    }

    /**
    *
    */
    _createObject(data) {
      return Player.fromDoc(data);
    }
}

export default PlayerController;
