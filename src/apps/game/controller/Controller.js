/**
*   Class that defines interface of a Controller
*
*/
class Controller {

    constructor(type, database) {
        this._objectType = type;
        this._database = database;
        this._loading = false;
        this._objectConverter = {
            toFirestore : this._objectToFirestoreDoc,
            fromFirestore : this._objectFromFirestoreDoc,
        };
    }


    _objectToFirestoreDoc(object) {
        let doc = {};
        Object.keys(object).forEach( (k) => { doc.k = object.k } )
        return doc;
    }


    _objectFromFirestoreDoc(doc) {
        const object = this._createObject(doc);
        return object ;
    }

    /**
    * To be define in subClass
    */
    _getObjectId(object) {
        return object._id;
    }

    /**
    *
    */
    _createObject() {
        return {_id:"test_id"};
    }

    async push(object) {
        await this._database.collection(this._objectType)
            .doc(this._getObjectId(object))
            .set(this._objectToFirestoreDoc(object))
            .then(
                () => { console.log("New " + this._objectType + " successfully created") }
            )
            .catch(
                (e) => { console.log("Error creating " + this._objectType + ":", e) }
            );
        return object;
    }

    async get(objectId) {
        let object;
        await this._database.collection(this._objectType)
            .doc(objectId)
            .get()
            .then(
                (snapshot) => {(snapshot.exists) ?
                    object = this._objectFromFirestoreDoc(snapshot.data())
                    : console.log("No " + this._objectType + " with ID: ", objectId)
                }
            )
            .catch(
                (e) => { console.log("Error getting " + this._objectType + ":", e) }
            );
        return object;
    }


    async update(newObject) {
        await this._database.collection(this._objectType)
            .doc(this._getObjectId(newObject))
            .update(this._objectToFirestoreDoc(newObject))
            .then(
                () => { console.log("Game successfully updated!") }
            )
            .catch(
                (e) => { console.log("Error updating game :", e) }
            )
        return newObject;
    };


    async delete(object) {
        await this._database.collection(this._objectType)
            .doc(this._getObjectId)
            .delete()
            .then(
                () => { console.log("Game successfully deleted!") }
            )
            .catch(
                (e) => { console.log("Error deleting game :", e) }
            )
        return true;
    }

    listen(object, observer) {
        return this._database.collection(this._objectType)
            .doc(this._getObjectId(object))
            .onSnapshot(
                (snapshot) => {
                    let object = this._objectFromFirestoreDoc(snapshot.data());
                    observer(object)
                }
            );
    };
}

export default Controller;
