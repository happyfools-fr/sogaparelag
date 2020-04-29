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


    // async getBySlugname(slugname) {
    //     let object;
    //     await this._database.collection(this._objectType)
    //         .where("slugname", "==", slugname)
    //         .get()
    //         .then(
    //             (snapshot) => {(snapshot.docs.length > 0) ?
    //                 object = this._objectFromFirestoreDoc(snapshot.docs[0].data())
    //                 : console.log("No " + this._objectType + " with ID: ", slugname)
    //             }
    //         )
    //         .catch(
    //             (e) => { console.log("Error getting " + this._objectType + ":", e) }
    //         );
    //     return object;
    // }

}
