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
    
    listenOnSlugname(slugname, observer) {
        return this._database.collection(this._objectType)
            .where("slugname", "==", slugname)
            .onSnapshot(
                (snapshot) => {
                    if(snapshot.docs.length > 0) {
                      let object = this._objectFromFirestoreDoc(snapshot.docs[0].data());
                      observer(object);
                    }
                }
            );
    };
    
    async getBySlugname(slugname) {
        let object;
        await this._database.collection(this._objectType)
            .where("slugname", "==", slugname)
            .get()
            .then(
                (snapshot) => {(snapshot.exists) ?
                    object = this._objectFromFirestoreDoc(snapshot.data())
                    : console.log("No " + this._objectType + " with ID: ", slugname)
                }
            )
            .catch(
                (e) => { console.log("Error getting " + this._objectType + ":", e) }
            );
        return object;
    }
    
    onJoinBySlugname(){
      //todo
      return true;
    }
}

export default WaitingRoomController;
