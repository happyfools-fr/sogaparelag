import Controller from './Controller'
import LoggedInUser from '../model/LoggedInUser'

/** This class handles game CRUD and the database **/
class GameController extends Controller {

    constructor(database) {
        super("LoggedInUser", database);
    };


    /**
    * To be define in subClass
    */
    _getObjectId(loggedInUser) {
        return loggedInUser._id;
    }

    _objectToFirestoreDoc(loggedInUser) {
        return {uid: loggedInUser._id, nickname: loggedInUser.nickname};
    }


    /**
    *
    */
    _createObject(data) {
        let user = {uid: data.uid, nickname: data.nickname};
        return new LoggedInUser(user);
    }
}

export default LoggedInUserController;
