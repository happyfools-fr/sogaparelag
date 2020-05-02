import Controller from './Controller'
import WaitingRoom from '../model/WaitingRoom'

export default class WaitingRoomController extends Controller {

    constructor(database) {
        super("waiting-room", database);
    };

    /**
    * To be define in subClass
    */
    _getObjectId(waitingRoom) {
        return waitingRoom._id;
    }


    _createObject(data) {
        return WaitingRoom.fromDoc(data);
    }


    listenOnSlugname(slugname, observer) {
        return this._database.collection(this._objectType)
            .where("slugname", "==", slugname)
            .onSnapshot(
                (snapshot) => {
                    if(snapshot.docs.length > 0) {
                      let object = this._createObject(snapshot.docs[0].data());
                      observer(object);
                    }
                }
            );
    };

}
