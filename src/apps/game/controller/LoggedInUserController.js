import Controller from './Controller'
import LoggedInUser from '../model/LoggedInUser'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("LoggedInUser", database);
    };


    _getObjectId(loggedInUser) {
        return loggedInUser._id;
    }

    _createObject(data) {
        return LoggedInUser.fromDoc(data);
    }
}

export default LoggedInUserController;
