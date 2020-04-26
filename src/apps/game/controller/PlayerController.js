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

    _objectToFirestoreDoc(player) {
        let doc = {
            _id: player.userId,
            nickname: player.nickName,
            _sickenessLevel: player._sickenessLevel,
            isDead: player.isDead,
            currentHand: player.currentHand,
        };
        return doc;
    }

    /**
    *
    */
    _createObject(data) {
        let player = new Player(Object.create(data))
        player._sickenessLevel = data["_sickenessLevel"]
        player.isDead = data["isDead"]
        player.currentHand = data["currentHand"]
        return player;
    }
}

export default PlayerController;
