import Controller from './Controller'
import Player from '../model/Player'
import LoggedInUser from '../model/LoggedInUser'

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
        let player = new Player(
            new LoggedInUser(data.userId, data.nickname)
        )
        player._sickenessLevel = data._sickenessLevel
        player.isDead = data.isDead
        player.currentHand = data.currentHand
        return player;
    }
}

export default PlayerController;
