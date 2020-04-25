import Controller from './Controller'
import WaitingRoom from '../model/WaitingRoom'

class WaitingRoomController extends Controller {

    constructor(database) {
        super("waiting-room", database);
    };


    /**
    * To be define in subClass
    */
    _getObjectId(waitingRoom) {
        return waitingRoom._id;
    }

    _objectToFirestoreDoc(waitingRoom) {
        let doc = {
            _id: waitingRoom._id,
            slugname: waitingRoom.slugname,
            _loggedInUsers: waitingRoom._loggedInUsers,
            _currentGame: waitingRoom._currentGame,
        };
        return doc;
    }

    /**
    *
    */
    _createObject(data) {
        let waitingRoom = new WaitingRoom();
        waitingRoom._id = data._id;
        waitingRoom.slugname = data.slugname;
        waitingRoom._loggedInUsers = data._loggedInUsers;
        waitingRoom._currentGame = data._currentGame;
        return waitingRoom;
    }
}

export default GameController;
